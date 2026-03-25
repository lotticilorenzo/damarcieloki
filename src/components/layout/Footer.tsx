import React from 'react'
import Link from 'next/link'
import { LokiSticker } from '../ui/LokiSticker'
import { PawDivider } from '../ui/PawDivider'

const links = [
  { name: 'Chi Sono', href: '/chi-sono' },
  { name: 'Servizi', href: '/servizi' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Prezzi', href: '/prezzi' },
  { name: 'Contatti', href: '/contatti' },
]

export function Footer() {
  return (
    <footer className="bg-brown text-brown-light relative overflow-hidden mt-12">
      <div className="w-full flex justify-center py-6 border-b border-[rgba(245,237,232,0.1)]">
        {/* Usiamo PawDivider. I colori light orange/teal svettano brillantemente sullo sfondo scuro brown */}
        <PawDivider className="opacity-40 scale-90 md:scale-100" />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 border-b border-[rgba(245,237,232,0.15)] pb-12">
          
          {/* Colonna 1: Brand (5 colonne su lg) */}
          <div className="md:col-span-5 flex flex-col items-start gap-5">
            <span className="font-heading font-black text-4xl text-white tracking-tight">
              Marci <span className="text-orange-light">&</span> Loki
            </span>
            <p className="font-sans text-xl text-[rgba(245,237,232,0.85)] font-regular max-w-sm text-balance">
              Dove ogni cane è speciale.
            </p>
            <div className="mt-2 inline-flex items-center gap-3 bg-[rgba(255,255,255,0.06)] rounded-full pr-5 pl-2 py-2 border border-[rgba(255,255,255,0.1)] shadow-sm">
              <LokiSticker expression="approves" size="sm" />
              <span className="font-sans text-sm font-bold tracking-wider text-white uppercase opacity-90 mt-1">Loki approva</span>
            </div>
          </div>

          {/* Colonna 2: Links Rapidi (3 colonne su lg) */}
          <div className="md:col-span-3 flex flex-col gap-5">
            <h3 className="font-heading font-extrabold text-2xl text-white">Esplora</h3>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="font-sans text-lg text-[rgba(245,237,232,0.7)] hover:text-white transition-colors hover:underline underline-offset-4 decoration-orange/50 decoration-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna 3: Contatti (4 colonne su lg) */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h3 className="font-heading font-extrabold text-2xl text-white">Il Salone</h3>
            <ul className="flex flex-col gap-3 font-sans text-lg text-[rgba(245,237,232,0.7)]">
              <li className="leading-relaxed">Piazzale della Pace, 10<br/>43121 Parma (PR)</li>
              <li className="mt-2 text-white font-mono font-medium text-xl">
                <a href="tel:+393759893189" className="hover:text-orange-light transition-colors hover:underline underline-offset-4">
                  +39 375 9893189
                </a>
              </li>
              <li>
                <a href="mailto:info@damarcieloki.it" className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-orange/50 decoration-2">
                  info@damarcieloki.it
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copy & Privacy */}
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center pt-8 font-sans text-sm text-[rgba(245,237,232,0.4)]">
          <p>© {new Date().getFullYear()} Da Marci & Loki. Tutti i diritti riservati. P.IVA XXXXXXXXXXX.</p>
          <Link href="/privacy" className="hover:text-[rgba(245,237,232,0.8)] transition-colors hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
