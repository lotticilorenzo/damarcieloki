'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { PawPrint } from '../ui/PawPrint'
import { soundManager } from '@/lib/sounds'
import { NavMobile } from './NavMobile'
import { cn } from '@/lib/utils'

const links = [
  { name: 'Chi Sono', href: '/chi-sono' },
  { name: 'Servizi', href: '/servizi' },
  { name: 'Prezzi', href: '/prezzi' },
  { name: 'Contatti', href: '/contatti' },
]

export function Header() {
  const pathname = usePathname()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60)
  })

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] px-5 md:px-10",
        isScrolled 
          ? "bg-white/60 backdrop-blur-2xl saturate-200 border-b border-border/40 shadow-[0_8px_32px_rgba(106,58,42,0.08)] py-3" 
          : "bg-bg/95 backdrop-blur-sm border-b-2 border-border py-6"
      )}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        
        {/* Placeholder Logo */}
        <Link 
          href="/" 
          className="flex items-center z-[60] relative outline-none focus-visible:ring-2 focus-visible:ring-orange rounded max-h-[48px] group"
          aria-label="Homepage Da Marci & Loki"
        >
          <motion.span 
            whileHover={{ scale: 1.02 }}
            className="font-heading font-black text-2xl text-brown tracking-tight inline-flex items-center gap-2"
          >
            Marci <span className="text-orange">&</span> Loki
          </motion.span>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "relative text-[17px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-orange rounded px-1 group",
                  isActive ? "text-orange" : "text-text-sec hover:text-orange"
                )}
              >
                <span>{link.name}</span>
                {/* Animated underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-orange rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Hover-only underline if not active */}
                {!isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                )}
              </Link>
            )
          })}

          {/* CTA Prenota */}
          <Link href="/#prenota" className="outline-none ml-2">
            <motion.div
              whileHover={{ 
                scale: 1.04, 
                backgroundColor: '#A83F0E',
                boxShadow: '0 0 0 4px rgba(212,88,26,0.20)',
                transition: { type: 'spring' as const, stiffness: 400, damping: 17 } 
              }}
              whileTap={{ scale: 0.96 }}
              onMouseEnter={() => soundManager.playPop()}
              className="flex items-center gap-2 bg-orange text-white rounded-full px-[22px] py-[10px] font-sans font-semibold text-[16px] shadow-[0_4px_14px_rgba(212,88,26,0.15)] group cursor-pointer"
            >
              <PawPrint size="xs" className="opacity-100! text-white" style={{ color: '#FFFDF8' }} />
              <span>Prenota</span>
            </motion.div>
          </Link>
        </nav>

        <NavMobile />
      </div>
    </header>
  )
}
