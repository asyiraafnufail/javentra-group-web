'use client';

import { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Phone, MapPin, Clock, Globe } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { DEFAULT_SITE_SETTINGS } from '@/data/fallback';
import { SiteSettings } from '@/types/database';

export default function AdminPengaturanPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'general')
          .single();

        if (!error && data?.value) {
          setSettings(data.value as SiteSettings);
        }
      } catch {
        // Fallback default
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.from('site_settings').upsert({
        key: 'general',
        value: settings,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }

      setNotification({
        type: 'success',
        text: 'Pengaturan kontak dan operasional berhasil disimpan ke database!',
      });
    } catch (err: unknown) {
      const error = err as Error;
      setNotification({
        type: 'error',
        text: `Gagal menyimpan ke database: ${error.message || 'Periksa koneksi atau izin admin RLS'}`,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-headline">
          Pengaturan Kontak & Basecamp
        </h1>
        <p className="text-xs sm:text-sm text-slate-body mt-1">
          Atur nomor WhatsApp reservasi, alamat fisik titik kumpul, dan jam operasional.
        </p>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 ${
            notification.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{notification.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* WhatsApp & Hotline Card */}
        <div className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border-subtle">
            <Phone className="w-5 h-5 text-river-teal" />
            <h2 className="text-sm sm:text-base font-bold text-slate-headline">
              Nomor WhatsApp Booking Langsung
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                Nomor Format Internasional (Tanpa +)
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                placeholder="6281234567890"
                className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
              />
              <span className="text-[11px] text-slate-body mt-1 block">
                Digunakan untuk link direct chat: <code className="text-xs font-mono">wa.me/628...</code>
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                Nomor Tampilan di Halaman
              </label>
              <input
                type="text"
                required
                value={settings.whatsapp_display}
                onChange={(e) => setSettings({ ...settings, whatsapp_display: e.target.value })}
                placeholder="+62 812-3456-7890"
                className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
              />
              <span className="text-[11px] text-slate-body mt-1 block">
                Teks nomor yang dibaca oleh pengunjung web
              </span>
            </div>
          </div>
        </div>

        {/* Basecamp Location Card */}
        <div className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border-subtle">
            <MapPin className="w-5 h-5 text-river-teal" />
            <h2 className="text-sm sm:text-base font-bold text-slate-headline">
              Lokasi Fisik Basecamp
            </h2>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
              Alamat Lengkap Basecamp Utama
            </label>
            <textarea
              rows={2}
              required
              value={settings.basecamp_address}
              onChange={(e) => setSettings({ ...settings, basecamp_address: e.target.value })}
              placeholder="Jl. Mayor Kusen, Mungkid, Magelang, Jawa Tengah"
              className="w-full bg-stone-muted border border-border-subtle rounded-xl p-3 text-xs sm:text-sm text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
              Tautan Google Maps Rute
            </label>
            <input
              type="url"
              required
              value={settings.maps_url}
              onChange={(e) => setSettings({ ...settings, maps_url: e.target.value })}
              placeholder="https://maps.app.goo.gl/..."
              className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40 font-mono"
            />
          </div>
        </div>

        {/* Operational & Social Media */}
        <div className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-border-subtle">
            <Clock className="w-5 h-5 text-river-teal" />
            <h2 className="text-sm sm:text-base font-bold text-slate-headline">
              Jam Operasional & Media Sosial
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                Jam Layanan Operasional
              </label>
              <input
                type="text"
                required
                value={settings.operational_hours}
                onChange={(e) => setSettings({ ...settings, operational_hours: e.target.value })}
                placeholder="07.00 - 18.00 WIB (Setiap Hari)"
                className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                URL Instagram Resmi
              </label>
              <input
                type="url"
                value={settings.instagram_url || ''}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                placeholder="https://instagram.com/javentragroup"
                className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                URL TikTok Resmi
              </label>
              <input
                type="url"
                value={settings.tiktok_url || ''}
                onChange={(e) => setSettings({ ...settings, tiktok_url: e.target.value })}
                placeholder="https://tiktok.com/@javentragroup"
                className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-headline hover:bg-black px-6 py-3 rounded-xl transition-colors shadow-sm disabled:opacity-60 min-h-[44px]"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Seluruh Pengaturan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
