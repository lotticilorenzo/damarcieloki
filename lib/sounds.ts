'use client'

/**
 * Frequenze musicali per i suoni del sito
 */
const FREQS = {
  C4: 261.63,
  E4: 329.63,
  G4: 392.00,
  B4: 493.88,
  C5: 523.25,
  G3: 196.00,
  C3: 130.81,
  POP: 600
}

let audioCtx: AudioContext | null = null

const getCtx = () => {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    audioCtx = new AudioContextClass()
  }
  return audioCtx
}

const playNote = (ctx: AudioContext, freq: number, duration: number, delay = 0) => {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  
  osc.connect(gain)
  gain.connect(ctx.destination)
  
  osc.frequency.value = freq
  osc.type = 'sine'
  
  // Volume iniziale e decadimento
  gain.gain.setValueAtTime(0, ctx.currentTime + delay)
  gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration)
  
  osc.start(ctx.currentTime + delay)
  osc.stop(ctx.currentTime + delay + duration + 0.1)
}

/**
 * Controlla se l'audio è abilitato dall'utente (localStorage)
 */
const isSoundEnabled = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('damarci_sound') === 'on'
}

export const soundManager = {
  playSuccess: () => {
    if (!isSoundEnabled()) return
    const ctx = getCtx()
    if (!ctx) return
    playNote(ctx, FREQS.C4, 0.4, 0)
    playNote(ctx, FREQS.E4, 0.4, 0.1)
    playNote(ctx, FREQS.G4, 0.4, 0.2)
  },

  playError: () => {
    if (!isSoundEnabled()) return
    const ctx = getCtx()
    if (!ctx) return
    playNote(ctx, FREQS.G3, 0.3, 0)
    playNote(ctx, FREQS.C3, 0.3, 0.15)
  },

  playPop: () => {
    if (!isSoundEnabled()) return
    const ctx = getCtx()
    if (!ctx) return
    playNote(ctx, FREQS.POP, 0.05, 0)
  },

  playJoy: () => {
    if (!isSoundEnabled()) return
    const ctx = getCtx()
    if (!ctx) return
    playNote(ctx, FREQS.C4, 0.3, 0)
    playNote(ctx, FREQS.E4, 0.3, 0.08)
    playNote(ctx, FREQS.G4, 0.3, 0.16)
    playNote(ctx, FREQS.B4, 0.3, 0.24)
    playNote(ctx, FREQS.C5, 0.5, 0.32)
  }
}
