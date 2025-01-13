'use client';

import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface YouTubeFormProps {
  onSuccess?: (predication: any) => void;
}

export default function YouTubeForm({ onSuccess }: YouTubeFormProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Utiliser l'URL complète pour éviter les problèmes de routage
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || '';
      const response = await fetch(`${baseUrl}/admin/actions/predications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Ajouter un header personnalisé pour s'assurer que c'est une requête API
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include',
        body: JSON.stringify({ url }),
      });

      // Vérifier d'abord le type de contenu de la réponse
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // Si ce n'est pas du JSON, c'est probablement une erreur
        const text = await response.text();
        console.error('Réponse non-JSON reçue:', text);
        throw new Error('Réponse invalide du serveur');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'ajout de la prédication');
      }
      toast({
        title: "Succès !",
        description: "La prédication a été ajoutée avec succès",
      });
      setUrl('');
      if (onSuccess && data.data) {
        onSuccess(data.data);
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