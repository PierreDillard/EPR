// app/admin/events/page.tsx
'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Calendar, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import EventForm from './event-form';
import EventsList from './events-list';

export default function EventsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 my-3">Événements</h1>
          <p className="mt-2 text-gray-600">Gérez les événements et ajoutez de nouveaux contenus</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un événement
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total événements</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">À venir</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Ce mois</p>
              <p className="text-2xl font-semibold">0</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Formulaire ou Liste */}
      {showForm ? (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Nouvel événement</h2>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Retour à la liste
            </Button>
          </div>
          <EventForm onSuccess={() => setShowForm(false)} />
        </Card>
      ) : (
        <EventsList />
      )}
    </div>
  );
}