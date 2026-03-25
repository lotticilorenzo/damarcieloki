# CLAUDE.md — Da Marci & Loki 🐾
# FONTE DI VERITÀ. Leggi TUTTO prima di scrivere una sola riga di codice.
# Questo file e SKILL.md sono complementari: questo definisce COSA costruire,
# SKILL.md definisce COME costruirlo visivamente. Leggi entrambi.

---

## 1. IDENTITÀ BRAND

**Nome:** Da Marci & Loki — Toelettatura
**Slogan:** "Dove ogni cane è speciale"
**Settore:** Toelettatura cani (solo cani, nessun gatto)
**Sede:** Piazzale della Pace, 10 — Parma (PR)
**Telefono:** +39 375 9893189
**WhatsApp:** +39 375 9893189 (stesso numero)
**Email:** info@damarcieloki.it
**Dominio:** damarcieloki.it (già acquistato dal cliente)
**Apertura:** Giugno 2026

**Titolare:** Marco
- Addestratore cinofilo certificato (corso 2023–2025)
- Toelettatore (corso 2026)
- Vantaggio competitivo reale: capisce il comportamento del cane,
  gestisce i cani ansiosi/difficili in modo professionale

**Loki:** Il barboncino/spaniel del logo — co-protagonista del sito.
Non è solo una mascotte decorativa: Loki è il "quality inspector" del salone.
Ogni parte dell'UI dove appare deve avere una battuta o un ruolo narrativo.

---

## 2. POSITIONING & TONE

**Positioning reale:**
Piccolo salone personale. Marci conosce ogni cane per nome.
Non è una catena. Non è una spa per cani. È il toelettatore di fiducia
del quartiere — quello che chiami anche per un consiglio.
Il doppio background (addestratore + toelettatore) è il vero differenziale:
nessun altro in zona può gestire sia il pelo che il comportamento del cane.

**Tone of Voice — 5 regole:**
1. Prima persona sempre: "Io", "Porto il tuo cane", "Con me"
2. Spiritoso ma mai childish — battute da adulto appassionato di cani
3. Diretto: frasi corte, zero subordinate infinite
4. Italiano colloquiale corretto — niente dialetto, niente anglicismi inutili
5. Il cane è sempre "il tuo bestione/peloso/amico", mai "l'animale" o "il pet"

**Esempi di tono GIUSTO:**
```
"Ho il diploma di addestratore. Anche Loki mi ha esaminato — l'ha passato anche lui."
"Ogni pelo è diverso. I prodotti li scelgo io, ogni volta."
"Niente fila, niente stress. Solo tu, il tuo cane, e noi."
"I cani difficili? Sono i miei preferiti. Sfida accettata."
"Torna a casa bello come non mai. E profumato, stavolta."
```

**Esempi di tono SBAGLIATO — vietati:**
```
"Benvenuti nel nostro salone di toelettatura professionale"  ← freddo
"Qualità garantita per il tuo amato animale domestico"       ← generico
"I nostri servizi includono..."                              ← corporate
"Scopri di più" / "Clicca qui"                              ← CTA morte
"Il meglio per il tuo pet"                                   ← anglicismo inutile
```

---

## 3. PALETTE COLORI

Estratta direttamente dal logo — nessun colore inventato.

```css
/* ── SFONDI ── */
--bg:           #FFFDF8;   /* Bianco caldo — mai #FFF freddo */
--bg-alt:       #FFF5EC;   /* Pesca pallido — sezioni alternate */
--surface:      #FFFFFF;   /* Card e pannelli */
--border:       #F0E8DD;   /* Bordi caldi */
--border-hover: #DDD0C0;   /* Bordi su hover */

/* ── ARANCIONE — colore primario (da "Marci" nel logo) ── */
--orange:       #D4581A;
--orange-dark:  #A83F0E;   /* Hover */
--orange-light: #FFF0E6;   /* Badge bg, highlight leggero */
--orange-glow:  rgba(212, 88, 26, 0.12);

/* ── TEAL — colore secondario (da "Loki" nel logo) ── */
--teal:         #2A7A7B;
--teal-dark:    #1F5C5D;   /* Hover */
--teal-light:   #E8F5F5;   /* Badge bg teal */
--teal-glow:    rgba(42, 122, 123, 0.10);

/* ── MARRONE — dal pelo del cane nel logo ── */
--brown:        #6B3A2A;   /* Titoli sezioni, footer */
--brown-light:  #F5EDE8;   /* Bg sezioni scure warm */

/* ── TESTO ── */
--text:         #2C1810;   /* Quasi nero caldo */
--text-sec:     #7A5C50;   /* Secondario */
--text-muted:   #B09080;   /* Caption, placeholder */
```

