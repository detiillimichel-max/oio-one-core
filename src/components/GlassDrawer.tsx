'use client';

import React from 'react';

// OIO ONE - Gaveta de Identidade (30% - 50%)
// Foco: Ergonomia Dinâmica e Efeito Vidro Esmeralda

export default function GlassDrawer({ messages, isLoading, onSendMessage }: any) {
  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out">
      {/* Camada de Vidro com Backdrop Blur Profissional */}
      <div className="bg-zinc-950/60 backdrop-blur-2xl border-t border-white/10 rounded-t-[2.5rem] h-[40vh] flex flex-col shadow-2xl">
        
        {/* Alça de Arraste (Design Minimalista) */}
        <div className="w-full flex justify-center p-3">
          <div className="w-10 h-1 bg-zinc-700 rounded-full animate-pulse" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-4 custom-scrollbar">
          {messages.map((msg: any, i: number) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-3xl ${
                msg.role === 'user' 
                ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-50' 
                : 'bg-white/5 border border-white/10 text-zinc-300'
              } ${msg.role === 'user' ? 'rounded-br-none' : 'rounded-bl-none'}`}>
                <p className="text-sm leading-relaxed tracking-tight">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && <div className="text-zinc-500 text-xs animate-bounce ml-2">Vibrando...</div>}
        </div>

        {/* Barra de Input Estilo Rede Social Moderna */}
        <div className="p-6 bg-black/20">
          <div className="relative flex items-center">
            <input 
              onKeyDown={(e) => e.key === 'Enter' && onSendMessage(e.currentTarget.value)}
              placeholder="Fale com a IA Orgânica..." 
              className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-6 pr-14 text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />
            <div className="absolute right-4 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.925A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </section>
  );
}
