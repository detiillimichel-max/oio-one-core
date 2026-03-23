'use client';

import React, { useState } from 'react';

// OIO ONE - DNA: Interface Orgânica por Profundidade
// Regra de Ouro: Sem nomes estáticos no código. Identidade por Usuário Logado.

export default function OioOneMain() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lista de Contatos Orgânica (Vibe Sync)
  const lastContacts = [
    { id: 1, img: 'https://i.pravatar.cc/150?u=1', name: 'User 1' },
    { id: 2, img: 'https://i.pravatar.cc/150?u=2', name: 'User 2' },
    { id: 3, img: 'https://i.pravatar.cc/150?u=3', name: 'User 3' },
    { id: 4, img: 'https://i.pravatar.cc/150?u=4', name: 'User 4' },
  ];

  return (
    <main className="relative h-screen w-screen bg-black overflow-hidden font-sans tracking-tighter text-white">
      
      {/* CAMADA 0: FEED DE VÍDEO (70%) */}
      <section className="relative h-[70vh] w-full">
        <video 
          autoPlay muted loop playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/bg-oio.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
        
        {/* LISTA DE CONTATOS (ESQUERDA) */}
        <div className="absolute left-6 bottom-20 flex flex-col space-y-4 z-20">
          {lastContacts.map((contact) => (
            <div key={contact.id} className="group relative">
              <div className="w-12 h-12 rounded-full border-2 border-white/5 p-0.5 bg-zinc-950/40 backdrop-blur-xl transition-transform active:scale-90">
                <img src={contact.img} alt="Contact" className="w-full h-full rounded-full object-cover grayscale-[30%] hover:grayscale-0" />
              </div>
            </div>
          ))}
          <button className="w-12 h-12 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-md text-white/30 active:scale-90">
            <span className="text-xl font-thin">+</span>
          </button>
        </div>
      </section>

      {/* CAMADA 1: GAVETA DE VIDRO (IDENTITY LAYER) */}
      <section className="absolute bottom-0 w-full h-[35vh] bg-zinc-950/60 backdrop-blur-[40px] border-t border-white/5 rounded-t-[3rem] z-30 transition-all duration-500">
        
        {/* ALÇA DE ARRASTE */}
        <div className="w-full flex justify-center p-4">
          <div className="w-12 h-1 bg-white/5 rounded-full" />
        </div>

        <div className="px-8 flex flex-col h-full">
          {/* BARRA DE BUSCA */}
          <div className="relative mb-8">
            <input 
              type="text" 
              placeholder="Search contacts or groups" 
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 px-10 text-sm text-zinc-500 focus:outline-none focus:border-white/10 transition-all"
            />
            <svg className="absolute left-3 top-3 w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>

          {/* ÁREA DE IDENTIDADE DINÂMICA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-full border border-white/10 p-1 bg-gradient-to-tr from-zinc-800 to-zinc-950">
                {/* A foto aqui virá do Login do usuário */}
                <div className="w-full h-full rounded-full bg-zinc-900 overflow-hidden">
                   <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs">IMG</div>
                </div>
              </div>
              <div>
                {/* O Nome será carregado via Props do usuário logado futuramente */}
                <h2 className="text-2xl font-bold tracking-tighter uppercase leading-none text-zinc-200 italic">User Profile</h2>
                <p className="text-zinc-600 text-[9px] tracking-[0.3em] uppercase mt-1">Identity Layer Active</p>
              </div>
            </div>

            {/* MENU TRÊS PONTOS (NAVEGAÇÃO DIREITA) */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all relative"
            >
              <div className="flex flex-col space-y-1">
                <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
                <div className="w-1 h-1 bg-zinc-400 rounded-full"></div>
              </div>

              {/* MENU DROPDOWN */}
              {menuOpen && (
                <div className="absolute bottom-16 right-0 w-52 bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-3 shadow-2xl animate-in fade-in slide-in-from-bottom-2">
                  <button className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-2xl text-sm font-medium transition-colors">Buscar Contatos</button>
                  <button className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-2xl text-sm font-medium transition-colors text-zinc-400">Configurações</button>
                  <div className="h-[1px] bg-white/5 my-2 mx-2" />
                  <button className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-2xl text-sm font-bold text-red-900">Logout</button>
                </div>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* SOMBRA LATERAL DE PROFUNDIDADE */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10" />
    </main>
  );
}
