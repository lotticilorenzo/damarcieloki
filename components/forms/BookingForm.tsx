'use client'

import React, { useState, startTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr/CircleNotch'
import { ctaConNome, whatsappLink } from '@/lib/utils'
import { LokiSticker } from '../ui/LokiSticker'
import { cn } from '@/lib/utils'
import { soundManager } from '@/lib/sounds'

// Zod Schema rigidamente definito dalle specifiche
const bookingSchema = z.object({
  nomeCane: z.string().min(1, "Come si chiama il tuo cane?"),
  razza: z.string().optional(),
  servizio: z.enum(['bagno','taglio-forbice','stripping','snodatura','bagno-medicato']),
  telefono: z.string().min(8, "Inserisci un numero valido"),
  note: z.string().optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "L'accettazione della Privacy Policy è richiesta"
  })
})

type BookingFormData = z.infer<typeof bookingSchema>

export function BookingForm({ initialService = 'bagno' }: { initialService?: 'bagno'|'taglio-forbice'|'stripping'|'snodatura'|'bagno-medicato' }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      servizio: initialService
    }
  })

  const nomeCaneWatch = watch('nomeCane')
  const privacyWatch = watch('privacyConsent')

  const onSubmit = async (data: BookingFormData) => {
    startTransition(() => {
      setFormStatus('loading')
    })
    try {
      // Mock invio e latenza per simulare fetch API
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Validazione Zod superata. Payload pronto per POST Serverless:', data)
      // Qui andrà la logica POST o un form endpoint (es. FormSpree o mail endpoint locale)
      soundManager.playJoy()
      startTransition(() => {
        setFormStatus('success')
      })
    } catch {
      soundManager.playError()
      startTransition(() => {
        setFormStatus('error')
      })
    }
  }

  // --- STATO SUCCESS ---
  if (formStatus === 'success') {
    return (
      <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_20px_48px_rgba(106,58,42,0.12)] flex flex-col items-center justify-center text-center w-full min-h-[440px]">
        <LokiSticker expression="happy" size="md" />
        <h3 className="font-heading font-extrabold text-[26px] text-brown mt-6 mb-3 tracking-tight">Ricevuto! 🐾</h3>
        <p className="font-sans text-text-sec text-[17px] leading-relaxed max-w-[30ch] text-balance">
          Ti richiamo prestissimo per confermare la sessione di <strong className="text-orange whitespace-nowrap">{nomeCaneWatch}</strong>.
        </p>
      </div>
    )
  }

  // --- STATO ERROR ---
  if (formStatus === 'error') {
    return (
      <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-[0_20px_48px_rgba(106,58,42,0.12)] flex flex-col items-center justify-center text-center w-full min-h-[440px]">
        <LokiSticker expression="confused" size="sm" className="mb-4" />
        <h3 className="font-heading font-extrabold text-[24px] text-brown mt-4 mb-2 tracking-tight">Qualcosa è andato storto.</h3>
        <p className="font-sans text-text-sec text-[16px] leading-relaxed mb-8 max-w-[32ch] text-balance">
          Il modulo non è stato inviato a causa di un piccolo capriccio tecnico. Niente panico!
        </p>
        <a 
          href={whatsappLink(`Ciao Marci! Vorrei prenotare una seduta per ${nomeCaneWatch || 'il mio cane'}. Purtroppo il sito mi ha dato errore.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-orange font-bold hover:text-orange-dark focus-visible:ring-2 focus-visible:ring-orange rounded px-2 hover:underline underline-offset-4 transition-colors"
        >
          Scrivimi direttamente su WhatsApp <span className="ml-1 font-mono hover:translate-x-1 transition-transform">→</span>
        </a>
      </div>
    )
  }

  // Helper per il Floating Label Animato
  const FloatingInput = ({ 
    id, label, registerName, type = "text", error 
  }: { 
    id: string, label: string, registerName: keyof BookingFormData, type?: string, error?: { message?: string } 
  }) => {
    const value = watch(registerName)
    const isFloating = !!value // Semplificazione: flotta se ha valore o focus (peer gestirà focus)

    return (
      <div className="relative group">
        <input
          type={type}
          id={id}
          {...register(registerName)}
          className={cn(
            "block px-4 pb-2.5 pt-6 w-full text-[15px] font-sans font-medium text-brown bg-transparent rounded-xl border appearance-none outline-none ring-0 transition-all peer animate-focus-pulse",
            error ? "border-red-500" : "border-border hover:border-border-hover focus:border-orange"
          )}
          placeholder=" "
        />
        <motion.label 
          htmlFor={id}
          initial={false}
          animate={{
            y: isFloating ? -12 : 0,
            x: isFloating ? 0 : 0,
            scale: isFloating ? 0.82 : 1,
            color: isFloating ? '#D4581A' : '#B09080', // orange : text-muted
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="absolute text-[15px] font-sans top-4 left-4 pointer-events-none origin-[0] tracking-wide"
        >
          {label}
        </motion.label>
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert" 
            className="absolute -bottom-5 text-red-500 text-[11px] font-sans font-medium tracking-wide"
          >
            {error.message}
          </motion.p>
        )}
      </div>
    )
  }

  // --- STATO ATTIVO ---
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[24px] p-6 md:p-10 shadow-[0_20px_48px_rgba(106,58,42,0.16)] flex flex-col gap-6 w-full relative z-10 border border-[rgba(240,232,221,0.5)]">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingInput id="nomeCane" label="Come si chiama il tuo bestione?" registerName="nomeCane" error={errors.nomeCane} />
        <FloatingInput id="razza" label="Che razza è? (bellissima)" registerName="razza" error={errors.razza} />
      </div>

      <div className="flex flex-col gap-[6px]">
        <label htmlFor="servizio" className="text-[12px] font-sans font-bold text-brown uppercase tracking-widest pl-1 opacity-80">
          Servizio richiesto
        </label>
        <div className="relative">
          <select
            id="servizio"
            {...register('servizio')}
            className={cn(
              "block w-full px-4 py-3.5 text-[16px] font-sans font-bold text-brown bg-white border hover:border-border-hover rounded-xl appearance-none outline-none ring-0 focus:border-orange animate-focus-pulse transition-all cursor-pointer",
              errors.servizio ? "border-red-500" : "border-border"
            )}
          >
            <option value="bagno">Bagno</option>
            <option value="taglio-forbice">Taglio a Forbice</option>
            <option value="stripping">Stripping</option>
            <option value="snodatura">Snodatura</option>
            <option value="bagno-medicato">Bagno Medicato</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-muted">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" aria-hidden="true"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
          </div>
        </div>
      </div>

      <FloatingInput id="telefono" label="Il tuo numero" registerName="telefono" type="tel" error={errors.telefono} />

      <div className="relative group mt-2">
        <textarea
          id="note"
          {...register('note')}
          className="block px-4 pb-2.5 pt-6 w-full text-[15px] font-sans font-medium text-brown bg-transparent rounded-xl border border-border hover:border-border-hover appearance-none outline-none ring-0 focus:border-orange animate-focus-pulse transition-all peer resize-none min-h-[90px]"
          placeholder=" "
        />
        <motion.label 
          htmlFor="note"
          initial={false}
          animate={{
            y: !!watch('note') ? -12 : 0,
            scale: !!watch('note') ? 0.82 : 1,
            color: !!watch('note') ? '#D4581A' : '#B09080',
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="absolute text-[15px] font-sans top-4 left-4 pointer-events-none origin-[0] tracking-wide"
        >
          Qualcosa che devo sapere? (opzionale)
        </motion.label>
      </div>

      <div className="flex flex-col gap-[2px] mt-1 relative">
        <label className="flex items-start gap-4 cursor-pointer group select-none">
          <div className="relative flex items-center justify-center mt-[2px] shrink-0 w-[22px] h-[22px] rounded-[6px] border border-border overflow-hidden bg-transparent transition-colors group-hover:border-orange/50">
            <input 
              type="checkbox" 
              {...register('privacyConsent')}
              className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            {/* Orange Background Splash */}
            <motion.div 
              initial={false}
              animate={{ x: privacyWatch ? 0 : '-101%' }}
              transition={{ duration: 0.25, ease: "circOut" }}
              className="absolute inset-0 bg-orange"
            />
            {/* Tick Path Drawing */}
            <svg 
              className="relative w-3.5 h-3.5 text-white pointer-events-none z-20" 
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
              aria-hidden="true"
            >
              <motion.polyline 
                points="20 6 9 17 4 12"
                initial={false}
                animate={{ pathLength: privacyWatch ? 1 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
            </svg>
          </div>
          <span className="font-sans text-[13px] md:text-[14px] text-text-sec font-medium leading-snug pr-2">
            Acconsento al trattamento dei dati. Leggi la <a href="/privacy" className="text-orange hover:text-orange-dark transition-colors hover:underline underline-offset-2" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>.
          </span>
        </label>
        {errors.privacyConsent && (
          <p role="alert" className="text-red-500 text-[11px] font-sans font-medium ml-[-2px] absolute -bottom-5">{errors.privacyConsent.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={formStatus === 'loading'}
        whileHover={{ 
          scale: 1.04, 
          backgroundColor: '#A83F0E',
          boxShadow: '0 0 0 4px rgba(212,88,26,0.20)',
          transition: { type: 'spring' as const, stiffness: 400, damping: 17 } 
        }}
        whileTap={{ scale: 0.96 }}
        className="mt-6 w-full flex items-center justify-center gap-3 bg-orange text-white rounded-xl px-4 py-[16px] font-sans font-bold text-[17px] tracking-wide shadow-[0_8px_24px_rgba(212,88,26,0.25)] transition-all disabled:bg-orange/70 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange"
      >
        {formStatus === 'loading' ? (
          <>
            <CircleNotch size={24} className="animate-spin opacity-90" />
            <span className="animate-pulse">Invio in corso...</span>
          </>
        ) : (
          <span>{ctaConNome(nomeCaneWatch)}</span>
        )}
      </motion.button>

    </form>
  )
}
