'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PawPrint } from '../ui/PawPrint'
import { cn } from '@/lib/utils'

type HairType = 'pelo duro' | 'pelo lungo' | 'pelo corto'

interface Breed {
  name: string
  hair: HairType
  silhouette?: React.ReactNode
  bentoClass: string
}

// Minimalist silhouettes
const silhouettes = {
  barboncino: <path d="M40 25C40 18 30 15 25 22C20 18 10 20 10 28C10 35 20 50 40 45C55 50 65 55 75 55C80 55 85 50 85 45Q85 30 75 30C65 30 55 40 40 40" fill="currentColor" />,
  schnauzer: <path d="M15 20L35 15L45 25L45 35L35 50H20V35L15 35L10 25L15 20ZM45 35C60 38 75 42 80 45V55H20V50" fill="currentColor" />,
  foxTerrier: <path d="M20 15L40 12L45 25V35L40 45L25 45V35L20 35L15 25L20 15ZM45 30C60 30 75 32 80 35V45H25V40" fill="currentColor" />,
  golden: <path d="M20 25C20 15 45 15 45 30C45 40 40 50 35 55C50 58 70 60 85 55C90 53 85 45 80 40C85 40 90 45 90 55Q90 65 75 65C60 65 45 60 35 55" fill="currentColor" />,
  pastore: <path d="M15 10L35 20L40 30L40 40L35 50H20V40L15 35L10 25L15 10ZM40 35C55 45 75 55 85 55V60H20V50" fill="currentColor" />,
  labrador: <path d="M20 22C20 12 45 12 45 25C45 35 40 45 35 50C50 53 75 55 85 50C90 48 88 40 85 35V55H20V50" fill="currentColor" />,
}

const breeds: Breed[] = [
  { name: 'Barboncino', hair: 'pelo lungo', silhouette: silhouettes.barboncino, bentoClass: 'col-span-1 row-span-2 md:col-span-2 md:row-span-2 bg-gradient-to-br from-bg to-bg-alt' },
  { name: 'Schnauzer', hair: 'pelo duro', silhouette: silhouettes.schnauzer, bentoClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
  { name: 'Fox Terrier', hair: 'pelo duro', silhouette: silhouettes.foxTerrier, bentoClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
  { name: 'Golden Retriever', hair: 'pelo lungo', silhouette: silhouettes.golden, bentoClass: 'col-span-2 row-span-1 md:col-span-2 md:row-span-1' },
  { name: 'Pastore Tedesco', hair: 'pelo corto', silhouette: silhouettes.pastore, bentoClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
  { name: 'Labrador', hair: 'pelo corto', silhouette: silhouettes.labrador, bentoClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
  { name: 'Maltese', hair: 'pelo lungo', bentoClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
  { name: 'Shih Tzu', hair: 'pelo lungo', bentoClass: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1' },
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

const BreedCard = ({ breed }: { breed: Breed }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -6, scale: 1.02 }}
    className={cn(
      "rounded-3xl border border-border/60 transition-all duration-500 shadow-sm hover:shadow-[0_20px_40px_rgba(106,58,42,0.08)] relative group overflow-hidden flex flex-col justify-end min-h-[160px] md:min-h-[200px]",
      breed.bentoClass ? breed.bentoClass : "bg-white",
      !breed.bentoClass.includes('bg-') && "bg-white hover:border-orange/30"
    )}
  >
    {/* Immagine Sfondo Fading In Hover */}
    <Image 
      src="/images/hero.png" 
      alt="Placeholder Image" 
      fill 
      className="object-cover absolute inset-0 opacity-10 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105"
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/50 to-white/10 group-hover:from-black/60 group-hover:via-black/20 group-hover:to-transparent z-0 transition-colors duration-500"></div>

    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-0 transition-opacity duration-500 transform group-hover:rotate-12 group-hover:scale-125 z-0">
      <PawPrint size="lg" />
    </div>

    {/* Content */}
    <div className="flex flex-col items-start text-left relative z-10 p-6">
      <span className="font-heading font-black text-brown text-lg md:text-xl mb-3 group-hover:text-white transition-colors duration-500">
        {breed.name}
      </span>
      <div className={cn(
        "px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm",
        breed.hair === 'pelo duro' ? "bg-brown-light text-brown group-hover:bg-brown group-hover:text-white" :
        breed.hair === 'pelo lungo' ? "bg-teal-light text-teal group-hover:bg-teal group-hover:text-white" :
        "bg-orange-light text-orange group-hover:bg-orange group-hover:text-white"
      )}>
        {breed.hair}
      </div>
    </div>
  </motion.div>
)

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
            I cani che conosco
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans text-text-sec text-[18px] md:text-[20px] max-w-[40ch] mx-auto text-balance leading-relaxed"
          >
            Ogni razza ha le sue caratteristiche. <span className="text-orange font-bold italic">Le conosco tutte.</span>
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[160px] md:auto-rows-[200px]"
        >
          {breeds.map((breed) => (
            <BreedCard key={breed.name} breed={breed} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
