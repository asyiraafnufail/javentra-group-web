import fs from 'node:fs';
import path from 'node:path';

// 1. Baca .env.local jika ada
const envPath = path.resolve(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('\x1b[31m[ERROR]\x1b[0m File .env.local belum ditemukan.');
  console.log('Buat file .env.local dengan isi:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [key, ...values] = trimmed.split('=');
  env[key.trim()] = values.join('=').trim().replace(/^["']|["']$/g, '');
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  console.error('\x1b[31m[ERROR]\x1b[0m NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY belum diisi di .env.local');
  process.exit(1);
}

console.log(`Menguji koneksi ke Supabase: ${supabaseUrl} ...`);

try {
  // Test REST API endpoint Supabase langsung via native fetch
  const response = await fetch(`${supabaseUrl}/rest/v1/packages?select=id&limit=1`, {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    },
  });

  if (response.ok) {
    console.log('\x1b[32m[SUKSES]\x1b[0m Koneksi ke Supabase dan tabel `packages` berhasil!');
    const data = await response.json();
    console.log(`Data terdeteksi: ${data.length} baris.`);
  } else if (response.status === 404 || response.status === 400) {
    // URL dan Key benar, tapi tabel belum di-create via schema.sql
    const errText = await response.text();
    console.log('\x1b[33m[PERINGATAN]\x1b[0m Koneksi ke Supabase aktif, tapi tabel `packages` belum ada.');
    console.log('Jalankan isi `docs/schema.sql` di SQL Editor Supabase.');
    console.log(`Detail response: ${errText}`);
  } else {
    console.error(`\x1b[31m[GAGAL]\x1b[0m HTTP Status: ${response.status} ${response.statusText}`);
    const err = await response.text();
    console.error(`Pesan: ${err}`);
  }
} catch (error) {
  console.error('\x1b[31m[GAGAL]\x1b[0m Tidak dapat terhubung ke endpoint Supabase:');
  console.error(error.message);
}
