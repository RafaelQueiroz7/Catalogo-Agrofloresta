export default function EspecieCard({ especie }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition border border-stone-200 overflow-hidden flex flex-col md:flex-row mb-6">
      
      {/* Seção de Imagens (2/5 do espaço em telas grandes) */}
      <div className="w-full md:w-2/5 p-4 bg-stone-50 flex gap-3">
        {/* Espaço para a Foto 1 (Ex: Visão geral da planta) */}
        <div className="flex-1 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 text-sm font-medium min-h-[220px]">
          <span>Foto 1 (Árvore)</span>
        </div>
        {/* Espaço para a Foto 2 (Ex: Detalhe do fruto/folha) */}
        <div className="flex-1 bg-emerald-200 rounded-lg flex items-center justify-center text-emerald-800 text-sm font-medium min-h-[220px]">
          <span>Foto 2 (Detalhe)</span>
        </div>
      </div>

      {/* Seção de Informações (3/5 do espaço em telas grandes) */}
      <div className="w-full md:w-3/5 p-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-2xl font-bold text-stone-800">{especie.nomePopular}</h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1.5 rounded-full font-semibold uppercase tracking-wide">
              {especie.estrato}
            </span>
          </div>
          
          <p className="text-lg italic text-stone-500 mb-4">{especie.nomeCientifico}</p>
          
          <p className="text-stone-600 leading-relaxed">
            {especie.descricao}
          </p>
        </div>

        {/* Rodapé da lista com o botão */}
        <div className="pt-6 mt-6 border-t border-stone-100 flex justify-between items-center">
          <span className="text-sm text-stone-500 font-medium">Família botânica: <span className="text-stone-700">{especie.familia}</span></span>
          <a 
            href={`/especies/${especie.slug}`}
            className="inline-flex items-center justify-center bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold py-2 px-5 rounded-lg transition"
          >
            Ver Guia Completo &rarr;
          </a>
        </div>
      </div>

    </div>
  )
}