'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from "@/core/components/ui/card";
import CelebrationEditDialog from '../../admin/celebrations/celebration-edit-dialog';
import MobileCelebrationCard from './mobile-celebration-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/components/ui/table";
import { MapPin, Clock, Calendar } from 'lucide-react';
import { useMediaQuery } from '@/core/hooks/use-media-query';
import Loading from '@/core/components/common/Loading';
import { useAdminServices } from '@/core/services/admin/context';
import type { Celebration } from '@/features/celebrations/types/celebrations.types';

export default function CelebrationsPage() {
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { celebrations: celebrationsService } = useAdminServices();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const loadCelebrations = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await celebrationsService.list();
      setCelebrations(data);
    } catch (error) {
      console.error('Erreur lors du chargement des célébrations:', error);
    } finally {
      setIsLoading(false);
    }
  }, [celebrationsService]);

  useEffect(() => {
    loadCelebrations().catch((error) => {
      console.error('Erreur lors du chargement initial des célébrations:', error);
    });
  }, [loadCelebrations]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-48">
     <Loading/>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des célébrations</h1>
      </div>

      {isMobile ? (
        // Vue mobile avec cards empilées
        <div className="space-y-4">
          {celebrations.map((celebration) => (
            <MobileCelebrationCard
              key={celebration.id}
              celebration={celebration}
              onUpdate={loadCelebrations}
            />
          ))}
        </div>
      ) : (
        // Vue desktop avec tableau
        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lieu</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Jour</TableHead>
                <TableHead>Horaire</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {celebrations.map((celebration) => (
                <TableRow key={celebration.id}>
                  <TableCell className="font-medium">{celebration.lieu}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {celebration.adresse}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {celebration.jour}
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {celebration.horaire}
                  </TableCell>
                  <TableCell className="text-right">
                    <CelebrationEditDialog
                      celebrationId={celebration.id}
                      onSuccess={loadCelebrations}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
