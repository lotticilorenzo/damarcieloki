'use client'

import React from 'react'
import { PawPrint } from './PawPrint'
import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  width?: number | string
  height?: number | string
  className?: string
  text?: string
  aspectRatio?: string // e.g. "aspect-[4/3]"
}

export function ImagePlaceholder({
  width,
  height,
  className,
  text = "Foto in arrivo",
  aspectRatio
}: ImagePlaceholderProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center bg-bg-alt border border-border-hover rounded-2xl overflow-hidden group",
        aspectRatio,
        className
      )}
      style={{ 
        width: width || '100%', 
        height: height || (aspectRatio ? 'auto' : '100%'),
      }}
    >
      <div className="relative mb-3 transform group-hover:scale-110 transition-transform duration-500">
        <PawPrint 
          size="lg" 
          color="orange-light" 
          className="opacity-40"
          angle={-10}
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <PawPrint 
              size="sm" 
              color="teal-light" 
              className="opacity-20 translate-x-4 translate-y-4"
              angle={20}
            />
        </div>
      </div>
      
      <span className="font-heading italic font-bold text-text-muted text-[14px] md:text-[16px] uppercase tracking-widest opacity-60">
        {text}
      </span>

      {/* Subtle overlay pulse */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  )
}
