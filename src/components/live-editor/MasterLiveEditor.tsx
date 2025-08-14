import React, { useState, useCallback, useRef } from "react";
import { useLiveEditor } from "./LiveEditorProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Save, 
  Smartphone, 
  Monitor, 
  Palette, 
  Wrench, 
  Undo2, 
  Redo2, 
  Send, 
  LogOut,
  Eye,
  Edit3,
  Settings,
  Layers
} from "lucide-react";
import { createPortal } from "react-dom";
import CreativeWorkshopModal from "./CreativeWorkshopModal";
import { ContextualPropertyPanel } from "./ContextualPropertyPanel";
import { DesignStudioPanel } from "./design-studio/DesignStudioPanel";

const MasterLiveEditor: React.FC = () => {
  const { 
    isAdmin, 
    editMode, 
    setEditMode, 
    pendingBlocks, 
    selectedComponent,
    canUndo,
    canRedo,
    undo,
    redo,
    saveDraft,
    publishChanges,
    exitEditMode
  } = useLiveEditor();
  
  const [mobilePreview, setMobilePreview] = useState(false);
  const [openWorkshop, setOpenWorkshop] = useState(false);
  const [showDesignStudio, setShowDesignStudio] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // Efeito de mobile preview
  React.useEffect(() => {
    const cls = "live-editor-mobile";
    if (mobilePreview) {
      document.documentElement.classList.add(cls);
    } else {
      document.documentElement.classList.remove(cls);
    }
  }, [mobilePreview]);

  if (!isAdmin) return null;

  const FloatingMasterControls = () => (
    <div className={`fixed z-[1000] transition-all duration-300 ${
      isCompact 
        ? "bottom-6 right-6 w-14" 
        : "bottom-6 right-6 min-w-80"
    }`}>
      <Card className="shadow-2xl border-2 bg-card/95 backdrop-blur-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-primary" />
              {!isCompact && "Editor ao Vivo"}
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsCompact(!isCompact)}
            >
              {isCompact ? <Layers className="h-4 w-4" /> : <Settings className="h-4 w-4" />}
            </Button>
          </div>
        </CardHeader>
        
        {!isCompact && (
          <CardContent className="space-y-4">
            {/* Status Section */}
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${editMode ? 'bg-green-500' : 'bg-gray-400'}`} />
                <span className="text-sm font-medium">
                  {editMode ? 'Modo Edição' : 'Modo Visualização'}
                </span>
              </div>
              <Button 
                size="sm" 
                variant={editMode ? "default" : "secondary"}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? <Eye className="h-4 w-4 mr-1" /> : <Edit3 className="h-4 w-4 mr-1" />}
                {editMode ? 'Visualizar' : 'Editar'}
              </Button>
            </div>

            {editMode && (
              <>
                {/* Controls Row 1: History */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={undo} disabled={!canUndo}>
                    <Undo2 className="h-4 w-4 mr-1" />
                    Desfazer
                  </Button>
                  <Button size="sm" variant="outline" onClick={redo} disabled={!canRedo}>
                    <Redo2 className="h-4 w-4 mr-1" />
                    Refazer
                  </Button>
                </div>

                {/* Controls Row 2: Preview & Studio */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setMobilePreview(!mobilePreview)}
                  >
                    {mobilePreview ? <Monitor className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
                  </Button>
                  <Button 
                    size="sm" 
                    variant={showDesignStudio ? "default" : "outline"}
                    onClick={() => setShowDesignStudio(!showDesignStudio)}
                  >
                    <Palette className="h-4 w-4 mr-1" />
                    Studio
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setOpenWorkshop(true)}
                  >
                    <Wrench className="h-4 w-4 mr-1" />
                    Oficina
                  </Button>
                </div>

                {/* Controls Row 3: Save & Publish */}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={saveDraft}>
                    <Save className="h-4 w-4 mr-1" />
                    Salvar
                  </Button>
                  <Button size="sm" variant="default" onClick={publishChanges}>
                    <Send className="h-4 w-4 mr-1" />
                    Publicar
                  </Button>
                </div>

                {/* Exit */}
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={exitEditMode}
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair do Editor
                </Button>
              </>
            )}

            {/* Status Indicators */}
            {(pendingBlocks.length > 0 || selectedComponent) && (
              <div className="space-y-2">
                {pendingBlocks.length > 0 && (
                  <Badge variant="secondary" className="w-full justify-center">
                    {pendingBlocks.length} blocos pendentes
                  </Badge>
                )}
                {selectedComponent && (
                  <Badge variant="default" className="w-full justify-center">
                    {selectedComponent.type} selecionado
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );

  return createPortal(
    <>
      <FloatingMasterControls />
      
      {/* Design Studio Panel */}
      {showDesignStudio && (
        <DesignStudioPanel onClose={() => setShowDesignStudio(false)} />
      )}
      
      {/* Property Panel */}
      <ContextualPropertyPanel />
      
      {/* Creative Workshop Modal */}
      <CreativeWorkshopModal 
        open={openWorkshop} 
        onOpenChange={setOpenWorkshop} 
      />
    </>,
    document.body
  );
};

export default MasterLiveEditor;