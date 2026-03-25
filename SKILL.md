# SKILL.md — Sistema Visivo Da Marci & Loki 🐾
# Leggi PRIMA di scrivere CSS, Tailwind o animazioni.
# Questo file definisce HOW. CLAUDE.md definisce WHAT. Leggi entrambi.

---

## 1. CONFIGURAZIONE ATTIVA

```
DESIGN_VARIANCE:  7   (bento asimmetrico, overlap elementi, layout non convenzionale)
MOTION_INTENSITY: 8   (animazioni firmate con implementazione precisa)
VISUAL_DENSITY:   5   (caldo e respirabile — non minimalista, non sovraccarico)
SITE_MODE:        LIGHT WARM — #FFFDF8 base, sfondo pesca alt
FIRMA_VISIVA:     Bolle di sapone + forbici + zampe SVG animati in tutto il sito
```

---

## 2. MOOD & CONCEPT

**Il concept:** *Il salone di quartiere più bello che hai mai visto online.*

Non è uno studio medico. Non è uno studio di architettura.
È un posto dove si lava, si taglia, si coccola.
Il design deve trasmettere: calore, gioia, competenza artigianale.

**Cosa rende questo sito DIVERSO da tutti gli altri:**
1. **Gli elementi del logo prendono vita** — bolle di sapone salgono, forbici galleggiano, zampe appaiono
2. **Loki ha 4 espressioni diverse** (SVG) e reagisce agli stati dell'interfaccia
3. **L'hero non ha una foto stock** — ha un'illustrazione/composizione SVG unica
4. **Il form chiede prima il nome del cane** — gancio emotivo immediato
5. **La timeline della storia usa un PawTrail** — zampe che portano da 2009 a oggi

**Riferimenti estetici:**
- Duolingo (mascotte con espressioni) × Notion (pulizia layout) × sito artigianale italiano
- NOT: SPA minimalista, NOT: pet shop anni '90, NOT: gradiente purple AI

---

## 3. ELEMENTI GRAFICI SVG — LIBRERIA COMPLETA

Tutti questi SVG vivono in `components/ui/`. Sono sempre `aria-hidden="true"`.

### 3.1 SoapBubble.tsx
Bolle di sapone trasparenti. Usate nell'hero e nella section Bagno.
```tsx
// Ogni bolla è un SVG circle con gradient + highlight interno
// Sizes: sm (24px), md (40px), lg (64px), xl (96px)
// Animazione: CSS keyframes @keyframes bubble-rise
// Ciascuna ha animation-delay diverso per aspetto organico

const SoapBubble = ({ size = 'md', delay = 0 }) => (
  <svg
    width={sizeMap[size]}
    height={sizeMap[size]}
    aria-hidden="true"
    style={{ animationDelay: `${delay}s` }}
    className="bubble-rise"
  >
    <defs>
      <radialGradient id={`bubble-${delay}`} cx="35%" cy="35%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
        <stop offset="40%" stopColor="rgba(212,88,26,0.08)" />
        <stop offset="100%" stopColor="rgba(42,122,123,0.15)" />
      </radialGradient>
    </defs>
    <circle
      cx="50%" cy="50%" r="46%"
      fill={`url(#bubble-${delay})`}
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="1.5"
    />
    {/* Highlight interno — semicerchio bianco in alto a sx */}
    <ellipse cx="38%" cy="32%" rx="12%" ry="7%"
      fill="rgba(255,255,255,0.7)" transform="rotate(-30, 38%, 32%)" />
  </svg>
)

// CSS da aggiungere in globals.css:
// @keyframes bubble-rise {
//   0%   { transform: translateY(0) scale(1); opacity: 0; }
//   10%  { opacity: 0.7; }
//   80%  { opacity: 0.4; }
//   100% { transform: translateY(-120px) scale(0.6); opacity: 0; }
// }
// .bubble-rise { animation: bubble-rise 4s ease-in infinite; }
```

### 3.2 ScissorsFloat.tsx
Forbici che galleggiano dolcemente. Usate nell'hero background.
```tsx
// SVG forbici stilizzate (colore teal o orange leggero)
// Animazione: flottamento + rotazione lenta
// Variante: 'open' (forbici aperte) | 'closed' (forbici chiuse)

