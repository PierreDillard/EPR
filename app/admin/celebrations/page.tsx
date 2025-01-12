'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Card } from "@/components/ui/card";
import CelebrationEditDialog from '@/app/admin/celebrations/celebration-edit-dialog';
import MobileCelebrationCard from './mobile-celebration-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MapPin, Clock, Calendar } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface Celebration {
  id: number;
  lieu: string;
  adresse: string;
  horaire: string;
  jour: string;
}

export default function CelebrationsPage() {
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const loadCelebrations = async () => {
    const { data, error } = await supabase
      .from('celebrations')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Erreur lors du chargement des célébrations:', error);
      return;
    }

    setCelebrations(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCelebrations();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-48">
      Chargement des célébrations...
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