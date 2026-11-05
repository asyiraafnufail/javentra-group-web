'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Upload,
  AlertCircle,
  Clock,
  Users,
  Search,
  Database,
  RefreshCw,
  Star,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { FALLBACK_PACKAGES } from '@/data/fallback';
import { Package, PackageCategory, PriceUnit } from '@/types/database';
import { compressImageToWebP } from '@/lib/image-compression';

interface PackageFormData {
  id?: string;
  name: string;
  slug: string;
  category: PackageCategory;
  price: number;
  price_unit: PriceUnit;
  duration: string;
  min_pax: number;
  description: string;
  includesText: string;
  excludesText: string;
  itineraryText: string;
  is_featured: boolean;
  is_active: boolean;
  images: string[];
}

const INITIAL_FORM: PackageFormData = {
  name: '',
  slug: '',
  category: 'rafting',
  price: 750000,
  price_unit: 'pax',
  duration: '2.5 Jam',
  min_pax: 4,
  description: 'Deskripsi lengkap mengenai jalur petualangan dan fasilitas unggulan.',
  includesText: 'Peralatan standar rescue, Asuransi resmi, Kelapa muda & snack, Kamar bilas',
  excludesText: 'Transportasi ke basecamp, Pengeluaran pribadi',
  itineraryText: '08.30 - Tiba di basecamp, registrasi dan fitting alat\n09.00 - Briefing keselamatan bersama instruktur\n09.30 - Start aktivitas petualangan\n11.45 - Selesai, bilas, dan makan siang',
  is_featured: false,
  is_active: true,
  images: [],
};

const isUuid = (val?: string) =>
  typeof val === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

function sanitizePackageForUpsert(pkg: Partial<Package>) {
  const { id, created_at, updated_at, ...rest } = pkg;
  if (isUuid(id)) {
    return { id, ...rest };
  }
  return rest;
}

