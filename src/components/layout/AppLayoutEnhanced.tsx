import React, { Suspense } from "react";
import { AppLayout } from "./AppLayout";
import { SkeletonLoader } from "@/components/ui/skeleton-loader";
import { AppBreadcrumb } from "./Breadcrumb";

// Conditional imports for LiveEditor components
const MasterLiveEditor = React.lazy(() => import("@/components/live-editor/MasterLiveEditor"));
const DesignStudioEnhancer = React.lazy(() => 
  import("@/components/live-editor/DesignStudioEnhancer").then(module => ({
    default: module.DesignStudioEnhancer
  }))
);

// Custom hook to safely use LiveEditor context
const useSafeLiveEditor = () => {
  try {
    const context = React.useContext(
      React.createContext<{ editMode?: boolean } | undefined>(undefined)
    );
    
    // Try to import and use the actual context
    const { useLiveEditor } = require("@/components/live-editor/LiveEditorProvider");
    return useLiveEditor();
  } catch {
    // Return safe defaults if LiveEditor is not available
    return { editMode: false };
  }
};

interface AppLayoutEnhancedProps {
  children: React.ReactNode;
  loading?: boolean;
  loadingType?: 'dashboard' | 'table' | 'form' | 'card' | 'list';
}

export const AppLayoutEnhanced: React.FC<AppLayoutEnhancedProps> = ({ 
  children, 
  loading = false,
  loadingType = 'dashboard'
}) => {
  const [isLiveEditorAvailable, setIsLiveEditorAvailable] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);

  // Check if LiveEditor is available (only for admin users)
  React.useEffect(() => {
    try {
      const { useLiveEditor } = require("@/components/live-editor/LiveEditorProvider");
      const liveEditorContext = useLiveEditor();
      setEditMode(liveEditorContext.editMode || false);
      setIsLiveEditorAvailable(true);
    } catch {
      setIsLiveEditorAvailable(false);
      setEditMode(false);
    }
  }, []);

  return (
    <AppLayout>
      {loading ? (
        <SkeletonLoader variant="dashboard" />
      ) : (
        <Suspense fallback={<SkeletonLoader variant="dashboard" />}>
          <AppBreadcrumb />
          {children}
        </Suspense>
      )}
      
      {/* Master Live Editor - only for admin users */}
      {isLiveEditorAvailable && (
        <Suspense fallback={null}>
          <MasterLiveEditor />
        </Suspense>
      )}
      
      {/* Design Studio Enhancer - only when edit mode is active */}
      {isLiveEditorAvailable && editMode && (
        <Suspense fallback={null}>
          <DesignStudioEnhancer />
        </Suspense>
      )}
    </AppLayout>
  );
};