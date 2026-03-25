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
      "process-node relative flex flex-col items-start text-left p-8 md:p-10 bg-white rounded-[32px] w-full shadow-[0_12px_40px_rgba(106,58,42,0.06)] border border-border/40 group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(106,58,42,0.12)]", 
      className
    )}>
      
      {/* Ghost Number in background */}
      <span className="absolute -bottom-6 -right-2 font-heading font-black text-[140px] text-orange-light opacity-[0.15] leading-none select-none pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-x-4">
        {step.numero}
      </span>
      
      {/* Header card */}
      <div className="flex items-center gap-5 mb-6 relative z-10 w-full">
        <div className="w-14 h-14 rounded-[18px] bg-orange-light/80 flex items-center justify-center shrink-0">
          <span className="text-[28px] drop-shadow-sm select-none" aria-hidden="true">
            {step.emoji}
          </span>
        </div>
        <h3 className="font-heading font-extrabold text-brown text-[22px] leading-[1.15] text-balance">
          {step.titolo}
        </h3>
      </div>
      
      {/* Copy Descrizione */}
      <p className="font-sans text-text-sec text-[16px] md:text-[17px] font-normal leading=[1.65] relative z-10">
        {step.descrizione}
      </p>

    </div>
  )
}
