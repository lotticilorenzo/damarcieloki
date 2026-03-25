import React from 'react'
import { PawDivider } from '@/components/ui/PawDivider'
import { generateMetadataHelper, generateBreadcrumbLD } from '@/lib/seo'

export const metadata = generateMetadataHelper(
  'prezzi',
  'Prezzi',
  'Scopri il listino prezzi della toelettatura Da Marci & Loki a Parma. Bagni, tagli a forbice, stripping e snodatura calibrati in base a razza, pelo e taglia.',
  '/prezzi'
)

export default function PrezziPage() {
  const breadcrumbLD = generateBreadcrumbLD([{ name: 'Prezzi', path: '/prezzi' }])

  return (
    <main className="flex flex-col min-h-[100dvh] pt-32 pb-24 bg-bg overflow-x-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <section className="px-6 md:px-12 max-w-[1000px] mx-auto w-full text-center flex flex-col items-center justify-center flex-grow py-20">
        
        <div className="w-24 h-24 bg-orange-light rounded-3xl mx-auto flex items-center justify-center mb-8 rotate-3">
          <span className="font-heading font-black text-orange text-[48px] drop-shadow-sm leading-none">?</span>
        </div>

        <h1 className="font-heading font-black text-brown text-[clamp(40px,6vw,60px)] leading-[1.1] tracking-tight mb-8 text-balance">
          Listino Prezzi in arrivo
        </h1>
        
        <p className="font-sans text-text-sec text-[18px] md:text-[20px] max-w-[50ch] mx-auto font-medium leading-[1.6] text-balance mb-12">
          Stiamo ultimando i calcoli e inserendo gli ultimi parametri. I prezzi verranno strutturati fedelmente in base alla taglia del cane e alla condizione del manto. Pelo duro? Pelo riccio? Nessun problema.
        </p>

        <a 
          href="/contatti" 
          className="inline-flex items-center justify-center bg-white border-2 border-border hover:border-orange text-orange rounded-full px-[32px] py-[16px] font-sans font-extrabold text-[18px] tracking-wide hover:shadow-[0_12px_32px_rgba(212,88,26,0.15)] hover:scale-105 active:scale-[0.98] transition-all outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-orange"
        >
          Contattaci per un preventivo
        </a>

      </section>

      <div className="absolute bottom-0 w-full flex justify-center opacity-50 pb-12 pointer-events-none">
         <PawDivider />
      </div>
    </main>
  )
}
