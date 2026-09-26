// src/app/especies/[slug]/page.js (ou o caminho onde fica sua guia)
import Link from 'next/link';
import { prisma } from '../../../server/db';
import { ehArquivoPdf } from '../../../lib/utils';
import ImagemComZoom from '../../../components/ImagemComZoom';

export const dynamic = 'force-dynamic';

// Componente reutilizável para criar placeholders de imagem
function PlaceholderImagem({ texto }) {
  return (
    <div className="w-full h-48 rounded-xl mb-3 bg-stone-100 flex flex-col items-center justify-center text-stone-400 border-2 border-dashed border-stone-200">
      <span className="text-4xl mb-1">🖼️</span>
      <span className="text-sm font-medium italic">{texto}</span>
    </div>
  );
}

function LinkPdf({ url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-48 rounded-xl mb-3 bg-stone-100 flex flex-col items-center justify-center text-emerald-700 hover:bg-stone-200 transition border-2 border-dashed border-stone-200"
    >
      <span className="text-4xl mb-1">📄</span>
      <span className="text-sm font-semibold underline">Ver PDF</span>
    </a>
  );
}

export default async function GuiaEspecie({ params }) {
  const { slug } = await params;

  const planta = await prisma.especie.findUnique({
    where: { slug },
  });

  if (!planta) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <h1 className="text-3xl font-bold text-stone-800">Planta não encontrada</h1>
        <p className="text-stone-600">A espécie que você procura não consta no catálogo.</p>
        <Link
          href="/"
          className="inline-block bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-800 transition"
        >
          &larr; Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Cabeçalho e Navegação Superior */}
      <div className="border-b border-stone-200 pb-4 flex justify-between items-start">
        <div>
          <Link href="/" className="text-emerald-700 hover:underline font-semibold text-sm mb-2 block">
            &larr; Voltar ao Catálogo
          </Link>
          <h1 className="text-4xl font-extrabold text-stone-800">{planta.nomePopular}</h1>
          
          {/* Nome Científico e Família Botânica */}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <p className="text-lg text-stone-500 italic">{planta.nomeCientifico}</p>
            {planta.familia && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                Família: {planta.familia}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 1. Galeria Visual (Cards de Imagens com Suporte a Zoom) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Foto Real */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            {planta.fotoRealUrl ? (
              ehArquivoPdf(planta.fotoRealUrl) ? (
                <LinkPdf url={planta.fotoRealUrl} />
              ) : (
                <ImagemComZoom 
                  src={planta.fotoRealUrl} 
                  alt={`Foto real de ${planta.nomePopular}`} 
                />
              )
            ) : (
              <PlaceholderImagem texto="Foto Real em breve" />
            )}
          </div>
          <p className="text-center text-xs font-semibold text-stone-600 uppercase tracking-wide border-t border-stone-100 pt-3">
            📷 Foto Real
          </p>
        </div>

        {/* Carimbo Botânico */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            {planta.carimboBotanicoUrl ? (
              ehArquivoPdf(planta.carimboBotanicoUrl) ? (
                <LinkPdf url={planta.carimboBotanicoUrl} />
              ) : (
                <ImagemComZoom 
                  src={planta.carimboBotanicoUrl} 
                  alt={`Carimbo botânico de ${planta.nomePopular}`} 
                />
              )
            ) : (
              <PlaceholderImagem texto="Carimbo Botânico em breve" />
            )}
          </div>
          <p className="text-center text-xs font-semibold text-stone-600 uppercase tracking-wide border-t border-stone-100 pt-3">
            🎨 Carimbo Botânico
          </p>
        </div>

        {/* Aquarela */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            {planta.aquarelaUrl ? (
              ehArquivoPdf(planta.aquarelaUrl) ? (
                <LinkPdf url={planta.aquarelaUrl} />
              ) : (
                <ImagemComZoom 
                  src={planta.aquarelaUrl} 
                  alt={`Aquarela de ${planta.nomePopular}`} 
                />
              )
            ) : (
              <PlaceholderImagem texto="Aquarela em breve" />
            )}
          </div>
          <p className="text-center text-xs font-semibold text-stone-600 uppercase tracking-wide border-t border-stone-100 pt-3">
            🖌️ Aquarela
          </p>
        </div>

        {/* Mapa de Origem */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            {planta.mapaOrigemUrl ? (
              ehArquivoPdf(planta.mapaOrigemUrl) ? (
                <LinkPdf url={planta.mapaOrigemUrl} />
              ) : (
                <ImagemComZoom 
                  src={planta.mapaOrigemUrl} 
                  alt={`Mapa de origem de ${planta.nomePopular}`} 
                />
              )
            ) : (
              <PlaceholderImagem texto="Mapa de Origem em breve" />
            )}
          </div>
          <p className="text-center text-xs font-semibold text-stone-600 uppercase tracking-wide border-t border-stone-100 pt-3">
            🌍 Mapa de Origem
          </p>
        </div>

      </div>

      {/* 2. Ficha Técnica e Manejo */}
      <div className="space-y-6">
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
            🌿 Características Principais
          </h3>
          <p className="text-stone-700 leading-relaxed break-words">
            {planta.caracteristicas || 'Informação não cadastrada.'}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
              🌍 Local de Origem
            </h3>
            <p className="text-stone-700 leading-relaxed break-words">
              {planta.localOrigem || 'Informação não cadastrada.'}
            </p>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
              📍 Onde é encontrada no Brasil
            </h3>
            <p className="text-stone-700 leading-relaxed break-words">
              {planta.localEncontrada || 'Informação não cadastrada.'}
            </p>
          </section>
        </div>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
            🌱 Forma de Cultivo e Estrato na Agrofloresta
          </h3>
          <p className="text-stone-700 leading-relaxed break-words">
            {planta.formaCultivo || 'Informação não cadastrada.'}
          </p>
        </section>
      </div>

      {/* 3. Aplicação na Escola */}
      <div className="space-y-6">
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
            🍽️ Propriedades e Usos
          </h3>
          <p className="text-stone-700 leading-relaxed break-words">
            {planta.propriedadesUsos || 'Informação não cadastrada.'}
          </p>
        </section>

        <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
            📋 Cuidados e Recomendações
          </h3>
          <p className="text-stone-700 leading-relaxed break-words">
            {planta.cuidadosRecomendacoes || 'Informação não cadastrada.'}
          </p>
        </section>
      </div>

      {/* 4. Ficha de Espécie preenchida por alunos */}
      <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
        <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">
          📄 Ficha de Espécie
        </h3>
        <p className="text-stone-600 text-sm break-words mb-4">
          FICHA DE ESPÉCIE PREENCHIDA POR ALUNOS
        </p>
        {planta.fichaUrl ? (
          <a
            href={planta.fichaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2 px-5 rounded-lg transition"
          >
            📄 Ver Ficha Completa (PDF)
          </a>
        ) : (
          <p className="text-stone-500 italic">Ficha de espécie ainda não enviada.</p>
        )}
      </section>

      {/* Navegação Inferior - Voltar ao Catálogo */}
      <div className="pt-6 border-t border-stone-200 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-8 rounded-xl shadow-sm transition"
        >
          &larr; Voltar ao Catálogo
        </Link>
      </div>
    </div>
  );
}