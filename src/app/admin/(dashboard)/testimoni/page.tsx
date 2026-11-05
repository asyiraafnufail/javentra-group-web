'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, Check, X, Search, AlertCircle, Database, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { FALLBACK_TESTIMONIALS } from '@/data/fallback';
import { Testimonial } from '@/types/database';

interface TestimonialFormData {
  id?: string;
  client_name: string;
  origin: string;
  rating: number;
  review: string;
  is_featured: boolean;
  is_active: boolean;
}

const INITIAL_FORM: TestimonialFormData = {
  client_name: '',
  origin: 'Jakarta',
  rating: 5,
  review: '',
  is_featured: true,
  is_active: true,
};

const isUuid = (val?: string) =>
  typeof val === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

export default function AdminTestimoniPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<TestimonialFormData>(INITIAL_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isDbEmpty, setIsDbEmpty] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        if (data.length > 0) {
          setTestimonials(data);
          setIsDbEmpty(false);
        } else {
          setIsDbEmpty(true);
          setTestimonials(FALLBACK_TESTIMONIALS);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSeedDefaultTestimonials = async () => {
    setIsSeeding(true);
    try {
      const supabase = createClient();
      const seedPayload = FALLBACK_TESTIMONIALS.map(
        ({ id: _id, created_at: _c, ...rest }) => rest
      );
      const { data, error } = await supabase
        .from('testimonials')
        .insert(seedPayload)
        .select();

      if (error) throw error;
      if (data && data.length > 0) {
        setTestimonials(data as Testimonial[]);
        setIsDbEmpty(false);
        alert('Berhasil menyimpan 3 ulasan default ke database Supabase!');
      }
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Gagal sinkronisasi testimoni: ${error.message || 'Periksa izin RLS'}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleOpenNew = () => {
    setFormData(INITIAL_FORM);
    setIsEditing(false);
    setStatusMsg(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setFormData({
      id: item.id,
      client_name: item.client_name,
      origin: item.origin || '',
      rating: item.rating,
      review: item.review,
      is_featured: item.is_featured,
      is_active: item.is_active,
    });
    setIsEditing(true);
    setStatusMsg(null);
    setIsModalOpen(true);
  };

  const handleToggleFeatured = async (item: Testimonial) => {
    const updated = !item.is_featured;
    setTestimonials((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, is_featured: updated } : t))
    );

    try {
      const supabase = createClient();
      let isSaved = false;

      if (isUuid(item.id)) {
        const { data, error } = await supabase
          .from('testimonials')
          .update({ is_featured: updated })
          .eq('id', item.id)
          .select();

        if (error) throw error;
        if (data && data.length > 0) isSaved = true;
      }

      if (!isSaved) {
        // Fallback row not in DB yet: insert it
        const { id: _id, created_at: _c, ...rest } = item;
        const { error: insertErr } = await supabase
          .from('testimonials')
          .insert([{ ...rest, is_featured: updated }]);
        if (insertErr) throw insertErr;
      }
    } catch (err: unknown) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, is_featured: item.is_featured } : t))
      );
      const error = err as Error;
      alert(`Gagal mengubah unggulan: ${error.message || 'Periksa koneksi database'}`);
    }
  };

  const handleToggleActive = async (item: Testimonial) => {
    const updated = !item.is_active;
    setTestimonials((prev) =>
      prev.map((t) => (t.id === item.id ? { ...t, is_active: updated } : t))
    );

    try {
      const supabase = createClient();
      let isSaved = false;

      if (isUuid(item.id)) {
        const { data, error } = await supabase
          .from('testimonials')
          .update({ is_active: updated })
          .eq('id', item.id)
          .select();

        if (error) throw error;
        if (data && data.length > 0) isSaved = true;
      }

      if (!isSaved) {
        const { id: _id, created_at: _c, ...rest } = item;
        const { error: insertErr } = await supabase
          .from('testimonials')
          .insert([{ ...rest, is_active: updated }]);
        if (insertErr) throw insertErr;
      }
    } catch (err: unknown) {
      setTestimonials((prev) =>
        prev.map((t) => (t.id === item.id ? { ...t, is_active: item.is_active } : t))
      );
      const error = err as Error;
      alert(`Gagal mengubah status: ${error.message || 'Periksa koneksi database'}`);
    }
  };

  const handleDelete = async (item: Testimonial) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus ulasan dari "${item.client_name}"?`)) return;

    setTestimonials((prev) => prev.filter((t) => t.id !== item.id));

    try {
      const supabase = createClient();
      if (isUuid(item.id)) {
        const { error } = await supabase.from('testimonials').delete().eq('id', item.id);
        if (error) throw error;
      }
    } catch (err: unknown) {
      setTestimonials((prev) => [...prev, item]);
      const error = err as Error;
      alert(`Gagal menghapus ulasan: ${error.message || 'Periksa izin RLS'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const payload = {
      client_name: formData.client_name,
      origin: formData.origin,
      rating: Number(formData.rating),
      review: formData.review,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
    };

    try {
      const supabase = createClient();
      let savedItem: Testimonial | null = null;

      if (isEditing && formData.id && isUuid(formData.id)) {
        const { data: updateData, error: updateError } = await supabase
          .from('testimonials')
          .update(payload)
          .eq('id', formData.id)
          .select();

        if (updateError) throw updateError;

        if (updateData && updateData.length > 0) {
          savedItem = updateData[0] as Testimonial;
        } else {
          // Fallback row not yet in DB: insert as new
          const { data: insertData, error: insertError } = await supabase
            .from('testimonials')
            .insert([payload])
            .select()
            .single();

          if (insertError) throw insertError;
          savedItem = insertData as Testimonial;
        }

        setTestimonials((prev) =>
          prev.map((t) => (t.id === formData.id ? savedItem! : t))
        );
      } else {
        const { data: insertData, error: insertError } = await supabase
          .from('testimonials')
          .insert([payload])
          .select()
          .single();

        if (insertError) throw insertError;
        savedItem = insertData as Testimonial;

        setTestimonials((prev) => [savedItem!, ...prev]);
      }

      setIsModalOpen(false);
      setIsDbEmpty(false);
    } catch (err: unknown) {
      const error = err as Error;
      setStatusMsg({
        type: 'error',
        text: `Gagal menyimpan ke database: ${error.message || 'Periksa izin RLS dan koneksi Supabase'}`,
      });
    }
  };

  const filteredTestimonials = testimonials.filter(
    (t) =>
      t.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.review.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-headline">
            Kelola Ulasan & Testimoni
          </h1>
          <p className="text-xs sm:text-sm text-slate-body mt-1">
            Daftar feedback wisatawan yang tampil di landing page dan katalog publik.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-headline hover:bg-black px-4 py-2.5 rounded-xl transition-colors shadow-sm min-h-[40px]"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Ulasan Baru</span>
        </button>
      </div>

      {/* Empty Database Sync Alert */}
      {isDbEmpty && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-emerald-950">
                Tabel Testimoni di Supabase Masih Kosong (Menampilkan 3 Ulasan Default)
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                Simpan 3 ulasan default ke database Supabase agar data tersimpan permanen dan dapat Anda edit dengan aman.
              </p>
            </div>
          </div>
          <button
            onClick={handleSeedDefaultTestimonials}
            disabled={isSeeding}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Menyimpan ke Supabase...' : 'Simpan Semua ke Database'}</span>
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-border-subtle shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama tamu, kota asal, atau isi ulasan..."
          className="w-full text-xs sm:text-sm text-slate-headline placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          [1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-border-subtle p-5 shadow-xs space-y-4 animate-pulse flex flex-col justify-between min-h-[180px]"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="w-20 h-4 bg-stone-200 rounded" />
                  <div className="w-12 h-5 bg-stone-200 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="w-full h-3.5 bg-stone-100 rounded" />
                  <div className="w-4/5 h-3.5 bg-stone-100 rounded" />
                  <div className="w-3/5 h-3.5 bg-stone-100 rounded" />
                </div>
              </div>
              <div className="pt-3 border-t border-border-subtle flex justify-between items-center">
                <div className="space-y-1">
                  <div className="w-28 h-4 bg-stone-200 rounded" />
                  <div className="w-16 h-3 bg-stone-100 rounded" />
                </div>
                <div className="w-12 h-6 bg-stone-200 rounded" />
              </div>
            </div>
          ))
        ) : (
          filteredTestimonials.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl bg-white border border-border-subtle p-5 shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Rating & Status Bar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-ochre-amber text-ochre-amber" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleFeatured(item)}
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-md border text-xs transition-colors ${
                      item.is_featured
                        ? 'bg-ochre-amber text-white border-ochre-amber'
                        : 'bg-stone-100 text-transparent border-border-subtle'
                    }`}
                    title={item.is_featured ? 'Tampil di Unggulan' : 'Jadikan Unggulan'}
                  >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </button>

                  <button
                    onClick={() => handleToggleActive(item)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.is_active
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    {item.is_active ? 'Aktif' : 'Draft'}
                  </button>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-body leading-relaxed mb-4 italic">
                &ldquo;{item.review}&rdquo;
              </p>
            </div>

            {/* Author info & Actions */}
            <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-headline">
                  {item.client_name}
                </h4>
                <p className="text-[11px] text-slate-500">{item.origin}</p>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg text-slate-600 hover:bg-stone-muted"
                  title="Sunting"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-1.5 rounded-lg text-red-600 hover:bg-red-50"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-border-subtle shadow-2xl p-6 sm:p-8 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-6">
              <h2 className="text-lg font-bold text-slate-headline">
                {isEditing ? 'Sunting Ulasan Tamu' : 'Tambah Ulasan Tamu'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-stone-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {statusMsg && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                  Nama Tamu / Instansi
                </label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  placeholder="Contoh: Bpk. Bambang Sudiro / Tim Telkom"
                  className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Asal Kota / Divisi
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="Jakarta Selatan"
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Rating Bintang (1 - 5)
                  </label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  >
                    <option value="5">5 Bintang (Luar Biasa)</option>
                    <option value="4">4 Bintang (Sangat Puas)</option>
                    <option value="3">3 Bintang (Cukup)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                  Isi Ulasan & Pengalaman
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Tulis testimoni autentik dari tamu mengenai instruktur, keamanan jeram, fasilitas makan, atau keseruan jeep..."
                  className="w-full bg-stone-muted border border-border-subtle rounded-xl p-3 text-xs sm:text-sm text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border-subtle bg-stone-muted/50">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded text-river-teal focus:ring-river-teal w-4 h-4"
                  />
                  <span className="text-xs font-bold text-slate-headline">
                    Tampil di Landing Page
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border-subtle bg-stone-muted/50">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded text-river-teal focus:ring-river-teal w-4 h-4"
                  />
                  <span className="text-xs font-bold text-slate-headline">
                    Publikasikan Ulasan
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-border-subtle text-xs sm:text-sm font-semibold text-slate-headline hover:bg-stone-muted"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-headline hover:bg-black shadow-sm"
                >
                  {isEditing ? 'Simpan Perubahan' : 'Terbitkan Ulasan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
