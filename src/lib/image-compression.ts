/**
 * Kompresi gambar client-side ke format WebP menggunakan HTML5 Canvas native.
 * Nol dependencies tambahan, hemat bandwidth, mematuhi batas free-tier 1GB Supabase.
 */
export async function compressImageToWebP(
  file: File,
  maxWidth = 1600,
  quality = 0.82
): Promise<{ blob: Blob; fileName: string; sizeKB: number }> {
  // Validasi tipe file & ukuran batas memori browser
  const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
  if (!validMimes.includes(file.type)) {
    throw new Error('Format file tidak didukung. Harap unggah format JPG, PNG, atau WebP.');
  }
  if (file.size > 20 * 1024 * 1024) {
    throw new Error('Ukuran file terlalu besar (maksimal 20MB sebelum kompresi).');
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      let { naturalWidth: width, naturalHeight: height } = img;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Gagal menginisialisasi canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Gagal mengonversi gambar ke format WebP'));
            return;
          }
          const baseName = file.name
            .replace(/\.[^/.]+$/, '')
            .toLowerCase()
            .replace(/[^a-z0-9_-]/g, '-');
          const fileName = `${Date.now()}-${baseName}.webp`;
          const sizeKB = Math.round(blob.size / 1024);
          resolve({ blob, fileName, sizeKB });
        },
        'image/webp',
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('File bukan gambar valid atau rusak'));
    };
  });
}
