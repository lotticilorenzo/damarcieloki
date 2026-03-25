'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

const faqData = [
  {
    question: "Posso restare a guardare mentre lo lavi?",
    answer: "Preferisco di no, ma è per il suo bene! Se ti vede, cercherà costantemente di raggiungerti e non si godrà il relax. Affidalo a me, diventerò presto la sua seconda persona preferita."
  },
  {
    question: "Quanto dura una sessione da VIP?",
    answer: "Dipende dal pelo e da quante coccole richiede! Di solito da 1 a 2 ore. Ma non ti preoccupare, ti mando un messaggino su WhatsApp non appena ha finito di farsi bello."
  },
  {
    question: "Usi quelle gabbie per l'asciugatura?",
    answer: "Assolutamente MAI. L'asciugatura è rigorosamente a mano, con panni morbidi, phon a temperature adeguate e tanti grattini. Zero gabbie, zero costrizioni. Solo puro rispetto per i suoi tempi."
  },
  {
    question: "Cosa devo fare prima di portarlo?",
    answer: "Fagli fare una bella passeggiata tranquilla (e tutti i bisognini) prima di varcare la porta. Se ha nodi particolari o è un tipo un po' timido, dimmelo prima, così preparo l'ambiente perfetto per lui!"
  }
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-bg-alt relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-brown mb-4 tracking-tight">I Dubbi più Frequenti</h2>
          <p className="text-lg text-text-sec max-w-xl mx-auto font-sans">
            Qualche domanda prima di portarmi il tuo amico peloso? Ecco le risposte che do più spesso.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index} 
                className={cn(
                  "bg-surface rounded-2xl border transition-colors duration-300 overflow-hidden",
                  isOpen ? "border-orange border-b-4 border-r-4" : "border-border hover:border-orange-light"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 outline-none animate-focus-pulse group"
                >
                  <span className="font-heading font-bold text-brown text-[20px] md:text-xl group-hover:text-orange transition-colors duration-300">{faq.question}</span>
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    isOpen ? "bg-orange-light text-orange" : "bg-bg-alt text-text-muted"
                  )}>
                    {isOpen ? <Minus weight="bold" /> : <Plus weight="bold" />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto', paddingBottom: '1.25rem' },
                        collapsed: { opacity: 0, height: 0, paddingBottom: 0 }
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="px-6 text-text-sec font-sans leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
