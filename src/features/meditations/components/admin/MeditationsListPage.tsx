'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { useToast } from '@/core/hooks/use-toast';
import DeleteButton from '@/core/components/common/DeleteButton';
import { cn } from '@/core/utils/utils';
import Loading from '@/core/components/common/Loading';
import type { Meditation } from '../../types/meditations.types';
import { useAdminServices } from '@/core/services/admin/context';

export default function MeditationsListPage() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { meditations: meditationsService } = useAdminServices();

  const fetchMeditations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await meditationsService.list();
      setMeditations(data || []);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les méditations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [meditationsService, toast]);

  useEffect(() => {
    fetchMeditations().catch((error) => {
      console.error('Erreur lors du chargement des méditations:', error);
    });
  }, [fetchMeditations]);

  const togglePublished = async (meditation: Meditation) => {
    try {
      const updatedMeditation = await meditationsService.togglePublished(
        meditation.id,
        meditation.published,
      );

      setMeditations((prev) =>
        prev.map((m) => (m.id === meditation.id ? updatedMeditation : m)),
      );

      toast({
        title: 'Succès',
        description: `Méditation ${meditation.published ? 'masquée' : 'publiée'}`,
      });
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de modifier la méditation',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMeditation = (meditationId: string) => {
    return async () => {
      await fetchMeditations();
    };
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des méditations</h1>
        <Link href="/admin/meditations/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle méditation
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Dernière modification</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meditations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Aucune méditation trouvée
                </TableCell>
              </TableRow>
            ) : (
              meditations.map((meditation) => (
                <TableRow key={meditation.id}>
                  <TableCell className="font-medium">{meditation.title}</TableCell>
                  <TableCell>
                    {new Date(meditation.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    {new Date(meditation.updated_at || meditation.created_at).toLocaleDateString(
                      'fr-FR',
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        meditation.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800',
                      )}
                    >
                      {meditation.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => togglePublished(meditation)}>
                      {meditation.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Link href={`/admin/meditations/${meditation.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteButton
                      id={Number(meditation.id)}
                      title={meditation.title}
                      onDelete={handleDeleteMeditation(meditation.id)}
                      type="meditation"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