**Tailwind config extend:**
```js
colors: {
  bg: '#FFFDF8', 'bg-alt': '#FFF5EC',
  surface: '#FFFFFF', border: '#F0E8DD', 'border-hover': '#DDD0C0',
  orange: '#D4581A', 'orange-dark': '#A83F0E',
  'orange-light': '#FFF0E6', 'orange-glow': 'rgba(212,88,26,0.12)',
  teal: '#2A7A7B', 'teal-dark': '#1F5C5D',
  'teal-light': '#E8F5F5', 'teal-glow': 'rgba(42,122,123,0.10)',
  brown: '#6B3A2A', 'brown-light': '#F5EDE8',
  text: '#2C1810', 'text-sec': '#7A5C50', 'text-muted': '#B09080',
}
```

**Regole colore — NON NEGOZIABILI:**
- MAI `#FFFFFF` come sfondo pagina → usa `#FFFDF8`
- MAI sfondo scuro/dark — questo è LIGHT WARM, sempre
- UN accento primario (orange) + UN secondario (teal)
- Ombre: sempre tonalizzate `rgba(106,58,42,0.08)` — mai nere piatte
- Gradienti: solo tra colori della palette, mai violet/blu AI

---

## 4. TIPOGRAFIA

```typescript
// Titoli: Nunito — rotondo, caldo, carattere forte senza essere childish
import { Nunito } from 'next/font/google'
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// UI / Corpo: DM Sans — leggibile, amichevole, non sterile
import { DM_Sans } from 'next/font/google'
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

// Numeri / Prezzi / Step: JetBrains Mono
import { JetBrains_Mono } from 'next/font/google'
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
})
```

**Scala tipografica:**
```
Display Hero: clamp(52px, 9vw, 100px) — Nunito 900 italic — color: brown
H1:           clamp(38px, 5.5vw, 60px) — Nunito 800        — color: brown
H2:           clamp(28px, 4vw, 44px)   — Nunito 800        — color: brown
H3:           clamp(18px, 2.5vw, 24px) — Nunito 700        — color: text
Body:         16-17px — DM Sans 400 — line-height 1.75     — color: text-sec
Label/Tag:    11-12px — DM Sans 600 UPPERCASE — tracking 0.10em
Prezzi/Step:  qualsiasi — JetBrains Mono 500               — color: orange o teal
```

**Regole:**
- Hero: parola/frase chiave in italic Nunito 900 — crea impatto senza urlare
- MAI Nunito per il body (solo titoli)
- Prezzi e numeri: sempre JetBrains Mono — mai DM Sans per i numeri
- max-width body text: 62ch

---

## 5. STACK TECNICO

```
Next.js 14+          App Router — Server Components di default
TypeScript           strict: true — ZERO uso di `any`
Tailwind CSS v3      controlla package.json prima di usare sintassi nuova
Framer Motion        interazioni UI, hover, stagger entry, AnimatePresence
GSAP + ScrollTrigger scroll-driven, count-up, path animation SVG
                     SEMPRE gsap.context() + cleanup ctx.revert()
@phosphor-icons/react unica libreria icone — controlla versione installata
react-hook-form      TUTTI i form senza eccezioni
zod                  TUTTE le validazioni — schema in lib/validations.ts
clsx / cn()          classi condizionali — mai string concatenation
next/image           OBBLIGATORIO — mai <img> raw
next/font            tutti i font Google — display: 'swap' sempre
```

**REGOLA CRITICA Framer vs GSAP — ripetuta perché importante:**
- **Framer Motion** → hover effects, card tilt, stagger di entrata, AnimatePresence
- **GSAP** → ScrollTrigger, count-up al viewport, animazioni SVG path, sequenze
- **MAI entrambi nello stesso albero di componenti**
- Se un componente usa GSAP → tutto quel componente è GSAP, non mischiare

---

## 6. ARCHITETTURA CARTELLE

