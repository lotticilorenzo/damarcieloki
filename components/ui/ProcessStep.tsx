import React from 'react'
import { ProcessStep as ProcessStepType } from '@/types'
import { cn } from '@/lib/utils'

export interface ProcessStepProps {
  step: ProcessStepType
  className?: string
}

export function ProcessStep({ step, className }: ProcessStepProps) {
  return (
    <div className={cn(
      "process-node relative flex flex-col items-center text-center p-8 bg-white rounded-3xl z-10 w-full md:max-w-[320px] lg:max-w-[340px] shadow-[0_4px_24px_rgba(106,58,42,0.06)] border border-border group overflow-hidden transition-transform duration-300 hover:-translate-y-1", 
      className
    )}>
      
      {/* Ghost Number in background */}
      <span className="absolute top-2 right-4 font-heading font-black text-[80px] text-orange-light opacity-15 leading-none select-none pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-2 group-hover:opacity-25">
        {step.numero}
      </span>
      
      {/* Cerchio del Numero */}
      <div className="w-12 h-12 rounded-full bg-teal-light border-2 border-teal flex items-center justify-center mb-6 shadow-sm shrink-0">
        <span className="font-mono font-bold text-teal text-lg">
          {step.numero}
        </span>
      </div>
      
      {/* Intestazione Titolo + Emoji ornamentale */}
      <div className="flex flex-col items-center gap-3 mb-4">
        {/* Emoji - Decorazione richiesta a 32px */}
        <span className="text-[32px] leading-none drop-shadow-sm select-none" aria-hidden="true">
          {step.emoji}
        </span>
        
        {/* Titolo */}
        <h3 className="font-heading font-bold text-brown text-[20px] leading-tight">
          {step.titolo}
        </h3>
      </div>
      
      {/* Copy Descrizione */}
      <p className="font-sans text-text-sec text-[15px] font-normal leading-relaxed text-balance">
        {step.descrizione}
      </p>

    </div>
  )
}
