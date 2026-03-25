import { Metadata } from 'next'
import { generateMetadataHelper, generateFAQPageLD, generateBreadcrumbLD } from '@/lib/seo'
import FAQContent from '@/components/sections/FAQContent'

export const metadata: Metadata = generateMetadataHelper(
  'faq',
  'Domande Frequenti (FAQ)',
  'Trova le risposte alle domande più comuni sulla toelettatura cani a Parma. Tempi, metodi, gestione cani ansiosi e consigli di Marci & Loki.',
  '/faq'
)

const faqs = [
  {
    q: "Quanto dura una sessione di toelettatura?",
    a: "In genere tra i 60 e i 90 minuti, a seconda della taglia del cane e del tipo di trattamento (bagno, taglio o stripping). Ogni cane ha i suoi tempi e noi li rispettiamo senza fretta."
  },
  {
    q: "Posso restare durante la toelettatura?",
    a: "Consigliamo sempre di lasciare il cane con noi. La presenza del proprietario può essere fonte di distrazione o ansia per il cane, rallentando il processo e rendendolo meno sicuro."
  },
  {
    q: "Gestite anche cani particolarmente ansiosi o 'difficili'?",
    a: "Sì, assolutamente. Marco è un addestratore cinofilo certificato: questo significa che sa leggere il linguaggio del corpo del cane e gestire situazioni di stress in modo professionale e calmo."
  },
  {
    q: "Cosa devo portare per un bagno medicato?",
    a: "Per i bagni medicati è necessario portare lo shampoo specifico prescritto dal vostro veterinario. Noi ci occuperemo dell'applicazione corretta e del tempo di posa necessario."
  },
  {
    q: "Ogni quanto dovrei portare il mio cane a fare il bagno?",
    a: "Dipende molto dallo stile di vita e dal tipo di pelo. In generale, ogni 4-6 settimane è l'ideale per mantenere la pelle sana e il pelo privo di nodi."
  }
]

export default function FAQPage() {
  const faqLD = generateFAQPageLD(faqs)
  const breadcrumbLD = generateBreadcrumbLD([{ name: 'FAQ', path: '/faq' }])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />
      <FAQContent faqs={faqs} />
    </>
  )
}