```
src/
  app/
    (site)/
      layout.tsx            ← breadcrumb + page transition wrapper
      page.tsx              ← Homepage
      chi-sono/
        page.tsx
      servizi/
        page.tsx
      prezzi/
        page.tsx
      contatti/
        page.tsx
    layout.tsx              ← root: font, metadata base, providers
    globals.css
    sitemap.ts
    robots.ts

  components/
    layout/
      Header.tsx            ← navbar con glass morphism on scroll
      Footer.tsx
      NavMobile.tsx         ← slide-down drawer mobile

    sections/               ← sezioni della homepage
      HeroSection.tsx       ← ANIMAZIONE SIGNATURE (vedi SKILL.md sezione 7)
      StorySection.tsx      ← timeline 2009→2026 con PawTrail
      ServicesSection.tsx   ← 3 card bento con tilt
      WhyMarciSection.tsx   ← 3 USP su sfondo brown
      ProcessSection.tsx    ← 3 step con connettori animati
      BookingCtaSection.tsx ← banda finale + form rapido

    ui/
      ServiceCard.tsx       ← card con tilt Framer + bordo animato
      ProcessStep.tsx       ← step con numero ghost background
      PawTrail.tsx          ← 🐾 zampe SVG che appaiono in sequenza (GSAP)
      SoapBubble.tsx        ← bolle SVG animate (CSS keyframes)
      ScissorsFloat.tsx     ← forbici SVG che galleggiano nell'hero
      LokiSticker.tsx       ← Loki SVG con espressioni diverse
      ScrollProgress.tsx    ← barra progress orange in cima
      WhatsAppFAB.tsx       ← FAB fisso bottom-right
      PageTransition.tsx    ← transizione tra pagine

    forms/
      BookingForm.tsx       ← form con nome cane = campo 1

  lib/
    utils.ts                ← cn(), formatDurata(), whatsappLink(), ctaConNome()
    animations.ts           ← varianti Framer Motion riusabili
    gsap-utils.ts           ← init ScrollTrigger, helper cleanup
    validations.ts          ← schema Zod
    seo.ts                  ← metadata helpers, JSON-LD generators

  types/
    index.ts

  data/
    services.ts             ← dati servizi
    process.ts              ← steps prenotazione
```

---

## 7. TIPI TYPESCRIPT

```typescript
// types/index.ts

interface Servizio {
  id: string
  slug: 'bagno' | 'taglio-forbice' | 'stripping' | 'snodatura' | 'bagno-medicato'
  nome: string
  tagline: string            // frase breve spiritosa
  descrizione: string        // testo corpo
  dettagli: string[]         // bullet points tecnici
  perChi: string             // "Per cani a pelo lungo e riccio"
  durata?: string            // "~60-90 min" (da raccogliere)
  prezzo?: string            // "Da €X" (da raccogliere)
  badge?: 'più-richiesto' | 'per-esperti' | 'su-prescrizione'
  colorAccent: 'orange' | 'teal' | 'brown'
  icon: string               // Phosphor icon name
}

type ProcessStep = {
  numero: '01' | '02' | '03'
  titolo: string
  descrizione: string
  emoji: string              // emoji rappresentativa
}

interface FormPrenotazione {
  nomeCane: string           // PRIMO CAMPO — crea simpatia immediata
  razza: string
  servizio: Servizio['slug']
  dataPreferita?: string
  telefono: string
  note?: string
  privacyConsent: boolean
}
```

---

## 8. DATI SERVIZI (pre-compilati da locandina)

