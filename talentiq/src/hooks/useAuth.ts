import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import type { User, Session } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUserLocal] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        setSession(session);
        setUserLocal(session?.user ?? null);
        useWorkspaceStore.setState({ userId: session?.user?.id ?? null });
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (mounted) {
          setSession(session);
          setUserLocal(session?.user ?? null);
          useWorkspaceStore.setState({ userId: session?.user?.id ?? null });
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, session, loading, signOut };
}
