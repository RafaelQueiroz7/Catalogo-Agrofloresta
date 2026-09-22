'use client'

import { useState } from 'react';
import Link from 'next/link';
import { unstable_rethrow } from 'next/navigation';
import { atualizarEspecie } from '../app/actions';

export default function FormularioEdicao({ especie }) {
  const [mensagemErro, setMensagemErro] = useState(null);
  const atualizarComSlug = atualizarEspecie.bind(null, especie.slug);

  const camposArquivo = [
    { name: 'fotoReal', label: '📸 Foto Real', urlAtual: especie.fotoRealUrl },
    { name: 'carimboBotanico', label: '🔖 Carimbo Botânico', urlAtual: especie.carimboBotanicoUrl },
    { name: 'aquarela', label: '🎨 Aquarela', urlAtual: especie.aquarelaUrl },
    { name: 'mapaOrigem', label: '🗺️ Mapa de Origem', urlAtual: especie.mapaOrigemUrl },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-bold text-stone-800">Editar Espécie</h1>
        <Link href="/admin" className="text-emerald-700 hover:underline font-semibold">&larr; Voltar ao Painel</Link>
      </div>

      {mensagemErro && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl font-medium">
          ⚠️ {mensagemErro}
        </div>
      )}

      <form
        action={async (formData) => {
          try {
            setMensagemErro(null);
            await atualizarComSlug(formData);
          } catch (error) {
            unstable_rethrow(error);
            setMensagemErro(error.message);
          }
        }}
        className="space-y-8"
      >
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-6">
          <h2 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-2">Identificação Principal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nomePopular" className="block text-sm font-semibold text-stone-700 mb-1">Nome Popular *</label>
              <input type="text" id="nomePopular" name="nomePopular" required defaultValue={especie.nomePopular} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition" />
            </div>
            <div>
              <label htmlFor="nomeCientifico" className="block text-sm font-semibold text-stone-700 mb-1">Nome Científico *</label>
              <input type="text" id="nomeCientifico" name="nomeCientifico" required defaultValue={especie.nomeCientifico} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 italic transition" />
            </div>
          </div>
          <div>
            <label htmlFor="familia" className="block text-sm font-semibold text-stone-700 mb-1">🔬 Família Botânica</label>
            <input type="text" id="familia" name="familia" defaultValue={especie.familia || ''} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition" />
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-6">
          <h2 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-2">Ficha Técnica e Manejo</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="caracteristicas" className="block text-sm font-semibold text-stone-700 mb-1">🌿 Características Principais</label>
              <textarea id="caracteristicas" name="caracteristicas" rows="3" defaultValue={especie.caracteristicas} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="localOrigem" className="block text-sm font-semibold text-stone-700 mb-1">🌍 Local de Origem</label>
                <input type="text" id="localOrigem" name="localOrigem" defaultValue={especie.localOrigem} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition" />
              </div>
              <div>
                <label htmlFor="localEncontrada" className="block text-sm font-semibold text-stone-700 mb-1">📍 Onde é encontrada no Brasil</label>
                <input type="text" id="localEncontrada" name="localEncontrada" defaultValue={especie.localEncontrada} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition" />
              </div>
            </div>
            <div>
              <label htmlFor="formaCultivo" className="block text-sm font-semibold text-stone-700 mb-1">🌱 Forma de Cultivo</label>
              <textarea id="formaCultivo" name="formaCultivo" rows="3" defaultValue={especie.formaCultivo} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"></textarea>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-6">
          <h2 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-2">Aplicação na Escola</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="propriedadesUsos" className="block text-sm font-semibold text-stone-700 mb-1">🍽️ Propriedades e Usos</label>
              <textarea id="propriedadesUsos" name="propriedadesUsos" rows="3" defaultValue={especie.propriedadesUsos} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"></textarea>
            </div>
            <div>
              <label htmlFor="cuidadosRecomendacoes" className="block text-sm font-semibold text-stone-700 mb-1">📋 Cuidados e Recomendações</label>
              <textarea id="cuidadosRecomendacoes" name="cuidadosRecomendacoes" rows="3" defaultValue={especie.cuidadosRecomendacoes} className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"></textarea>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-6">
          <h2 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-2">Imagens e Documentos</h2>
          <p className="text-sm text-stone-500">Envie um novo arquivo só se quiser substituir o atual. Deixe em branco para manter o que já está cadastrado.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {camposArquivo.map((campo) => (
              <div key={campo.name}>
                <label htmlFor={campo.name} className="block text-sm font-semibold text-stone-700 mb-1">{campo.label}</label>
                <input type="file" id={campo.name} name={campo.name} accept="image/*,.pdf" className="w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-semibold hover:file:bg-emerald-100" />
                {campo.urlAtual && (
                  <a href={campo.urlAtual} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-700 hover:underline mt-1 inline-block">Ver arquivo atual</a>
                )}
              </div>
            ))}
            <div>
              <label htmlFor="ficha" className="block text-sm font-semibold text-stone-700 mb-1">📝 Ficha da Espécie</label>
              <input type="file" id="ficha" name="ficha" accept=".pdf" className="w-full text-sm text-stone-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-50 file:text-emerald-700 file:font-semibold hover:file:bg-emerald-100" />
              {especie.fichaUrl && (
                <a href={especie.fichaUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-700 hover:underline mt-1 inline-block">Ver arquivo atual</a>
              )}
            </div>
          </div>
        </section>

        <div className="text-center pt-8">
          <button type="submit" className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-10 rounded-xl shadow-md transition duration-150 ease-in-out text-lg">
            💾 Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}