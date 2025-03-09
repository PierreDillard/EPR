'use client'
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import DeleteButton from '@/components/admin/DeleteButton';
import { cn } from "@/lib/utils/utils";
import Loading from '@/components/ui/Loading';
import { getMeditations, toggleMeditationPublished } from '@/lib/meditations';
import type { Meditation } from '@/types/meditations';

export default function AdminMeditations() {
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const fetchMeditations = async () => {
    try {
      setLoading(true);
      const data = await getMeditations();
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
  };

  useEffect(() => {
    fetchMeditations();
  }, []);

  const togglePublished = async (meditation: Meditation) => {
    try {
      const updatedMeditation = await toggleMeditationPublished(meditation.id, meditation.published);
      
      setMeditations(meditations.map(m => 
        m.id === meditation.id ? updatedMeditation : m
      ));

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
      await fetchMeditations(); // Rafraîchir la liste après suppression
    };
  };

  if (loading) {
    return <Loading/>;
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
                    {new Date(meditation.updated_at || meditation.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        meditation.published
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      {meditation.published ? 'Publié' : 'Brouillon'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublished(meditation)}
                    >
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