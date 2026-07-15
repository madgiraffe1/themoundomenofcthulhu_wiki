#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TEMPLATE_DEFAULT_ICON_HASHES = new Set([
  '417ec3e3955cd0a851269aa2aef5493824ee0d91140f8cc7c7678b6416326df5',
])

function sha256(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
}

function readPngSize(filePath) {
  const buffer = fs.readFileSync(filePath)
  const isPng = buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  if (!isPng) {
    throw new Error(`${path.relative(path.join(__dirname, '..'), filePath)} is not a PNG`)
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

function validateSiteIconAssets() {
  console.log('🔍 Validating site icon assets...\n')

  const root = path.join(__dirname, '..')
  const requiredPngs = [
    ['public/images/logo.png', 48, 48],
    ['public/favicon-16x16.png', 16, 16],
    ['public/favicon-32x32.png', 32, 32],
    ['public/apple-touch-icon.png', 180, 180],
    ['public/android-chrome-192x192.png', 192, 192],
    ['public/android-chrome-512x512.png', 512, 512],
    ['public/site-icon.png', 256, 256],
  ]

  for (const [relativePath, width, height] of requiredPngs) {
    const filePath = path.join(root, relativePath)
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
      console.error(`❌ Missing or empty site icon asset: ${relativePath}`)
      process.exit(1)
    }
    const actual = readPngSize(filePath)
    if (actual.width !== width || actual.height !== height) {
      console.error(`❌ ${relativePath} must be ${width}x${height}, got ${actual.width}x${actual.height}`)
      process.exit(1)
    }
  }

  const faviconPath = path.join(root, 'public/favicon.ico')
  if (!fs.existsSync(faviconPath) || fs.statSync(faviconPath).size === 0) {
    console.error('❌ Missing or empty favicon.ico')
    process.exit(1)
  }
  const favicon = fs.readFileSync(faviconPath)
  const isIco = favicon.length > 6 && favicon.readUInt16LE(0) === 0 && favicon.readUInt16LE(2) === 1
  if (!isIco) {
    console.error('❌ favicon.ico is not a valid ICO file')
    process.exit(1)
  }
  if (TEMPLATE_DEFAULT_ICON_HASHES.has(sha256(faviconPath))) {
    console.error('❌ favicon.ico still matches the template default icon')
    process.exit(1)
  }

  console.log('✅ Site icon assets are present, sized, and non-default!\n')
}

/**
 * 验证翻译文件中的图标是否都已在 iconRegistry 中注册
 */
async function validateIcons() {
  console.log('🔍 Validating icon usage...\n')

  // 1. 读取图标注册表
  const registryPath = path.join(__dirname, '../src/lib/iconRegistry.ts')
  const registryContent = fs.readFileSync(registryPath, 'utf-8')

  // 提取已注册的图标名称（简单正则匹配）
  const registeredIcons = new Set()
  const iconMatches = registryContent.matchAll(/(\w+):\s*LucideIcons\.\1/g)
  for (const match of iconMatches) {
    registeredIcons.add(match[1])
  }

  console.log(`✅ Found ${registeredIcons.size} registered icons`)

  // 2. 只读取英文翻译文件（图标名称应该是代码标识符，不应被翻译）
  const localesDir = path.join(__dirname, '../src/locales')
  const enFilePath = path.join(localesDir, 'en.json')

  if (!fs.existsSync(enFilePath)) {
    console.error('❌ en.json not found!')
    process.exit(1)
  }

  const usedIcons = new Set()
  const iconUsageByFile = new Map()

  const content = JSON.parse(fs.readFileSync(enFilePath, 'utf-8'))
  const file = 'en.json'

  // 只处理英文文件
  {

  // 提取 tools.cards 中的图标
  if (content.tools?.cards) {
    content.tools.cards.forEach(card => {
      if (card.icon) {
        usedIcons.add(card.icon)
        if (!iconUsageByFile.has(card.icon)) {
          iconUsageByFile.set(card.icon, [])
        }
        iconUsageByFile.get(card.icon).push(`${file}:tools.cards`)
      }
    })
  }

  // 提取 coopGuide.roles 中的图标
  if (content.coopGuide?.roles) {
    content.coopGuide.roles.forEach(role => {
      if (role.icon) {
        usedIcons.add(role.icon)
        if (!iconUsageByFile.has(role.icon)) {
          iconUsageByFile.set(role.icon, [])
        }
        iconUsageByFile.get(role.icon).push(`${file}:coopGuide.roles`)
      }
    })
  }

  // 提取 beginnerGuide.pitfalls 中的图标
  if (content.beginnerGuide?.pitfalls) {
    content.beginnerGuide.pitfalls.forEach(pitfall => {
      if (pitfall.icon) {
        usedIcons.add(pitfall.icon)
        if (!iconUsageByFile.has(pitfall.icon)) {
          iconUsageByFile.set(pitfall.icon, [])
        }
        iconUsageByFile.get(pitfall.icon).push(`${file}:beginnerGuide.pitfalls`)
      }
    })
  }
  }

  console.log(`✅ Found ${usedIcons.size} icons used in translation files\n`)

  // 3. 检查缺失的图标
  const missingIcons = [...usedIcons].filter(icon => !registeredIcons.has(icon))

  if (missingIcons.length > 0) {
    console.error('❌ Missing icons in iconRegistry.ts:\n')
    missingIcons.forEach(icon => {
      const locations = iconUsageByFile.get(icon) || []
      console.error(`  - ${icon}`)
      locations.forEach(loc => console.error(`    Used in: ${loc}`))
    })
    console.error('\n💡 Add these icons to src/lib/iconRegistry.ts:\n')
    missingIcons.forEach(icon => {
      console.error(`  ${icon}: LucideIcons.${icon},`)
    })
    process.exit(1)
  }

  // 4. 检查未使用的图标（可选警告）
  const unusedIcons = [...registeredIcons].filter(icon =>
    !usedIcons.has(icon) && icon !== 'HelpCircle'
  )

  if (unusedIcons.length > 0) {
    console.warn('⚠️  Registered but unused icons (consider removing):\n')
    unusedIcons.forEach(icon => console.warn(`  - ${icon}`))
    console.warn('')
  }

  console.log('✅ All icons are properly registered!\n')
}

validateSiteIconAssets()

validateIcons().catch(err => {
  console.error('❌ Validation failed:', err)
  process.exit(1)
})
