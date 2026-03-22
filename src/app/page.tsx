'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { QuantumDots } from '@/components/oio/quantum-dots'
import { GlassDrawer } from '@/components/oio/glass-drawer'

const SECTION_LABELS = ['OIO ONE CORE', 'OIO MEDIA', 'OIO CONNECT']

export default function OioOneCore() {
  const [activeSection, setActiveSection] = useState(0)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Removido o transporte padrão para evitar erros de conexão inicial
  const { messages, append, status } = useChat({
    api: '/api/chat',
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const handleSendMessage = useCallback(async (text: string) => {
    await append({ content: text, role: 'user' })
  }, [append])

  const handleNavigate = useCallback((index: number) => {
    setActiveSection(index)
    if (videoContainerRef.current) {
      const sectionHeight = window.innerHeight
      videoContainerRef.current.scrollTo({
        top: index * sectionHeight,
        behavior: 'smooth'
      })
    }
  }, [])

  useEffect(() => {
    const container = videoContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const sectionHeight = window.innerHeight
      const newIndex = Math.round(scrollTop / sectionHeight)
      if (newIndex !== activeSection && newIndex >= 0 && newIndex < 3) {
        setActiveSection(newIndex)
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  return (
    <main className="relative h-screen w-screen bg-black overflow-hidden font-sans tracking-tighter text-white">
      
      {/* CAMADA 0 (Z-0): Area de Video Vertical - ROLA POR TRAS */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0 overflow-y-auto snap-y snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {[0, 1, 2].map((index) => (
          <section
            key={index}
            className="relative h-screen w-full snap-start snap-always flex items-center justify-center"
          >
            {/* Fundo escuro profundo */}
            <div className="absolute inset-0 bg-zinc-950" />
            
            <div className="relative z-10 opacity-20 flex flex-col items-center">
              <div className="w-24 h-24 border border-zinc-800 rounded-full flex items-center justify-center mb-6">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-zinc-700 border-b-[12px] border-b-transparent ml-1" />
              </div>
              <p className="text-[11px] tracking-[.6em] uppercase text-zinc-500 font-bold">
                {SECTION_LABELS[index]}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* CAMADA 1 (Z-10): Salto Quantico - DOTS FIXOS */}
      <QuantumDots
        activeIndex={activeSection}
        onNavigate={handleNavigate}
        total={3}
      />

      {/* CAMADA 2 (Z-20): Gaveta de Vidro - MICHEL */}
      <GlassDrawer
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
      />
    </main>
  )
}
