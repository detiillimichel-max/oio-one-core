import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import React from 'react'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'OIO ONE CORE',
  description: 'Interface de Profundidade Orgânica - Michel Detilli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${geist.className} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  )
}
