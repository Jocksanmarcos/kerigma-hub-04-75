import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CreativeToolsDashboard from "@/components/creative-studio/CreativeToolsDashboard";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreativeWorkshopModal: React.FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Oficina Criativa</DialogTitle>
        </DialogHeader>
        <div className="h-full overflow-auto">
          {/* Reutilizamos o dashboard existente dentro do modal */}
          <CreativeToolsDashboard />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreativeWorkshopModal;