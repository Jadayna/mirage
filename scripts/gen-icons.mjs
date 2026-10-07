// Génère les icônes PWA Mirage : rondelle d'agrume sur dégradé corail.
// Pur Node (zlib), aucune dépendance.
import { writeFileSync, mkdirSync } from "fs";
import { deflateSync } from "zlib";

function lerp(a, b, t) { return a + (b - a) * t; }

function makeIcon(size) {
  const px = Buffer.alloc(size * size * 4);
  const cx = size / 2, cy = size / 2;
  // couleurs : corail -> orange (dégradé diagonal)
  const c1 = [255, 111, 97], c2 = [255, 178, 71];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const t = (x + y) / (2 * size);
      let r = lerp(c1[0], c2[0], t), g = lerp(c1[1], c2[1], t), b = lerp(c1[2], c2[2], t);
      const dx = x - cx, dy = y - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      const R = size * 0.36;
      if (d < R) {
        // rondelle d'agrume
        const seg = 8;
        const ang = Math.atan2(dy, dx);
        const frac = ((ang / (Math.PI * 2)) * seg) % 1;
        const edge = Math.abs(frac - 0.5) * 2; // 0 centre segment, 1 bord
        const ringT = d / R;
        if (ringT > 0.92) { r = 255; g = 230; b = 63; }            // zeste
        else if (edge > 0.86) { r = 255; g = 240; b = 160; }      // membranes
        else { r = 255; g = 250; b = 200; }                        // pulpe
        if (ringT < 0.08) { r = 255; g = 240; b = 160; }           // coeur
      }
      const o = (y * size + x) * 4;
      px[o] = r; px[o + 1] = g; px[o + 2] = b; px[o + 3] = 255;
    }
  }
  // chunk helper
  const chunks = [];
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type), data]);
    const crcVal = crc(Buffer.from(type), data);
    const crcB = Buffer.alloc(4); crcB.writeUInt32BE(crcVal);
    chunks.push(len, td, crcB);
  };
  // CRC table
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c;
  }
  function crc(type, data) {
    let c = 0xffffffff;
    for (const b of Buffer.concat([type, data])) c = table[(c ^ b) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    px.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  chunk("IHDR", ihdr);
  chunk("IDAT", deflateSync(raw, { level: 9 }));
  chunk("IEND", Buffer.alloc(0));
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    ...chunks,
  ]);
}

mkdirSync("public/icons", { recursive: true });
for (const s of [192, 512]) {
  writeFileSync(`public/icons/icon-${s}.png`, makeIcon(s));
  console.log("icon-" + s + ".png ok");
}