```typescript
// data/services.ts
export const servizi: Servizio[] = [
  {
    id: '1',
    slug: 'bagno',
    nome: 'Bagno',
    tagline: 'Tre fasi, zero compromessi.',
    descrizione: 'Pre-shampoo, shampoo e crema: ogni lavaggio segue tre passaggi per un risultato che si vede e si sente. I prodotti li scelgo io in base al tipo e allo stato del pelo del tuo cane.',
    dettagli: [
      'Pre-shampoo per preparare il pelo',
      'Shampoo specifico per tipologia di pelo',
      'Crema ristrutturante finale',
      'Prodotti scelti ad hoc per ogni cane',
    ],
    perChi: 'Per tutti i cani',
    badge: 'più-richiesto',
    colorAccent: 'orange',
    icon: 'Drop',
  },
  {
    id: '2',
    slug: 'taglio-forbice',
    nome: 'Taglio a Forbice',
    tagline: 'Il tuo cane, nella sua versione migliore.',
    descrizione: 'Effettuato sul pelo medio-lungo. I risultati si vedono già dalla prima sessione, ma è dal secondo taglio che il pelo inizia davvero a esprimersi. La costanza fa la differenza.',
    dettagli: [
      'Per cani a pelo medio o lungo',
      'Taglio personalizzato su richiesta',
      'Risultati evidenti già dal primo taglio',
      'Migliora taglio dopo taglio',
    ],
    perChi: 'Cani a pelo medio-lungo',
    colorAccent: 'teal',
    icon: 'Scissors',
  },
  {
    id: '3',
    slug: 'stripping',
    nome: 'Stripping',
    tagline: 'Ogni pelo racconta una storia. Io la rispetto.',
    descrizione: 'Tecnica manuale per cani a pelo duro: invece di tagliare, rimuovo il pelo morto a mano, permettendo al pelo nuovo di crescere più forte e di mantenere il colore corretto. Non è per tutti — ma per chi serve, cambia tutto.',
    dettagli: [
      'Solo per cani a pelo duro',
      'Rimuove il pelo morto manualmente',
      'Mantiene il colore naturale del manto',
      'Favorisce la crescita del pelo sano',
    ],
    perChi: 'Cani a pelo duro (Fox Terrier, Schnauzer, ecc.)',
    badge: 'per-esperti',
    colorAccent: 'brown',
    icon: 'HandPointing',
  },
  {
    id: '4',
    slug: 'snodatura',
    nome: 'Snodatura',
    tagline: 'Prima la salute del cane, poi l\'estetica.',
    descrizione: 'Per cani a pelo lungo con molti nodi: si lavora sul pelo per renderlo liscio e trattabile. Attenzione: la snodatura può creare stress, arrossamenti, e nei casi gravi dermatiti. La valutiamo insieme — decidiamo cosa è meglio per il tuo cane, non per l\'aspetto.',
    dettagli: [
      'Per cani a pelo lungo con nodi',
      'Valutata insieme al proprietario',
      'Priorità al benessere del cane',
      'Alternativa: taglio corto se necessario',
    ],
    perChi: 'Cani a pelo lungo con nodi importanti',
    colorAccent: 'teal',
    icon: 'ArrowsCounterClockwise',
  },
  {
    id: '5',
    slug: 'bagno-medicato',
    nome: 'Bagno Medicato',
    tagline: 'Lo shampoo lo porta il vet. Il resto lo faccio io.',
    descrizione: 'Per cani con problemi di pelle: il bagno viene effettuato con lo shampoo specifico prescritto dal vostro veterinario. Voi portate il prodotto, io mi occupo di tutto il resto con la cura che serve.',
    dettagli: [
      'Shampoo fornito dal proprietario su prescrizione vet',
      'Tecnica adattata alla condizione della pelle',
      'Massima delicatezza',
      'Richiede prescrizione veterinaria',
    ],
    perChi: 'Cani con problemi dermatologici',
    badge: 'su-prescrizione',
    colorAccent: 'teal',
    icon: 'FirstAid',
  },
]
```

---

## 9. STRUTTURA HOMEPAGE

```
1. HeroSection          → FIRMA VISIVA (vedi SKILL.md § 7.1)
2. StorySection         → Timeline Marci con PawTrail animato
3. ServicesSection      → 5 card bento con tilt + bordi animati
4. WhyMarciSection      → 3 USP su sfondo brown scuro
5. ProcessSection       → 3 step con connettori SVG animati (GSAP)
6. BookingCtaSection    → CTA orange full-width + form rapido
[Footer]
```

**[DA RACCOGLIERE DAL CLIENTE prima di andare live:]**
- Prezzi per ogni servizio (per taglia/razza se varia)
- Orari di apertura (giorni + fasce orarie)
- Foto di Loki (PNG sfondo trasparente se possibile)
- Foto del salone interno/esterno
- Foto di Marci al lavoro
- Conferma razze gestite o escluse

---

## 10. SEO — OGNI PAGINA

**Keyword principale:** toelettatura cani Parma
**Keyword secondarie:**
```
salone toelettatura cani Parma
bagno cani Parma
stripping cani Parma
addestratore toelettatore Parma
toelettatura Piazzale della Pace Parma
toelettatura cani pelo duro Parma
```

**Title format:** `[Keyword] | Da Marci & Loki — Toelettatura Parma`

