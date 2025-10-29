'use client';

import { useState, FormEvent } from 'react';
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { Alert, AlertDescription } from "@/core/components/ui/alert";
import { useToast } from "@/core/hooks/use-toast";
import { useAdminServices } from '@/core/services/admin/context';

interface YouTubeFormProps {
  onSuccess?: (predication: any) => void;
}

export default function YouTubeForm({ onSuccess }: YouTubeFormProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { predications: predicationsService } = useAdminServices();


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
    
      try {
        const predication = await predicationsService.addFromYoutubeUrl(url);
      toast({
        title: "Succès !",
        description: "La prédication a été ajoutée avec succès",
      });
      setUrl('');
      if (onSuccess && predication) {
        onSuccess(predication);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div>
        <Label htmlFor="youtube-url">URL YouTube</Label>
        <div className="mt-1 space-y-2">
          <Input
            id="youtube-url"
            type="url"
            placeholder="https://youtube.com/watch?v=... ou https://youtu.be/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <p className="text-sm text-gray-500">
            Formats acceptés : youtube.com/watch?v=xxx ou youtu.be/xxx
          </p>
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
        {isLoading ? "Ajout en cours..." : "Ajouter la prédication"}
      </Button>
    </form>
  );
}
