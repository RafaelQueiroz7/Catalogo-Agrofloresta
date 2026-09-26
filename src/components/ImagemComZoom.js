// src/components/ImagemComZoom.js
'use client'

import { useState, useEffect } from 'react';

export default function ImagemComZoom({ src, alt, className = "w-full h-48 object-cover rounded-xl mb-3 cursor-pointer hover:opacity-90 transition shadow-sm" }) {
  const [estaAberto, setEstaAberto] = useState(false);

  // Fecha o modal ao pressionar a tecla ESC
  useEffect(() => {
    function tratarKeyDown(e) {
      if (e.key === 'Escape') setEstaAberto(false);
    }
    if (estaAberto) {
      window.addEventListener('keydown', tratarKeyDown);
      document.body.style.overflow = 'hidden'; // Evita rolagem da página ao fundo
    }
    return () => {
      window.removeEventListener('keydown', tratarKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [estaAberto]);

  return (
    <>
      {/* Thumbnail Clicável */}
      <div className="relative group cursor-pointer" onClick={() => setEstaAberto(true)}>
        <img
          src={src}
          alt={alt}
          className={className}
        />
        {/* Indicador visual de zoom ao passar o mouse */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-xl transition flex items-center justify-center text-white font-medium text-sm gap-1 mb-3">
          🔍 Clique para expandir
        </div>
      </div>

      {/* Modal / Lightbox em Tela Cheia */}
      {estaAberto && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 transition-all animate-fadeIn"
          onClick={() => setEstaAberto(false)} // Fecha ao clicar fora da imagem
        >
          {/* Botão Fechar */}
          <button
            onClick={() => setEstaAberto(false)}
            className="absolute top-5 right-5 text-white bg-stone-800/80 hover:bg-stone-700 w-11 h-11 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition z-10"
            aria-label="Fechar"
          >
            ✕
          </button>

          {/* Container da Imagem Expandida */}
          <div 
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Evita fechar quando clica na imagem em si
          >
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-stone-700"
            />
            {alt && (
              <p className="text-stone-200 text-center text-sm mt-3 bg-stone-900/80 px-4 py-1.5 rounded-full backdrop-blur-md border border-stone-800">
                {alt}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}