import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function ctaConNome(nome?: string): string {
  if (!nome || nome.trim() === '') {
    return 'Prenota per il tuo cane'
  }
  return `Prenota per ${nome}`
}

export function whatsappLink(messaggio: string = "Ciao Marci, vorrei avere alcune informazioni riguardo ai vostri servizi per cani🐾."): string {
  const phone = '393759893189'
  return `https://wa.me/${phone}?text=${encodeURIComponent(messaggio)}`
}

export function formatDurata(minutiBase: number, minutiMax?: number): string {
  if (minutiMax) {
    return `~${minutiBase}-${minutiMax} min`
  }
  return `~${minutiBase} min`
}
