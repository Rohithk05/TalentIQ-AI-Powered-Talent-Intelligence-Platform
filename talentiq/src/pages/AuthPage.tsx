import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { Sparkles } from 'lucide-react';

export function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white p-4">
      <div className="w-full max-w-md bg-[#13131a] rounded-2xl p-8 border border-[#6366f1]/20 shadow-xl shadow-[#6366f1]/10">
        <div className="flex flex-col items-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] px-3 py-1 shadow-md mb-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">TalentIQ</h1>
          <p className="text-sm text-gray-400 mt-2">Welcome back to your AI Career Co-Pilot</p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#6366f1',
                  brandAccent: '#4f46e5',
                  defaultButtonBackground: '#1e1e24',
                  defaultButtonBackgroundHover: '#2a2a32',
                  inputBackground: '#0a0a0f',
                  inputBorder: '#27272a',
                  inputBorderHover: '#6366f1',
                  inputBorderFocus: '#6366f1',
                  inputText: 'white'
                }
              }
            },
            className: {
              container: 'w-full',
              button: 'rounded-xl font-medium shadow-sm transition-all',
              input: 'rounded-xl h-11 transition-all',
              label: 'text-sm font-medium text-gray-300'
            }
          }}
          providers={['google']}
          theme="dark"
        />
      </div>
    </div>
  );
}
