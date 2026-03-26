'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PawPrint } from '../ui/PawPrint'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type HairType = 'pelo duro' | 'pelo lungo' | 'pelo corto'

interface Breed {
  name: string
  hair: HairType
  image: string
  quote: string
}

const breeds: Breed[] = [
  { 
    name: 'Barboncino', 
    hair: 'pelo lungo', 
    image: '/images/breed_barboncino.png',
    quote: "Riccioli dorati, intelligenza da vendere e l'atteggiamento fiero di chi sa di comandare in casa."
  },
  { 
    name: 'Schnauzer', 
    hair: 'pelo duro', 
    image: '/images/breed_schnauzer.png',
    quote: "Sopracciglia da filosofo e barba folta da saggio. Togliergli il pelo morto a mano è un'arte bellissima."
  },
  { 
    name: 'Fox Terrier', 
    hair: 'pelo duro', 
    image: '/images/breed_foxterrier.png',
    quote: "Quasi impossibile tenerli fermi per il taglio, ma l'energia inesauribile li rende irresistibili."
  },
  { 
    name: 'Golden Retriever', 
    hair: 'pelo lungo', 
    image: '/images/breed_golden.png',
    quote: "Un concentrato di dolcezza infinita. Impossibile non sorridere e non farsi il bagno con loro mentre li insaponi!"
  },
  { 
    name: 'Pastore Tedesco', 
    hair: 'pelo corto', 
    image: '/images/breed_pastore.png',
    quote: "Guardiani fieri e leali. Ma sotto il getto della doccia si sciolgono in coccoloni giganteschi."
  },
  { 
    name: 'Labrador', 
    hair: 'pelo corto', 
    image: '/images/breed_labrador.png',
    quote: "Basta un craker per comprarsi il loro amore eterno. Asciugarli è un allenamento, ma quanti baci in cambio!"
  },
  { 
    name: 'Maltese', 
    hair: 'pelo lungo', 
    image: '/images/breed_maltese.png',
    quote: "Piccoli, bianchissimi e pronti a farsi venerare. Sciogliere delicatamente i loro nodi è pura meditazione."
  },
  { 
    name: 'Shih Tzu', 
    hair: 'pelo lungo', 
    image: '/images/breed_shihtzu.png',
    quote: "Sguardo furbetto e una criniera da leone in miniatura. Gestire il loro mantello richiede una pazienza asiatica."
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 }
  }
}

const BreedCard = ({ breed, index }: { breed: Breed, index: number }) => {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 18 } }}
      className={cn(
        "rounded-[32px] border border-border/40 transition-shadow duration-500 hover:shadow-[0_24px_40px_rgba(106,58,42,0.18)] relative group overflow-hidden flex flex-col justify-end min-h-[320px] md:min-h-[360px] transform-gpu bg-brown-light",
        {
          "backface-hidden": true,
          "will-change-transform": true
        }
      )}
    >
      {/* Immagine 100% Opacità ma scurita tramite overlay */}
      <Image 
        src={breed.image} 
        alt={breed.name} 
        fill 
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover object-[center_top] transition-transform duration-700 ease-out group-hover:scale-105"
      />
      
      {/* Gradient progressivo per elevare il contrasto del testo senza usare mix-blend-multiply per evitare sfocature pesanti da raster GPU */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1F0E08]/95 via-[#2C1810]/50 to-transparent z-0 transition-opacity duration-500 opacity-90 group-hover:opacity-100"></div>

      {/* Un overlay addizionale dal basso molto tenue per sicurezza testo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 z-[1] pointer-events-none"></div>

      {/* Content */}
      <div className="flex flex-col items-start text-left relative z-10 p-6 md:p-8 mb-2">
        <span className="font-heading font-black text-white text-[22px] md:text-[26px] mb-3 drop-shadow-md">
          {breed.name}
        </span>
        <div className={cn(
          "px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm border border-white/20",
          breed.hair === 'pelo duro' ? "bg-brown/80 text-white" :
          breed.hair === 'pelo lungo' ? "bg-teal-dark/80 text-white" :
          "bg-orange/80 text-white"
        )}>
          {breed.hair}
        </div>
        
        {/* Pensiero espandibile su hover */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="overflow-hidden">
            <p className="pt-4 text-white/95 text-[15px] md:text-[16px] font-sans leading-relaxed tracking-wide italic">
              «{breed.quote}»
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export function DogBreedsSection() {
  return (
    <section className="py-24 md:py-36 bg-surface border-y border-border/40 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 z-10 relative">
        
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-heading font-black text-brown text-[clamp(40px,5vw,52px)] mb-6 tracking-tight"
          >
            Ogni razza ha le sue fisse (e io le adoro).
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-text-sec text-[18px] md:text-[20px] max-w-[50ch] mx-auto text-balance leading-relaxed"
          >
            Che sia un minuscolo batuffolo da salotto o un gigante buono da 40kg, so esattamente come viziarlo. E se la sua razza non è in bacheca, <span className="text-orange font-bold italic">non preoccuparti: li accetto tutti!</span>
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {breeds.map((breed, index) => (
            <BreedCard key={breed.name} breed={breed} index={index} />
          ))}
        </motion.div>

        {/* Messaggio rassicurante e CTA Finale */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 md:mt-28 bg-white/60 border border-orange/20 rounded-[32px] p-8 md:p-12 text-center max-w-[800px] mx-auto shadow-sm backdrop-blur-sm"
        >
          <h3 className="font-heading font-extrabold text-[24px] md:text-[28px] text-brown mb-4">
            Non hai trovato la sua razza? Nessun problema!
          </h3>
          <p className="font-sans text-text-sec text-[16px] md:text-[18px] leading-relaxed mb-8 max-w-[60ch] mx-auto text-balance">
            Ho toelettato e addestrato centinaia di cani diversi. Ogni peloso ha la sua personalità e il suo manto specifico: raccontami del tuo e troveremo il modo perfetto per trattarlo da vero re.
          </p>
          <Link 
            href="/contatti" 
            className="inline-flex items-center justify-center bg-orange text-white font-sans font-bold text-[16px] md:text-[18px] px-8 py-4 rounded-xl shadow-lg shadow-orange/20 hover:bg-orange-dark hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Raccontami di lui
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
