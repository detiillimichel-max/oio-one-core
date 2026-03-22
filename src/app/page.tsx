'use client';

import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      
      {/* CAMADA SENSORIAL (70% TOPO) - FEED DE VÍDEO POPEYE */}
      <section className="relative h-[70vh] w-full bg-zinc-950 flex items-center justify-center">
        <div className="text-zinc-500 text-sm tracking-tighter">
          CARREGANDO MÓDULO DE VÍDEO...
        </div>
        
        {/* SALTO QUÂNTICO (Lado Direito) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></div>
          ))}
        </div>
      </section>

      {/* GAVETA DE IDENTIDADE/CHAT (30% INFERIOR) - EFEITO VIDRO */}
      <section className="h-[30vh] w-full bg-zinc-900/60 backdrop-blur-xl border-t border-zinc-800 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500 bg-zinc-800"></div>
          <div>
            <h1 className="font-bold text-lg tracking-tighter">Michel Detilli</h1>
            <p className="text-xs text-emerald-500 font-medium">PROPRIETÁRIO OIO ONE</p>
          </div>
        </div>
        
        <div className="bg-zinc-800/50 rounded-2xl p-3 text-sm text-zinc-400">
          Sistema OIO CORE Ativo. Aguardando telemetria de registro...
        </div>
      </section>

    </main>
  );
}
