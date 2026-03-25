'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PawPrint } from '../ui/PawPrint'
import { cn } from '@/lib/utils'

type HairType = 'pelo duro' | 'pelo lungo' | 'pelo corto'

interface Breed {
  name: string
  hair: HairType
  silhouette?: React.ReactNode
}

// Minimalist silhouettes using basic SVG paths
const silhouettes = {
  barboncino: (
    <path d="M40 25C40 18 30 15 25 22C20 18 10 20 10 28C10 35 20 50 40 45C55 50 65 55 75 55C80 55 85 50 85 45Q85 30 75 30C65 30 55 40 40 40" fill="currentColor" />
  ),
  schnauzer: (
    <path d="M15 20L35 15L45 25L45 35L35 50H20V35L15 35L10 25L15 20ZM45 35C60 38 75 42 80 45V55H20V50" fill="currentColor" />
  ),
  foxTerrier: (
    <path d="M20 15L40 12L45 25V35L40 45L25 45V35L20 35L15 25L20 15ZM45 30C60 30 75 32 80 35V45H25V40" fill="currentColor" />
  ),
  golden: (
    <path d="M20 25C20 15 45 15 45 30C45 40 40 50 35 55C50 58 70 60 85 55C90 53 85 45 80 40C85 40 90 45 90 55Q90 65 75 65C60 65 45 60 35 55" fill="currentColor" />
  ),
  pastore: (
    <path d="M15 10L35 20L40 30L40 40L35 50H20V40L15 35L10 25L15 10ZM40 35C55 45 75 55 85 55V60H20V50" fill="currentColor" />
  ),
  labrador: (
    <path d="M20 22C20 12 45 12 45 25C45 35 40 45 35 50C50 53 75 55 85 50C90 48 88 40 85 35V55H20V50" fill="currentColor" />
  ),
}

const breeds: Breed[] = [
  { name: 'Barboncino', hair: 'pelo lungo', silhouette: silhouettes.barboncino },
  { name: 'Schnauzer', hair: 'pelo duro', silhouette: silhouettes.schnauzer },
  { name: 'Fox Terrier', hair: 'pelo duro', silhouette: silhouettes.foxTerrier },
  { name: 'Golden Retriever', hair: 'pelo lungo', silhouette: silhouettes.golden },
  { name: 'Pastore Tedesco', hair: 'pelo corto', silhouette: silhouettes.pastore },
  { name: 'Labrador', hair: 'pelo corto', silhouette: silhouettes.labrador },
  { name: 'Maltese', hair: 'pelo lungo' },
  { name: 'Bichon Frisé', hair: 'pelo lungo' },
  { name: 'Cocker Spaniel', hair: 'pelo lungo' },
  { name: 'Shih Tzu', hair: 'pelo lungo' },
  { name: 'West Highland', hair: 'pelo duro' },
  { name: 'Bracco', hair: 'pelo corto' },
]

const BreedCard = ({ breed }: { breed: Breed }) => (
  <motion.div 
    whileHover="hover"
    initial="initial"
    className="bg-bg rounded-[16px] p-5 border border-border transition-all duration-300 hover:bg-bg-alt hover:border-orange/20 relative group overflow-hidden"
  >
    {/* Silhouette */}
    <div className="h-20 flex items-center justify-center mb-4 relative z-10">
      <motion.div 
        variants={{
          hover: { 
            rotate: [-3, 3, -3, 0],
            transition: { duration: 0.4, type: 'spring' }
          }
        }}
        className="text-brown/20 group-hover:text-orange/40 transition-colors duration-500"
      >
        {breed.silhouette ? (
          <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-sm">
            {breed.silhouette}
          </svg>
        ) : (
          <PawPrint size="md" className="opacity-40" />
        )}
      </motion.div>
    </div>

    {/* Content */}
    <div className="flex flex-col items-center text-center relative z-10">
      <span className="font-sans font-bold text-brown text-[14px] mb-2 group-hover:text-orange transition-colors">
        {breed.name}
      </span>
      <div className={cn(
        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-300",
        breed.hair === 'pelo duro' ? "bg-brown-light text-brown group-hover:bg-brown group-hover:text-white" :
        breed.hair === 'pelo lungo' ? "bg-teal-light text-teal group-hover:bg-teal group-hover:text-white" :
        "bg-orange-light text-orange group-hover:bg-orange group-hover:text-white"
      )}>
        {breed.hair}
      </div>
      
      {/* Micro-testo al hover */}
      <motion.p 
        variants={{
          initial: { opacity: 0, y: 10 },
          hover: { opacity: 1, y: 0 }
        }}
        className="absolute -bottom-1 text-[9px] font-bold text-text-muted italic opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
      >
        Gestisco questo pelo con cura
      </motion.p>
    </div>
  </motion.div>
)

export function DogBreedsSection() {
  return (
    <section className="py-24 bg-surface border-y border-border/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="font-heading font-extrabold text-brown text-[38px] md:text-[44px] mb-3">
            I cani che conosco
          </h2>
          <p className="font-sans text-text-sec text-[18px] max-w-[40ch] mx-auto">
            Ogni razza ha le sue caratteristiche. <span className="text-orange font-bold italic">Le conosco tutte.</span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {breeds.map((breed) => (
            <BreedCard key={breed.name} breed={breed} />
          ))}
        </div>

      </div>
    </section>
  )
}
