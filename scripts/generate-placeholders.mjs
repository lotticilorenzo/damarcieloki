import { getPlaiceholder } from 'plaiceholder'
import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Script per generare i blurDataURL di tutte le immagini presenti in public/images.
 * Eseguire con: node scripts/generate-placeholders.mjs
 */

async function walk(dir) {
  let files = await fs.readdir(dir)
  files = await Promise.all(files.map(async file => {
    const filePath = path.join(dir, file)
    const stats = await fs.stat(filePath)
    if (stats.isDirectory()) return walk(filePath)
    else if (stats.isFile() && /\.(jpe?g|png|webp|avif)$/i.test(file)) return filePath
  }))
  return files.reduce((all, folderContents) => all.concat(folderContents), [])
}

async function main() {
  const publicDir = path.join(process.cwd(), 'public', 'images')
  
  try {
    const images = await walk(publicDir)
    console.log(`🔍 Trovate ${images.length} immagini. Generazione placeholders in corso...`)

    const results = {}

    for (const imagePath of images) {
      const relativePath = path.relative(path.join(process.cwd(), 'public'), imagePath).replace(/\\/g, '/')
      const file = await fs.readFile(imagePath)
      const { base64 } = await getPlaiceholder(file)
      results[relativePath] = base64
      console.log(`✅ Generato per: ${relativePath}`)
    }

    const outputPath = path.join(process.cwd(), 'src', 'lib', 'placeholders.json')
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2))
    console.log(`\n✨ Successo! I placeholders sono stati salvati in: ${outputPath}`)
    console.log(`Ora puoi usarli importandoli in src/lib/images.ts`)

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ Errore: La cartella public/images non esiste. Aggiungi le tue foto prima di eseguire lo script.')
    } else {
      console.error('❌ Errore durante la generazione:', error)
    }
  }
}

main()
