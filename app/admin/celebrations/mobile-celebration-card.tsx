import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Calendar, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import CelebrationEditForm from './celebration-edit-form';

interface CelebrationCardProps {
  celebration: {
    id: number;
    lieu: string;
    adresse: string;
    horaire: string;
    jour: string;
  };
  onUpdate: () => void;
}

export default function MobileCelebrationCard({ celebration, onUpdate }: CelebrationCardProps) {
  return (
    <Sheet>
      <SheetTrigger className="w-full">
        <Card className="w-full hover:bg-gray-50 transition-colors cursor-pointer">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="font-semibold text-lg">{celebration.lieu}</h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{celebration.adresse}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{celebration.jour}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{celebration.horaire}</span>
                  </div>
                </div>
              </div>
              
              <ChevronRight className="h-5 w-5 text-gray-400 mt-2" />
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent side="bottom" className="h-[90%] rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Modifier la célébration</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <CelebrationEditForm 
            celebrationId={celebration.id}
            onSuccess={onUpdate}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}