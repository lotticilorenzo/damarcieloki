import React from 'react'
import { Metadata } from 'next'
import { LokiSticker } from '@/components/ui/LokiSticker'
import { PawPrint } from '@/components/ui/PawPrint'
import { PawDivider } from '@/components/ui/PawDivider'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { generateMetadataHelper, generateBreadcrumbLD } from '@/lib/seo'
import { images } from '@/lib/images'

export const metadata: Metadata = generateMetadataHelper(
  'chi-sono',
  'Marco Addestratore e Toelettatore | Da Marci & Loki Parma',
  'Conosci Marco, addestratore cinofilo e toelettatore a Parma. La cura del pelo unita alla cura del comportamento del tuo cane in salone. Anche Loki approva di gusto!',
  '/chi-sono'
)

export default function ChiSonoPage() {
  const breadcrumbLD = generateBreadcrumbLD([{ name: 'Chi Sono', path: '/chi-sono' }])

  return (
    <main className="flex flex-col min-h-[100dvh] pt-32 pb-24 bg-bg overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      
      {/* 1. Hero Personal Branding */}
      <section className="px-6 md:px-12 max-w-[1000px] mx-auto w-full mb-24 md:mb-32">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-20">
          <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full sm:pt-4">
            <h1 className="font-heading font-black italic text-brown text-[clamp(48px,8vw,90px)] leading-[1.0] mb-6 drop-shadow-sm pr-2">
              Sono Marci.
            </h1>
            <p className="font-sans text-text-sec text-[18px] md:text-[21px] font-medium leading-[1.6] max-w-[45ch] mx-auto md:mx-0 text-balance">
              Sono Marci, <span className="font-semibold text-brown">addestratore cinofilo Parma</span> prima e toelettatore poi. Perché pettinare un cane terrorizzato non ha senso — e decisamente non è il mio stile.
            </p>
          </div>
          
          <div className="shrink-0 relative group mt-8 md:mt-0">
            {/* Box contenitivo "Foto Marci" (Above Fold) */}
            <div className="w-[280px] h-[360px] md:w-[320px] md:h-[420px] rounded-[48px] overflow-hidden -rotate-2 hover:rotate-1 transition-transform duration-500 shadow-[0_24px_48px_rgba(106,58,42,0.12)] bg-bg-alt border-4 border-white relative z-10">
              <OptimizedImage 
                src={images.hero.marci}
                alt="Marco toelettatore cani al lavoro a Parma"
                fill
                priority={true}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                fallbackText="Marci"
              />
            </div>
            
            {/* Sticker Loki Sovrapposto */}
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 z-20 hover:scale-110 transition-transform duration-300">
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
      <section className="px-6 md:px-12 py-24 md:py-32 bg-brown text-white w-full relative z-10 shadow-xl border-y-[6px] border-[#5A2F22]">
        {/* Pattern Zampettoso fuso in Overlay */}
        <PawDivider className="absolute top-0 left-0 right-0 w-full opacity-30 mix-blend-overlay flex justify-center mt-[-30px]" />
        
        <div className="max-w-[840px] mx-auto relative z-10 text-center md:text-left">
          <h2 className="font-heading font-black text-[36px] md:text-[52px] mb-10 text-white tracking-tight leading-[1.1]">
            Il mio approccio
          </h2>
          <div className="font-sans text-[18px] md:text-[20px] text-[rgba(255,255,255,0.92)] leading-[1.7] space-y-8 font-medium">
            <p className="text-balance">
              I cani non sono peluche da mettere sul tavolo. Hanno ansie, paure, zone intoccabili e giornate storte. Proprio come noi (solo che loro hanno una scusa migliore).
            </p>
            <p className="text-balance font-bold bg-[rgba(255,255,255,0.06)] rounded-2xl p-6 md:p-8 border border-[rgba(240,232,221,0.15)] shadow-[inset_0_2px_12px_rgba(0,0,0,0.1)] my-10">
              Nel mio salone unisco le competenze da <span className="text-orange whitespace-nowrap px-1">addestratore certificato</span> a quelle da toelettatore. <br className="hidden md:block" />
              Questo significa che i &quot;cani difficili&quot; o estremamente ansiosi non sono un problema, ma la sfida che accetto volentieri. Prima conquisto la loro fiducia e rispetto i loro tempi, e solo dopo sistemo il pelo in base a quello che mi concedono in serenità.
            </p>
            <p className="text-balance italic opacity-85 pt-2">
              E Loki? Lui è il vero ispettore qualità dalla sua cuccia. Se passi il suo infallibile check di annusata pre-ingresso, sei ufficialmente considerato uno di famiglia.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Timeline Long-Form Completa */}
      <section className="px-6 md:px-12 py-32 max-w-[900px] mx-auto w-full relative">
        <h2 className="font-heading font-extrabold text-brown text-[36px] md:text-[44px] mb-20 text-center tracking-tight">
          La lunga timeline per arrivare a voi
        </h2>
        
        {/* Linea temporale verticale in stile Long-Form */}
        <div className="flex flex-col gap-14 border-l-[3px] border-[rgba(240,232,221,0.9)] ml-4 md:ml-12 pl-8 md:pl-16 relative">
          {[
            { y: '2009', t: 'Il primo cane entra in casa', d: 'Da lì non si torna indietro. Ne entra uno, e scopro immediatamente che il mondo gira molto meglio quando hai una coda affianco a te sul divano. La passione cinofila sboccia e prende letteralmente il sopravvento sulle altre priorità.' },
            { y: '2023', t: 'Inizio corso addestratore cinofilo', d: 'Studio matto e disperato, teoria in aula, pratica all\'aperto al freddo, sudore e cani. Soprattutto tanti cani di ogni razza e tempra. Imparo a leggere i loro segnali calmanti prima ancora che abbaiano. Imparo a comunicare usando la postura e l\'energia, senza troppe parole inutili.' },
            { y: '2025', t: 'Diploma di addestratore cinofilo certificato', d: 'Il traguardo ufficiale. Il patentino nero su giallo. Ma capisco subito che è solo l\'inizio: la gestione comportamentale del cane diventa la solida base per qualcosa di più specifico e necessario sul territorio.' },
            { y: 'Gennaio 2026', t: 'Corso intensivo di toelettatura', d: 'Studio come combinare la psicologia del cane alle forbici dentate. Imparo la tecnica pura e le angolature per valorizzare ogni tipo di manto: dallo stripping a mano fino alle snodature impossibili.' },
            { y: 'Giugno 2026', t: 'Apertura Da Marci & Loki', d: 'Il sogno diventa mattoni, vasche, acqua rigorosamente tiepida e mantelline resistenti all\'acqua. Piazzale della Pace ha ufficialmente un nuovo rifugio di fiducia per i cani e le loro famiglie.' }
          ].map((m, i) => (
            <div key={i} className="relative group pt-1 cursor-default">
              
              {/* Nodo Circolare interattivo in Absolute Overlay */}
              <div className="absolute -left-[45px] md:-left-[79px] top-1.5 w-[24px] h-[24px] md:w-[28px] md:h-[28px] rounded-full bg-white border-[6px] md:border-[8px] border-orange shadow-sm group-hover:scale-[1.3] group-hover:border-teal transition-all duration-300 transform-gpu z-10" />
              
              <div className="font-mono text-orange text-[14px] md:text-[15px] font-bold tracking-[0.18em] uppercase mb-2">
                {m.y}
              </div>
              <h3 className="font-heading font-bold text-brown text-[26px] md:text-[32px] leading-[1.1] mb-4">
                {m.t}
              </h3>
              <p className="font-sans text-text-sec text-[16px] md:text-[18px] leading-[1.7] max-w-[55ch] font-medium text-balance opacity-90 transition-opacity group-hover:opacity-100">
                {m.d}
              </p>

            </div>
          ))}
        </div>
      </section>

      {/* 4. CTA Finale WhatsApp + Internal Link */}
      <section className="px-6 md:px-12 flex flex-col items-center justify-center pb-12 w-full pt-16 border-t-[2px] border-dashed border-[rgba(240,232,221,0.8)] gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href="https://wa.me/393759893189?text=Ciao%20Marci,%20ho%20visto%20la%20tua%20storia%20sul%20sito!%20Vorrei%20portarti%20il%20mio%20cane..." 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-orange text-white rounded-full px-[40px] py-[20px] font-sans font-extrabold text-[18px] md:text-[20px] tracking-wide hover:bg-orange-dark hover:scale-105 active:scale-[0.98] transition-all outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-orange shadow-[0_16px_40px_rgba(212,88,26,0.3)] hover:shadow-[0_20px_48px_rgba(212,88,26,0.4)]"
          >
            Scrivimi su WhatsApp
          </a>
          <a 
            href="/servizi" 
            className="inline-flex items-center justify-center bg-white border-2 border-border text-text-sec rounded-full px-[32px] py-[18px] font-sans font-bold text-[17px] md:text-[18px] hover:border-teal hover:text-teal transition-all"
          >
            Scopri i miei servizi
          </a>
          <a 
            href="/contatti" 
            className="inline-flex items-center justify-center text-orange font-sans font-bold hover:underline"
          >
            Oppure vieni a trovarmi
          </a>
        </div>
      </section>
    </main>
  )
}
