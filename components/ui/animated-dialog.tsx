"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface AnimatedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const variants = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },
  
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  }


export function AnimatedDialog({
  open,
  onOpenChange,
  children,
  title,
  className
}: AnimatedDialogProps) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="p-0 border-none bg-transparent">
            <motion.div
              className={`fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%] duration-200 ${className}`}
              initial="initial"
              animate="animate"
              exit="exit"
          
            >
              <div className="bg-background rounded-lg border shadow-lg">
                <DialogHeader className="flex flex-row justify-between items-center p-6 border-b">
                  {title && (
                    <DialogTitle className="text-xl md:text-2xl font-semibold">
                      {title}
                    </DialogTitle>
                  )}
                  <DialogClose className="h-6 w-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <X className="h-5 w-5" />
                  </DialogClose>
                </DialogHeader>
                <div className="px-6 py-4">
                  {children}
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}