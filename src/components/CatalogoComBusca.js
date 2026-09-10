'use client'

import { useState, useMemo } from 'react';
import EspecieCard from './EspecieCard';

function normalizar(texto) {
  return texto
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function CatalogoComBusca({ especies }) {
  const [busca, setBusca] = useState('');

  const especiesFiltradas = useMemo(() => {
    if (!busca.trim()) return especies;
    const termo = normalizar(busca);
    return especies.filter((especie) =>
      normalizar(especie.nomePopular).includes(termo) ||
      normalizar(especie.nomeCientifico).includes(termo) ||
      (especie.familia && normalizar(especie.familia).includes(termo))
    );
  }, [especies, busca]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none">🔍</span>
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por nome popular, científico ou família..."
          aria-label="Buscar espécie"
          className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition text-stone-700"
        />
      </div>

      {busca.trim() && (
        <p className="text-sm text-stone-500 -mt-4">
          {especiesFiltradas.length} de {especies.length} espécies encontradas
        </p>
      )}

      {especiesFiltradas.length === 0 ? (
        <p className="text-stone-500 italic text-center py-12">
          Nenhuma espécie encontrada para &ldquo;{busca}&rdquo;.
        </p>
      ) : (
        <div className="flex flex-col">
          {especiesFiltradas.map((especie) => (
            <EspecieCard key={especie.id} especie={especie} />
          ))}
        </div>
      )}
    </div>
  );
}