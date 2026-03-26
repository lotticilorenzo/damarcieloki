import React from 'react'
import { Metadata } from 'next'
import { LokiSticker } from '@/components/ui/LokiSticker'
import { PawPrint } from '@/components/ui/PawPrint'
import { PawDivider } from '@/components/ui/PawDivider'
import { MarciImage } from '@/components/ui/MarciImage'
import Image from 'next/image'
import { generateMetadataHelper, generateBreadcrumbLD } from '@/lib/seo'
import { images } from '@/lib/images'
import { handleWhatsAppClick } from '@/lib/utils'

export const metadata: Metadata = generateMetadataHelper(
  'chi-sono',
  'Marco Addestratore e Toelettatore | Da Marci & Loki Parma',
  'Conosci Marco, addestratore cinofilo e toelettatore a Parma. La cura del pelo unita alla cura del comportamento del tuo cane in salone. Anche Loki approva di gusto!',
  '/chi-sono'
)

export default function ChiSonoPage() {
  const breadcrumbLD = generateBreadcrumbLD([{ name: 'Chi Sono', path: '/chi-sono' }])

  return (
    <main className="flex flex-col min-h-[100dvh] pt-32 pb-16 md:pb-24 bg-bg overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      
      {/* 1. Hero Personal Branding */}
      <section className="px-6 md:px-12 max-w-[1000px] mx-auto w-full mb-16 md:mb-32">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full sm:pt-4">
            <h1 className="font-heading font-black italic text-brown text-[clamp(48px,8vw,90px)] leading-[1.0] mb-6 drop-shadow-sm pr-2">
              Sono Marci.
            </h1>
            <p className="font-sans text-text-sec text-[18px] md:text-[21px] font-medium leading-[1.6] max-w-[45ch] mx-auto md:mx-0 text-balance">
              Sono Marci, <span className="font-semibold text-brown">addestratore cinofilo Parma</span> prima e toelettatore poi. Perché pettinare un cane terrorizzato non ha senso — e decisamente non è il mio stile.
            </p>
          </div>
          
          <div className="shrink-0 relative group mt-8 md:mt-0 h-[360px] sm:h-[380px] md:h-[460px] w-full max-w-[280px] sm:max-w-[300px] md:max-w-none md:w-[380px] self-center">
            {/* Box contenitivo Principale */}
            <div className="absolute top-0 right-0 w-[220px] sm:w-[240px] h-[300px] sm:h-[320px] md:w-[280px] md:h-[380px] rounded-[40px] md:rounded-[48px] overflow-hidden rotate-3 hover:rotate-6 transition-transform duration-500 shadow-[0_24px_48px_rgba(106,58,42,0.12)] bg-bg-alt border-4 border-white z-10">
              <Image 
                src="/images/story_3.png"
                alt="Marco toelettatore cani al lavoro a Parma"
                fill
                priority={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            
            {/* Box Secondario Overlap (Placeholder Persona/Cane) */}
            <div className="absolute bottom-0 left-0 w-[180px] sm:w-[200px] h-[200px] sm:h-[220px] md:w-[240px] md:h-[260px] rounded-[32px] overflow-hidden -rotate-6 hover:-rotate-2 transition-transform duration-500 shadow-[-10px_20px_40px_rgba(106,58,42,0.15)] bg-orange-light border-4 border-white z-20 flex items-center justify-center">
              <Image 
                src={images.grooming.poodleBefore || '/images/hero.png'}
                alt="Cane e toelettatore (Placeholder)"
                fill
                className="object-cover opacity-90"
                sizes="240px"
              />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            </div>

            {/* Sticker Loki Sovrapposto */}
            <div className="absolute -bottom-4 right-4 md:-bottom-2 md:right-8 z-30 hover:scale-110 transition-transform duration-300">
               <div className="bg-white p-3 rounded-[32px] shadow-lg border-2 border-border rotate-6">
                  <LokiSticker expression="curious" size="md" />
               </div>
            </div>

            {/* Impronta arancio decorativa */}
            <div className="absolute -top-6 -left-6 opacity-80 pointer-events-none transform -rotate-12 scale-110">
              <PawPrint size="lg" color="orange-light" angle={45} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Approccio Emotivo (Sfondo scuro) */}
      <section className="px-6 md:px-12 py-16 md:py-32 bg-brown text-white w-full relative z-10 shadow-xl border-y-[6px] border-[#5A2F22]">
        {/* Pattern Zampettoso fuso in Overlay */}
        <PawDivider className="absolute top-0 left-0 right-0 w-full opacity-30 mix-blend-overlay flex justify-center mt-[-30px]" />
        
        <div className="max-w-[840px] mx-auto relative z-10 text-center md:text-left">
          <h2 className="font-heading font-black text-[36px] md:text-[52px] mb-10 text-white tracking-tight leading-[1.1]">
            Il mio approccio
          </h2>
          <div className="font-sans text-[18px] md:text-[20px] text-[rgba(255,255,255,0.92)] leading-[1.7] space-y-8 font-medium">
            <p className="text-balance">
              Diciamocelo chiaro: i cani non sono peluche da mettere sul tavolo. Hanno ansie, paure, zone intoccabili e giornate storte. Proprio come noi (solo che loro hanno una scusa decisamente migliore).
            </p>
            <p className="text-balance font-bold bg-[rgba(255,255,255,0.06)] rounded-2xl p-6 md:p-8 border border-[rgba(240,232,221,0.15)] shadow-[inset_0_2px_12px_rgba(0,0,0,0.1)] my-10">
              Nel mio salone unisco le mie competenze di <span className="text-orange whitespace-nowrap px-1">addestratore certificato</span> a quelle da toelettatore. <br className="hidden md:block" />
              Cosa significa? Semplicemente che i &quot;cani difficili&quot;, quelli che odiano l'acqua o la spazzola e che mordicchiano l'aria, non sono un problema per me: le sfide sono il mio pane quotidiano! Prima conquisto la loro fiducia e rispetto i loro tempi in assoluta calma, e solo dopo sistemo il pelo in base a quello che mi concedono. Nessuno stress, nessuna forzatura.
            </p>
            <p className="text-balance italic opacity-85 pt-2">
              E Loki? Lui è il mio assistente operativo, supervisore ed ispettore qualità dalla sua cuccia vip. Se passi il suo infallibile test di annusata pre-ingresso, sei ufficialmente considerato uno di noi.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Il mio percorso (Timeline Arricchita) */}
      <section className="px-6 md:px-12 py-20 md:py-32 max-w-[840px] mx-auto w-full relative">
        <h2 className="font-heading font-extrabold text-brown text-[32px] md:text-[44px] mb-16 md:mb-20 text-center tracking-tight">
          Come sono arrivato fin qui
        </h2>
        
        {/* Timeline verticale con linea tratteggiata arancione */}
        <div className="flex flex-col gap-16 border-l-[4px] border-dashed border-[rgba(212,88,26,0.3)] ml-4 md:ml-12 pl-10 md:pl-16 relative py-4">
          {[
            { y: '2009', t: 'Il primo cane entra in casa', d: 'Da lì capisci che non si torna più indietro. Ne entra uno, e scopro immediatamente che il mondo gira molto meglio quando hai una coda affianco a te sul divano. La passione cinofila sboccia rapidamente e prende letteralmente il sopravvento nella mia vita.' },
            { y: '2023', t: 'Addestratore Cinofilo', d: 'Inizio lo studio matto e disperato. Teoria in aula, pratica all\'aperto al freddo sotto l\'acqua, tanto sudore e infiniti cani di ogni razza e tempra. Imparo a leggere i loro segnali calmanti prima ancora che abbaino, e scopro come comunicare con loro usando esclusivamente la postura e l\'energia, senza inutili fiumi di parole.' },
            { y: '2025', t: 'Il diploma ufficiale', d: 'Il traguardo è raggiunto. Il patentino ENCI/CSEN nero su giallo è in tasca! Ma capisco subito che è solo una rampa di lancio: la gestione comportamentale del cane dev\'essere la solida base per offrire qualcosa di tangibile e speciale a Parma.' },
            { y: 'Gennaio 2026', t: 'L\'arte della toelettatura', d: 'È qui che decido di unire i puntini. Studio come combinare la psicologia animale alle forbici dentate. Imparo la tecnica pura e le perfette angolature per valorizzare ogni tipo di manto: dallo stripping a mano richiesto per i Terrier, fino alle snodature che sembravano impossibili.' },
            { y: 'Giugno 2026', t: 'Apre Da Marci & Loki', d: 'Il sogno diventa finalmente progetto. Mattoni, vasche rialzate ergonomiche, tanta acqua rigorosamente a temperatura perfetta e zero gabbie ad attendervi. Piazzale della Pace ospita ufficialmente il mio (e il vostro) nuovo rifugio di fiducia.' }
          ].map((m, i) => (
            <div key={i} className="relative group pt-1 cursor-default">
              
              {/* Nodo Tema: Pallino arancione con bordo bianco */}
              <div className="absolute -left-[54.5px] md:-left-[78.5px] top-2 w-[22px] h-[22px] md:w-[26px] md:h-[26px] rounded-full bg-orange border-[5px] md:border-[6px] border-white shadow-md group-hover:scale-[1.4] transition-all duration-300 transform-gpu z-10" />
              
              <div className="font-mono text-orange text-[15px] md:text-[16px] font-black tracking-[0.15em] uppercase mb-2">
                {m.y}
              </div>
              
              <h3 className="font-heading font-black text-brown text-[26px] md:text-[32px] leading-[1.2] mb-4">
                {m.t}
              </h3>
              <p className="font-sans text-text-sec text-[16px] md:text-[18px] leading-[1.8] font-medium text-balance opacity-90 transition-opacity group-hover:opacity-100 max-w-[55ch]">
                {m.d}
              </p>

            </div>
          ))}
          
          {/* Zampina decorativa a fine linea */}
          <div className="absolute -left-[58px] md:-left-[84px] -bottom-8 bg-bg w-10 h-10 flex items-center justify-center">
            <PawPrint size="sm" color="brown" angle={15} />
          </div>
        </div>
      </section>

      {/* 4. CTA Finale WhatsApp + Internal Link */}
      <section className="px-6 md:px-12 flex flex-col items-center justify-center pb-12 w-full pt-16 border-t-[2px] border-dashed border-[rgba(240,232,221,0.8)] gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href="https://wa.me/393759893189?text=Ciao%20Marci,%20ho%20visto%20la%20tua%20storia%20sul%20sito!%20Vorrei%20portarti%20il%20mio%20cane..." 
            onClick={(e) => handleWhatsAppClick(e, "Ciao Marci, ho visto la tua storia sul sito! Vorrei portarti il mio cane...")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-orange text-white rounded-full px-[40px] py-[20px] font-sans font-extrabold text-[18px] md:text-[20px] tracking-wide hover:bg-orange-dark hover:scale-105 active:scale-[0.98] transition-all outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-orange shadow-[0_16px_40px_rgba(212,88,26,0.3)] hover:shadow-[0_20px_48px_rgba(212,88,26,0.4)]"
          >
            Scrivimi su WhatsApp
          </a>
          <a 
            href="/servizi" 
            className="inline-flex items-center justify-center bg-white border-2 border-border text-brown rounded-full px-[32px] py-[18px] font-sans font-bold text-[17px] md:text-[18px] hover:border-orange-light hover:bg-bg-alt transition-all"
          >
            Scopri i miei servizi
          </a>
          <a 
            href="/contatti" 
            className="inline-flex items-center justify-center text-brown font-sans font-bold hover:text-orange hover:underline transition-colors"
          >
            Oppure vieni a trovarmi
          </a>
        </div>
      </section>
    </main>
  )
}
