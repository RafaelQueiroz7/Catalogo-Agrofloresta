import { prisma } from '../../../server/db';
import Link from 'next/link';

// Simulação de busca no banco de dados (Futuramente isso será um await prisma.especie.findUnique)
const buscarPlanta = (slugDesejado) => {
  const bancoFalso = {
    "limao-taiti": {
      nomePopular: "Limão Taiti",
      nomeCientifico: "Citrus x latifolia",
      familia: "Rutaceae",
      estrato: "Alto",
      cicloVida: "Perene",
      luminosidade: "Sol Pleno",
      espacamento: "4x4 a 5x5 metros",
      funcao: "Frutífera, quebra-vento",
      descricao: "Árvore de porte médio, muito vigorosa. Suas folhas são de coloração verde intensa e ricas em óleos essenciais. É uma das frutas mais cultivadas no consórcio agroflorestal devido à alta demanda e rusticidade.",
      consorcios: ["Mamão", "Banana", "Café"]
    }
  };
  return bancoFalso[slugDesejado] || null;
};



// No Next.js App Router, componentes de página podem ser assíncronos (async) para buscar dados
export default async function GuiaEspecie({ params }) {
  // Extrai o identificador da URL (ex: "limao-taiti")
  const { slug } = await params;
  
  // Busca os dados da planta específica
  const planta = buscarPlanta(slug);

  // Tratamento de erro 404 (Planta não encontrada)
  if (!planta) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-stone-800 mb-4">Planta não encontrada</h1>
        <p className="text-stone-600 mb-8">Essa espécie ainda não foi cadastrada no catálogo.</p>
        <Link href="/" className="text-emerald-700 hover:underline font-semibold">&larr; Voltar ao início</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
      
      {/* Cabeçalho da Página da Planta */}
      <div className="bg-emerald-900 text-white p-8 md:p-12">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl md:text-5xl font-bold">{planta.nomePopular}</h1>
          <span className="bg-emerald-700 text-emerald-100 text-sm px-4 py-2 rounded-full font-bold uppercase tracking-wide">
            Estrato {planta.estrato}
          </span>
        </div>
        <p className="text-xl md:text-2xl text-emerald-200 italic mb-2">{planta.nomeCientifico}</p>
        <p className="text-emerald-400 font-medium">Família: {planta.familia}</p>
      </div>

      {/* Corpo das Informações */}
      <div className="p-8 md:p-12 space-y-12">
        
        {/* Seção 1: Descrição */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">Sobre a Espécie</h2>
          <p className="text-stone-700 leading-relaxed text-lg">{planta.descricao}</p>
        </section>

        {/* Seção 2: Ficha Técnica (Grid) */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 border-b border-stone-100 pb-2">Manejo Agroflorestal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-stone-50 p-4 rounded-lg">
              <span className="block text-sm text-stone-500 font-semibold uppercase mb-1">Luminosidade Ideal</span>
              <span className="text-stone-800 font-medium">{planta.luminosidade}</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-lg">
              <span className="block text-sm text-stone-500 font-semibold uppercase mb-1">Ciclo de Vida</span>
              <span className="text-stone-800 font-medium">{planta.cicloVida}</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-lg">
              <span className="block text-sm text-stone-500 font-semibold uppercase mb-1">Espaçamento</span>
              <span className="text-stone-800 font-medium">{planta.espacamento}</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-lg">
              <span className="block text-sm text-stone-500 font-semibold uppercase mb-1">Função no Sistema</span>
              <span className="text-stone-800 font-medium">{planta.funcao}</span>
            </div>
          </div>
        </section>

        {/* Seção 3: Consórcios */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-4 border-b border-stone-100 pb-2">Boas Companhias (Consórcio)</h2>
          <div className="flex flex-wrap gap-2">
            {planta.consorcios.map((companhia, index) => (
              <span key={index} className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-medium">
                {companhia}
              </span>
            ))}
          </div>
        </section>

        {/* Botão de Voltar */}
        <div className="pt-8 text-center">
          <Link href="/" className="inline-flex items-center text-emerald-700 hover:text-emerald-900 font-bold transition">
            &larr; Voltar para o Catálogo
          </Link>
        </div>

      </div>
    </div>
  );
}