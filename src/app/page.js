import EspecieCard from "../components/EspecieCard";
import { prisma } from "../server/db";

// Garante que a página sempre busque os dados mais recentes do banco,
// em vez de usar uma versão em cache gerada no build
export const dynamic = 'force-dynamic';

export default async function Home() {
  const especies = await prisma.especie.findMany({
    orderBy: { criadoEm: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Cabeçalho da Seção */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-bold text-stone-800">Catálogo de Espécies</h1>
        <p className="text-stone-600 mt-1">
          Explore as plantas integradas ao nosso sistema agroflorestal.
        </p>
      </div>

      {/* Lista de espécies cadastradas */}
      {especies.length === 0 ? (
        <p className="text-stone-500 italic">
          Nenhuma espécie cadastrada ainda. Que tal adicionar a primeira?
        </p>
      ) : (
        <div className="flex flex-col">
          {especies.map((especie) => (
            <EspecieCard key={especie.id} especie={especie} />
          ))}
        </div>
      )}
    </div>
  );
}