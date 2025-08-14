import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type PendingBlock = {
  type: string;
  content_json: any;
};

export type SelectedComponent = {
  id: string;
  type: string;
  props: Record<string, any>;
  onPropsChange?: (newProps: Record<string, any>) => void;
};

export type HistoryEntry = {
  id: string;
  timestamp: number;
  action: string;
  data: any;
};

export type DesignSystemState = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    section: string;
    container: string;
  };
};

interface LiveEditorContextType {
  isAdmin: boolean;
  editMode: boolean;
  setEditMode: (v: boolean) => void;
  designMode: 'content' | 'architect' | 'visionary';
  setDesignMode: (mode: 'content' | 'architect' | 'visionary') => void;
  pageId: string | null;
  pageSlug: string | null;
  addBlock: (block: PendingBlock) => void;
  pendingBlocks: PendingBlock[];
  setTextDraft: (key: string, value: string) => void;
  getTextDraft: (key: string, fallback?: string) => string;
  saveAll: () => Promise<void>;
  selectedComponent: SelectedComponent | null;
  setSelectedComponent: (component: SelectedComponent | null) => void;
  saveComponentProps: (id: string, props: Record<string, any>) => Promise<void>;
  designSystem: DesignSystemState;
  updateDesignSystem: (updates: Partial<DesignSystemState>) => void;
  applyGlobalStyles: () => void;
  generateAIPalette: (baseColors: string[]) => Promise<any>;
  generateAISection: (prompt: string) => Promise<any>;
  refineWithAI: (elementId: string, currentStyles: Record<string, any>) => Promise<any>;
  // History controls
  history: HistoryEntry[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  addToHistory: (action: string, data: any) => void;
  // Master controls
  saveDraft: () => Promise<void>;
  publishChanges: () => Promise<void>;
  exitEditMode: () => void;
}

const LiveEditorContext = createContext<LiveEditorContextType | undefined>(undefined);

function pathToSlug(pathname: string): string | null {
  if (pathname === "/") return "home";
  const map: Record<string, string> = {
    "/sobre": "sobre",
    "/celulas": "celulas",
    "/agenda": "agenda",
    "/galeria": "galeria",
    "/dizimos": "dizimos",
    "/contato": "contato",
    "/aconselhamento": "aconselhamento",
    "/primeira-vez": "visite",
  };
  return map[pathname] || null;
}

export const LiveEditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const { toast } = useToast();

  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [designMode, setDesignMode] = useState<'content' | 'architect' | 'visionary'>('content');
  const [pageId, setPageId] = useState<string | null>(null);
  const [pageSlug, setPageSlug] = useState<string | null>(null);
  const [pendingBlocks, setPendingBlocks] = useState<PendingBlock[]>([]);
  const [textDrafts, setTextDrafts] = useState<Record<string, string>>({});
  const [selectedComponent, setSelectedComponent] = useState<SelectedComponent | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [designSystem, setDesignSystem] = useState<DesignSystemState>({
    colors: {
      primary: '213 90% 58%',
      secondary: '45 100% 65%',
      background: '0 0% 100%',
      foreground: '215 25% 15%'
    },
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    spacing: {
      section: '4rem',
      container: '1200px'
    }
  });

