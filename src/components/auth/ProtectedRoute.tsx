import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState<boolean>(false);

  useEffect(() => {
    // 1) Listen first
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthed(!!session?.user);
      setLoading(false);
    });

    // 2) Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthed(!!session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
