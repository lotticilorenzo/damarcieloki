import React from 'react'
import { Metadata } from 'next'
import { BookingForm } from '@/components/forms/BookingForm'
import { LokiSticker } from '@/components/ui/LokiSticker'
import { MapPin, EnvelopeSimple, Clock, MapTrifold } from '@phosphor-icons/react/dist/ssr'
import { generateMetadataHelper, generateBreadcrumbLD } from '@/lib/seo'

export const metadata: Metadata = generateMetadataHelper(
  'contatti',
  'Contatti e Prenotazioni',
  'Prenota il tuo appuntamento per la toelettatura a Parma. Ci trovi in Piazzale della Pace 10. Chiamaci o scrivici su WhatsApp per fissare la sessione del tuo cane.',
  '/contatti'
)

export default function ContattiPage() {
  const breadcrumbLD = generateBreadcrumbLD([{ name: 'Contatti', path: '/contatti' }])

  return (
    <main className="flex flex-col min-h-[100dvh] pt-32 pb-24 md:pb-32 bg-bg-alt overflow-x-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      <div className="max-w-[1240px] mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Header Sezione Visiva Introduttiva */}
        <div className="mb-16 md:mb-24 text-center mt-4">
          <h1 className="font-heading font-black text-brown text-[clamp(44px,6vw,68px)] leading-[1.0] tracking-tight mb-6">
            Parliamo del tuo cane.
          </h1>
          <p className="font-sans text-text-sec text-[18px] md:text-[21px] font-medium max-w-[48ch] mx-auto text-balance leading-[1.65]">
            Siamo a Parma, proprio dove c&apos;è bisogno di una marea di coccole per cani. Contattaci e porta il tuo fidato amico a farsi bello.
          </p>
        </div>

        {/* Impaginazione 2 Colonne (Info vs Form) */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          
          {/* LATO SINISTRO: Recap Info Aziendali & Mappa (45%) */}
          <div className="w-full lg:w-[45%] flex flex-col gap-12">
            
            {/* Grid Dati Strutturata (Info contatti fisici e telematici) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              
              <div className="bg-white p-6 md:p-8 rounded-[28px] shadow-[0_4px_20px_rgba(106,58,42,0.06)] border border-border flex items-start gap-5 hover:border-orange/20 transition-colors">
                <div className="w-14 h-14 rounded-[20px] bg-orange-light text-orange flex items-center justify-center shrink-0">
                  <MapPin size={28} weight="duotone" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-brown text-[20px] mb-1">Dove siamo</h2>
                  <p className="font-sans text-text-sec text-[16px] md:text-[17px] font-medium leading-[1.6]">
                    Piazzale della Pace, 10<br />
                    43121 Parma (PR)
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[28px] shadow-[0_4px_20px_rgba(106,58,42,0.06)] border border-border flex items-start gap-5 hover:border-teal/20 transition-colors">
                <div className="w-14 h-14 rounded-[20px] bg-teal-light text-teal flex items-center justify-center shrink-0">
                  <EnvelopeSimple size={28} weight="duotone" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-brown text-[20px] mb-1">Scrivimi</h2>
                  <a href="mailto:info@damarcieloki.it" className="font-sans text-text-sec text-[16px] md:text-[17px] font-medium leading-[1.6] hover:text-orange transition-colors">
                    info@damarcieloki.it
                  </a>
                  <p className="font-sans text-text-sec text-[16px] md:text-[17px] font-medium leading-[1.6] mt-0.5">
                    +39 375 9893189
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[28px] shadow-[0_4px_20px_rgba(106,58,42,0.06)] border border-border flex items-start gap-5 sm:col-span-2 lg:col-span-1 hover:border-brown/20 transition-colors">
                <div className="w-14 h-14 rounded-[20px] bg-brown-light text-brown flex items-center justify-center shrink-0">
                  <Clock size={28} weight="duotone" />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <h2 className="font-heading font-bold text-brown text-[20px]">Orari di apertura</h2>
                  <p className="font-sans text-[14px] md:text-[15px] text-orange font-bold uppercase tracking-wider bg-orange-light px-3 py-1.5 rounded-lg w-fit mt-1 border border-orange/10">
                    Contattami per gli orari
                  </p>
                </div>
              </div>

            </div>

            {/* Google Maps iFrame Wrapper - Come da requisiti (Placeholder) */}
            <div className="w-full aspect-[4/3] md:aspect-video lg:aspect-square bg-[rgba(240,232,221,0.5)] rounded-[32px] border-2 border-dashed border-border/80 flex flex-col items-center justify-center relative overflow-hidden group">
              {/* L'iframe vuoto risiede strutturalmente per accessibilità, invisibile dietro i placeholder */}
              <iframe 
                 src="about:blank"
                 className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                 title="Mappa in arrivo" 
                 aria-hidden="true" 
              />
              
              {/* Visivamente il vero placeholder decorativo come discusso */}
              <MapTrifold size={52} weight="duotone" className="text-orange opacity-[0.35] mb-4 group-hover:scale-110 group-hover:opacity-60 transition-all duration-500" />
              <span className="font-heading font-extrabold text-brown text-[22px] opacity-80">Mappa in arrivo</span>
              <p className="font-sans text-[15px] text-text-sec mt-2 opacity-70 font-medium">
                L&apos;integrazione Google Maps verrà sbloccata qui.
              </p>
            </div>

          </div>

          {/* LATO DESTRO: Form Prenotazione Espanso (55%) */}
          <div className="w-full lg:w-[55%] flex justify-center lg:pt-0 relative">
            <div className="w-full max-w-[640px] relative">
              {/* Sticker Loki che emerge dall'incavo destro del form in stile playful */}
              <div className="absolute -top-[70px] md:-top-[60px] md:-right-[30px] z-20 pointer-events-none transform scale-[0.85] md:scale-100 hidden sm:block">
                <LokiSticker expression="happy" size="md" className="drop-shadow-[0_12px_24px_rgba(42,122,123,0.3)]" />
              </div>
              
              <BookingForm />
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