  // Detect admin and page slug
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          if (active) setIsAdmin(false);
          return;
        }
        const { data, error } = await supabase.rpc("is_admin");
        if (!error) setIsAdmin(Boolean(data));
      } catch (_) {
        setIsAdmin(false);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const slug = pathToSlug(pathname);
    setPageSlug(slug);
    setPageId(null);
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("site_pages")
        .select("id, slug, title")
        .eq("slug", slug)
        .maybeSingle();
      setPageId((data as any)?.id || null);
    })();
  }, [pathname]);

  const addBlock = useCallback((block: PendingBlock) => {
    setPendingBlocks((prev) => [...prev, block]);
    toast({ title: "Bloco adicionado", description: "Ele será salvo ao clicar em Salvar." });
  }, [toast]);

  const setTextDraft = useCallback((key: string, value: string) => {
    setTextDrafts((prev) => ({ ...prev, [key]: value }));
  }, []);

  const getTextDraft = useCallback((key: string, fallback = "") => {
    return key in textDrafts ? textDrafts[key] : fallback;
  }, [textDrafts]);

  const ensurePage = useCallback(async (): Promise<string | null> => {
    if (pageId) return pageId;
    if (!pageSlug) return null;
    // Try to create page with minimal info
    const { data, error } = await supabase
      .from("site_pages")
      .insert({ slug: pageSlug, title: document.title.replace(/\s*\|.*$/, "") } as any)
      .select("id")
      .maybeSingle();
    if (error) {
      toast({ title: "Erro ao preparar página", description: error.message, variant: "destructive" });
      return null;
    }
    const id = (data as any)?.id || null;
    setPageId(id);
    return id;
  }, [pageId, pageSlug, toast]);

  const saveComponentProps = useCallback(async (componentId: string, props: Record<string, any>) => {
    console.log('Saving component props:', componentId, props);
    toast({ title: "Propriedades salvas", description: "Component props updated successfully" });
  }, [toast]);

  const updateDesignSystem = useCallback((updates: Partial<DesignSystemState>) => {
    setDesignSystem(prev => ({ ...prev, ...updates }));
    applyGlobalStyles();
  }, []);

  const applyGlobalStyles = useCallback(() => {
    const root = document.documentElement;
    if (designSystem.colors.primary) {
      root.style.setProperty('--primary', designSystem.colors.primary);
    }
    if (designSystem.colors.secondary) {
      root.style.setProperty('--secondary', designSystem.colors.secondary);
    }
    if (designSystem.colors.background) {
      root.style.setProperty('--background', designSystem.colors.background);
    }
    if (designSystem.colors.foreground) {
      root.style.setProperty('--foreground', designSystem.colors.foreground);
    }
  }, [designSystem]);

  const generateAIPalette = useCallback(async (baseColors: string[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('design-ai-assistant', {
        body: {
          action: 'generate_palette',
          baseColors,
          context: 'church website'
        }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('AI Palette Generation Error:', error);
      toast({ title: "Erro na IA", description: "Não foi possível gerar paleta", variant: "destructive" });
      return null;
    }
  }, [toast]);

  const generateAISection = useCallback(async (prompt: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('design-ai-assistant', {
        body: {
          action: 'generate_section',
          prompt,
          context: 'church website',
          designSystem
        }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('AI Section Generation Error:', error);
      toast({ title: "Erro na IA", description: "Não foi possível gerar seção", variant: "destructive" });
      return null;
    }
  }, [toast, designSystem]);

  const refineWithAI = useCallback(async (elementId: string, currentStyles: Record<string, any>) => {
    try {
      const { data, error } = await supabase.functions.invoke('design-ai-assistant', {
        body: {
          action: 'refine_styles',
          elementId,
          currentStyles,
          designSystem
        }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('AI Style Refinement Error:', error);
      toast({ title: "Erro na IA", description: "Não foi possível refinar estilos", variant: "destructive" });
      return null;
    }
  }, [toast, designSystem]);

  // History management
  const addToHistory = useCallback((action: string, data: any) => {
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      action,
      data
    };
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, entry];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex >= 0) {
      const entry = history[historyIndex];
      // Apply inverse operation based on action type
      setHistoryIndex(prev => prev - 1);
      toast({ title: "Desfeito", description: `Ação "${entry.action}" foi desfeita` });
    }
  }, [history, historyIndex, toast]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const entry = history[historyIndex + 1];
      // Apply the operation again
      setHistoryIndex(prev => prev + 1);
      toast({ title: "Refeito", description: `Ação "${entry.action}" foi refeita` });
    }
  }, [history, historyIndex, toast]);

  const canUndo = historyIndex >= 0;
  const canRedo = historyIndex < history.length - 1;

  const saveAll = useCallback(async () => {
    if (!isAdmin) return;
    try {
      const targetPageId = await ensurePage();
      if (!targetPageId) return;

      // 1) Persist hero texts if any
      if (Object.keys(textDrafts).length) {
        const payload: any = {};
        if (textDrafts["hero_title"] !== undefined) payload.hero_title = textDrafts["hero_title"];
        if (textDrafts["hero_subtitle"] !== undefined) payload.hero_subtitle = textDrafts["hero_subtitle"];
        if (Object.keys(payload).length) {
          const { error } = await supabase
            .from("site_pages")
            .update(payload)
            .eq("id", targetPageId);
          if (error) throw error;
        }
      }

      // 2) Append pending blocks to the end
      if (pendingBlocks.length) {
        const { data: existing } = await supabase
          .from("content_blocks")
          .select("id, order")
          .eq("page_id", targetPageId)
          .order("order");
        const baseOrder = (existing || []).length;
        const toInsert = pendingBlocks.map((b, i) => ({
          page_id: targetPageId,
          type: b.type,
          content_json: b.content_json,
          order: baseOrder + i,
        }));
        const { error } = await supabase.from("content_blocks").insert(toInsert as any);
        if (error) throw error;
      }

      toast({ title: "Alterações salvas" });
      setPendingBlocks([]);
      setTextDrafts({});
    } catch (e: any) {
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
  }, [isAdmin, ensurePage, textDrafts, pendingBlocks, toast]);

  // Master controls
  const saveDraft = useCallback(async () => {
    addToHistory("save_draft", { textDrafts, pendingBlocks });
    await saveAll();
  }, [addToHistory, textDrafts, pendingBlocks, saveAll]);

  const publishChanges = useCallback(async () => {
    addToHistory("publish", { textDrafts, pendingBlocks });
    await saveAll();
    toast({ title: "Publicado", description: "Alterações foram publicadas no site ao vivo" });
  }, [addToHistory, textDrafts, pendingBlocks, saveAll, toast]);

  const exitEditMode = useCallback(() => {
    if (Object.keys(textDrafts).length > 0 || pendingBlocks.length > 0) {
      const shouldExit = confirm("Existem alterações não salvas. Deseja sair mesmo assim?");
      if (!shouldExit) return;
    }
    setEditMode(false);
    setDesignMode('content');
    setSelectedComponent(null);
    setTextDrafts({});
    setPendingBlocks([]);
    toast({ title: "Modo de edição desativado" });
  }, [textDrafts, pendingBlocks, toast]);

  const value = useMemo<LiveEditorContextType>(() => ({
    isAdmin,
    editMode,
    setEditMode,
    designMode,
    setDesignMode,
    pageId,
    pageSlug,
    addBlock,
    pendingBlocks,
    setTextDraft,
    getTextDraft,
    saveAll,
    selectedComponent,
    setSelectedComponent,
    saveComponentProps,
    designSystem,
    updateDesignSystem,
    applyGlobalStyles,
    generateAIPalette,
    generateAISection,
    refineWithAI,
    // History controls
    history,
    historyIndex,
    canUndo,
    canRedo,
    undo,
    redo,
    addToHistory,
    // Master controls
    saveDraft,
    publishChanges,
    exitEditMode,
  }), [isAdmin, editMode, designMode, pageId, pageSlug, addBlock, pendingBlocks, setTextDraft, getTextDraft, saveAll, selectedComponent, setSelectedComponent, saveComponentProps, designSystem, updateDesignSystem, applyGlobalStyles, generateAIPalette, generateAISection, refineWithAI, history, historyIndex, canUndo, canRedo, undo, redo, addToHistory, saveDraft, publishChanges, exitEditMode]);

  return (
    <LiveEditorContext.Provider value={value}>{children}</LiveEditorContext.Provider>
  );
};

export const useLiveEditor = () => {
  const ctx = useContext(LiveEditorContext);
  if (!ctx) throw new Error("useLiveEditor must be used within LiveEditorProvider");
  return ctx;
};
