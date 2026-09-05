const fs = require('fs');
const zlib = require('zlib');

// Read original logo
const buf = fs.readFileSync('public/logo.png');

// Find IHDR
let pos = 8;
let width = 0;
let height = 0;
let bitDepth = 0;
let colorType = 0;

while (pos < buf.length) {
  const length = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(pos + 8);
    height = buf.readUInt32BE(pos + 12);
    bitDepth = buf.readUInt8(pos + 16);
    colorType = buf.readUInt8(pos + 17);
    break;
  }
  pos += 12 + length;
}

pos = 8;
const idatChunks = [];
while (pos < buf.length) {
  const length = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') {
    idatChunks.push(buf.subarray(pos + 8, pos + 8 + length));
  }
  pos += 12 + length;
}

const compressed = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(compressed);

const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : 4;
let inPos = 0;

const prevRow = Buffer.alloc(width * 4);
const curRow = Buffer.alloc(width * 4);
const decodedImg = Buffer.alloc(width * height * 4);

let minX = width, maxX = 0, minY = height, maxY = 0;

for (let y = 0; y < height; y++) {
  const filterType = raw[inPos++];
  for (let x = 0; x < width; x++) {
    let r, g, b, a;
    if (bpp === 3) {
      r = raw[inPos++];
      g = raw[inPos++];
      b = raw[inPos++];
      a = 255;
    } else if (bpp === 4) {
      r = raw[inPos++];
      g = raw[inPos++];
      b = raw[inPos++];
      a = raw[inPos++];
    }

    if (filterType === 1) { // Sub
      if (x > 0) {
        r = (r + curRow[(x - 1) * 4]) & 0xff;
        g = (g + curRow[(x - 1) * 4 + 1]) & 0xff;
        b = (b + curRow[(x - 1) * 4 + 2]) & 0xff;
      }
    } else if (filterType === 2) { // Up
      r = (r + prevRow[x * 4]) & 0xff;
      g = (g + prevRow[x * 4 + 1]) & 0xff;
      b = (b + prevRow[x * 4 + 2]) & 0xff;
    } else if (filterType === 3) { // Average
      const leftR = x > 0 ? curRow[(x - 1) * 4] : 0;
      const leftG = x > 0 ? curRow[(x - 1) * 4 + 1] : 0;
      const leftB = x > 0 ? curRow[(x - 1) * 4 + 2] : 0;
      const upR = prevRow[x * 4];
      const upG = prevRow[x * 4 + 1];
      const upB = prevRow[x * 4 + 2];
      r = (r + Math.floor((leftR + upR) / 2)) & 0xff;
      g = (g + Math.floor((leftG + upG) / 2)) & 0xff;
      b = (b + Math.floor((leftB + upB) / 2)) & 0xff;
    } else if (filterType === 4) { // Paeth
      const aR = x > 0 ? curRow[(x - 1) * 4] : 0;
      const bR = prevRow[x * 4];
      const cR = x > 0 ? prevRow[(x - 1) * 4] : 0;
      const paeth = (a, b, c) => {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        if (pa <= pb && pa <= pc) return a;
        if (pb <= pc) return b;
        return c;
      };
      r = (r + paeth(aR, bR, cR)) & 0xff;
      g = (g + paeth(x > 0 ? curRow[(x - 1) * 4 + 1] : 0, prevRow[x * 4 + 1], x > 0 ? prevRow[(x - 1) * 4 + 1] : 0)) & 0xff;
      b = (b + paeth(x > 0 ? curRow[(x - 1) * 4 + 2] : 0, prevRow[x * 4 + 2], x > 0 ? prevRow[(x - 1) * 4 + 2] : 0)) & 0xff;
    }

    curRow[x * 4] = r;
    curRow[x * 4 + 1] = g;
    curRow[x * 4 + 2] = b;
    curRow[x * 4 + 3] = 255;

    // Strict threshold for clean cutout
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    let alpha = 0;
    if (lum > 80) {
      alpha = Math.min(255, Math.round(((lum - 80) / (220 - 80)) * 255));
      if (alpha > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }

    const pixelIdx = (y * width + x) * 4;
    decodedImg[pixelIdx] = 255; // White R
    decodedImg[pixelIdx + 1] = 255; // White G
    decodedImg[pixelIdx + 2] = 255; // White B
    decodedImg[pixelIdx + 3] = alpha;
  }
  curRow.copy(prevRow);
}

// Add padding to crop
const pad = 20;
minX = Math.max(0, minX - pad);
minY = Math.max(0, minY - pad);
maxX = Math.min(width - 1, maxX + pad);
maxY = Math.min(height - 1, maxY + pad);

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;

console.log(`Cropping logo from ${width}x${height} to ${cropW}x${cropH}`);

const croppedRaw = Buffer.alloc(cropH * (1 + cropW * 4));
let cropRawPos = 0;
for (let y = minY; y <= maxY; y++) {
  croppedRaw[cropRawPos++] = 0; // Filter 0
  const rowStart = (y * width + minX) * 4;
  decodedImg.copy(croppedRaw, cropRawPos, rowStart, rowStart + cropW * 4);
  cropRawPos += cropW * 4;
}

const newCompressed = zlib.deflateSync(croppedRaw);

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function calcCrc(buf, offset, length) {
  let c = 0xffffffff;
  for (let i = 0; i < length; i++) {
    c = crcTable[(c ^ buf[offset + i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = calcCrc(chunk, 4, 4 + len);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(cropW, 0);
ihdrData.writeUInt32BE(cropH, 4);
ihdrData.writeUInt8(8, 8);
ihdrData.writeUInt8(6, 9);
ihdrData.writeUInt8(0, 10);
ihdrData.writeUInt8(0, 11);
ihdrData.writeUInt8(0, 12);

const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdrChunk = makeChunk('IHDR', ihdrData);
const idatChunk = makeChunk('IDAT', newCompressed);
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([pngSignature, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync('public/logo.png', finalPng);
console.log('Clean cropped transparent logo saved to public/logo.png!');
