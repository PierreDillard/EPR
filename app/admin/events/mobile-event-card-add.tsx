
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,  
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventForm from './event-form/EventForm';

interface MobileEventAddProps {
  onUpdate: () => Promise<void>;
}

export default function MobileEventAdd({ onUpdate }: MobileEventAddProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-full flex justify-center items-center gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un événement
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom"    className="h-[95vh] overflow-hidden flex flex-col rounded-t-xl"
      >
        <SheetHeader>
          <SheetTitle>Nouvel événement</SheetTitle>
          <SheetDescription>
            Remplissez le formulaire ci-dessous pour créer un nouvel événement. Tous les champs marqués d&apos;un astérisque (*) sont obligatoires.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 overflow-y-auto pr-6">
          <EventForm 
            onSuccess={async () => {
              await onUpdate();
              const closeButton = document.querySelector('button[type="button"][aria-label="Close"]');
              if (closeButton instanceof HTMLButtonElement) {
                closeButton.click();
              }
            }} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}