// CSS:
// @keyframes scissors-float {
//   0%   { transform: translateY(0) rotate(-5deg); }
//   50%  { transform: translateY(-16px) rotate(5deg); }
//   100% { transform: translateY(0) rotate(-5deg); }
// }
// Ogni istanza ha animation-duration diverso (3.2s, 4.5s, 5.1s)
// per sembrare organico

// Colore: rgba(42,122,123,0.25) — teal molto trasparente
// Sizes: sm (32px), md (48px), lg (72px)
```

### 3.3 PawPrint.tsx
Singola zampa SVG. Usata in PawTrail e PawDivider.
```tsx
// Forma zampa canina realistica (non emoji)
// Colori: orange-light | teal-light | brown-light
// Sizes: xs (16px), sm (24px), md (36px), lg (48px)
// Rotation: prop angle (default 0) — per disporre organicamente

const PawPrint = ({ color = 'orange', size = 'md', angle = 0 }) => (
  <svg aria-hidden="true" style={{ transform: `rotate(${angle}deg)` }} ...>
    {/* Cuscinetto centrale — ellisse */}
    {/* 4 dita — ellissi più piccole disposte in arco */}
  </svg>
)
```

### 3.4 PawTrail.tsx
Sequenza di zampe che appare seguendo un percorso. Usato nella StorySection.
```tsx
// 8-12 PawPrint disposte lungo una curva SVG
// Animazione: GSAP stagger
// Ogni zampa appare con bounce (spring) seguendo il path
// Le zampe alternano sinistra/destra e angolazioni diverse

// Implementazione GSAP:
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.paw-print', {
      opacity: 0,
      scale: 0,
      stagger: 0.15,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        once: true,
      }
    })
  }, containerRef)
  return () => ctx.revert()
}, [])
```

### 3.5 LokiSticker.tsx
Loki SVG con 4 espressioni. Il componente emotivo del sito.
```tsx
type LokiExpression = 'happy' | 'confused' | 'curious' | 'approves'

// 'happy'    → occhi a semiluna, linguina fuori — usato per success states
// 'confused' → occhi grandi con punto interrogativo — usato per error states
// 'curious'  → testa inclinata, orecchio alzato — usato per empty states
// 'approves' → pollice su (zampa su) con occhi sorridenti — badge "Loki approva"

// Su hover: bounce animation (Framer Motion)
// Dimensioni: sm (48px), md (80px), lg (120px)

// Usato in:
// - Tutti i form states (success/error/empty)
// - Badge "Loki approva" nella CTA section
// - 404 page (confused)
// - Footer (approves, piccolo)
```

### 3.6 PawDivider.tsx
Divisore decorativo tra sezioni — alternativa al `<hr>`.
```tsx
// 5 zampe SVG disposte in linea leggermente ondulata
// Colori alternati: orange-light e teal-light
// Opacità: 0.6
// Su mobile: 3 zampe invece di 5
// Usato tra ogni sezione della homepage
```

---

## 4. LAYOUT E SPAZIATURA

**Container:**
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 clamp(20px, 5vw, 72px);
```

**Sezioni — padding verticale:**
```
mobile:   72px top/bottom
tablet:   96px
desktop:  128px
```

**Grid signature per ServicesSection:**
```
Desktop: grid-template-columns: 1.2fr 0.9fr 1fr (non uguali!)
         prima card: più alta con badge "più richiesto"
         seconda: altezza media
         terza: leggermente più bassa
→ Effetto bento organico — non 3 colonne identiche
```

