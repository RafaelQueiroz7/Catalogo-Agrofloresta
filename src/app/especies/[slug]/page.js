import Link from 'next/link';
// import { prisma } from '../../../server/db'; // Descomentar depois

// Simulação temporária com dados, mas SEM as URLs de exemplo
const buscarPlanta = (slugDesejado) => {
  const bancoFalso = {
    "limao-taiti": {
      nomePopular: "Limão Taiti",
      nomeCientifico: "Citrus x latifolia",
      caracteristicas: "Árvore de porte médio, muito vigorosa. Suas folhas são de coloração verde intensa e ricas em óleos essenciais. Os frutos são arredondados, de casca verde e polpa muito suculenta.",
      localOrigem: "Sul da Ásia",
      localEncontrada: "Cultivado em quase todo o território brasileiro, adaptando-se muito bem aos climas tropicais.",
      formaCultivo: "Exige bastante incidência solar e solo bem drenado. Na agrofloresta escolar, atua muito bem no estrato médio, fornecendo sombra parcial para plantas rasteiras.",
      propriedadesUsos: "Riquíssimo em vitamina C. Usado na culinária da escola para temperar saladas da horta e fazer sucos. As folhas podem render chás aromáticos.",
      // Título alterado conforme solicitado
      cuidadosRecomendacoes: "ATENÇÃO: Possui espinhos nos galhos, exigindo cuidado no manejo com as crianças. A casca libera um óleo que pode queimar a pele se exposta ao sol (fitofotodermatite). Lavar bem as mãos após a colheita.",
      // Imagens zeradas (null) para criar os espaços vazios (placeholders)
      fotoRealUrl: null,
      carimboBotanicoUrl: null,
      aquarelaUrl: null,
      mapaOrigemUrl: null
    }
  };
  return bancoFalso[slugDesejado] || null;
};

// Componente reutilizável para criar placeholders de imagem
function PlaceholderImagem({ texto }) {
  return (
    <div className="w-full h-48 rounded-xl mb-3 bg-stone-100 flex flex-col items-center justify-center text-stone-400 border-2 border-dashed border-stone-200">
      <span className="text-4xl mb-1">🖼️</span>
      <span className="text-sm font-medium italic">{texto}</span>
    </div>
  );
}

export default async function GuiaEspecie({ params }) {
  const { slug } = await params;
  
  // No futuro: descomentar próxima linha
  // const planta = await prisma.especie.findUnique({ where: { slug: slug } });
  const planta = buscarPlanta(slug);

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
          <div 
            className="w-full md:w-1/2 h-72 md:h-auto bg-stone-100"
            style={{ backgroundImage: `url(${planta.fotoRealUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
        ) : (
          <div className="w-full md:w-1/2 h-72 bg-stone-100 flex flex-col items-center justify-center text-stone-500 font-medium border-r border-stone-200">
            <span className="text-5xl mb-2">📸</span>
            <span className="italic text-sm">Aguardando fotografia real</span>
          </div>
        )}
        
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-emerald-900 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{planta.nomePopular}</h1>
          <p className="text-xl md:text-2xl text-emerald-200 italic font-serif mb-6">{planta.nomeCientifico}</p>
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
              <img src={planta.aquarelaUrl} alt="Aquarela" className="w-full h-48 object-cover rounded-xl mb-3" />
            ) : (
              <PlaceholderImagem texto="Aguardando aquarela" />
            )}
            <span className="text-stone-600 font-semibold font-serif italic mt-auto">Aquarela da Planta</span>
          </div>

          {/* Espaço do Carimbo */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 text-center flex flex-col">
            {planta.carimboBotanicoUrl ? (
              <img src={planta.carimboBotanicoUrl} alt="Carimbo Botânico" className="w-full h-48 object-cover rounded-xl mb-3" />
            ) : (
              <PlaceholderImagem texto="Aguardando carimbo" />
            )}
            <span className="text-stone-600 font-semibold font-serif italic mt-auto">Carimbo Botânico</span>
          </div>

          {/* Espaço do Mapa */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200 text-center flex flex-col">
            {planta.mapaOrigemUrl ? (
              <img src={planta.mapaOrigemUrl} alt="Mapa de Origem" className="w-full h-48 object-cover rounded-xl mb-3" />
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
            <p className="text-stone-700 leading-relaxed">{planta.caracteristicas}</p>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">🌱 Forma de Cultivo</h3>
            <p className="text-stone-700 leading-relaxed">{planta.formaCultivo}</p>
          </section>
        </div>

        {/* Coluna Direita */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">🍽️ Propriedades e Usos</h3>
            <p className="text-stone-700 leading-relaxed">{planta.propriedadesUsos}</p>
          </section>

          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">🌍 Onde é encontrada</h3>
            <p className="text-stone-700 leading-relaxed">{planta.localEncontrada}</p>
          </section>

          {/* Destaque UNIFICADO conforme solicitado */}
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
            <h3 className="text-xl font-bold text-emerald-800 mb-3 flex items-center gap-2">📋 Cuidados e Recomendações</h3>
            <p className="text-stone-700 leading-relaxed">{planta.cuidadosRecomendacoes}</p>
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