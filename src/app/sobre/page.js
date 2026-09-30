export default function SobreProjeto() {
  return (
    <main className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-stone-200 shadow-sm p-8 sm:p-12">
        
        {/* Título do Projeto */}
        <div className="text-center border-b border-stone-100 pb-8 mb-8">
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Projeto Académico e Ambiental
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-800 mt-4 leading-snug">
            AGROFLORESTA ESCOLAR COMO INSTRUMENTO DE EDUCAÇÃO AMBIENTAL, ALIMENTAÇÃO SAUDÁVEL E VALORIZAÇÃO DA VIDA
          </h1>
        </div>

        {/* Grelha de Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Estudantes */}
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
              🌱 Estudantes Autoras
            </h2>
            <ul className="space-y-2 text-stone-700 text-sm">
              <li>Amanda J. Santos</li>
              <li>Gabrielle F. de Andrade</li>
              <li>Isabelly E. O. Araujo</li>
              <li>Karen Aiko H. Silva</li>
              <li>Maria E. L. dos Santos</li>
              <li>Ingrid de Sousa Nogueira</li>
            </ul>
          </div>

          {/* Professores-orientadores */}
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
              📚 Professores-Orientadores
            </h2>
            <ul className="space-y-2 text-stone-700 text-sm">
              <li>Gabriela M. S. Pedreira Galletti</li>
              <li>Isabel C. D. Hipólito Carvalho</li>
            </ul>
          </div>

        </div>

        {/* Professores / Colaboradores */}
        <div className="mt-8 bg-stone-50 p-6 rounded-2xl border border-stone-100">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
            🤝 Professores e Colaboradores
          </h2>
          <ul className="space-y-2 text-stone-700 text-sm">
            <li><strong>Luigi G. Barbieri</strong> — Agroecólogo</li>
            <li><strong>Ana Clara Fonseca</strong> — Colaboradora</li>
            <li><strong>Rafael Queiroz</strong> — Graduando em Engenharia de Software (UnB)</li>
          </ul>
        </div>

        {/* Botão de Voltar */}
        <div className="mt-10 text-center">
          <a
            href="/"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-6 py-3 rounded-xl transition shadow-sm"
          >
            ← Voltar ao Catálogo
          </a>
        </div>

      </div>
    </main>
  );
}