**Hero layout:**
```
Desktop: split 55%/45%
  sx: testo + CTA in basso (flex-end)
  dx: composizione animata (Loki + bolle + forbici)
Mobile: stack, composizione sotto al testo
```

---

## 5. NAVBAR

**Stile:** Barra piena — no floating island (coerente con vibe friendly, non luxury)

**Iniziale (top):**
```css
background: #FFFDF8;
border-bottom: 2px solid #F0E8DD;
```

**Scrolled (dopo 60px):**
```css
background: rgba(255, 253, 248, 0.92);
backdrop-filter: blur(12px) saturate(150%);
border-bottom: 1px solid rgba(240, 232, 221, 0.8);
box-shadow: 0 4px 20px rgba(106, 58, 42, 0.06);
```

**Struttura:**
```
[Logo Marci & Loki — max-height 48px] ........... [Chi Sono] [Servizi] [Prezzi] [Contatti]  [Prenota 🐾]
```

**CTA "Prenota 🐾":**
```css
background: #D4581A;
color: white;
border-radius: 9999px;
padding: 10px 22px;
font: DM Sans 600;
hover: { background: #A83F0E, scale: 1.04 }
/* La zampa nell'etichetta è un SVG PawPrint xs, non emoji */
```

**Mobile menu:**
```tsx
// Slide-down drawer fullscreen con sfondo #FFFDF8
// Links appaiono con stagger Framer Motion (delay 0.05s each)
// PawPrint decorativa in fondo al menu come firma
// Hamburger: 3 linee → X con transizione Framer
```

---

## 6. ANIMAZIONI — NAVBAR & GLOBAL

### ScrollProgress
```tsx
// Barra 3px in orange — fissa in cima, sotto la navbar
// Framer Motion useScroll + useSpring
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
// transform-origin: '0% 50%' — cresce da sinistra
// Colore: linear-gradient(90deg, #D4581A, #2A7A7B) — arancione → teal
```

### PageTransition
```tsx
// Transizione tra pagine: fade + slide-up leggero
// Framer Motion AnimatePresence
initial: { opacity: 0, y: 10 }
animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
exit:    { opacity: 0, y: -6, transition: { duration: 0.2 } }
```

---

## 7. ANIMAZIONI SIGNATURE — IMPLEMENTAZIONI PRECISE

### 7.1 HeroSection — LA COMPOSIZIONE ANIMATA

L'hero non usa una foto di cane stock. Usa una **composizione SVG/illustrativa**:
```
┌─────────────────────────────────────────────┐
│  [ScissorsFloat lg, bg]    [SoapBubble xl]  │
│                                             │
│  BAGNETTO,          [LokiSticker happy lg]  │
│  PIEGA E            floating su/giù         │
│  COCCOLE.           [SoapBubble md, delay2] │
│                                             │
│  "Il tuo cane..."   [SoapBubble sm, delay3] │
│                                             │
│  [CTA arancione]  [CTA outline teal]        │
│  [ScissorsFloat sm, basso sx]               │
└─────────────────────────────────────────────┘
```

**Timing entrata hero (Framer Motion stagger):**
```tsx
const heroChildren = {
  container: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  item: {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  }
}
// Ordine: tagline → headline → sottotitolo → CTA → composizione visiva
```

**LokiSticker floating nel hero:**
```tsx
// Framer Motion loop infinito
animate={{ y: [0, -14, 0] }}
transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
```

**SoapBubble nel hero:**
```css
/* 5-7 bolle con delays diversi e posizioni random in un quadrante */
.bubble-1 { animation-delay: 0s;   top: 70%; left: 62%; }
.bubble-2 { animation-delay: 1.2s; top: 50%; left: 75%; }
.bubble-3 { animation-delay: 2.4s; top: 80%; left: 80%; }
.bubble-4 { animation-delay: 0.8s; top: 40%; left: 68%; }
.bubble-5 { animation-delay: 3.1s; top: 65%; left: 55%; }
/* position: absolute — il container è position: relative */
```

