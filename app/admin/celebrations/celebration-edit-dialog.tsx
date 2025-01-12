import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import CelebrationEditForm from './celebration-edit-form';

interface CelebrationEditDialogProps {
  celebrationId: number;
  onSuccess?: () => void;
}

export default function CelebrationEditDialog({ 
  celebrationId, 
  onSuccess 
}: CelebrationEditDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit2 className="h-4 w-4 mr-2" />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier la célébration</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de la célébration. Cliquez sur 
            sauvegarder une fois terminé.
          </DialogDescription>
        </DialogHeader>
        <CelebrationEditForm 
          celebrationId={celebrationId} 
          onSuccess={handleSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}