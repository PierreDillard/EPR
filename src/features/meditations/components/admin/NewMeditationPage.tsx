'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EventImageUpload from '@/components/admin/EventImageUpload';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { useToast } from '@/core/hooks/use-toast';
import dynamic from 'next/dynamic';
import { uploadEventImage } from '@/core/services/storage/UploadService';
import { useAdminServices } from '@/core/services/admin/context';

const DynamicMeditationEditor = dynamic(
  () => import('@/components/admin/editor/MeditationEditor').then((mod) => mod.MeditationEditor),
  {
    ssr: false,
    loading: () => <div className="h-[400px] border rounded-lg bg-gray-50 animate-pulse" />,
  },
);

export default function NewMeditationPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | File | undefined>(undefined);
  const { meditations: meditationsService } = useAdminServices();

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
      let finalImageUrl;

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
      } else if (typeof selectedImage === 'string') {
        finalImageUrl = selectedImage;
      }

      await meditationsService.create({
        title: title.trim(),
        content,
        image_url: finalImageUrl,
        published: false,
      });

      toast({
        title: 'Succès',
        description: 'Méditation créée avec succès',
      });

      router.push('/admin/meditations');
      router.refresh();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la méditation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Nouvelle méditation</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => router.push('/admin/meditations')} disabled={loading}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Création...' : 'Créer'}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
          <EventImageUpload onImageChange={handleImageChange} eventType="meditation" currentImage={undefined} />
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
          <DynamicMeditationEditor initialContent="" onSave={async (newContent) => setContent(newContent)} />
        </div>
      </div>
    </div>
  );
}
