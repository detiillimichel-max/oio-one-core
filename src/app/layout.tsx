import './globals.css'
import { Inter } from 'next/font/google'

// Tipografia padrão Apple/High-End
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'OIO ONE',
  description: 'Interface Orgânica por Profundidade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={`${inter.variable} font-sans`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
      </head>
      <body className="bg-black text-zinc-100 antialiased selection:bg-zinc-800">
        {/* Michel, aqui removemos a Navbar e Sidebar do Daniel. 
            O OIO ONE é imersivo: o conteúdo ocupa 100% da tela.
        */}
        <div className="relative min-h-screen flex flex-col overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
