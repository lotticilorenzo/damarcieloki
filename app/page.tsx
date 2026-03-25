import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { StorySection } from '@/components/sections/StorySection'
import { CounterSection } from '@/components/sections/CounterSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { WhyMarciSection } from '@/components/sections/WhyMarciSection'
import { DogBreedsSection } from '@/components/sections/DogBreedsSection'
import { BeforeAfterSection } from '@/components/sections/BeforeAfterSection'
import { LokiDiarySection } from '@/components/sections/LokiDiarySection'
import { HorizontalGallery } from '@/components/sections/HorizontalGallery'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { BookingCtaSection } from '@/components/sections/BookingCtaSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { PawDivider } from '@/components/ui/PawDivider'
import { MarqueeText } from '@/components/ui/MarqueeText'

// 1. Metadata dedicato e ottimizzato specificamente per la Home Page
export const metadata: Metadata = {
  title: 'Toelettatura Cani Parma | Da Marci & Loki — Dove ogni cane è speciale',
  description: 'Cerchi una toelettatura per cani a Parma? Da Marci & Loki offre bagni medicati, stripping e taglio a forbice. Tutto l\'amore e il tempo che il cane merita.',
  alternates: {
    canonical: 'https://damarcieloki.it',
  },
  openGraph: {
    title: 'Toelettatura Cani Parma | Da Marci & Loki',
    description: 'Cerchi una toelettatura per cani a Parma? Da Marci & Loki offre bagni medicati, stripping e taglio a forbice.',
    url: 'https://damarcieloki.it',
    siteName: 'Da Marci & Loki',
    images: [
      {
        url: 'https://damarcieloki.it/og/homepage.jpg',
        width: 1200,
        height: 630,
        alt: 'Da Marci & Loki — Toelettatura Cani Parma',
      },
    ],
    locale: 'it_IT',
    type: 'website',
  },
}

// 2. Dati Strutturati SEO ultra-speficifici
const generateJsonLd = () => {
  return {
    "@context": "https://schema.org",
    "@type": "PetGrooming",
    "name": "Da Marci & Loki",
    "image": "https://damarcieloki.it/og/homepage.jpg",
    "url": "https://damarcieloki.it",
    "telephone": "+393759893189",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Piazzale della Pace 10",
      "addressLocality": "Parma",
      "postalCode": "43121",
      "addressCountry": "IT"
    },
    // Coordinate e Orari (valori ipotetici ideali da aggiornare in fase live ma essenziali x SEO locale schema)
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.8016, 
      "longitude": 10.3280 
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "description": "Salone di toelettatura per cani a Parma gestito da un addestratore cinofilo qualificato.",
    "priceRange": "$$"
  };
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd()) }}
      />

      {/* 1. HeroSection (bg: #FFFDF8) */}
      <HeroSection />

      {/* 2. PawDivider */}
      <div className="bg-bg-alt flex justify-center w-full fill-current">
        <PawDivider className="opacity-80" />
      </div>

      <MarqueeText text="TOELETTATURA • ADDESTRAMENTO • BENESSERE • AMORE" className="bg-orange text-white" speed={30} />

      {/* 3. StorySection (bg: #FFF5EC) */}
      <StorySection />

      {/* 4. CounterSection (bg: #FFF5EC) */}
      <CounterSection />

      {/* 5. PawDivider */}
      <div className="bg-bg flex justify-center w-full">
        <PawDivider className="opacity-80 scale-90 md:scale-100 transform-gpu" />
      </div>

      {/* 5. ServicesSection (bg: #FFFDF8) */}
      <ServicesSection />

      {/* 6. PawDivider */}
      <div className="bg-brown flex justify-center w-full overflow-hidden">
        <PawDivider className="opacity-30 scale-90 md:scale-100" />
      </div>

      {/* 7. WhyMarciSection (bg: #6B3A2A, forte) */}
      <WhyMarciSection />

      {/* 8. PawDivider (colori chiari su scuro) */}
      <div className="bg-bg-alt flex justify-center w-full">
        <PawDivider className="opacity-60 scale-90 md:scale-100" />
      </div>

      {/* Insert DogBreedsSection before ProcessSection */}
      <DogBreedsSection />
      
      <HorizontalGallery />
      
      <BeforeAfterSection />
      <LokiDiarySection />

      {/* 9. ProcessSection (bg: #FFF5EC) */}
      <ProcessSection />

      {/* 10. PawDivider */}
      <div className="bg-[var(--orange)] flex justify-center w-full">
        <PawDivider className="opacity-[0.25] scale-90 md:scale-100 filter drop-shadow-sm mix-blend-overlay" />
      </div>

      <FaqSection />

      {/* 11. TestimonialsSection */}
      <TestimonialsSection />

      {/* 12. BookingCtaSection (bg: #D4581A, forte) */}
      <BookingCtaSection />
      
      {/* Testo SEO Geografico leggibile */}
      <div className="bg-bg py-8 border-t border-border/50 text-center">
        <p className="font-sans text-text-muted text-sm md:text-base px-6">
          Il salone si trova in <span className="font-semibold text-brown">Piazzale della Pace 10, a Parma</span> — facilmente raggiungibile dal centro.
        </p>
      </div>
    </main>
  )
}