### 7.2 StorySection — PawTrail Timeline

La storia di Marci dal 2009 al 2026. Le zampe portano attraverso i milestone.

```
[2009 🐕]──🐾🐾──[2023 📚]──🐾🐾🐾──[2025 🎓]──🐾──[2026 ✈️]──🐾──[Giugno 🏠]
```

**Layout:**
```
Desktop: timeline orizzontale con zampe che connettono i nodi
Mobile:  timeline verticale — zampe a sx, testo a dx
```

**Animazione GSAP:**
```typescript
// 1. ScrollTrigger pinna la sezione brevemente
// 2. Le zampe appaiono in sequenza (stagger: 0.15s) da sx a dx
// 3. I milestone node fanno pop con scale 0→1 + bounce
// 4. Il testo del milestone fa fade-up con delay dopo il node

const ctx = gsap.context(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: timelineRef.current,
      start: 'top 65%',
      once: true,
    }
  })

  // Step 1: la linea si "disegna" da sx a dx
  tl.from('.timeline-line', { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.out' })
  // Step 2: zampe appaiono con stagger + bounce
  tl.from('.paw-trail-item', { opacity: 0, scale: 0, stagger: 0.12, ease: 'back.out(2)', duration: 0.5 }, '-=0.8')
  // Step 3: i nodi milestone
  tl.from('.milestone-node', { opacity: 0, scale: 0, stagger: 0.18, ease: 'elastic.out(1, 0.5)', duration: 0.7 }, '-=0.6')
  // Step 4: testi milestone fade-up
  tl.from('.milestone-text', { opacity: 0, y: 12, stagger: 0.12 }, '-=0.4')
}, timelineRef)
return () => ctx.revert()
```

### 7.3 ServicesSection — Card Bento con Tilt

5 card servizi in griglia bento 3+2. Ogni card ha un bordo animato specifico.

**Card Tilt (Framer Motion):**
```tsx
// Ogni card ha tilt in direzione opposta alla precedente
// Card 1: rotate: -1.5  Card 2: rotate: 1.5  Card 3: rotate: -1
const tiltDir = ['-1.5deg', '1.5deg', '-1deg', '1deg', '-1.5deg']

<motion.div
  whileHover={{
    y: -8,
    rotate: tiltDir[index],
    boxShadow: '0 20px 48px rgba(212, 88, 26, 0.18)',
    transition: { type: 'spring', stiffness: 300, damping: 18 }
  }}
>
```

**Bordo "sapone" animato (solo su card Bagno):**
```css
/* Il bordo del ServiceCard Bagno cambia colore lentamente */
@keyframes soap-border {
  0%   { border-color: #D4581A; }
  33%  { border-color: #2A7A7B; }
  66%  { border-color: #6B3A2A; }
  100% { border-color: #D4581A; }
}
.card-bagno:hover { animation: soap-border 3s linear infinite; border-width: 2px; }
```

**Entry stagger (Framer + IntersectionObserver):**
```tsx
const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  })
}
// Usare whileInView + viewport={{ once: true, margin: '-40px' }}
```

### 7.4 WhyMarciSection — Counter + Reveal su sfondo scuro

Sfondo `#6B3A2A` (brown). 3 USP con icone Phosphor e testo bianco.

**Entry: SplitText-like reveal (GSAP):**
```typescript
// Ogni H3 delle USP si rivela parola per parola
// Implementazione manuale (non SplitText plugin — richiede licenza):
// Ogni parola in un proprio <span> con overflow: hidden
// gsap.from('.usp-word', { yPercent: 110, stagger: 0.04, ease: 'power3.out' })

const ctx = gsap.context(() => {
  gsap.from('.usp-icon', {
    scale: 0, opacity: 0, stagger: 0.2, ease: 'back.out(2)',
    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
  })
  gsap.from('.usp-word', {
    yPercent: 105, opacity: 0, stagger: 0.035, ease: 'power3.out', duration: 0.6,
    scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true }
  })
}, sectionRef)
return () => ctx.revert()
```

