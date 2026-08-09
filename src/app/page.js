import EspecieCard from "../components/EspecieCard";

// Dados fictícios temporários (Mock) até o banco de dados estar conectado
const plantasFicticias = [
  {
    id: "1",
    nomePopular: "Limão Taiti",
    nomeCientifico: "Citrus x latifolia",
    slug: "limao-taiti",
    familia: "Rutaceae",
    estrato: "Alto",
    descricao: "Árvore frutífera de porte médio, excelente para consórcio em sistemas agroflorestais, exigindo boa incidência solar."
  },
  {
    id: "2",
    nomePopular: "Feijão-de-porco",
    nomeCientifico: "Canavalia ensiformis",
    slug: "feijao-de-porco",
    familia: "Fabaceae",
    estrato: "Rasteiro",
    descricao: "Pioneira herbácea fantástica para adubação verde, fixação de nitrogênio no solo e supressão de plantas espontâneas."
  },
  {
    id: "3",
    nomePopular: "Banana Prata",
    nomeCientifico: "Musa acuminata x balbisiana",
    slug: "banana-prata",
    familia: "Musaceae",
    estrato: "Médio",
    descricao: "Essencial na biomassa da agrofloresta, atua como fruteira de ciclo rápido e fornece sombra leve para mudas jovens."
  }
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Cabeçalho da Seção */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-3xl font-bold text-stone-800">Catálogo de Espécies</h1>
        <p className="text-stone-600 mt-1">
          Explore as plantas integradas ao nosso sistema agroflorestal.
        </p>
      </div>

      {/* Lista empilhada (Sem o grid) */}
      <div className="flex flex-col">
        {plantasFicticias.map((planta) => (
          <EspecieCard key={planta.id} especie={planta} />
        ))}
      </div>
    </div>
  );
}