'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface QuantumDotsProps {
  activeIndex: number
  onNavigate: (index: number) => void
  total?: number
}

export function QuantumDots({ activeIndex, onNavigate, total = 3 }: QuantumDotsProps) {
  const [ripples, setRipples] = useState<{ id: number; index: number }[]>([])

  const handleClick = useCallback((index: number) => {
    const rippleId = Date.now()
    setRipples((prev) => [...prev, { id: rippleId, index }])
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== rippleId))
    }, 400)

    onNavigate(index)
  }, [onNavigate])

  return (
    <nav 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-5"
      aria-label="Navegacao por secoes"
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className="relative w-8 h-8 flex items-center justify-center focus:outline-none group"
          aria-label={`Navegar para secao ${index + 1}`}
          aria-current={activeIndex === index ? 'true' : undefined}
        >
          {ripples
            .filter((r) => r.index === index)
            .map((ripple) => (
              <span
                key={ripple.id}
                className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-zinc-500/30 animate-ripple pointer-events-none"
              />
            ))}
          
          <span
            className={cn(
              'relative w-2 h-2 rounded-full transition-all duration-300 ease-out',
              activeIndex === index
                ? 'bg-emerald-500 scale-150 shadow-lg shadow-emerald-500/30'
                : 'bg-zinc-500/50 group-hover:bg-zinc-400 group-hover:scale-125'
            )}
          />
        </button>
      ))}
    </nav>
  )
}