### 7.5 ProcessSection — Connettori SVG Animati

3 step connessi da una linea SVG tratteggiata che si "disegna" al scroll.

```typescript
// La linea SVG che connette i 3 step usa stroke-dasharray + stroke-dashoffset
// GSAP anima strokeDashoffset da totalLength a 0

const ctx = gsap.context(() => {
  const path = connectorRef.current
  const length = path.getTotalLength()

  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
  gsap.to(path, {
    strokeDashoffset: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 70%',
      end: 'center center',
      scrub: 1,
    }
  })

  // I nodi degli step appaiono quando la linea li raggiunge
  gsap.from('.process-node', {
    scale: 0, opacity: 0, stagger: 0.3, ease: 'elastic.out(1, 0.4)',
    scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true }
  })
}, sectionRef)
return () => ctx.revert()
```

**Stile linea connettore:**
```css
.connector-path {
  stroke: #D4581A;
  stroke-width: 2;
  stroke-dasharray: 8 6;
  fill: none;
  opacity: 0.5;
}
```

### 7.6 BookingCtaSection — Sfondo Animato

Sfondo arancione con bolle più grandi e lente — quasi hypnotic.

```css
/* Bolle grandi, lente, molto trasparenti — creano movimento senza distrarre */
.cta-bubble {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  animation: cta-float var(--duration) ease-in-out infinite alternate;
}

@keyframes cta-float {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(var(--dx), var(--dy)) scale(1.1); }
}

/* 4 bolle con --duration, --dx, --dy diversi via style inline */
```

### 7.7 WhatsAppFAB — Entry + Wiggle

```tsx
// Entry dopo 2s dalla prima visita alla pagina
<motion.div
  initial={{ x: 80, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
>
  {/* Dopo 8s senza interazione, wiggle per attirare attenzione */}
  {/* Implementare con useEffect + setTimeout */}
  {/* animate={{ rotate: [0, -8, 8, -8, 0] }} */}
  {/* transition={{ delay: 8, duration: 0.5 }} */}
</motion.div>
```

---

## 8. COMPONENTI UI — SPECIFICHE COMPLETE

### ServiceCard
```
Aspect: h-full (altezza variabile per effetto bento)
Background: white
Border: 1px solid border — hover: 2px solid orange o teal (dipende dal colorAccent)
Border-radius: 20px (più morbido del solito)
Padding: 28px
Struttura:
  [Badge opzionale — top right]
  [Icona Phosphor 32px nel colore accent]
  [Tagline — DM Sans 500 12px uppercase orange]
  [Nome — Nunito 700 22px brown]
  [Descrizione — DM Sans 400 15px text-sec]
  [Separatore sottile]
  [perChi — DM Sans 500 13px teal]
  [Link "Scopri →" — DM Sans 600 orange, no bottone pieno]
Hover: tilt + shadow (vedi § 7.3)
```

### ProcessStep
```
Layout: cerchio numero (JetBrains Mono 700, teal, 48px) + linea + contenuto
Numero cerchio: border 2px teal, bg teal-light
Ghost number: Nunito 900 80px orange-light opacity 0.15 in absolute background
Titolo: Nunito 700 20px brown
Descrizione: DM Sans 400 15px text-sec
Emoji: grande (32px) come elemento decorativo vicino al titolo
```

