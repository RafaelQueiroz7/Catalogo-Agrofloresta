import CatalogoComBusca from "../components/CatalogoComBusca";
import { prisma } from "../server/db";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const especies = await prisma.especie.findMany({
    orderBy: { nomePopular: 'asc' },
  });

  return (
    <div className="space-y-8">
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-bold text-stone-800">Catálogo de Espécies</h1>
        <p className="text-stone-600 mt-1">
          Explore as plantas integradas ao nosso sistema agroflorestal.
        </p>
      </div>

      {especies.length === 0 ? (
        <p className="text-stone-500 italic">
          Nenhuma espécie cadastrada ainda. Que tal adicionar a primeira?
        </p>
      ) : (
        <CatalogoComBusca especies={especies} />
      )}
    </div>
  );
}