import React from 'react'
import { Metadata } from 'next'
import { servizi } from '@/data/services'
import Image from 'next/image'
import { BookingForm } from '@/components/forms/BookingForm'
import { FaqSection } from '@/components/sections/FaqSection'
import { 
  CheckCircle, 
  Info, 
  PawPrint,
  Drop,
  Scissors,
  HandPointing,
  ArrowsCounterClockwise,
  FirstAid,
  ArrowRight
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
          Nessuna fretta. Nessun compromesso sulla qualità finale. <br className="hidden md:block"/>
          Scegli il servizio perfetto per il manto del tuo migliore amico.
        </p>
      </section>

      {/* Rassegna dei Servizi in formato "Magazine Z-Pattern" */}
      <section className="px-6 md:px-12 max-w-[1200px] mx-auto w-full flex flex-col gap-24 md:gap-32 relative z-10">
        {servizi.map((s, index) => {
          const IconMap: Record<string, React.ElementType> = { Drop, Scissors, HandPointing, ArrowsCounterClockwise, FirstAid }
          const Icon = IconMap[s.icon] || PawPrint
          
          const classMaps = {
            orange: { text: 'text-orange', bg: 'bg-orange-light', border: 'border-orange', borderLight: 'border-orange-dark/10' },
            teal: { text: 'text-teal', bg: 'bg-teal-light', border: 'border-teal', borderLight: 'border-teal-dark/10' },
            brown: { text: 'text-brown', bg: 'bg-brown-light', border: 'border-brown', borderLight: 'border-brown/10' }
          }
          
          const theme = classMaps[s.colorAccent] || classMaps.orange
          let badgeTheme = classMaps.orange
          if (s.badge === 'su-prescrizione') badgeTheme = classMaps.teal
          if (s.badge === 'per-esperti') badgeTheme = classMaps.brown

          const isEven = index % 2 === 0
          
          // Image mapping
          const imageMap: Record<string, string> = {
            'bagno': '/images/srv_bagno.png',
            'taglio-forbice': '/images/srv_taglio_forbice.png',
            'stripping': '/images/srv_stripping.png',
            'snodatura': '/images/srv_snodatura.png',
            'bagno-medicato': '/images/srv_bagno_medicato.png',
          }
          const imageSrc = imageMap[s.slug] || '/images/hero.png'

          return (
            <article 
              key={s.id} 
              id={s.slug} 
              className={`flex flex-col gap-10 scroll-mt-[120px] ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center`}
            >
              
              {/* Blocco Immagine */}
              <div className="w-full lg:w-1/2 relative group">
                <div className={`absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent rounded-[40px] md:rounded-[56px] ${isEven ? 'translate-x-[12px] translate-y-[12px]' : '-translate-x-[12px] translate-y-[12px]'}`}></div>
                <div className={`w-full aspect-[4/3] lg:aspect-[6/5] rounded-[40px] md:rounded-[56px] overflow-hidden relative border-8 border-white shadow-[0_24px_48px_rgba(106,58,42,0.12)] transform-gpu transition-transform duration-700 hover:scale-[1.01]`}>
                  <Image 
                    src={imageSrc}
                    alt={s.nome}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Etichetta Icona sull'immagine */}
                  <div className={`absolute bottom-6 ${isEven ? 'left-6' : 'right-6'} w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-[24px] bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg border-[3px] border-white`}>
                    <Icon size={40} weight="duotone" className={theme.text} />
                  </div>
                </div>
              </div>
              
              {/* Blocco Testo */}
              <div className="w-full lg:w-1/2 flex flex-col pt-2 lg:px-8">
                
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                  <h2 className="font-heading font-extrabold text-brown text-[32px] md:text-[44px] leading-tight pr-2 tracking-tight">
                    {s.nome}
                  </h2>
                  {s.badge && (
                    <span className={`px-4 py-1.5 font-sans font-bold text-[12px] uppercase tracking-widest rounded-full self-start md:mt-2 ${badgeTheme.text} ${badgeTheme.bg} shadow-sm border border-white/50`}>
                      {s.badge.replace('-', ' ')}
                    </span>
                  )}
                </div>
                
                <span className={`inline-block font-sans font-bold text-[15px] md:text-[17px] uppercase tracking-[0.14em] mb-6 ${theme.text}`}>
                  {s.tagline}
                </span>
                
                <p className="font-sans text-text-sec text-[17px] md:text-[19px] leading-[1.8] mb-10 max-w-[55ch] font-medium text-balance">
                  {s.descrizione}
                </p>
                
                <ul className="flex flex-col gap-4 mb-10 pl-1">
                  {s.dettagli.map((d, i) => (
                    <li key={i} className="flex items-start gap-4 font-sans text-text-sec text-[16px] md:text-[17px] leading-relaxed font-medium">
                      <CheckCircle size={28} weight="fill" className={`${theme.text} shrink-0 mt-[1px] opacity-90 drop-shadow-sm`} />
                      <span className="opacity-90">{d}</span>
                    </li>
                  ))}
                </ul>

                <div className={`rounded-[24px] p-6 mb-12 border ${theme.borderLight} bg-white flex items-start sm:items-center gap-5 shadow-sm`}>
                  <Info size={36} weight="duotone" className={`${theme.text} shrink-0 mt-0.5 sm:mt-0 opacity-100`} />
                  <span className="font-sans text-[16px] md:text-[17px] font-medium text-text-sec leading-snug">
                    <strong className={`tracking-wide mr-2 ${theme.text}`}>PER CHI:</strong> {s.perChi}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6 mt-auto">
                  <a 
                    href={`?s=${s.slug}#prenota-ora`}
                    className={`inline-flex items-center justify-center gap-3 bg-white border-2 border-border ${theme.text} rounded-full px-[32px] py-[18px] font-sans font-extrabold text-[17px] md:text-[18px] shadow-sm hover:border-transparent hover:bg-bg-alt hover:shadow-md transition-all group`}
                  >
                    <span>Prenota questo servizio</span>
                    <ArrowRight size={20} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              
            </article>
          )
        })}
      </section>

      {/* Sezione FAQ */}
      <FaqSection />

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
