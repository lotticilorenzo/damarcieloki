import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://damarcieloki.it'
  const now = new Date().toISOString()
  return [
    { url: base, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: base+'/chi-sono', lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
    { url: base+'/servizi', lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: base+'/servizi/bagno', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: base+'/servizi/taglio-forbice', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: base+'/servizi/stripping', lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: base+'/servizi/snodatura', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: base+'/servizi/bagno-medicato', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: base+'/prezzi', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: base+'/contatti', lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: base+'/consigli', lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
  ]
}
