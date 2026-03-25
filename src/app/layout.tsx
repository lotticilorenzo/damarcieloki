import type { Metadata } from 'next'
import { Nunito, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-nunito',
  adjustFontFallback: true,
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-dm-sans',
  adjustFontFallback: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  adjustFontFallback: true,
})

import { generateMetadataHelper, generateLocalBusinessLD } from '@/lib/seo'
import dynamic from 'next/dynamic'

const PawCursor = dynamic(() => import('@/components/ui/PawCursor').then(mod => mod.PawCursor), { ssr: false })
const SoundToggle = dynamic(() => import('@/components/ui/SoundToggle').then(mod => mod.SoundToggle), { ssr: false })

export const metadata: Metadata = generateMetadataHelper(
  'homepage',
  'Toelettatura Cani Parma',
  'Salone di toelettatura cani a Parma gestito da un addestratore cinofilo. Bagnetto, taglio a forbice, stripping e cure su misura. Dove ogni cane è speciale.',
  '/',
  {
    other: {
      'geo.region': 'IT-PR',
      'geo.placename': 'Parma',
      'geo.position': '44.8015;10.3279',
      'ICBM': '44.8015, 10.3279',
    }
  }
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={cn(nunito.variable, dmSans.variable, jetbrainsMono.variable)}>
      <body className="font-sans text-text-sec bg-bg min-h-[100dvh] antialiased overflow-x-hidden selection:bg-orange-light selection:text-orange-dark">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessLD()) }}
        />
        {children}
        <PawCursor />
        <SoundToggle />
      </body>
    </html>
  )
}
