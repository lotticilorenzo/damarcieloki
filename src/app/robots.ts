export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/grazie', '/_next/'] }],
    sitemap: 'https://damarcieloki.it/sitemap.xml',
    host: 'https://damarcieloki.it'
  }
}
