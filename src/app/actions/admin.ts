'use server';
import { supabase } from '@/lib/supabase';

export async function activateCard(slug: string) {
    try {
        const { error } = await supabase
            .from('valentine_cards')
            .update({ is_paid: true })
            .eq('slug', slug);

        if (error) {
            console.error('Error activating card:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error('Unexpected error:', err);
        return { success: false, error: 'Unexpected error occurred' };
    }
}

export async function getAllCards() {
    try {
        const { data, error } = await supabase
            .from('valentine_cards')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching cards:', error);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Unexpected error:', err);
        return { success: false, error: 'Unexpected error occurred' };
    }
}

export async function checkPassword(password: string) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (password === adminPassword) {
        return { success: true };
    }
    return { success: false, error: 'Буруу нууц үг' };
}
