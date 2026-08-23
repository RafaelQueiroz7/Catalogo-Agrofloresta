import Link from 'next/link';
import { prisma } from '../../../server/db';
import { ehArquivoPdf } from '../../../lib/utils';

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
  
  const planta = await prisma.especie.findUnique({ where: { slug: slug } });

  if (!planta) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-stone-800 mb-4">Espécie não encontrada</h1>
        <Link href="/" className="text-emerald-700 hover:underline font-semibold">&larr; Voltar ao catálogo</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      
      {/* 1. Cabeçalho com Foto Real (ou Placeholder) e Títulos */}
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col md:flex-row">
                {planta.fotoRealUrl ? (
                  ehArquivoPdf(planta.fotoRealUrl) ? (
                    <a
                      href={planta.fotoRealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-1/2 h-72 md:h-auto bg-stone-100 flex flex-col items-center justify-center text-emerald-700 font-semibold hover:bg-stone-200 transition"
                    >
                      <span className="text-5xl mb-2">📄</span>
                      <span className="underline">Abrir PDF</span>
                    </a>
                  ) : (
                    <div 
                      className="w-full md:w-1/2 h-72 md:h-auto bg-stone-100"
                      style={{ backgroundImage: `url(${planta.fotoRealUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    />
                  )
                ) : (
          <div className="w-full md:w-1/2 h-72 bg-stone-100 flex flex-col items-center justify-center text-stone-500 font-medium border-r border-stone-200">
            <span className="text-5xl mb-2">📸</span>
            <span className="italic text-sm">Aguardando fotografia real</span>
          </div>
        )}
        
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-emerald-900 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{planta.nomePopular}</h1>
          <p className="text-xl md:text-2xl text-emerald-200 italic font-serif mb-6">{planta.nomeCientifico}</p>
          {planta.familia && (
            <p className="text-emerald-300 text-sm font-semibold uppercase tracking-wide mb-4">
              Família: <span className="text-white normal-case font-medium">{planta.familia}</span>
            </p>
          )}
          <div className="bg-emerald-800/50 p-4 rounded-xl border border-emerald-700">
            <span className="block text-emerald-300 text-sm font-bold uppercase mb-1">Origem</span>
            <span className="text-stone-50 font-medium">{planta.localOrigem}</span>
          </div>
        </div>
      </div>

      {/* 2. Galeria de Artes da Escola - Sempre visível, com placeholders */}
      <div className="space-y-6">
        <div className="border-b-2 border-emerald-800 pb-2 inline-block">
          <h2 className="text-3xl font-bold text-stone-800">Galeria da Escola</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Espaço da Aquarela */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 text-center flex flex-col">
            {planta.aquarelaUrl ? (
              ehArquivoPdf(planta.aquarelaUrl) ? (
                <LinkPdf url={planta.aquarelaUrl} />
              ) : (
                <img src={planta.aquarelaUrl} alt="Aquarela" className="w-full h-48 object-cover rounded-xl mb-3" />
              )
            ) : (
              <PlaceholderImagem texto="Aguardando aquarela" />
            )}
            <span className="text-stone-600 font-semibold font-serif italic mt-auto">Aquarela da Planta</span>
          </div>

          {/* Espaço do Carimbo */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 text-center flex flex-col">
            {planta.carimboBotanicoUrl ? (
              ehArquivoPdf(planta.carimboBotanicoUrl) ? (
                <LinkPdf url={planta.carimboBotanicoUrl} />
              ) : (
                <img src={planta.carimboBotanicoUrl} alt="Carimbo Botânico" className="w-full h-48 object-cover rounded-xl mb-3" />
              )
            ) : (
              <PlaceholderImagem texto="Aguardando carimbo" />
            )}
            <span className="text-stone-600 font-semibold font-serif italic mt-auto">Carimbo Botânico</span>
          </div>

          {/* Espaço do Mapa */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 text-center flex flex-col">
            {planta.mapaOrigemUrl ? (
              ehArquivoPdf(planta.mapaOrigemUrl) ? (
                <LinkPdf url={planta.mapaOrigemUrl} />
              ) : (
                <img src={planta.mapaOrigemUrl} alt="Mapa de Origem" className="w-full h-48 object-cover rounded-xl mb-3" />
              )
            ) : (
              <PlaceholderImagem texto="Aguardando mapa" />
            )}
            <span className="text-stone-600 font-semibold font-serif italic mt-auto">Mapa de Origem</span>
          </div>
        </div>
      </div>

      {/* 3. Textos e Ficha Técnica */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Coluna Esquerda */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">🌿 Características</h3>
            <p className="text-stone-700 leading-relaxed break-words">{planta.caracteristicas}</p>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">🌱 Forma de Cultivo</h3>
            <p className="text-stone-700 leading-relaxed break-words">{planta.formaCultivo}</p>
          </section>
        </div>

        {/* Coluna Direita */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">🍽️ Propriedades e Usos</h3>
            <p className="text-stone-700 leading-relaxed break-words">{planta.propriedadesUsos}</p>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">🌍 Onde é encontrada</h3>
            <p className="text-stone-700 leading-relaxed break-words">{planta.localEncontrada}</p>
          </section>

          {/* Destaque UNIFICADO conforme solicitado */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">📋 Cuidados e Recomendações</h3>
            <p className="text-stone-700 leading-relaxed break-words">{planta.cuidadosRecomendacoes}</p>
          </section>
        </div>

      </div>

      <div className="text-center pt-8">
        <Link href="/" className="inline-block bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold py-3 px-6 rounded-xl transition">
          &larr; Voltar para o Catálogo
        </Link>
      </div>

    </div>
  );
}