### BookingForm
```
Il nome del cane è SEMPRE il primo campo — non negoziabile.

Campi (in ordine):
1. nomeCane     — "Come si chiama il tuo bestione?" (required)
2. razza        — "Che razza è? (bellissima di sicuro)" (optional ma consigliato)
3. servizio     — select: Bagno | Taglio a Forbice | Stripping | Snodatura | Bagno Medicato
4. telefono     — "Il tuo numero" (required)
5. nota         — "Qualcosa che devo sapere sul tuo cane?" (optional, textarea breve)
6. privacy      — checkbox con link privacy policy

Stile input:
  border: 1px solid border
  border-radius: 12px
  focus: border 2px orange + label floating (translateY -20px, scale 0.85)
  background: white

Submit button:
  "Prenota per [nomeCane]" — si aggiorna dinamicamente col nome
  background: orange
  loading: spinner + "Invio in corso..."

Success:
  LokiSticker 'happy' md + "Ricevuto! 🐾 Ti richiamo entro 24 ore."

Error:
  LokiSticker 'confused' sm + "Qualcosa è andato storto. Scrivimi su WhatsApp!"
  + link WhatsApp diretto
```

### LokiSticker States
```
Ogni stato UI importante ha un LokiSticker:

'happy' (success):
  Usato su: form success, booking confermato
  Dimensione: md (80px)
  Animazione: bounce in con elastic.out

'confused' (error):
  Usato su: form error, 404 page, network error
  Dimensione: sm (48px)
  Animazione: shake orizzontale

'curious' (empty/loading):
  Usato su: empty states, pagina in caricamento
  Dimensione: lg (120px) per empty states visibili
  Animazione: testa che si inclina lentamente (oscillazione)

'approves' (CTA/badge):
  Usato su: badge "Loki approva" nella CTA section, footer
  Dimensione: sm (48px) per badge
  Animazione: wink ogni 4s
```

---

## 9. EFFETTI VISIVI

### Hero Background
```css
background:
  radial-gradient(ellipse at 75% 20%, rgba(212,88,26,0.10) 0%, transparent 55%),
  radial-gradient(ellipse at 20% 80%, rgba(42,122,123,0.08) 0%, transparent 50%),
  #FFFDF8;
```

### Card Shadows (mai nere)
```css
--shadow-card:       0 4px 20px rgba(106, 58, 42, 0.08);
--shadow-card-hover: 0 20px 48px rgba(212, 88, 26, 0.18);
--shadow-nav:        0 4px 20px rgba(106, 58, 42, 0.06);
```

### Sezioni Alternate
```
Sezioni pari:  background: --bg (#FFFDF8)
Sezioni dispari: background: --bg-alt (#FFF5EC)
Sezioni "forte": background: --brown (#6B3A2A) — solo WhyMarci e Footer
```

### PawPattern Background (opzionale su sezioni alt)
```css
/* Pattern di zampe a bassissima opacità come texture di sfondo */
.paw-pattern {
  background-image: url("data:image/svg+xml,<svg ...><!-- PawPrint SVG --></svg>");
  background-size: 80px 80px;
  opacity: 0.025;
  position: absolute; inset: 0; pointer-events: none;
}
```

### Input Focus Glow
```css
.form-input:focus {
  border-color: #D4581A;
  box-shadow: 0 0 0 3px rgba(212, 88, 26, 0.12);
  outline: none;
}
```

---

## 10. ACCESSIBILITÀ — COMPLETO

```
Contrasto: min 4.5:1 body, min 3:1 heading su sfondo colorato
Focus: outline 2px solid #D4581A, offset 2px — su OGNI elemento interattivo
prefers-reduced-motion:
  → Disabilitare: BubbleFloat, ScissorsFloat, PawTrail, floating LokiSticker
  → Mantenere: opacity fade-in, transizioni navbar
  → Implementare: if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

SoapBubble, ScissorsFloat, PawTrail, PawDivider → aria-hidden="true"
LokiSticker → alt="Loki il barboncino" (non decorativo)
Form → ogni input con htmlFor + label visibile
Error → role="alert" per screen reader
WhatsApp FAB → aria-label="Contatta Marci su WhatsApp"
NavMobile trigger → aria-label dinamico "Apri menu" / "Chiudi menu"
```

