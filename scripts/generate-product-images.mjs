import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const root = process.cwd()
const dataPath = path.join(root, "lib", "products-data.json")
const outDir = path.join(root, "public", "product-images")

/** @type {Array<{id:string,slug:string,name:string,category:string,images?:Array<{src:string,alt:string}>}>} */
const products = JSON.parse(fs.readFileSync(dataPath, "utf8"))

fs.mkdirSync(outDir, { recursive: true })

function escapeXml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

function iconPath(category) {
  switch (category) {
    case "laptops":
      // Laptop outline
      return "M110 260h420c16 0 30 14 30 30v190c0 16-14 30-30 30H110c-16 0-30-14-30-30V290c0-16 14-30 30-30zm-70 450h600c14 0 25 11 25 25v20c0 14-11 25-25 25H40c-14 0-25-11-25-25v-20c0-14 11-25 25-25z"
    case "desktops":
      // Tower + small stand
      return "M170 120h260c22 0 40 18 40 40v520c0 22-18 40-40 40H170c-22 0-40-18-40-40V160c0-22 18-40 40-40zm60 120h140v40H230v-40zm0 90h190v40H230v-40zm0 90h160v40H230v-40zm120 360h80v60h-80v-60z"
    case "accessories":
      // Simple keyboard-ish
      return "M90 320h460c22 0 40 18 40 40v260c0 22-18 40-40 40H90c-22 0-40-18-40-40V360c0-22 18-40 40-40zm50 70h60v50h-60v-50zm80 0h60v50h-60v-50zm80 0h60v50h-60v-50zm80 0h60v50h-60v-50zm80 0h60v50h-60v-50zm-320 80h340v60H140v-60z"
    case "gadgets":
    default:
      // Phone outline
      return "M220 90h220c28 0 50 22 50 50v620c0 28-22 50-50 50H220c-28 0-50-22-50-50V140c0-28 22-50 50-50zm110 620h60v40h-60v-40z"
  }
}

function palette(category) {
  switch (category) {
    case "laptops":
      return { a: "#0B1220", b: "#102A43", accent: "#7C3AED" }
    case "desktops":
      return { a: "#0B1220", b: "#0F2A2F", accent: "#22C55E" }
    case "accessories":
      return { a: "#0B1220", b: "#2A1B3D", accent: "#F59E0B" }
    case "gadgets":
    default:
      return { a: "#0B1220", b: "#1A2B5F", accent: "#38BDF8" }
  }
}

function svgForProduct(p, width = 1600, height = 1200) {
  const { a, b, accent } = palette(p.category)
  const name = escapeXml(p.name)
  const category = escapeXml(p.category)
  const slug = escapeXml(p.slug)
  const icon = iconPath(p.category)

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="glow" cx="30%" cy="20%" r="70%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="18" result="blur"/>
      <feOffset dx="0" dy="18" result="off"/>
      <feColorMatrix in="off" type="matrix"
        values="0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.45 0" result="shadow"/>
      <feMerge>
        <feMergeNode in="shadow"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>

  <!-- Icon plate -->
  <g filter="url(#shadow)">
    <rect x="160" y="190" rx="40" ry="40" width="520" height="520" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.10)"/>
    <path d="${icon}" fill="rgba(255,255,255,0.88)" transform="translate(160 190) scale(0.9) translate(60 60)"/>
  </g>

  <!-- Text -->
  <g font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial" fill="#E5E7EB">
    <text x="760" y="360" font-size="56" font-weight="700">${name}</text>
    <text x="760" y="420" font-size="26" opacity="0.85">${category.toUpperCase()}</text>
    <text x="760" y="470" font-size="20" opacity="0.55">${slug}</text>
  </g>

  <!-- Accent line -->
  <rect x="760" y="500" width="520" height="6" rx="3" fill="${accent}" opacity="0.85"/>

  <!-- Bottom sheen -->
  <rect x="0" y="${height - 220}" width="${width}" height="220" fill="rgba(255,255,255,0.03)"/>
</svg>`
}

async function main() {
  for (const p of products) {
    const svg = svgForProduct(p)
    const outPath = path.join(outDir, `${p.slug}.png`)
    await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(outPath)
  }

  // Update products-data.json to use a single local image per product
  const updated = products.map((p) => ({
    ...p,
    images: [
      {
        src: `/product-images/${p.slug}.png`,
        alt: `${p.name}`,
      },
    ],
  }))

  fs.writeFileSync(dataPath, JSON.stringify(updated, null, 2) + "\n", "utf8")
  console.log(`Generated ${products.length} images in ${path.relative(root, outDir)}`)
  console.log(`Updated ${path.relative(root, dataPath)} to reference local images`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})

