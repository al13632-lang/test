import { supabase } from './client';

export async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function getUserProfile(userId: string) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*, restaurants(*)')
        .eq('id', userId)
        .single();

    if (error) return null;
    return data;
}
