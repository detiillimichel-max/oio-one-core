'use client';
import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="p-4 bg-black border-b border-cyan-900 flex justify-between items-center">
      <Link href="/" className="text-cyan-400 font-bold text-xl tracking-tighter">
        OIO ONE
      </Link>
      <div className="flex items-center gap-4 text-white">
        <Link href="/create" className="hover:text-cyan-400 transition-colors">Criar</Link>
        <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-cyan-900/20">
          M
        </div>
      </div>
    </nav>
  );
}
