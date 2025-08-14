import React, { useCallback, useState } from "react";
import { useLiveEditor } from "./LiveEditorProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PropertyControlProps {
  name: string;
  value: any;
  type: string;
  options?: string[];
  onChange: (value: any) => void;
}

const PropertyControl: React.FC<PropertyControlProps> = ({ name, value, type, options, onChange }) => {
  switch (type) {
    case "string":
    case "text":
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{name}</Label>
          <Input
            id={name}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Digite ${name}...`}
          />
        </div>
      );
    
    case "textarea":
    case "longtext":
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{name}</Label>
          <Textarea
            id={name}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Digite ${name}...`}
            rows={3}
          />
        </div>
      );
    
    case "boolean":
      return (
        <div className="flex items-center space-x-2">
          <Switch
            id={name}
            checked={Boolean(value)}
            onCheckedChange={onChange}
          />
          <Label htmlFor={name}>{name}</Label>
        </div>
      );
    
    case "select":
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{name}</Label>
          <Select value={value || ""} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder={`Selecione ${name}...`} />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    
    case "color":
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{name}</Label>
          <div className="flex gap-2">
            <Input
              id={name}
              type="color"
              value={value || "#000000"}
              onChange={(e) => onChange(e.target.value)}
              className="w-16 h-10"
            />
            <Input
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Código da cor"
            />
          </div>
        </div>
      );
    
    case "number":
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{name}</Label>
          <Input
            id={name}
            type="number"
            value={value || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder={`Digite ${name}...`}
          />
        </div>
      );
    
    default:
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{name}</Label>
          <Input
            id={name}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Digite ${name}...`}
          />
        </div>
      );
  }
};

// Component schema definitions organized by sections
const getComponentSchema = (type: string) => {
  const schemas: Record<string, {
    content?: Record<string, { type: string; options?: string[] }>;
    design?: Record<string, { type: string; options?: string[] }>;
    advanced?: Record<string, { type: string; options?: string[] }>;
  }> = {
    "Button": {
      content: {
        text: { type: "text" },
        disabled: { type: "boolean" }
      },
      design: {
        variant: { type: "select", options: ["default", "destructive", "outline", "secondary", "ghost", "link"] },
        size: { type: "select", options: ["default", "sm", "lg", "icon"] }
      },
      advanced: {
        className: { type: "text" }
      }
    },
    "Card": {
      content: {
        title: { type: "text" },
        description: { type: "textarea" }
      },
      advanced: {
        className: { type: "text" }
      }
    },
    "HeroSection": {
      content: {
        title: { type: "text" },
        subtitle: { type: "text" },
        description: { type: "textarea" },
        primaryCtaLabel: { type: "text" },
        primaryCtaTo: { type: "text" },
        secondaryCtaLabel: { type: "text" },
        secondaryCtaTo: { type: "text" }
      },
      design: {
        backgroundImage: { type: "text" }
      }
    },
    "Section": {
      content: {
        title: { type: "text" },
        subtitle: { type: "text" }
      },
      design: {
        variant: { type: "select", options: ["default", "muted", "primary", "accent"] },
        backgroundColor: { type: "color" },
        textColor: { type: "color" }
      },
      advanced: {
        className: { type: "text" }
      }
    },
    "RichImageCard": {
      content: {
        title: { type: "text" },
        subtitle: { type: "text" },
        alt: { type: "text" }
      },
      design: {
        image: { type: "text" }
      },
      advanced: {
        className: { type: "text" }
      }
    },
    "Image": {
      content: {
        alt: { type: "text" }
      },
      design: {
        src: { type: "text" },
        loading: { type: "select", options: ["lazy", "eager"] }
      },
      advanced: {
        className: { type: "text" }
      }
    },
    "StatsCard": {
      content: {
        value: { type: "text" },
        label: { type: "text" }
      },
      advanced: {
        className: { type: "text" }
      }
    },
    "FeatureCard": {
      content: {
        title: { type: "text" },
        description: { type: "textarea" }
      },
      advanced: {
        className: { type: "text" }
      }
    },
    "Carousel": {
      content: {
        itemCount: { type: "number" }
      },
      design: {
        autoplay: { type: "boolean" },
        loop: { type: "boolean" }
      },
      advanced: {
        className: { type: "text" }
      }
    }
  };

  return schemas[type] || {
    content: {
      children: { type: "textarea" }
    },
    advanced: {
      className: { type: "text" }
    }
  };
};

export const ContextualPropertyPanel: React.FC = () => {
  const { selectedComponent, setSelectedComponent, saveComponentProps } = useLiveEditor();
  const { toast } = useToast();
  const [localProps, setLocalProps] = useState<Record<string, any>>({});

  React.useEffect(() => {
    if (selectedComponent) {
      setLocalProps(selectedComponent.props || {});
    } else {
      setLocalProps({});
    }
  }, [selectedComponent]);

  const handlePropChange = useCallback((propName: string, value: any) => {
    const updatedProps = {
      ...localProps,
      [propName]: value
    };
    setLocalProps(updatedProps);
    
    // Immediately update the component in real-time
    if (selectedComponent && selectedComponent.onPropsChange) {
      selectedComponent.onPropsChange(updatedProps);
    }
  }, [localProps, selectedComponent]);

  const handleSave = useCallback(async () => {
    if (!selectedComponent) return;
    
    try {
      // Update local component props
      selectedComponent.onPropsChange?.(localProps);
      
      // Save to database if component has persistence
      await saveComponentProps?.(selectedComponent.id, localProps);
      
      toast({
        title: "Propriedades salvas",
        description: "As alterações foram aplicadas com sucesso."
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
    }
  }, [selectedComponent, localProps, saveComponentProps, toast]);

  const handleClose = useCallback(() => {
    setSelectedComponent(null);
    setLocalProps({});
  }, [setSelectedComponent]);

  if (!selectedComponent) return null;

  const schema = getComponentSchema(selectedComponent.type);

  const renderSection = (sectionName: string, properties: Record<string, { type: string; options?: string[] }>) => {
    if (!properties || Object.keys(properties).length === 0) return null;
    
    return (
      <div className="space-y-3">
        {Object.entries(properties).map(([propName, config]) => (
          <PropertyControl
            key={propName}
            name={propName}
            value={localProps[propName]}
            type={config.type}
            options={config.options}
            onChange={(value) => handlePropChange(propName, value)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border z-[1000]">
      <Card className="h-full rounded-none border-0 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
          <CardTitle className="text-lg">Editar {selectedComponent.type}</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <CardContent className="space-y-4 pb-6">
              <div className="text-sm text-muted-foreground">
                ID: {selectedComponent.id}
              </div>
              
              <Accordion type="multiple" defaultValue={["content", "design"]} className="w-full">
                {schema.content && (
                  <AccordionItem value="content">
                    <AccordionTrigger>Conteúdo</AccordionTrigger>
                    <AccordionContent>
                      {renderSection("content", schema.content)}
                    </AccordionContent>
                  </AccordionItem>
                )}
                
                {schema.design && (
                  <AccordionItem value="design">
                    <AccordionTrigger>Design</AccordionTrigger>
                    <AccordionContent>
                      {renderSection("design", schema.design)}
                    </AccordionContent>
                  </AccordionItem>
                )}
                
                {schema.advanced && (
                  <AccordionItem value="advanced">
                    <AccordionTrigger>Avançado</AccordionTrigger>
                    <AccordionContent>
                      {renderSection("advanced", schema.advanced)}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>

              <div className="pt-4 border-t">
                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </CardContent>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
};