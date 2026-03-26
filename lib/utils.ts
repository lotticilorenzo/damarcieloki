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

export function handleWhatsAppClick(e: React.MouseEvent<HTMLAnchorElement>, messaggio: string = "Ciao Marci, vorrei avere alcune informazioni riguardo ai vostri servizi per cani🐾.") {
  e.preventDefault();
  const phone = '393759893189';
  const encodedMsg = encodeURIComponent(messaggio);
  
  // Rilevamento client-side basilare per forzare WhatsApp Web su Desktop (che mostra direttamente il QR Code o la chat se già loggati)
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  const url = isMobile 
    ? `https://wa.me/${phone}?text=${encodedMsg}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encodedMsg}`;
    
  window.open(url, '_blank');
}

export function formatDurata(minutiBase: number, minutiMax?: number): string {
  if (minutiMax) {
    return `~${minutiBase}-${minutiMax} min`
  }
  return `~${minutiBase} min`
}
