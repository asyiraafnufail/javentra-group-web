import { connection } from 'next/server';
import { createPublicClient } from '@/lib/supabase/public';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';
import { SiteSettings } from '@/types/database';

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    await connection();
    const supabase = createPublicClient();
    if (!supabase) return DEFAULT_SITE_SETTINGS;

    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'general')
      .maybeSingle();

    if (!error && data?.value) {
      return {
        ...DEFAULT_SITE_SETTINGS,
        ...(data.value as Partial<SiteSettings>),
      };
    }
    return DEFAULT_SITE_SETTINGS;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}
