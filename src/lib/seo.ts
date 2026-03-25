import { Metadata } from 'next'
import { Servizio } from '@/types'

const baseUrl = 'https://damarcieloki.it'

/**
 * Metadata helper
 */
export function generateMetadataHelper(
  pageSlug: string, 
  titleKeyword: string, 
  description: string, 
  path: string,
  overrides?: Partial<Metadata>
): Metadata {
  const url = `${baseUrl}${path}`
  const ogImage = `${baseUrl}/og/${pageSlug}.jpg`

  return {
    title: `${titleKeyword} | Da Marci & Loki — Toelettatura Parma`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${titleKeyword} | Da Marci & Loki`,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: titleKeyword }],
      locale: 'it_IT',
      type: 'website',
    },
    ...overrides
  }
}

/**
 * ROOT LAYOUT — LocalBusiness (AnimalGroomingSalon)
 */
export function generateLocalBusinessLD() {
  return {
    "@context": "https://schema.org",
    "@type": "AnimalGroomingSalon",
    "name": "Da Marci & Loki — Toelettatura",
    "description": "Toelettatura professionale cani a Parma. Addestratore cinofilo certificato.",
    "url": baseUrl,
    "telephone": "+39 375 9893189",
    "email": "info@damarcieloki.it",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Piazzale della Pace, 10",
      "addressLocality": "Parma",
      "addressRegion": "PR",
      "postalCode": "43121",
      "addressCountry": "IT"
    },
    "geo": { 
      "@type": "GeoCoordinates", 
      "latitude": 44.8015, 
      "longitude": 10.3279 
    },
    "hasMap": "https://maps.google.com/?q=Piazzale+della+Pace+10+Parma",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 44.8015, "longitude": 10.3279 },
      "geoRadius": "15000"
    },
    "priceRange": "€€",
    "image": `${baseUrl}/og/default.jpg`
  }
}

/**
 * PAGINA SERVIZI — per ogni servizio
 */
export function generateServiceLD(servizio: Servizio) {
  return {
    "@type": "Service",
    "name": servizio.nome,
    "description": servizio.descrizione,
    "provider": { 
      "@type": "LocalBusiness", 
      "name": "Da Marci & Loki" 
    },
    "areaServed": { 
      "@type": "City", 
      "name": "Parma" 
    }
  }
}

/**
 * BREADCRUMB su ogni pagina interna
 */
export function generateBreadcrumbLD(crumbs: { name: string, path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      ...crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.name,
        "item": `${baseUrl}${crumb.path}`
      }))
    ]
  }
}

/**
 * PAGINA FAQ
 */
export function generateFAQPageLD(faqs: { q: string, a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }
}
