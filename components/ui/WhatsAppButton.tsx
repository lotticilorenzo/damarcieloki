'use client'

import React from 'react'
import { handleWhatsAppClick } from '@/lib/utils'

interface WhatsAppButtonProps {
  message: string
  className?: string
  children?: React.ReactNode
}

export function WhatsAppButton({ 
  message, 
  className = "inline-flex items-center justify-center bg-orange text-white rounded-full px-[40px] py-[20px] font-sans font-extrabold text-[18px] md:text-[20px] tracking-wide hover:bg-orange-dark hover:scale-105 active:scale-[0.98] transition-all outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-orange shadow-[0_16px_40px_rgba(212,88,26,0.3)] hover:shadow-[0_20px_48px_rgba(212,88,26,0.4)]",
  children = "Scrivimi su WhatsApp"
}: WhatsAppButtonProps) {
  return (
    <a 
      href={`https://wa.me/393759893189?text=${encodeURIComponent(message)}`}
      onClick={(e) => handleWhatsAppClick(e, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}
