/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import YouTubeForm from './youtube-form';
import { Card } from "@/components/ui/card";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Plus, Youtube, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

import DeleteButton from '@/components/admin/DeleteButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


interface Predication {
  id: number;
  titre: string;
  miniature: string;
  video_id: string;
  created_at: string;
}

export default function PredicationsPage() {
  const [predications, setPredications] = useState<Predication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  // Fonction pour charger les prédications
  const loadPredications = async () => {
    const { data, error } = await supabase
      .from('predications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur lors du chargement des prédications:', error);
      return;
    }

    setPredications(data || []);
    setIsLoading(false);
  };

  // Charger les prédications au montage du composant
  useEffect(() => {
    loadPredications();
  }, []);

  // Fonction pour mettre à jour la liste après un ajout
  const handlePredicationAdded = async (newPredication: Predication) => {
    setPredications(prev => [newPredication, ...prev]);
  };

  // Calculer le nombre de prédications de ce mois
  const predicationsThisMonth = predications.filter(p => 
    new Date(p.created_at).getMonth() === new Date().getMonth()
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      {/* En-tête */}
 


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

      {/* Statistiques */}
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

      {/* Formulaire d'ajout */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Youtube className="h-5 w-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold">Ajouter une nouvelle prédication</h2>
        </div>
        <YouTubeForm onSuccess={handlePredicationAdded} />
      </Card>

      {/* Liste des prédications */}
      <Card className="overflow-hidden ">
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
                    Chargement des prédications...
                  </TableCell>
                </TableRow>
              ) : predications.map((predication) => (
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
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={`https://youtube.com/watch?v=${predication.video_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          YouTube
                        </a>
                      </Button>
                      <DeleteButton
                        id={predication.id}
                        title={predication.titre}
                        onDelete={() => {
                          setPredications(prev => 
                            prev.filter(p => p.id !== predication.id)
                          );
                        }}
                      />
                    </div>
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