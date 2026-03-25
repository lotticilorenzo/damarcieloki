import React from 'react'
import { Metadata } from 'next'
import { servizi } from '@/data/services'
import { BookingForm } from '@/components/forms/BookingForm'
import { 
  CheckCircle, 
  Info, 
  PawPrint,
  Drop,
  Scissors,
  HandPointing,
  ArrowsCounterClockwise,
  FirstAid
} from '@phosphor-icons/react/dist/ssr'

import { generateMetadataHelper, generateServiceLD, generateBreadcrumbLD } from '@/lib/seo'

export const metadata: Metadata = generateMetadataHelper(
  'servizi',
  'Servizi di Toelettatura Cani Parma',
  'Toelettatura professionale a Parma: Bagno, Taglio a forbice, Stripping, Snodatura e Bagno Medicato. Scopri come Marci si prende cura del pelo del tuo cane.',
  '/servizi'
)

const generateServicesSchema = () => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...servizi.map(s => (generateServiceLD(s))),
      generateBreadcrumbLD([{ name: 'Servizi', path: '/servizi' }])
    ]
  }
}

export default function ServiziPage({ searchParams }: { searchParams: { s?: string } }) {
  // L'estrazione via searchParams nel server component abilita lo smistamento parametrico
  // e al tempo stesso non rinuncia completamente ai benefit base SEO.
  const defaultServiceParam = (searchParams?.s as string) || 'bagno'
  const validSlugs = ['bagno', 'taglio-forbice', 'stripping', 'snodatura', 'bagno-medicato']
  const targetService = validSlugs.includes(defaultServiceParam) ? defaultServiceParam : 'bagno'

  return (
    <main className="flex flex-col min-h-[100dvh] pt-32 pb-24 bg-bg overflow-x-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServicesSchema()) }} />

      {/* Titolo Principale della Rassegna */}
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto w-full mb-16 md:mb-24 text-center">
        <h1 className="font-heading font-black text-brown text-[clamp(44px,6vw,64px)] leading-[1.05] tracking-tight mb-6 mt-4">
          Cosa facciamo. E bene.
        </h1>
        <p className="font-sans text-text-sec text-[18px] md:text-[21px] max-w-[48ch] mx-auto text-balance leading-relaxed">
          Nessuna fretta. Nessun compromesso sulla qualità finale. Scegli il servizio perfetto per il manto del tuo migliore amico.
        </p>
      </section>

      {/* Rassegna dei Servizi estesa in formato Long-Form */}
      <section className="px-6 md:px-12 max-w-[960px] mx-auto w-full flex flex-col gap-12 md:gap-16 relative z-10">
        {servizi.map((s) => {
          const IconMap: Record<string, React.ElementType> = {
            Drop,
            Scissors,
            HandPointing,
            ArrowsCounterClockwise,
            FirstAid,
            PawPrint
          }
          const Icon = IconMap[s.icon] || PawPrint
          
          // Tailwind dynamic composition map for tailwind extractor
          const classMaps = {
            orange: { text: 'text-orange', bg: 'bg-orange-light' },
            teal: { text: 'text-teal', bg: 'bg-teal-light' },
            brown: { text: 'text-brown', bg: 'bg-brown-light' }
          }
          
          const iconColors = classMaps[s.colorAccent] || classMaps.orange
          let badgeColors = classMaps.orange
          if (s.badge === 'su-prescrizione') badgeColors = classMaps.teal
          if (s.badge === 'per-esperti') badgeColors = classMaps.brown

          return (
            <article 
              key={s.id} 
              id={s.slug} 
              className="flex flex-col md:flex-row gap-8 md:gap-12 bg-white p-8 md:p-12 md:pb-16 rounded-[32px] md:rounded-[40px] shadow-[0_12px_36px_rgba(106,58,42,0.06)] border border-border scroll-mt-[120px] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(106,58,42,0.09)] hover:border-[rgba(240,232,221,0.9)]"
            >
              
              {/* Box Icona Laterale */}
              <div className="shrink-0 flex flex-col items-start gap-4">
                <div className={`w-[88px] h-[88px] rounded-[28px] flex items-center justify-center shadow-sm ${iconColors.text} ${iconColors.bg}`}>
                  <Icon size={44} weight="duotone" />
                </div>
              </div>
              
              {/* Corpo Descrittivo Completo */}
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                  <h2 className="font-heading font-extrabold text-brown text-[28px] md:text-[34px] leading-tight pr-2">
                    {s.nome}
                  </h2>
                  {s.badge && (
                    <span className={`px-4 py-1.5 font-sans font-bold text-[11px] uppercase tracking-widest rounded-full self-start sm:mt-1.5 ${badgeColors.text} ${badgeColors.bg}`}>
                      {s.badge.replace('-', ' ')}
                    </span>
                  )}
                </div>
                
                <span className="inline-block font-sans font-bold text-orange text-[14px] md:text-[15px] uppercase tracking-[0.14em] mb-6 drop-shadow-sm">
                  {s.tagline}
                </span>
                
                <p className="font-sans text-text-sec text-[16px] md:text-[17px] leading-[1.7] mb-10 max-w-[65ch] font-medium">
                  {s.descrizione}
                </p>
                
                <h3 className="font-heading font-bold text-brown text-[19px] md:text-[21px] mb-5">
                  Il trattamento include step-by-step:
                </h3>
                <ul className="flex flex-col gap-3 mb-10 pl-1">
                  {s.dettagli.map((d, i) => (
                    <li key={i} className="flex items-start gap-4 font-sans text-text-sec text-[15px] md:text-[16px] leading-relaxed font-medium">
                      <CheckCircle size={24} weight="fill" className="text-teal shrink-0 mt-[1px] opacity-85 shadow-sm" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-bg-alt rounded-[20px] p-6 mb-12 border border-[rgba(240,232,221,0.8)] flex items-start sm:items-center gap-4 shadow-[inset_0_2px_12px_rgba(106,58,42,0.015)]">
                  <Info size={32} weight="duotone" className="text-orange shrink-0 mt-0.5 sm:mt-0 opacity-90" />
                  <span className="font-sans text-[15px] md:text-[16px] font-medium text-brown leading-snug">
                    <strong className="tracking-wide text-orange">IL CANDIDATO PERFETTO:</strong> {s.perChi}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
                  <a 
                    href="/contatti"
                    className="font-sans font-bold text-teal hover:underline text-[15px] md:text-[16px]"
                  >
                    Chiedi info per {s.nome}
                  </a>
                  <a 
                    href="/prezzi"
                    className="font-sans font-bold text-text-muted hover:text-brown text-[15px] md:text-[16px]"
                  >
                    Vedi listino prezzi
                  </a>
                </div>

                {/* Pulsante Prenotazione Relativizzato -> Aggiorna l'url e trigga lo scrollTo target form */}
                <a 
                  href={`?s=${s.slug}#prenota-ora`}
                  className="inline-flex items-center font-sans font-extrabold text-orange text-[17px] md:text-[19px] hover:text-orange-dark group w-fit outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-orange rounded"
                >
                  <span className="border-b-[3px] border-orange/40 group-hover:border-orange-dark pb-0.5 transition-colors">
                    Prenota questo servizio
                  </span>
                  <span className="ml-[8px] font-mono font-bold text-[22px] group-hover:translate-x-[6px] transition-transform">
                    →
                  </span>
                </a>
              </div>
            </article>
          )
        })}
      </section>

      {/* Booking Form Condiviso a fine pagina collegato via prop 'targetService' */}
      <section id="prenota-ora" className="px-6 md:px-12 max-w-[680px] mx-auto w-full mt-32 md:mt-40 scroll-mt-[100px] relative z-20">
        <h2 className="font-heading font-extrabold text-brown text-[36px] md:text-[42px] mb-12 text-center tracking-tight">
          Fissa un appuntamento
        </h2>
        <BookingForm initialService={targetService as 'bagno' | 'taglio-forbice' | 'stripping' | 'snodatura' | 'bagno-medicato'} />
      </section>

    </main>
  )
}
