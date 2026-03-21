"use client";
import React from 'react';

export default function CreatePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 rounded-xl p-8 border border-zinc-800 shadow-2xl">
        <h1 className="text-2xl font-bold text-cyan-400 mb-6 text-center">OIO ONE - Nova Vibe</h1>
        
        <div className="border-2 border-dashed border-zinc-700 rounded-lg p-10 flex flex-col items-center gap-4 hover:border-cyan-500 transition-colors cursor-pointer">
          <span className="text-4xl">🎬</span>
          <p className="text-zinc-400 text-sm">Selecione um vídeo de até 30s</p>
          <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm">Escolher Arquivo</button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <input type="text" placeholder="Legenda da sua Vibe..." className="bg-zinc-800 border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
          <button className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(0,229,255,0.4)]">Publicar no Emotion</button>
        </div>
      </div>
    </div>
  );
}
