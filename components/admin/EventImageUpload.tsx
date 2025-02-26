import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { EventType } from '@/types/event';
import Image from 'next/image';
import { ImagePlus, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { getDefaultEventImage } from '@/utils/event';

interface EventImageUploadProps {
  eventType: EventType;
  onImageChange: (imageUrl: string | File) => void;
  currentImage?: string;
}

export default function EventImageUpload({ 
  eventType, 
  onImageChange, 
  currentImage 
}: EventImageUploadProps) {  
  
  const [useDefaultImage, setUseDefaultImage] = useState(() => {
  const defaultImage = getDefaultEventImage(eventType);
  return !currentImage || currentImage === defaultImage;
});
const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
  return currentImage || null;
});
  const [error, setError] = useState<string | null>(null);

  const defaultImage = getDefaultEventImage(eventType);

  useEffect(() => {
    if (currentImage && currentImage !== defaultImage) {
      setPreviewUrl(currentImage);
      setUseDefaultImage(false);
    }
  }, [currentImage, defaultImage]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      // Créer une URL de prévisualisation locale
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      
      // Passer le fichier au composant parent pour l'upload ultérieur
      onImageChange(file);
      setUseDefaultImage(false);
      setError(null);
    } catch (error) {
      setError('Erreur lors de la prévisualisation de l\'image');
      console.error('Preview error:', error);
    }
  }, [onImageChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 1024 * 1024, // 1MB
    multiple: false
  });

  const handleToggleDefaultImage = (checked: boolean) => {
    setUseDefaultImage(checked);
    if (checked) {
      setPreviewUrl(null);
      onImageChange(defaultImage);
    }
  };

  
  useEffect(() => {
    return () => {
 
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);


  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="use-default-image"
          checked={useDefaultImage}
          onCheckedChange={handleToggleDefaultImage}
        />
        <Label htmlFor="use-default-image">
          Utiliser l&apos;image par défaut pour ce type d&apos;événement
        </Label>
      </div>

      {!useDefaultImage && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
        >
          <input {...getInputProps()} />
          
          {previewUrl ? (
            <div className="relative w-full h-72">
              <Image
                 src={previewUrl || ''}
                alt="Prévisualisation"
                fill
                className="object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setUseDefaultImage(true);
                  if (previewUrl !== currentImage) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  setPreviewUrl(null);
                  onImageChange(defaultImage);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <ImagePlus className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600">
                Glissez une image ici ou cliquez pour sélectionner
              </p>
              <p className="text-xs text-gray-400 mt-2">
                JPG, PNG ou WEBP jusqu&apos;à 1MB
              </p>
            </div>
          )}
        </div>
      )}

      {useDefaultImage && previewUrl &&  (
        <div className="relative w-full h-72">
          <Image
             src={previewUrl || ''}
            alt="Prévisualisation"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}