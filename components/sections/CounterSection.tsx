'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import { Heart } from '@phosphor-icons/react/dist/ssr/Heart'
import { Dog } from '@phosphor-icons/react/dist/ssr/Dog'
import { Scissors } from '@phosphor-icons/react/dist/ssr/Scissors'

gsap.registerPlugin(ScrollTrigger)

interface Counter {
  id: string
  value: number
  hasPlus?: boolean
  label: string
  icon: React.ElementType
}

const counters: Counter[] = [
  {
    id: 'experience',
    value: 15,
    label: 'anni con i cani',
    icon: Heart
  },
  {
    id: 'dogs',
    value: 200,
    hasPlus: true,
    label: 'cani felici',
    icon: Dog
  },
  {
    id: 'services',
    value: 5,
    label: 'servizi specializzati',
    icon: Scissors
  }
]

const CounterItem = ({ counter, isLast }: { counter: Counter, isLast: boolean }) => {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const ctx = gsap.context(() => {
      gsap.from(numRef.current, {
        scrollTrigger: {
          trigger: numRef.current,
          start: 'top 85%',
          once: true
        },
        innerText: 0,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        onUpdate: function() {
          if (numRef.current) {
            const val = Math.ceil(Number(numRef.current.innerText))
            numRef.current.innerText = val.toString() + (counter.hasPlus ? '+' : '')
          }
        }
      })
    })

    return () => ctx.revert()
  }, [counter.hasPlus])

  return (
    <div className="flex flex-col items-center flex-1 py-10 md:py-0 relative">
      <div className="mb-4 text-teal">
        <counter.icon size={32} weight="bold" />
      </div>
      
      <span 
        ref={numRef}
        className="font-mono font-bold text-orange text-[52px] md:text-[64px] lg:text-[80px] leading-tight"
      >
        {counter.value}{counter.hasPlus ? '+' : ''}
      </span>

      <span className="font-sans font-medium text-text-sec text-[16px] uppercase tracking-wide">
        {counter.label}
      </span>

      {/* Separatore su mobile (sotto) e desktop (destra) */}
      {!isLast && (
        <div className="absolute bottom-0 md:bottom-auto md:right-0 w-[80%] md:w-[1px] h-[1px] md:h-[60%] bg-border md:top-1/2 md:-translate-y-1/2" />
      )}
    </div>
  )
}

export function CounterSection() {
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
        
        <h2 className="font-heading font-extrabold text-brown text-[32px] md:text-[38px] mb-16">
          Qualche numero
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between">
          {counters.map((c, i) => (
            <CounterItem key={c.id} counter={c} isLast={i === counters.length - 1} />
          ))}
        </div>

      </div>
    </section>
  )
}
