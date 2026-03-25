import React from 'react'
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
      className={className}
    >
      {/* Badge Top Right */}
      {servizio.badge && (
        <span className={cn(
          "absolute top-[28px] right-[28px] font-sans font-bold text-[10px] uppercase tracking-wider px-3 py-[6px] rounded-full z-20",
          badgeColors[servizio.badge] || 'bg-bg-alt text-text-sec'
        )}>
          {servizio.badge.replace('-', ' ')}
        </span>
      )}

      {/* Header card */}
      <div className="flex flex-col items-start mb-4">
        {/* Box Icona Duotone */}
        <div className={cn("p-[10px] rounded-2xl mb-6 transition-transform duration-300 group-hover:scale-110", accentIconClass)}>
          <Icon size={32} weight="duotone" />
        </div>
        
        <span className="font-sans font-medium text-orange text-[12px] uppercase tracking-[0.10em] mb-2">
          {servizio.tagline}
        </span>
        
        <h3 className="font-heading font-extrabold text-brown text-[24px] md:text-[26px] leading-[1.1] mb-2 pt-1 max-w-[200px] md:max-w-full text-balance">
          {servizio.nome}
        </h3>
      </div>

      {/* Testo descrittivo */}
      <p className="font-sans font-normal text-text-sec text-[15px] leading-[1.65] flex-grow">
        {servizio.descrizione}
      </p>

      {/* Footer */}
      <div className="flex flex-col pt-7 mt-5 border-t border-border/80">
        <span className="font-sans font-medium text-teal text-[13px] tracking-wide inline-flex items-center mb-4 before:content-['•'] before:mr-[6px] before:text-teal/40">
          {servizio.perChi}
        </span>

        <Link 
          href={`/servizi#${servizio.slug}`} 
          className="font-sans font-bold text-orange hover:text-orange-dark inline-flex items-center w-fit outline-none focus-visible:ring-2 focus-visible:ring-orange rounded tracking-wide transition-colors"
        >
          Scopri di più 
          <ServiceCardLinkIndicator />
        </Link>
      </div>
    </ServiceCardMotion>
  )
}
