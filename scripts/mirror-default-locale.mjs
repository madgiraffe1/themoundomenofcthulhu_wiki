import fs from 'node:fs'
import path from 'node:path'

const outDir = path.join(process.cwd(), 'out')
const defaultLocaleDir = path.join(outDir, 'en')

if (!fs.existsSync(defaultLocaleDir)) {
  console.warn('[mirror-default-locale] out/en not found, skipping')
  process.exit(0)
}

for (const entry of fs.readdirSync(defaultLocaleDir, { withFileTypes: true })) {
  const source = path.join(defaultLocaleDir, entry.name)
  const target = path.join(outDir, entry.name)
  fs.cpSync(source, target, { recursive: true, force: true })
}

for (const [sourceName, targetName] of [['en.html', 'index.html'], ['en.txt', 'index.txt']]) {
  const source = path.join(outDir, sourceName)
  const target = path.join(outDir, targetName)
  if (fs.existsSync(source)) fs.copyFileSync(source, target)
}

console.log('[mirror-default-locale] mirrored default locale to root')
