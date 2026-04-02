import { supabase } from '@/lib/supabase';

export async function saveRun(userId: string, agentType: string, input: any, output: any) {
  const { error } = await supabase.from('agent_runs').insert({
    user_id: userId,
    agent_type: agentType,
    input,
    output
  });
  if (error) console.error('Error saving run:', error);
}

export async function getRuns(userId: string) {
  const { data, error } = await supabase.from('agent_runs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error getting runs:', error);
    return [];
  }
  return data || [];
}

export async function saveProfile(userId: string, profile: any) {
  const { error } = await supabase.from('user_profiles').upsert({ id: userId, ...profile });
  if (error) console.error('Error saving profile:', error);
}

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    console.error('Error getting profile:', error);
    return null;
  }
  return data;
}
