import { getPlaiceholder } from 'plaiceholder'
import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Utility per generare blurDataURL per una specifica immagine.
 * Da usare in getStaticProps o Server Components.
 */
export async function getBlurPlaceholder(src: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', src)
    const file = await fs.readFile(filePath)
    const { base64 } = await getPlaiceholder(file)
    return base64
  } catch (error) {
    console.error(`Errore nel generare placeholder per ${src}:`, error)
    return undefined
  }
}

/**
 * Mappa delle immagini del sito con i loro metadati SEO e placeholder di default.
 */
export const images = {
  hero: {
    marci: '/images/marci.jpg',
    loki: '/images/loki.jpg',
  },
  grooming: {
    schnauzerBefore: '/images/grooming/schnauzer-before.png',
    schnauzerAfter: '/images/grooming/schnauzer-after.png',
    poodleBefore: '/images/grooming/poodle-before.png',
    poodleAfter: '/images/grooming/poodle-after.png',
    snodaturaBefore: '/images/grooming/snodatura-before.png',
    snodaturaAfter: '/images/grooming/snodatura-after.png',
  }
}
