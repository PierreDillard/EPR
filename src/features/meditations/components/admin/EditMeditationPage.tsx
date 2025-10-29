'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EventImageUpload from '@/components/admin/EventImageUpload';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { useToast } from '@/core/hooks/use-toast';
import dynamic from 'next/dynamic';
import { uploadEventImage } from '@/core/services/storage/UploadService';
import Loading from '@/core/components/common/Loading';
import { useAdminServices } from '@/core/services/admin/context';

const DynamicMeditationEditor = dynamic(
  () => import('@/components/admin/editor/MeditationEditor').then((mod) => mod.MeditationEditor),
  {
    ssr: false,
    loading: () => <div className="h-[400px] border rounded-lg bg-gray-50 animate-pulse" />,
  },
);

interface EditMeditationPageProps {
  meditationId: string;
}

export default function EditMeditationPage({ meditationId }: EditMeditationPageProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | File | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [isLoadingMeditation, setIsLoadingMeditation] = useState(true);
  const router = useRouter();
  const { toast } = useToast();
  const { meditations: meditationsService } = useAdminServices();

  useEffect(() => {
    let isMounted = true;

    async function loadMeditation() {
      try {
        setIsLoadingMeditation(true);
        const meditation = await meditationsService.get(meditationId);
        if (isMounted) {
          setTitle(meditation.title || '');
          setContent(meditation.content || '');
          setSelectedImage(meditation.image_url || undefined);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la méditation:', error);
        if (isMounted) {
          toast({
            title: 'Erreur',
            description: 'Impossible de charger la méditation',
            variant: 'destructive',
          });
          router.push('/admin/meditations');
        }
      } finally {
        if (isMounted) {
          setIsLoadingMeditation(false);
        }
      }
    }

    if (meditationId) {
      loadMeditation();
    }

    return () => {
      isMounted = false;
    };
  }, [meditationId, router, toast, meditationsService]);

  const handleImageChange = (image: string | File) => {
    setSelectedImage(image);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast({
        title: 'Erreur',
        description: 'Le titre est requis',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      let finalImageUrl = typeof selectedImage === 'string' ? selectedImage : undefined;

      if (selectedImage instanceof File) {
        try {
          finalImageUrl = await uploadEventImage(selectedImage);
        } catch (error) {
          toast({
            title: "Erreur d'upload",
            description: "Impossible d'uploader l'image.",
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
      }

      await meditationsService.update(meditationId, {
        title: title.trim(),
        content,
        image_url: finalImageUrl,
      });

      toast({
        title: 'Succès',
        description: 'Méditation mise à jour avec succès',
      });

      router.push('/admin/meditations');
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour la méditation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingMeditation) {
    return <Loading />;
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Modifier la méditation</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => router.push('/admin/meditations')} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <EventImageUpload
            onImageChange={handleImageChange}
            eventType="meditation"
            currentImage={typeof selectedImage === 'string' ? selectedImage : undefined}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de la méditation"
            className="max-w-xl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
          <DynamicMeditationEditor initialContent={content} onSave={async (newContent) => setContent(newContent)} />
        </div>
      </div>
    </div>
  );
}
