import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Loading from '@/components/ui/Loading';
interface CelebrationFormData {
  lieu: string;
  adresse: string;
  horaire: string;
  jour: string;
}

interface CelebrationEditFormProps {
  celebrationId: number;
  onSuccess?: () => void;
}

const JOURS = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi'
] as const;

export default function CelebrationEditForm({ celebrationId, onSuccess }: CelebrationEditFormProps) {
  const [formData, setFormData] = useState<CelebrationFormData>({
    lieu: '',
    adresse: '',
    horaire: '',
    jour: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchCelebration = async () => {
      const { data, error } = await supabase
        .from('celebrations')
        .select('*')
        .eq('id', celebrationId)
        .single();

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données de la célébration",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setFormData({
          lieu: data.lieu,
          adresse: data.adresse,
          horaire: data.horaire,
          jour: data.jour
        });
      }
    };

    fetchCelebration();
  }, [celebrationId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('celebrations')
        .update({
          lieu: formData.lieu,
          adresse: formData.adresse,
          horaire: formData.horaire,
          jour: formData.jour
        })
        .eq('id', celebrationId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "La célébration a été mise à jour avec succès",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la célébration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <Label htmlFor="lieu">Lieu</Label>
          <Input
            id="lieu"
            value={formData.lieu}
            onChange={(e) => setFormData(prev => ({ ...prev, lieu: e.target.value }))}
            required
            placeholder="Ex: Église Saint-Michel"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="adresse">Adresse</Label>
          <Input
            id="adresse"
            value={formData.adresse}
            onChange={(e) => setFormData(prev => ({ ...prev, adresse: e.target.value }))}
            required
            placeholder="Ex: 123 rue de la Paix"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="horaire">Horaire</Label>
          <Input
            id="horaire"
            value={formData.horaire}
            onChange={(e) => setFormData(prev => ({ ...prev, horaire: e.target.value }))}
            required
            placeholder="Ex: 10:30"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jour">Jour</Label>
          <Select
            value={formData.jour}
            onValueChange={(value) => setFormData(prev => ({ ...prev, jour: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un jour" />
            </SelectTrigger>
            <SelectContent>
              {JOURS.map((jour) => (
                <SelectItem key={jour} value={jour}>
                  {jour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? <Loading/> : "Mettre à jour"}
        </Button>
      </div>
    </form>
  );
}