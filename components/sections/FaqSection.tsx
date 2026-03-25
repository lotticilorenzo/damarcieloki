'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/utils'

const faqData = [
  {
    question: "Posso assistere alla toelettatura?",
    answer: "Preferisco lavorare da solo con il tuo cane. I cani tendono a distrarsi o agitarsi molto se vedono il padrone. Con me sono più tranquilli e collaborativi, parola di addestratore!"
  },
  {
    question: "Quanto tempo ci vuole per un taglio o un bagno?",
    answer: "Dipende dalla taglia, dal tipo di pelo e da cosa dobbiamo fare. In media un bagno richiede da un'ora a un'ora e mezza, mentre un taglio completo o lo stripping può richiedere fino a due ore. Ti avviserò io quando sarà pronto."
  },
  {
    question: "Usi gabbie per l'asciugatura?",
    answer: "Assolutamente no. L'asciugatura viene fatta sempre a mano con i soffiatori, rispettando i tempi del cane. Niente gabbie, cerco di ridurre al minimo lo stress."
  },
  {
    question: "Come devo portare il cane al salone?",
    answer: "Cerca di fargli fare una passeggiata e i suoi bisogni prima di portarlo. Arriva puntuale e, se ha particolari problemi di pelle o nodi gravi, segnalamelo subito."
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
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 outline-none animate-focus-pulse"
                >
                  <span className="font-heading font-bold text-text text-xl">{faq.question}</span>
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
