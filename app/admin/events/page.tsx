
'use client';

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/core/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { EventForm, EventsList } from "@/features/events/components/admin";
import { useMediaQuery } from "@/core/hooks/use-media-query";
import { useAdminServices } from "@/core/services/admin/context";
import type { EventsService } from "@/core/services/admin/services";
import type { EventStats } from "@/features/events/types/events.types";

function useEventStats(service: EventsService) {
  const [stats, setStats] = useState<EventStats>();
  const [isLoading, setIsLoading] = useState(true);

  const loadStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const eventsStats = await service.getStats();
      setStats(eventsStats);
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setIsLoading(false);
    }
  }, [service]);

  useEffect(() => {
    loadStats().catch((error) => {
      console.error("Erreur lors du chargement initial des statistiques:", error);
    });
  }, [loadStats]);

  return { stats, isLoading, refreshStats: loadStats };
}

function EventsPageContent() {
  const { events: eventsService } = useAdminServices();
  const { stats, isLoading, refreshStats } = useEventStats(eventsService);
  const [showForm, setShowForm] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSuccess = useCallback(() => {
    refreshStats().catch((error) => {
      console.error("Erreur lors du rafraîchissement des statistiques:", error);
    });
    setShowForm(false);
  }, [refreshStats]);

  const StatsCard = ({ title, count, color }: { title: string; count?: number; color: string }) => (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`p-3 ${color} rounded-lg`}>
          <Calendar className={`h-6 w-6 ${color.replace("bg-", "text-")}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold">{isLoading ? "..." : count ?? 0}</p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 my-3">Événements</h1>
          <p className="mt-2 text-gray-600">Gérez les événements et ajoutez de nouveaux contenus</p>
        </div>
        <div className="flex items-center gap-4">
          {!isMobile && (
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un événement
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total" count={stats?.total} color="bg-blue-100" />
        <StatsCard title="À venir" count={stats?.upcoming} color="bg-green-100" />
        <StatsCard title="Ce mois" count={stats?.thisMonth} color="bg-purple-100" />
      </div>

      {showForm ? (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Nouvel événement</h2>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Retour à la liste
            </Button>
          </div>
          <EventForm onSuccess={handleSuccess} />
        </Card>
      ) : (
        <EventsList onEventUpdate={refreshStats} />
      )}
    </div>
  );
}

export default function EventsPage() {
  return <EventsPageContent />;
}
