'use client';

import React, { useState } from 'react';

// OIO ONE - Componente de Chat (Versão Final)
// Design: Glassmorphism / Ergonomia Dinâmica

export default function ChatMessages() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bem-vindo à Interface Orgânica.", sender: "system" },
    { id: 2, text: "Inicie uma conversa ou busque um contato.", sender: "system" }
  ]);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage = { id: Date.now(), text: inputValue, sender: "user" };
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  return (
    <div className="flex flex-col h-full max-h-[20vh]">
      {/* Área de Mensagens (Scroll Invisível) */}
      <div className="flex-1 overflow-y-auto space-y-3 px-2 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2 rounded-[1.5rem] text-sm tracking-tight shadow-sm ${
              msg.sender === 'user' 
              ? 'bg-white/10 border border-white/10 text-white rounded-br-none' 
              : 'bg-zinc-900/40 border border-white/5 text-zinc-400 rounded-bl-none italic'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input de Comando (Design Clean) */}
      <div className="mt-4 relative group">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Envie uma mensagem..." 
          className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-5 pr-12 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 transition-all"
        />
        <button 
          onClick={sendMessage}
          className="absolute right-2 top-1.5 p-2 text-zinc-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9-7-9-7V19z" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}
