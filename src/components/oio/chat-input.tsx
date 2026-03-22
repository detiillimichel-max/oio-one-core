'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ onSend, disabled, placeholder = 'Mande sua vibração...' }: ChatInputProps) {
  const [value, setValue] = useState('')
  const [isPressed, setIsPressed] = useState(false)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }, [value, disabled, onSend])

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex items-center bg-white/[0.05] rounded-full border border-white/[0.08] px-5 py-3.5 focus-within:bg-white/[0.08] focus-within:border-white/20 transition-all duration-300">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
          className="flex-1 bg-transparent border-none text-sm text-white/80 focus:outline-none placeholder:text-zinc-600 tracking-tight disabled:opacity-50"
          placeholder={placeholder}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          className={cn(
            'relative bg-white/10 p-2.5 rounded-full text-white/70 transition-all duration-200 disabled:opacity-20',
            isPressed ? 'scale-90 bg-white/20 text-white' : 'hover:bg-white/20 hover:text-white active:scale-95'
          )}
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            {isPressed && (
              <span className="absolute inset-0 bg-emerald-500/20 animate-ripple-btn" />
            )}
          </span>
          <svg className="relative w-4 h-4 rotate-90" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </form>
  )
}
