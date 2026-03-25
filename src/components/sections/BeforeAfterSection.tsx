'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { OptimizedImage } from '../ui/OptimizedImage'

interface Example {
  id: string
  label: string
  beforeText: string
  afterText: string
  beforeImage: string
  afterImage: string
}

const examples: Example[] = [
  { 
    id: 'stripping', 
    label: 'Stripping Schnauzer', 
    beforeText: 'Pelo duro incolto', 
    afterText: 'Manto rigenerato',
    beforeImage: '/images/grooming/schnauzer-before.png', 
    afterImage: '/images/grooming/schnauzer-after.png'
  },
  { 
    id: 'taglio', 
    label: 'Taglio Barboncino', 
    beforeText: 'Pelo lungo e riccio', 
    afterText: 'Taglio a forbice',
    beforeImage: '/images/grooming/poodle-before.png', 
    afterImage: '/images/grooming/poodle-after.png'
  },
  { 
    id: 'snodatura', 
    label: 'Snodatura', 
    beforeText: 'Presenza di nodi', 
    afterText: 'Pelo disciplinato',
    beforeImage: '/images/grooming/snodatura-before.png', 
    afterImage: '/images/grooming/snodatura-after.png'
  }
]

const BeforeAfterSlider = ({ example }: { example: Example }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  
  // Motion value for the handle position (0 to containerWidth)
  const x = useMotionValue(0)
  
  // Pattern Stationary Image via Double Translation (Solo TRANSFORMS)
  // x_handle: 0 -> containerWidth
  // x_container: x - containerWidth (es. se handle=50, container=-50)
  // x_image: - (x - containerWidth) (es. x_image=50, così -50 + 50 = 0 relative al layout)
  const xContainer = useTransform(x, (val) => val - containerWidth)
  const xImage = useTransform(x, (val) => containerWidth - val)

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setContainerWidth(width)
        x.set(width / 2) // Start in the middle
      }
    }
    
    updateWidth()
    window.addEventListener('resize', updateWidth)
    
    // Initial wiggle hint after 2s
    const timer = setTimeout(() => {
      if (containerWidth > 0) {
        const current = x.get()
        x.set(current + 20)
        setTimeout(() => x.set(current - 20), 150)
        setTimeout(() => x.set(current), 300)
      }
    }, 2000)

    return () => {
      window.removeEventListener('resize', updateWidth)
      clearTimeout(timer)
    }
  }, [containerRef, containerWidth, x])

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[24px] overflow-hidden border border-border bg-bg shadow-xl select-none touch-none"
    >
      {/* Immagine DOPO (Base) */}
      <div className="absolute inset-0">
        <OptimizedImage 
          src={example.afterImage} 
          alt={`${example.label} - Risultato dopo la toelettatura`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1000px"
          fallbackText="Dopo"
        />
        <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
      </div>

      {/* Overlay - Prima Image (con Stationary Pattern) */}
      <motion.div 
        style={{ x: xContainer }}
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <motion.div 
          style={{ x: xImage, width: containerWidth, height: '100%' }}
          className="relative"
        >
          <OptimizedImage 
            src={example.beforeImage} 
            alt={`${example.label} - Prima della toelettatura`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1000px"
            fallbackText="Prima"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      <motion.div 
        style={{ x }}
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] z-20 pointer-events-none"
      />

      {/* Draggable Handle */}
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 bg-white rounded-full shadow-2xl border-4 border-white cursor-grab active:cursor-grabbing z-30 flex items-center justify-center text-orange"
      >
        <span className="text-xl font-bold">↔</span>
      </motion.div>

      {/* Labels */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
        <span className="bg-text/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">Prima</span>
      </div>
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
        <span className="bg-orange/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">Dopo</span>
      </div>
    </div>
  )
}

export function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState(examples[0].id)
  const currentExample = examples.find(e => e.id === activeTab) || examples[0]

  return (
    <section className="py-24 md:py-32 bg-bg-alt">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16">
          <h2 className="font-heading font-black text-brown text-[42px] md:text-[52px] mb-4">
            Prima e dopo
          </h2>
          <p className="font-sans text-text-sec text-[20px] italic">
            &ldquo;Il pelo parla da solo.&rdquo;
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {examples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveTab(ex.id)}
              className={cn(
                "px-6 py-3 rounded-full font-sans font-bold text-[14px] transition-all relative overflow-hidden",
                activeTab === ex.id 
                  ? "bg-orange text-white shadow-lg shadow-orange/20" 
                  : "bg-white text-text-sec hover:bg-white/80 border border-border"
              )}
            >
              {ex.label}
              {activeTab === ex.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-orange -z-1"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Slider Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <BeforeAfterSlider example={currentExample} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center text-text-muted text-sm font-sans flex items-center justify-center gap-2">
          <span className="p-1 rounded-full bg-border">↔</span>
          Trascina il cerchio bianco per confrontare i risultati
        </div>

      </div>
    </section>
  )
}
