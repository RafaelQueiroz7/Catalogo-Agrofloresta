// src/app/admin/cadastrar/page.js
'use client'

import { cadastrarEspecie } from '../../actions';
import Link from 'next/link';
import { useState } from 'react';
import { unstable_rethrow } from 'next/navigation';

export const runtime = 'nodejs';

export default function PainelCadastro() {
  const [mensagemErro, setMensagemErro] = useState(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-bold text-stone-800">Novo Cadastro de Espécie</h1>
        <Link href="/" className="text-emerald-700 hover:underline font-semibold">&larr; Voltar ao Catálogo</Link>
      </div>

      {mensagemErro && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl font-medium">
          ⚠️ {mensagemErro}
        </div>
      )}

      {/* Formulário conectado à Server Action */}
      <form action={async (formData) => {
        try {
          setMensagemErro(null);
          await cadastrarEspecie(formData);
        } catch (error) {
          unstable_rethrow(error);
          setMensagemErro(error.message);
        }
      }} className="space-y-8">
        
        {/* Seção 1: Identificação Básica */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-6">
          <h2 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-2">Identificação Principal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nomePopular" className="block text-sm font-semibold text-stone-700 mb-1">Nome Popular *</label>
              <input type="text" id="nomePopular" name="nomePopular" required placeholder="Ex: Limão Taiti" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition" />
              <p className="text-xs text-stone-500 mt-1">Este nome será usado para criar o link da página da planta.</p>
            </div>
            <div>
              <label htmlFor="nomeCientifico" className="block text-sm font-semibold text-stone-700 mb-1">Nome Científico *</label>
              <input type="text" id="nomeCientifico" name="nomeCientifico" required placeholder="Ex: Citrus x latifolia" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 italic transition" />
            </div>
            <div>
              <label htmlFor="familia" className="block text-sm font-semibold text-stone-700 mb-1">🔬 Família Botânica</label>
              <input type="text" id="familia" name="familia" placeholder="Ex: Rutaceae" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition" />
            </div>
          </div>
        </section>

        {/* Seção 2: Ficha Técnica */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-6">
          <h2 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-2">Ficha Técnica e Manejo</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="caracteristicas" className="block text-sm font-semibold text-stone-700 mb-1">🌿 Características Principais</label>
              <textarea id="caracteristicas" name="caracteristicas" rows="3" placeholder="Descrição visual da planta (porte, folhas, frutos)" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="localOrigem" className="block text-sm font-semibold text-stone-700 mb-1">🌍 Local de Origem (Continente/País)</label>
                <input type="text" id="localOrigem" name="localOrigem" placeholder="Ex: Sul da Ásia" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition" />
              </div>
              <div>
                <label htmlFor="localEncontrada" className="block text-sm font-semibold text-stone-700 mb-1">📍 Onde é encontrada no Brasil</label>
                <input type="text" id="localEncontrada" name="localEncontrada" placeholder="Regiões ou biomas" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition" />
              </div>
            </div>

            <div>
              <label htmlFor="formaCultivo" className="block text-sm font-semibold text-stone-700 mb-1">🌱 Forma de Cultivo e Estrato na Agrofloresta</label>
              <textarea id="formaCultivo" name="formaCultivo" rows="3" placeholder="Luminosidade, solo, espaçamento e posição no sistema" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"></textarea>
            </div>
          </div>
        </section>

        {/* Seção 3: Usos e Recomendações */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 space-y-6">
          <h2 className="text-xl font-bold text-emerald-800 border-b border-stone-100 pb-2">Aplicação na Escola</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="propriedadesUsos" className="block text-sm font-semibold text-stone-700 mb-1">🍽️ Propriedades e Usos (Alimentação/Medicina)</label>
              <textarea id="propriedadesUsos" name="propriedadesUsos" rows="3" placeholder="Como os alunos e a escola usam essa planta?" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"></textarea>
            </div>
            
            <div>
              <label htmlFor="cuidadosRecomendacoes" className="block text-sm font-semibold text-stone-700 mb-1">📋 Cuidados e Recomendações</label>
              <textarea id="cuidadosRecomendacoes" name="cuidadosRecomendacoes" rows="3" placeholder="Espinhos, toxinas, alergias? (Informação crucial para manejo escolar)" className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition"></textarea>
            </div>
          </div>
        </section>
        
        {/* Botão de Enviar */}
        <div className="text-center pt-8">
          <button type="submit" className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 px-10 rounded-xl shadow-md transition duration-150 ease-in-out text-lg">
            ✅ Finalizar Cadastro no Catálogo
          </button>
        </div>

      </form>
    </div>
  );
}