/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import YouTubeForm from './youtube-form';
import { Card } from "@/components/ui/card";
import { Plus, Youtube, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Loading from '@/components/ui/Loading';
import DeleteButton from '@/components/admin/DeleteButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchPredications, deletePredicationById, Predication } from '@/app/admin/actions/predications';

export default function PredicationsPage() {
  const [predications, setPredications] = useState<Predication[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger prédications
  useEffect(() => {
    const loadPredications = async () => {
      try {
        const data = await fetchPredications(); // data est de type VideoProps[]
  
        // Adapter les données pour qu'elles correspondent à Predication[]
        const formattedData: Predication[] = data.map(video => ({
          id: Number(video.id), // Convert id to number
          video_id: video.id, // Assuming video.id can be used as video_id
          youtube_id: video.id,
          titre: video.title,
          date: video.date,
          miniature: video.thumbnail,
          description: video.description || "", // Valeur par défaut
          duration: video.duration || "",       // Valeur par défaut
          created_at: new Date().toISOString(), // Ou utilisez une valeur réelle
        }));
  
        setPredications(formattedData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    loadPredications();
  }, []);
  

    // Ajouter une nouvelle prédication
    const handleAddPredication = (newPredication: Predication) => {
      setPredications(prev => [newPredication, ...prev]);
    };

  // Supprimer une prédication
  const handleDelete = async (id: number) => {
    try {
      await deletePredicationById(id);
      setPredications(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Calculer le nombre de prédications de ce mois
  const predicationsThisMonth = predications.filter(p => 
    new Date(p.created_at).getMonth() === new Date().getMonth()
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 my-3">Prédications</h1>
          <p className="mt-2 text-gray-600">Gérez les prédications et ajoutez de nouveaux contenus</p>
        </div>
        <div className="flex items-center gap-4">
          <Button className="gap-2">
            <Plus className="h-4 w-auto" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Youtube className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total prédications</p>
              <p className="text-2xl font-semibold">{predications.length}</p>
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
              <p className="text-2xl font-semibold">{predicationsThisMonth}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
      <YouTubeForm onSuccess={handleAddPredication} />
      </Card>

      <Card className="overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Prédications récentes</h2>
          <p className="text-sm text-gray-600 mt-1">
            Liste de toutes les prédications par date d'ajout
          </p>
        </div>

        <div className="overflow-x-auto my-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Miniature</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Date d'ajout</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <Loading />
                  </TableCell>
                </TableRow>
              ) : predications.map(predication => (
                <TableRow key={predication.id}>
                  <TableCell>
                    {predication.miniature && (
                      <div className="relative w-24 h-16 rounded-md overflow-hidden">
                        <Image
                          src={predication.miniature}
                          alt={predication.titre}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{predication.titre}</TableCell>
                  <TableCell>
                    {new Date(predication.created_at).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteButton
                      id={predication.id}
                      title={predication.titre}
                      onDelete={() => handleDelete(predication.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
