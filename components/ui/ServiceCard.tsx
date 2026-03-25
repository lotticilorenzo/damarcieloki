import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Drop, 
  Scissors, 
  HandPointing, 
  ArrowsCounterClockwise, 
  FirstAid, 
  PawPrint 
} from '@phosphor-icons/react/dist/ssr'
import { Servizio } from '@/types'
import { cn } from '@/lib/utils'
import { ServiceCardMotion } from './ServiceCardMotion'
import { ServiceCardLinkIndicator } from './ServiceCardLinkIndicator'

export interface ServiceCardProps {
  servizio: Servizio
  index: number
  className?: string
}

export function ServiceCard({
  servizio,
  index,
  className
}: ServiceCardProps) {
  const IconMap: Record<string, React.ElementType> = {
    Drop,
    Scissors,
    HandPointing,
    ArrowsCounterClockwise,
    FirstAid,
    PawPrint
  }
  const Icon = IconMap[servizio.icon] || PawPrint

  const accentIconClass = {
    orange: 'text-orange bg-orange-light',
    teal: 'text-teal bg-teal-light',
    brown: 'text-brown bg-brown-light'
  }[servizio.colorAccent]

  const isBagno = servizio.slug === 'bagno'
  
  const badgeColors: Record<string, string> = {
    'più-richiesto': 'bg-orange-light text-orange',
    'per-esperti': 'bg-brown-light text-brown',
    'su-prescrizione': 'bg-teal-light text-teal'
  }

  return (
    <ServiceCardMotion 
      index={index} 
      isBagno={isBagno} 
      className={cn("flex flex-col p-6", className)}
    >
      {/* Box Immagine Header */}
      <div className="relative w-full h-[180px] md:h-[220px] mb-6 rounded-[24px] overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
         <Image 
           src={isBagno ? '/images/hero.png' : '/images/salon.png'} 
           alt={servizio.nome} 
           fill 
           className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent mix-blend-multiply"></div>
         
         {/* Icon Badge Cromatico Overlay */}
         <div className={cn("absolute bottom-4 left-4 p-[10px] rounded-xl z-20 shadow-lg backdrop-blur-md", "bg-white text-orange")}>
           <Icon size={28} weight="duotone" />
         </div>
         
         {/* Badge Top Right */}
         {servizio.badge && (
           <span className={cn(
             "absolute top-4 right-4 font-sans font-bold text-[10px] uppercase tracking-wider px-3 py-[6px] rounded-full z-20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
             badgeColors[servizio.badge] || 'bg-white text-text-sec',
             "backdrop-blur-md"
           )}>
             {servizio.badge.replace('-', ' ')}
           </span>
         )}
      </div>

      <div className="flex flex-col items-start px-2 mb-2">
        <span className="font-sans font-medium text-orange text-[12px] uppercase tracking-[0.10em] mb-2">
          {servizio.tagline}
        </span>
        <h3 className="font-heading font-extrabold text-brown text-[24px] md:text-[26px] leading-[1.1] mb-2 pt-1 max-w-[200px] md:max-w-full text-balance">
          {servizio.nome}
        </h3>
      </div>

      {/* Testo descrittivo */}
      <div className="px-2 flex-grow flex flex-col">
        <p className="font-sans font-normal text-text-sec text-[15px] leading-[1.65] mb-6">
          {servizio.descrizione}
        </p>

        {/* Footer */}
        <div className="flex flex-col pt-6 mt-auto border-t border-border/80 w-full">
          <span className="font-sans font-medium text-teal text-[13px] tracking-wide inline-flex items-center mb-4 before:content-['•'] before:mr-[6px] before:text-teal/40">
            {servizio.perChi}
          </span>

          <Link 
            href={`/servizi#${servizio.slug}`} 
            className="font-sans font-bold text-orange hover:text-orange-dark inline-flex items-center w-fit outline-none focus-visible:ring-2 focus-visible:ring-orange rounded tracking-wide transition-colors group/link"
          >
            Vedi dettagli {servizio.nome.toLowerCase()}
            <ServiceCardLinkIndicator />
          </Link>
        </div>
      </div>
    </ServiceCardMotion>
  )
}
