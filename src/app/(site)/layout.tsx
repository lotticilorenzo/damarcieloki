import React from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB'
import { PageTransition } from '@/components/ui/PageTransition'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <PageTransition>
        <main className="flex-grow w-full flex flex-col relative overflow-clip">
          {children}
        </main>
      </PageTransition>
      <WhatsAppFAB />
      <Footer />
    </>
  )
}
