const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImage(inputPath) {
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const base = path.basename(inputPath, ext);

  if (base.endsWith('.opt') || base.endsWith('-opt') || base.endsWith('-thumb')) return;

  const originalStats = fs.statSync(inputPath);
  const meta = await sharp(inputPath).metadata();

  const webpPath = path.join(dir, `${base}.webp`);
  const thumbPath = path.join(dir, `${base}-thumb.webp`);
  
  let pipeline = sharp(inputPath);

  // Resize oversized images (max 1920px)
  if (meta.width && meta.width > 1920) {
    pipeline = pipeline.resize(1920, null, { withoutEnlargement: true });
  }

  // Full-res WebP (quality 85)
  await pipeline
    .webp({ quality: 85, effort: 6 })
    .toFile(webpPath);

  // Responsive card thumbnail (720px max width for crisp 2x retina on 360px cards)
  if (meta.width && meta.width > 720) {
    await sharp(inputPath)
      .resize(720, null, { withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(thumbPath);
    
    const thumbStats = fs.statSync(thumbPath);
    console.log(`  + Thumb: ${path.basename(thumbPath)}: ${(thumbStats.size/1024).toFixed(0)}KB`);
  }

  const newStats = fs.statSync(webpPath);
  const savings = ((1 - newStats.size / originalStats.size) * 100).toFixed(1);

  console.log(`✓ ${path.relative('public', inputPath)} -> ${path.basename(webpPath)}: ${(originalStats.size/1024).toFixed(0)}KB -> ${(newStats.size/1024).toFixed(0)}KB (-${savings}%)`);
}

async function main() {
  console.log('--- GENERATING WEBP AND RESPONSIVE THUMBNAILS ---');

  const files = [
    'public/hero-image.jpg',
    'public/curtains.png',
    'public/design/download.png',
    'public/design/new/no-henna.jpg',
    'public/design/new/henna.jpg',
    'public/design/04cfd49a13704a1538ee4ecbebd18d25.jpg',
    'public/design/0b3bee658bdc8c81f6cb50def3f906f8.jpg',
    'public/design/25416a990595de24e0f82ae58dca394c.jpg',
    'public/design/2f960168849c101e1a0f092ed97068c0.jpg',
    'public/design/32d50772da5057ee7ffe4f71ae7882e6.jpg',
    'public/design/36b0dbf2a2ae7785ad8bc813ccca4501.jpg',
    'public/design/bf79b9729b21fe68ad4b454815625e50.jpg',
    'public/design/c9814ce739621f7fb16825f26a76e73b.jpg',
    'public/design/f6e8e92c36a63c3b3ad741ee69689db4.jpg',
    'public/design/f9ab6ad14e7d3b53e880242ea6089383.jpg',
    'public/design/fff34cde46f318017a7575556201734a.jpg',
  ];

  for (const f of files) {
    if (fs.existsSync(f)) {
      await processImage(f);
    }
  }

  console.log('--- COMPLETE ---');
}

main().catch(console.error);