---

## 11. MICRO-COPY DEFINITIVO

### Hero
```
Tagline:     "TOELETTATURA PARMA"
Headline:    "Bagnetto, piega e coccole."
Subhead:     "Il tuo cane lo merita davvero."
Body:        "Sono Marci. Addestratore cinofilo e toelettatore a Parma.
              Ogni cane è diverso — e ogni sessione la tratto come tale."
CTA 1:       "Prenota per il tuo cane [🐾]"  ← zampa SVG
CTA 2:       "Scopri i servizi"
```

### Story Section
```
Titolo:     "Come sono arrivato qui"
Sub:        "Tutto inizia nel 2009, da un cane che è entrato in casa
             e non ne è più uscito (dal cuore)."
CTA fine:   "Leggi tutta la storia →"
```

### Services Section
```
Titolo:     "Cosa fa Marci"
Sub:        "Cinque servizi. Uno stile: prendersi il tempo che serve."
```

### WhyMarci Section
```
Titolo:     "Perché scegliere me"
USP 1:      "Capisco i cani. Davvero."
USP 1 sub:  "Ho il diploma di addestratore cinofilo. I cani difficili
             non mi spaventano — anzi, sono i miei preferiti."
USP 2:      "Un salone piccolo, tutta l'attenzione."
USP 2 sub:  "Nessuna fila. Nessuno stress. Il tuo cane ha la mia
             attenzione completa per tutta la sessione."
USP 3:      "Ogni pelo ha il suo tempo."
USP 3 sub:  "Non taglio di fretta. Il risultato si vede — e si
             vede ancora meglio la volta dopo."
```

### Process Section
```
Titolo:     "Come funziona"
Step 01:    "Scrivimi" / "Su WhatsApp o email — ti rispondo in giornata."
Step 02:    "Parliamo del tuo cane" / "Razza, pelo, carattere. Così arrivo preparato."
Step 03:    "Vieni a Piazzale della Pace" / "Torna a casa con un cane felice e profumato."
```

### CTA Section finale
```
Titolo:     "Il tuo cane merita una giornata da VIP. 🐾"
Sub:        "Scrivimi — parliamo del tuo bestione."
Badge:      "Loki approva ✓" [con LokiSticker 'approves']
CTA:        "Scrivimi su WhatsApp"
```

---

## 12. PATTERN PROIBITI — LISTA DEFINITIVA

**Visual:**
- `#FFFFFF` come sfondo pagina → `#FFFDF8`
- Qualsiasi tema dark o scuro
- Gradienti purple/blue/neon — palette solo warm
- Box-shadow con `rgba(0,0,0,x)` → usa `rgba(106,58,42,x)`
- Border-radius < 12px sulle card principali (perdono calore)
- Emoji nei testi del codice → SVG PawPrint o Phosphor icons

**Tipografici:**
- Inter, Roboto, Open Sans per i titoli → Nunito
- Nunito per il body → DM Sans
- UPPERCASE sui titoli H1/H2 — si legge male con Nunito 900

**Layout:**
- 3 colonne identiche per i servizi
- Hero solo testuale (aggiungi sempre la composizione animata)
- Tutto centrato perfettamente — usa allineamento a sinistra per i testi

**Copy:**
- "Animale" / "animale domestico" → "cane" / "bestione" / "peloso"
- "I nostri servizi" → "Cosa fa Marci"
- "Scopri di più" → CTA specifica
- Nessun ruolo a Loki → è il co-protagonista, appare ovunque

**Tecnico:**
- `h-screen` → `min-h-[100dvh]`
- `<img>` raw → `next/image`
- GSAP senza `gsap.context()` → memory leak
- Framer Motion + GSAP nello stesso componente → conflitti
- CSS animations loop senza `prefers-reduced-motion` check → accessibilità rotta
- LokiSticker senza alt → non accessibile