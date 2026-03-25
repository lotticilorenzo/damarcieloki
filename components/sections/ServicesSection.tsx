import React from 'react'
import { servizi } from '@/data/services'
import { ServiceCard } from '../ui/ServiceCard'


export function ServicesSection() {
  return (
    <section className="py-24 md:py-36 bg-bg relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 z-10 relative">
        
        {/* Sezione titolo Testata */}
        <div className="flex flex-col items-start mb-16 md:mb-20">
          <h2 className="font-heading font-black text-brown py-1 text-[clamp(40px,5vw,52px)] leading-tight mb-4">
            Cosa fa Marci
          </h2>
          <p className="font-sans text-text-sec text-[18px] md:text-[20px] max-w-[48ch] leading-relaxed">
            Cinque servizi. Uno stile: prendersi il tempo che serve.
          </p>
        </div>

        {/* 
          Griglia Organica Bento
          La magia sta nei grid-col: 1.2 - 0.9 - 1.0. 
          Le colonne centrali ristrettive estendono il testo naturalmente variando le altezze
          delle card (senza forzare row hardcoded o murature costose calcolate in javascript).
        */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.9fr_1fr] md:auto-rows-fr gap-6 md:gap-8">
          
          {/* Card 1: Bagno - Row Span 2 a fianco del blocco compatto (Bento master) */}
          <div className="md:col-span-1 md:row-span-2">
            <ServiceCard servizio={servizi[0]} index={0} className="w-full" />
          </div>
          
          {/* Card 2: Taglio - Costretta dal 0.9fr, si allunga a "media" */}
          <div className="md:col-span-1">
            <ServiceCard servizio={servizi[1]} index={1} className="w-full" />
          </div>

          {/* Card 3: Stripping - Leggermente più larga (1.0fr) quindi l'altezza naturale cala */}
          <div className="md:col-span-1">
            <ServiceCard servizio={servizi[2]} index={2} className="w-full" />
          </div>

          {/* Card 4: Snodatura */}
          <div className="md:col-span-1">
             <ServiceCard servizio={servizi[3]} index={3} className="w-full" />
          </div>

          {/* Card 5: Bagno Medicato */}
          <div className="md:col-span-1">
             <ServiceCard servizio={servizi[4]} index={4} className="w-full" />
          </div>

        </div>

      </div>
    </section>
  )
}
