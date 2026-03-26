'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

const faqData = [
  {
    question: "Posso restare a guardare mentre lo lavi?",
    answer: "Tranne rarissimi casi, preferisco di no. Se ti vede, passerà il tempo a cercare te e non si rilasserà mai. Fidati di me e vai a prendere un caffè: diventerò presto la sua seconda persona preferita."
  },
  {
    question: "Quanto tempo ci vuole di solito?",
    answer: "Dipende da quanto pelo ha e, soprattutto, da quante coccole pretende! In media da 1 a 2 ore. Ma zero ansia: ti scrivo io su WhatsApp appena è asciutto, profumato e pronto per tornare a casa."
  },
  {
    question: "Usi quelle gabbie per l'asciugatura?",
    answer: "Assolutamente MAI. Lavoro su appuntamento proprio per dedicare il 100% del tempo a un solo cane. Asciugatura rigorosamente a mano con phon tiepido, panni morbidi e tonnellate di grattini."
  },
  {
    question: "Cosa devo fargli fare prima di portartelo?",
    answer: "Una bella passeggiata per scaricare l'energia (e fargli fare tutti i bisognini). Se odia l'acqua, morde la spazzola o ha paure strane, dimmelo subito: i cani «difficili» sono i miei preferiti. Sfida accettata."
  }
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-bg-alt relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-brown mb-4 tracking-tight">I Dubbi più Frequenti</h2>
          <p className="text-lg text-text-sec max-w-xl mx-auto font-sans leading-relaxed">
            Hai qualche incertezza prima di affidarmi il tuo bestione? Ecco le cose che mi chiedono più spesso in toelettatura.
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