export default function AdminPaketPage() {
  const [packages, setPackages] = useState<Package[]>(FALLBACK_PACKAGES);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<PackageFormData>(INITIAL_FORM);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [compressionReport, setCompressionReport] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDbEmpty, setIsDbEmpty] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPackages = async () => {
    const supabase = createClient();
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        if (data.length > 0) {
          setPackages(data);
          setIsDbEmpty(false);
        } else {
          setIsDbEmpty(true);
          setPackages(FALLBACK_PACKAGES);
        }
      }
    } catch {
      // Fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSeedDefaultPackages = async () => {
    setIsSeeding(true);
    try {
      const supabase = createClient();
      // Hilangkan id fallback dummy agar Supabase generate UUID baru di DB
      const seedPayload = FALLBACK_PACKAGES.map(
        ({ id: _id, created_at: _c, updated_at: _u, ...rest }) => rest
      );
      const { data, error } = await supabase
        .from('packages')
        .upsert(seedPayload, { onConflict: 'slug' })
        .select();

      if (error) throw error;
      if (data && data.length > 0) {
        setPackages(data as Package[]);
        setIsDbEmpty(false);
        alert('Berhasil menyimpan 4 paket default ke database Supabase!');
      }
    } catch (err: unknown) {
      const error = err as Error;
      alert(`Gagal sinkronisasi data default: ${error.message || 'Periksa izin RLS'}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleOpenNew = () => {
    setFormData(INITIAL_FORM);
    setIsEditing(false);
    setCompressionReport(null);
    setStatusMsg(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg: Package) => {
    setFormData({
      id: pkg.id,
      name: pkg.name,
      slug: pkg.slug,
      category: pkg.category,
      price: pkg.price,
      price_unit: pkg.price_unit,
      duration: pkg.duration,
      min_pax: pkg.min_pax,
      description: pkg.description,
      includesText: pkg.includes.join(', '),
      excludesText: pkg.excludes ? pkg.excludes.join(', ') : '',
      itineraryText: pkg.itinerary
        ? pkg.itinerary.map((i) => `${i.time} - ${i.activity}`).join('\n')
        : '',
      is_featured: pkg.is_featured,
      is_active: pkg.is_active,
      images: pkg.images || [],
    });
    setIsEditing(true);
    setCompressionReport(null);
    setStatusMsg(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    const slug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: isEditing ? prev.slug : slug,
    }));
  };

  // Kompresi WebP client-side otomatis sebelum upload ke Supabase Storage
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setCompressionReport(null);

    try {
      const originalSizeKB = Math.round(file.size / 1024);
      const { blob, fileName, sizeKB } = await compressImageToWebP(file, 1600, 0.82);

      const ratio = Math.round(((originalSizeKB - sizeKB) / originalSizeKB) * 100);
      setCompressionReport(
        `Berhasil dikompresi: ${originalSizeKB} KB -> ${sizeKB} KB WebP (Hemat ${ratio}%)`
      );

      const supabase = createClient();
      let publicUrl = '';

      // Coba upload ke bucket 'media' sesuai schema.sql
      const uploadRes = await supabase.storage
        .from('media')
        .upload(`photos/${fileName}`, blob, { contentType: 'image/webp', upsert: true });

      if (!uploadRes.error && uploadRes.data) {
        const { data: urlData } = supabase.storage.from('media').getPublicUrl(uploadRes.data.path);
        publicUrl = urlData.publicUrl;
      } else {
        // Fallback jika bucket diberi nama 'packages'
        const fallbackRes = await supabase.storage
          .from('packages')
          .upload(`photos/${fileName}`, blob, { contentType: 'image/webp', upsert: true });

        if (!fallbackRes.error && fallbackRes.data) {
          const { data: urlData } = supabase.storage.from('packages').getPublicUrl(fallbackRes.data.path);
          publicUrl = urlData.publicUrl;
        } else {
          throw new Error(
            uploadRes.error?.message ||
              fallbackRes.error?.message ||
              'Gagal upload ke bucket storage'
          );
        }
      }

      setFormData((prev) => ({
        ...prev,
        images: [publicUrl, ...prev.images],
      }));
    } catch (err: unknown) {
      const error = err as Error;
      setCompressionReport(`Gagal memproses gambar: ${error.message || 'Format tidak didukung'}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleToggleActive = async (pkg: Package) => {
    const updated = !pkg.is_active;
    setPackages((prev) =>
      prev.map((p) => (p.slug === pkg.slug ? { ...p, is_active: updated } : p))
    );

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('packages')
        .update({ is_active: updated })
        .eq('slug', pkg.slug)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) {
        // Belum ada di DB (masih fallback): upsert seluruh data paket dengan status baru tanpa id dummy
        const payload = sanitizePackageForUpsert({ ...pkg, is_active: updated });
        const { error: upsertErr } = await supabase
          .from('packages')
          .upsert(payload, { onConflict: 'slug' });
        if (upsertErr) throw upsertErr;
      }
    } catch (err: unknown) {
      setPackages((prev) =>
        prev.map((p) => (p.slug === pkg.slug ? { ...p, is_active: pkg.is_active } : p))
      );
      const error = err as Error;
      alert(`Gagal mengubah status: ${error.message || 'Periksa koneksi database'}`);
    }
  };

  const handleToggleFeatured = async (pkg: Package) => {
    const currentFeatured = packages.filter((p) => p.is_featured);
    const updated = !pkg.is_featured;

    if (updated && currentFeatured.length >= 4) {
      alert(
        'Slot Paket Favorit di beranda sudah penuh (maksimal 4 paket).\n\nNonaktifkan salah satu paket favorit terlebih dahulu dari 4 slot di atas sebelum menambahkan paket ini.'
      );
      return;
    }

    setPackages((prev) =>
      prev.map((p) => (p.slug === pkg.slug ? { ...p, is_featured: updated } : p))
    );

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('packages')
        .update({ is_featured: updated })
        .eq('slug', pkg.slug)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) {
        // Belum ada di DB (masih fallback): upsert seluruh data paket tanpa id dummy
        const payload = sanitizePackageForUpsert({ ...pkg, is_featured: updated });
        const { error: upsertErr } = await supabase
          .from('packages')
          .upsert(payload, { onConflict: 'slug' });
        if (upsertErr) throw upsertErr;
      }
    } catch (err: unknown) {
      setPackages((prev) =>
        prev.map((p) => (p.slug === pkg.slug ? { ...p, is_featured: pkg.is_featured } : p))
      );
      const error = err as Error;
      alert(`Gagal mengubah status favorit: ${error.message || 'Periksa koneksi database'}`);
    }
  };

  const handleAssignToSlot = async (slugToFeature: string) => {
    if (!slugToFeature) return;
    const targetPkg = packages.find((p) => p.slug === slugToFeature);
    if (!targetPkg) return;
    await handleToggleFeatured(targetPkg);
  };

  const handleDelete = async (pkg: Package) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus paket "${pkg.name}"?`)) return;

    setPackages((prev) => prev.filter((p) => p.slug !== pkg.slug));

    try {
      const supabase = createClient();
      const { error } = await supabase.from('packages').delete().eq('slug', pkg.slug);
      if (error) throw error;
    } catch (err: unknown) {
      setPackages((prev) => [...prev, pkg]);
      const error = err as Error;
      alert(`Gagal menghapus: ${error.message || 'Periksa izin RLS'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    const includes = formData.includesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const excludes = formData.excludesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const itinerary = formData.itineraryText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split(/[-|]/);
        if (parts.length >= 2) {
          return { time: parts[0].trim(), activity: parts.slice(1).join('-').trim() };
        }
        return { time: '08.00', activity: line };
      });

    const packagePayload = {
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
      category: formData.category,
      price: Number(formData.price),
      price_unit: formData.price_unit,
      duration: formData.duration,
      min_pax: Number(formData.min_pax),
      description: formData.description,
      includes,
      excludes,
      itinerary,
      is_featured: formData.is_featured,
      is_active: formData.is_active,
      images: formData.images,
    };

    try {
      const supabase = createClient();
      let savedItem: Package | null = null;

      if (isEditing && formData.id && isUuid(formData.id)) {
        // Update berdasarkan valid UUID
        const { data: updateData, error: updateError } = await supabase
          .from('packages')
          .update(packagePayload)
          .eq('id', formData.id)
          .select();

        if (updateError) throw updateError;

        if (updateData && updateData.length > 0) {
          savedItem = updateData[0] as Package;
        } else {
          // Record tidak ditemukan via ID: upsert via slug
          const { data: upsertData, error: upsertError } = await supabase
            .from('packages')
            .upsert(packagePayload, { onConflict: 'slug' })
            .select()
            .single();

          if (upsertError) throw upsertError;
          savedItem = upsertData as Package;
        }

        setPackages((prev) =>
          prev.map((p) =>
            p.id === formData.id || p.slug === packagePayload.slug ? savedItem! : p
          )
        );
      } else {
        // Paket baru atau edit dari data fallback: upsert via slug (PostgreSQL auto-generate UUID)
        const { data: upsertData, error: upsertError } = await supabase
          .from('packages')
          .upsert(packagePayload, { onConflict: 'slug' })
          .select()
          .single();

        if (upsertError) throw upsertError;
        savedItem = upsertData as Package;

        setPackages((prev) => [
          savedItem!,
          ...prev.filter((p) => p.slug !== packagePayload.slug),
        ]);
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

  const featuredPackages = packages.filter((p) => p.is_featured);
  const unfeaturedPackages = packages.filter((p) => !p.is_featured && p.is_active);

  const filteredPackages = packages.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-headline">
            Kelola Paket Petualangan
          </h1>
          <p className="text-xs sm:text-sm text-slate-body mt-1">
            Tambah, sunting harga, dan atur 4 paket favorit yang ditampilkan di beranda.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-slate-headline hover:bg-black px-4 py-2.5 rounded-xl transition-colors shadow-sm min-h-[40px]"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Paket Baru</span>
        </button>
      </div>

      {/* Empty Database Sync Alert */}
      {isDbEmpty && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-emerald-950">
                Tabel Paket di Supabase Masih Kosong (Menampilkan 4 Paket Default)
              </h3>
              <p className="text-xs text-emerald-800 mt-0.5">
                Simpan 4 paket default ke database Supabase agar data tersimpan permanen dan dapat Anda edit dengan aman.
              </p>
            </div>
          </div>
          <button
            onClick={handleSeedDefaultPackages}
            disabled={isSeeding}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shrink-0 disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Menyimpan ke Supabase...' : 'Simpan Semua ke Database'}</span>
          </button>
        </div>
      )}

      {/* 4 Slot Paket Favorit Beranda Widget */}
      <div className="bg-white rounded-2xl border border-border-subtle p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-ochre-amber fill-ochre-amber" />
              <h2 className="text-base sm:text-lg font-bold text-slate-headline">
                4 Paket Favorit Beranda (Homepage)
              </h2>
            </div>
            <p className="text-xs text-slate-body mt-0.5">
              4 paket ini yang langsung dilihat pelanggan di halaman utama sebelum membuka katalog semua paket.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                featuredPackages.length === 4
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {featuredPackages.length} dari 4 Slot Terisi
            </span>
          </div>
        </div>

        {/* 4 Slots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((slotIndex) => {
            const pkg = featuredPackages[slotIndex];
            return (
              <div
                key={slotIndex}
                className={`rounded-xl p-4 flex flex-col justify-between transition-all min-h-[145px] ${
                  pkg
                    ? 'bg-stone-muted/40 border-2 border-ochre-amber/50 shadow-xs'
                    : 'bg-stone-50 border-2 border-dashed border-border-subtle justify-center text-center'
                }`}
              >
                {pkg ? (
                  <>
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-ochre-amber text-white">
                          Slot {slotIndex + 1}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">
                          {pkg.category}
                        </span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-headline line-clamp-2">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-slate-600 font-semibold mt-1">
                        Rp {pkg.price.toLocaleString('id-ID')}
                        <span className="text-[10px] font-normal text-slate-400">/{pkg.price_unit}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleToggleFeatured(pkg)}
                      className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-1.5 px-2 rounded-lg text-[11px] font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                      title="Keluarkan dari 4 Paket Favorit"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Lepas dari Favorit</span>
                    </button>
                  </>
                ) : (
                  <div className="space-y-2 py-1">
                    <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto text-xs font-bold">
                      {slotIndex + 1}
                    </div>
                    <p className="text-xs font-bold text-slate-400">
                      Slot {slotIndex + 1} Kosong
                    </p>
                    {unfeaturedPackages.length > 0 ? (
                      <select
                        defaultValue=""
                        onChange={(e) => {
                          handleAssignToSlot(e.target.value);
                          e.target.value = '';
                        }}
                        className="w-full text-[11px] font-semibold bg-white border border-border-subtle rounded-lg px-2 py-1.5 text-slate-headline focus:outline-none focus:ring-1 focus:ring-river-teal"
                      >
                        <option value="" disabled>
                          + Pilih paket untuk slot ini...
                        </option>
                        {unfeaturedPackages.map((p) => (
                          <option key={p.slug} value={p.slug}>
                            {p.name} (Rp {p.price.toLocaleString('id-ID')})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-[10px] text-slate-400">
                        Tidak ada paket lain yang tersedia
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-border-subtle shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari nama paket atau kategori..."
          className="w-full text-xs sm:text-sm text-slate-headline placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      {/* Package List Grid / Table */}
      <div className="bg-white rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-stone-muted/70 border-b border-border-subtle">
              <tr className="text-slate-body font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Nama Paket</th>
                <th className="py-3.5 px-3">Kategori</th>
                <th className="py-3.5 px-3">Harga</th>
                <th className="py-3.5 px-3">Durasi / Pax</th>
                <th className="py-3.5 px-3 text-center">Favorit Beranda</th>
                <th className="py-3.5 px-3 text-center">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {loading ? (
                [1, 2, 3, 4].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="h-4 bg-stone-200 rounded w-48 mb-1.5" />
                      <div className="h-2.5 bg-stone-100 rounded w-24" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-5 bg-stone-200 rounded w-16" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 bg-stone-200 rounded w-28" />
                    </td>
                    <td className="py-4 px-3">
                      <div className="h-4 bg-stone-200 rounded w-20" />
                    </td>
                    <td className="py-4 px-3 text-center">
                      <div className="w-6 h-6 bg-stone-200 rounded mx-auto" />
                    </td>
                    <td className="py-4 px-3 text-center">
                      <div className="w-14 h-5 bg-stone-200 rounded-full mx-auto" />
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right">
                      <div className="w-14 h-6 bg-stone-200 rounded ml-auto" />
                    </td>
                  </tr>
                ))
              ) : (
                filteredPackages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-stone-muted/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6 font-bold text-slate-headline max-w-xs">
                      <div className="truncate" title={pkg.name}>
                        {pkg.name}
                      </div>
                      <span className="text-[11px] text-slate-body font-normal block">
                        /{pkg.slug}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-slate-body uppercase text-[11px] font-bold">
                      <span className="px-2 py-0.5 rounded bg-stone-muted text-slate-headline">
                        {pkg.category}
                      </span>
                    </td>

                    <td className="py-4 px-3 font-bold text-slate-headline whitespace-nowrap">
                      Rp {pkg.price.toLocaleString('id-ID')}
                      <span className="text-[11px] font-normal text-slate-body ml-1">
                        /{pkg.price_unit}
                      </span>
                    </td>

                    <td className="py-4 px-3 text-slate-body whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Clock className="w-3.5 h-3.5 text-river-teal" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Min. {pkg.min_pax} orang</span>
                      </div>
                    </td>

                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => handleToggleFeatured(pkg)}
                        className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          pkg.is_featured
                            ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-2xs hover:bg-amber-100'
                            : 'bg-stone-50 text-stone-500 border-border-subtle hover:bg-stone-100 hover:text-slate-headline'
                        }`}
                        title={
                          pkg.is_featured
                            ? 'Tampil di 4 Paket Favorit Beranda (Klik untuk lepas)'
                            : featuredPackages.length >= 4
                            ? 'Slot favorit penuh (4/4). Lepas paket lain terlebih dahulu.'
                            : 'Tambahkan ke 4 Paket Favorit Beranda'
                        }
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            pkg.is_featured
                              ? 'fill-ochre-amber text-ochre-amber'
                              : 'text-stone-400'
                          }`}
                        />
                        <span className="text-[11px] font-bold">
                          {pkg.is_featured ? 'Favorit' : 'Jadikan Favorit'}
                        </span>
                      </button>
                    </td>

                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => handleToggleActive(pkg)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                          pkg.is_active
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                        }`}
                      >
                        {pkg.is_active ? 'Aktif' : 'Draft'}
                      </button>
                    </td>

                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit(pkg)}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-stone-muted transition-colors"
                          title="Sunting Paket"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="Hapus Paket"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal / Slide-over Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-border-subtle shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-headline">
                {isEditing ? 'Sunting Paket Petualangan' : 'Tambah Paket Baru'}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Nama Paket
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Contoh: Arung Jeram Sungai Elo"
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="arung-jeram-sungai-elo"
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PackageCategory })}
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  >
                    <option value="rafting">Arung Jeram (Rafting)</option>
                    <option value="jeep">Jeep Lava Tour</option>
                    <option value="vw">VW Safari Borobudur</option>
                    <option value="outbound">Outbound Gathering</option>
                    <option value="custom">Paket Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="1000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Satuan Harga
                  </label>
                  <select
                    value={formData.price_unit}
                    onChange={(e) => setFormData({ ...formData, price_unit: e.target.value as PriceUnit })}
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  >
                    <option value="pax">Per Orang (Pax)</option>
                    <option value="jeep">Per Jeep (4 Orang)</option>
                    <option value="mobil">Per Mobil (VW)</option>
                    <option value="paket">Per Paket Perahu</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Durasi / Jalur
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="2.5 Jam (12.5 KM)"
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Minimal Peserta
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.min_pax}
                    onChange={(e) => setFormData({ ...formData, min_pax: Number(e.target.value) })}
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                  Deskripsi Lengkap & Daya Tarik Paket
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan daya tarik rute, keindahan alam, dan pengalaman yang didapatkan..."
                  className="w-full bg-stone-muted border border-border-subtle rounded-xl p-3 text-xs sm:text-sm text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Fasilitas Termasuk (Include - pisahkan koma)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.includesText}
                    onChange={(e) => setFormData({ ...formData, includesText: e.target.value })}
                    placeholder="Peralatan rescue, Helm, Pemandu, Kelapa muda, Makan prasmanan, Asuransi"
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl p-3 text-xs sm:text-sm text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                    Belum Termasuk (Exclude - pisahkan koma)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.excludesText}
                    onChange={(e) => setFormData({ ...formData, excludesText: e.target.value })}
                    placeholder="Transportasi ke basecamp, Pengeluaran pribadi, Dokumentasi drone"
                    className="w-full bg-stone-muted border border-border-subtle rounded-xl p-3 text-xs sm:text-sm text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                  Rundown / Itinerary Trip (1 baris per jadwal: Jam - Aktivitas)
                </label>
                <textarea
                  rows={4}
                  value={formData.itineraryText}
                  onChange={(e) => setFormData({ ...formData, itineraryText: e.target.value })}
                  placeholder="08.30 - Tiba di basecamp & registrasi&#10;09.00 - Briefing keselamatan&#10;09.30 - Start pengarungan jeram&#10;11.45 - Finish, bilas & makan siang"
                  className="w-full bg-stone-muted border border-border-subtle rounded-xl p-3 text-xs sm:text-sm font-mono text-slate-headline focus:outline-none focus:ring-2 focus:ring-river-teal/40"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Format per baris: <code className="bg-stone-200 px-1 rounded">08.30 - Nama Aktivitas</code>
                </span>
              </div>

              {/* Client-Side WebP Image Uploader */}
              <div className="pt-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-headline mb-1.5">
                  Foto Dokumentasi (Otomatis Kompres WebP &lt;250KB)
                </label>
                <div className="border-2 border-dashed border-border-subtle rounded-xl p-4 text-center hover:bg-stone-muted/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                    id="package-file-upload"
                  />
                  <label
                    htmlFor="package-file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-2"
                  >
                    <Upload className="w-6 h-6 text-river-teal" />
                    <span className="text-xs font-bold text-slate-headline">
                      {uploadingImage ? 'Mengompresi ke WebP...' : 'Klik untuk Pilih Foto'}
                    </span>
                    <span className="text-[11px] text-slate-body">
                      Format JPG/PNG otomatis dikonversi ke WebP terkompresi sebelum diunggah
                    </span>
                  </label>
                </div>

                {compressionReport && (
                  <p className="text-[11px] font-semibold text-emerald-700 mt-2 bg-emerald-50 p-2 rounded-lg">
                    {compressionReport}
                  </p>
                )}
              </div>

              {/* Toggle Switches */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border-subtle bg-stone-muted/50">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => {
                      if (
                        e.target.checked &&
                        packages.filter((p) => p.is_featured && p.slug !== formData.slug).length >= 4
                      ) {
                        alert(
                          'Slot Paket Favorit di beranda sudah penuh (maksimal 4 paket).\n\nNonaktifkan salah satu paket favorit terlebih dahulu dari 4 slot di dashboard sebelum menambahkan paket ini.'
                        );
                        return;
                      }
                      setFormData({ ...formData, is_featured: e.target.checked });
                    }}
                    className="rounded text-river-teal focus:ring-river-teal w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-headline block">
                      Paket Favorit Beranda (4 Slot)
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Tampil di halaman beranda sebelum melihat semua paket
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl border border-border-subtle bg-stone-muted/50">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded text-river-teal focus:ring-river-teal w-4 h-4"
                  />
                  <span className="text-xs font-bold text-slate-headline">
                    Aktif / Buka Pemesanan
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
                  {isEditing ? 'Simpan Perubahan' : 'Terbitkan Paket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
