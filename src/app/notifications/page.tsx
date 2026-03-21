'use client';
import React from 'react';

export default function NotificationsPage() {
  return (
    <div className="bg-black min-h-screen text-white p-10 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-cyan-400 mb-4 font-sans">Notificações</h1>
      <div className="p-8 border border-cyan-900 rounded-3xl bg-cyan-950/20 backdrop-blur-sm">
        <p className="text-zinc-400 text-center italic">
          O sistema de avisos do OIO ONE está sendo preparado por Michel.
        </p>
      </div>
    </div>
  );
}
