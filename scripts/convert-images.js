const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.join(__dirname, '../_temp_jpgs');
const destDir = path.join(__dirname, '../public/boba-sequence');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const totalSrcFrames = 182;
const totalDestFrames = 120;

async function convert() {
  console.log('Starting image conversion and downsampling...');
  
  for (let i = 0; i < totalDestFrames; i++) {
    // Map index i (0 to 119) to original frame (1 to 182)
    const srcFrameNum = Math.round(1 + i * (totalSrcFrames - 1) / (totalDestFrames - 1));
    const padNum = String(srcFrameNum).padStart(3, '0');
    const srcFileName = `ezgif-frame-${padNum}.jpg`;
    const srcFilePath = path.join(srcDir, srcFileName);
    
    const destFileName = `frame_${String(i).padStart(3, '0')}.webp`;
    const destFilePath = path.join(destDir, destFileName);
    
    if (fs.existsSync(srcFilePath)) {
      try {
        await sharp(srcFilePath)
          .webp({ quality: 85 })
          .toFile(destFilePath);
      } catch (err) {
        console.error(`Error converting ${srcFileName}:`, err);
      }
    } else {
      console.warn(`Source file not found: ${srcFilePath}`);
    }
  }
  
  console.log('Image conversion completed successfully! All 120 frames written to /public/boba-sequence/');
}

convert();
