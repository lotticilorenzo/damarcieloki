'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LokiSticker } from '@/components/ui/LokiSticker'
import { PawDivider } from '@/components/ui/PawDivider'
import { Question } from '@phosphor-icons/react/dist/ssr/Question'
import { handleWhatsAppClick } from '@/lib/utils'

interface FAQItem {
  q: string
  a: string
}

export default function FAQContent({ faqs }: { faqs: FAQItem[] }) {
  return (
    <main className="flex flex-col min-h-[100dvh] pt-32 pb-24 bg-bg overflow-x-hidden relative">
      <section className="px-6 md:px-12 max-w-[900px] mx-auto w-full relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center justify-center p-4 bg-teal-light text-teal rounded-2xl mb-6 rotate-2">
            <Question size={40} weight="duotone" />
          </div>
          <h1 className="font-heading font-black text-brown text-[clamp(44px,7vw,72px)] leading-[1.0] mb-6 tracking-tight">
            Domande frequenti.
          </h1>
          <p className="font-sans text-text-sec text-[18px] md:text-[21px] font-medium max-w-[45ch] mx-auto text-balance opacity-90">
            Tutto quello che c&apos;è da sapere prima di portare il tuo peloso da noi. Ma se hai altri dubbi, chiamaci!
          </p>
        </div>

        <div className="flex flex-col gap-6 md:gap-8 mb-24">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 md:p-10 rounded-[32px] border border-border shadow-[0_8px_30px_rgba(106,58,42,0.04)] hover:shadow-[0_12px_40px_rgba(106,58,42,0.07)] hover:border-teal/20 transition-all group"
            >
              <h2 className="font-heading font-bold text-brown text-[22px] md:text-[26px] leading-tight mb-4 flex items-start gap-4">
                <span className="text-teal opacity-40 shrink-0 mt-0.5 group-hover:opacity-100 transition-opacity">Q.</span>
                {f.q}
              </h2>
              <div className="flex items-start gap-4">
                <span className="text-orange opacity-40 shrink-0 mt-0.5 group-hover:opacity-100 transition-opacity font-bold text-[18px]">A.</span>
                <p className="font-sans text-text-sec text-[17px] md:text-[18px] leading-[1.7] font-medium opacity-90">
                  {f.a}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Loki CTA */}
        <div className="bg-bg-alt rounded-[40px] p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center gap-10 md:gap-16 border border-border/80">
          <div className="shrink-0 relative group">
             <div className="absolute inset-0 bg-teal/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
             <LokiSticker expression="happy" size="lg" className="relative drop-shadow-2xl hover:scale-105 transition-transform" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-heading font-black text-brown text-[28px] md:text-[34px] mb-4">
              Altri dubbi?
            </h3>
            <p className="font-sans text-text-sec text-[17px] md:text-[19px] mb-8 font-medium leading-relaxed">
              Loki non sa rispondere al telefono (non ha i pollici), ma Marci sì. Scrivici subito su WhatsApp.
            </p>
            <a 
              href="https://wa.me/393759893189" 
              onClick={(e) => handleWhatsAppClick(e, "Ciao Marci, avrei una domanda!")}
              className="inline-flex items-center justify-center bg-orange text-white rounded-full px-[40px] py-[20px] font-sans font-extrabold text-[18px] hover:bg-orange-dark hover:scale-105 transition-all shadow-lg shadow-orange/30"
            >
              Parla con Marci
            </a>
          </div>
        </div>

      </section>

      <div className="absolute top-[20%] left-[-10%] opacity-10 blur-xl pointer-events-none rotate-45 select-none">
        <PawDivider className="scale-[2.5]" />
      </div>

    </main>
  )
}
