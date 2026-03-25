export interface Servizio {
  id: string
  slug: 'bagno' | 'taglio-forbice' | 'stripping' | 'snodatura' | 'bagno-medicato'
  nome: string
  tagline: string
  descrizione: string
  dettagli: string[]
  perChi: string
  durata?: string
  prezzo?: string
  badge?: 'più-richiesto' | 'per-esperti' | 'su-prescrizione'
  colorAccent: 'orange' | 'teal' | 'brown'
  icon: string
}

export type ProcessStep = {
  numero: '01' | '02' | '03'
  titolo: string
  descrizione: string
  emoji: string
}

export interface FormPrenotazione {
  nomeCane: string
  razza: string
  servizio: Servizio['slug']
  dataPreferita?: string
  telefono: string
  note?: string
  privacyConsent: boolean
}

export type LokiExpression = 'happy' | 'confused' | 'curious' | 'approves'
