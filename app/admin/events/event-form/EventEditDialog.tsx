import { useState } from "react";
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
import EventForm from './EventForm';
import { EventType } from "@/types/event";
interface EventEditDialogProps {
  eventId: string;
  initialData: {

    title: string;

    date: string;

    time: string;

    location: string;

    speaker?: string;
    image: string;

    type: EventType;

    description?: string;      // Ajouté
    contact_email?: string;    // Ajouté
    contact_telephone?: string; 
  };
  onSuccess?: () => void;
}

export default function EventEditDialog({ eventId, initialData, onSuccess }: EventEditDialogProps) {
  const [open, setOpen] = useState(false);

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
 
      <DialogContent className="sm:max-w-[800px] w-11/12 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier l&apos;événement</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de l&apos;événement. Cliquez sur
            &quot;Sauvegarder&quot; une fois terminé.
          </DialogDescription>
        </DialogHeader>
        <EventForm eventId={eventId} onSuccess={handleSuccess}  initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
}