**Ogni pagina DEVE avere:**
```typescript
export const metadata: Metadata = {
  title: '...',
  description: '...', // 150-160 caratteri, keyword naturale dentro
  openGraph: { title, description, images: ['/og/[pagina].jpg'], url },
  alternates: { canonical: 'https://damarcieloki.it/...' },
}
```

**Schema.org:**
```
Homepage + Contatti → LocalBusiness { "@type": "PetGrooming" }
Servizi             → Service per ogni servizio
Prezzi              → Offer per ogni prezzo (quando disponibili)
```

---

## 11. GESTIONE STATI UI

Ogni componente interattivo DEVE avere:

```
Loading:  skeleton shimmer — dimensioni coerenti col layout reale
Error:    LokiSticker con espressione "confusa" + messaggio inline
Empty:    LokiSticker con espressione "curiosa" + testo guida
Success:  LokiSticker con espressione "felice" + messaggio confermato
```

**BookingForm stati:**
- Submit: bottone → "Invio in corso..." + spinner Phosphor CircleNotch rotante
- Success: "Ricevuto! 🐾 Ti richiamo entro 24 ore per confermare la sessione di [nomeCane]."
- Error: "Qualcosa è andato storto. Scrivimi direttamente su WhatsApp!" + link

---

## 12. PERFORMANCE

```
Immagini above-fold → priority su next/image
Font → display: 'swap' sempre
GSAP → cleanup ctx.revert() in OGNI useEffect return
SoapBubble, ScissorsFloat → React.memo + isolati in Client Component foglia
PawTrail SVG → caricato solo al viewport (IntersectionObserver)
MAI animare top/left/width/height → solo transform e opacity
prefers-reduced-motion:
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return  // prima di qualsiasi GSAP o loop Framer
```

---

## 13. ACCESSIBILITÀ

- Contrasto: min 4.5:1 body, 3:1 large text
- Focus visible: outline 2px solid orange su ogni elemento interattivo
- Tutti gli SVG decorativi (bolle, zampe, forbici): `aria-hidden="true"`
- LokiSticker: `alt="Loki il barboncino di Marci"` — non decorativo
- Form: label `htmlFor` associata, error con `role="alert"`
- WhatsApp FAB: `aria-label="Contatta Marci su WhatsApp"`
- Hamburger mobile: `aria-label="Apri menu"` / `aria-label="Chiudi menu"`

---

## 14. CHECKLIST PRE-COMMIT

```
[ ] TypeScript strict — zero errori, zero any
[ ] npm run build passa senza errori o warning
[ ] Mobile 320px / 375px / 768px / 1024px testati
[ ] WhatsApp link funzionante con messaggio pre-compilato
[ ] Tutti i link interni funzionanti
[ ] Metadata + canonical su ogni pagina
[ ] prefers-reduced-motion gestito ovunque
[ ] GSAP ctx.revert() presente in ogni useEffect
[ ] next/image su tutte le immagini con alt
[ ] Form: Zod schema + email automatica + tutti gli stati UI
[ ] Schema.org LocalBusiness PetGrooming
[ ] Sitemap.ts aggiornato
[ ] robots.ts configurato
[ ] SSL attivo (verificare post-deploy)
```

---

## 15. PATTERN PROIBITI

**Visivi:**
- Sfondo `#FFFFFF` freddo → `#FFFDF8`
- Qualsiasi sfondo dark/scuro
- Gradienti purple/blue/neon
- Box-shadow nere piatte: `rgba(0,0,0,0.x)` → usa `rgba(106,58,42,0.x)`

**Tipografici:**
- Titoli in Inter / Roboto / Open Sans — solo Nunito
- Nunito per il body text — solo DM Sans
- UPPERCASE sui titoli principali — si legge male con Nunito 900

**Layout:**
- 3 colonne identiche per i servizi — usa bento asimmetrico
- Hero solo testuale senza elemento visivo forte

**Copy:**
- "Animale domestico" → "cane" o "bestione"
- "I nostri servizi" come titolo → "Cosa fa Marci"
- "Scopri di più" come CTA → qualcosa di specifico
- Lorem ipsum — MAI
- Nessuna menzione di Loki — è il co-protagonista

**Tecnico:**
- `h-screen` → `min-h-[100dvh]`
- `<img>` → `next/image`
- GSAP senza gsap.context() → memory leak garantito
- Framer + GSAP nello stesso componente → conflitti garantiti