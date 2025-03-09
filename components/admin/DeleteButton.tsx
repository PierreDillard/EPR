import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteMeditation } from '@/lib/meditations';

interface DeleteButtonProps {
  id: number;
  title?: string;
  onDelete: () => void;
  type?: string;
}

export default function DeleteButton({ id, title, onDelete, type = 'predication' }: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const getTypeLabel = () => {
    switch (type) {
      case 'meditation':
        return 'la méditation';
      case 'predication':
      default:
        return 'la prédication';
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (type === 'meditation') {
        await deleteMeditation(id.toString());
        toast({
          title: "Succès !",
          description: "La méditation a été supprimée avec succès",
        });
      } else {
        const response = await fetch(`/api/admin/predications?id=${id}`, {
          method: 'DELETE',
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression');
        }

        toast({
          title: "Succès !",
          description: "La prédication a été supprimée avec succès",
        });
      }
      
      onDelete();
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: `Impossible de supprimer ${getTypeLabel()}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" disabled={isLoading}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer {getTypeLabel()} {title && `"${title}"`}. 
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}