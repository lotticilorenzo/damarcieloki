import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { RefObject } from 'react'

/**
 * Initializes GSAP ScrollTrigger plugin only on client-side.
 */
export function initScrollTrigger() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
  }
}

/**
 * Helper to easily manage gsap contexts and component cleanup.
 * Prevents memory leaks ensuring proper Context isolation.
 */
export function createGsapContext(
  ref: RefObject<HTMLElement | null>,
  callback: (ctx: gsap.Context) => void
): gsap.Context {
  return gsap.context(callback, ref)
}
