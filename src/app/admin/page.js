import Link from 'next/link';
import { prisma } from '../../server/db';
import { sairAdmin } from '../adminActions';

export const dynamic = 'force-dynamic';

export default async function PainelAdmin() {
  const especies = await prisma.especie.findMany({
    orderBy: { nomePopular: 'asc' },
    select: { slug: true, nomePopular: true, nomeCientifico: true },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex justify-between items-center border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-bold text-stone-800">Painel Administrativo</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-emerald-700 hover:underline font-semibold">&larr; Voltar ao Catálogo</Link>
          <form action={sairAdmin}>
            <button type="submit" className="text-sm text-stone-500 hover:text-red-600 font-semibold underline">Sair</button>
          </form>
        </div>
      </div>

      <Link
        href="/admin/cadastrar"
        className="block bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-lg py-5 px-8 rounded-2xl shadow-md transition text-center"
      >
        ➕ Cadastrar Nova Espécie
      </Link>

      <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200">
        <h2 className="text-xl font-bold text-stone-800 mb-4">✏️ Editar Espécie Cadastrada</h2>

        {especies.length === 0 ? (
          <p className="text-stone-500 italic">Nenhuma espécie cadastrada ainda.</p>
        ) : (
          <div className="divide-y divide-stone-100">
            {especies.map((especie) => (
              <Link
                key={especie.slug}
                href={`/admin/editar/${especie.slug}`}
                className="flex justify-between items-center py-3 hover:bg-stone-50 px-2 rounded-lg transition"
              >
                <div>
                  <p className="font-semibold text-stone-800">{especie.nomePopular}</p>
                  <p className="text-sm text-stone-500 italic">{especie.nomeCientifico}</p>
                </div>
                <span className="text-emerald-700 font-semibold">Editar &rarr;</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}