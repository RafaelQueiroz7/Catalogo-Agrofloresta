# 🌱 Catálogo de Agrofloresta — CEDVB

Catálogo e guia digital das espécies da agrofloresta escolar, desenvolvido para documentar e apresentar as plantas cultivadas no sistema agroflorestal da escola — suas características, origem, forma de cultivo, usos e cuidados.

**Site publicado:** [catalogo-agrofloresta.vercel.app](https://catalogo-agrofloresta.vercel.app)

---

## 📖 Sobre o Projeto

A escola CED Vargem Bonita mantém um sistema agroflorestal com diversas espécies de plantas usadas para fins educativos, alimentares e medicinais. Este projeto nasceu da necessidade de reunir esse conhecimento num só lugar: um catálogo público, navegável por qualquer visitante, e uma área administrativa onde a equipe da escola pode cadastrar novas espécies conforme forem sendo incorporadas à agrofloresta.

Cada espécie conta com uma página-guia própria, reunindo texto (características, origem, forma de cultivo, propriedades e cuidados) e material visual produzido pela própria comunidade escolar — fotografias reais, aquarelas, carimbos botânicos e mapas de origem.

## ✨ Funcionalidades

**Para visitantes (público)**
- Catálogo com todas as espécies cadastradas, exibidas em cards resumidos
- Página-guia individual para cada espécie (`/especies/[slug]`), com ficha técnica completa
- Galeria de materiais da escola (aquarela, carimbo botânico, mapa de origem), com suporte a imagens (JPG/PNG/WEBP) e documentos em PDF
- Layout responsivo, adaptado para celular e desktop

**Para administradores**
- Área protegida por senha (`/admin`)
- Formulário de cadastro de novas espécies, com geração automática de slug (URL amigável) a partir do nome popular
- Upload de até 4 arquivos por espécie (foto real, carimbo botânico, aquarela, mapa de origem), armazenados no Supabase Storage
- Validação de campos obrigatórios e checagem de nomes duplicados

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologia |
|---|---|
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Server Actions) |
| Biblioteca de UI | [React](https://react.dev) 19 |
| Estilização | [Tailwind CSS](https://tailwindcss.com) 4 |
| Banco de dados | [PostgreSQL](https://www.postgresql.org), hospedado no [Supabase](https://supabase.com) |
| ORM | [Prisma](https://www.prisma.io) 7, com driver adapter (`@prisma/adapter-pg`) |
| Armazenamento de arquivos | [Supabase Storage](https://supabase.com/storage) (imagens e PDFs) |
| Autenticação (admin) | Implementação própria via `middleware.js` + cookie assinado (sem biblioteca externa) |
| Hospedagem / Deploy | [Vercel](https://vercel.com) |
| Automação | Vercel Cron Jobs (rotina de *keep-alive* para o banco) |

## 📂 Estrutura do Projeto

```
catalogo-agrofloresta/
├── prisma/
│   ├── schema.prisma           # Modelo de dados (Especie)
│   └── migrations/
├── public/
│   └── logo-cedvb.png          # Símbolo da escola, usado na NavBar
├── src/
│   ├── app/
│   │   ├── page.js                       # Catálogo (página inicial)
│   │   ├── actions.js                    # Server Action: cadastrarEspecie
│   │   ├── adminActions.js               # Server Actions: entrarAdmin, sairAdmin
│   │   ├── especies/[slug]/page.js       # Guia individual da espécie
│   │   ├── admin/
│   │   │   ├── cadastrar/page.js         # Formulário de cadastro
│   │   │   └── login/page.js             # Login administrativo
│   │   └── api/keep-alive/route.js       # Endpoint chamado pelo Cron
│   ├── components/
│   │   ├── EspecieCard.js                # Card resumido do catálogo
│   │   └── NavBar.js                     # Barra de navegação
│   ├── server/
│   │   ├── db.js                         # Cliente Prisma (com driver adapter)
│   │   └── storage.js                    # Upload de arquivos ao Supabase Storage
│   ├── lib/
│   │   ├── auth.js                       # Geração do token de sessão do admin
│   │   └── utils.js                      # Helpers (ex: detectar arquivo PDF)
│   └── middleware.js                     # Protege as rotas /admin/*
├── vercel.json                # Configuração do Cron Job de keep-alive
├── next.config.mjs
├── prisma.config.ts
└── package.json
```

## 🗄️ Modelo de Dados

Tabela principal: `Especie`

| Campo | Tipo | Observação |
|---|---|---|
| `id` | UUID | Identificador único |
| `slug` | String | Único; gerado automaticamente a partir do nome popular |
| `nomePopular` | String | Obrigatório |
| `nomeCientifico` | String | Obrigatório |
| `familia` | String? | Família botânica (opcional) |
| `caracteristicas` | String | Descrição visual da planta |
| `localOrigem` | String | Continente/país de origem |
| `localEncontrada` | String | Onde é encontrada no Brasil |
| `formaCultivo` | String | Luminosidade, solo, posição na agrofloresta |
| `propriedadesUsos` | String | Usos alimentares/medicinais |
| `cuidadosRecomendacoes` | String | Espinhos, toxinas, alergias, etc. |
| `fotoRealUrl` / `carimboBotanicoUrl` / `aquarelaUrl` / `mapaOrigemUrl` | String? | URLs dos arquivos no Supabase Storage (imagem ou PDF) |
| `criadoEm` / `atualizadoEm` | DateTime | Preenchidos automaticamente |

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Node.js 20 ou superior
- Uma conta no [Supabase](https://supabase.com) (banco Postgres + Storage)

### Passo a passo

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd catalogo-agrofloresta

# 2. Instalar as dependências
npm install

# 3. Criar o arquivo .env na raiz do projeto
# (veja a lista completa de variáveis na seção abaixo)

# 4. Gerar o Prisma Client
npx prisma generate

# 5. Sincronizar o schema com o banco de dados
npx prisma db push

# 6. Rodar o servidor de desenvolvimento
npm run dev
```

O projeto ficará disponível em `http://localhost:3000`.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run start` | Roda a build de produção localmente |
| `npm run lint` | Executa o linter (ESLint) |


## ☁️ Deploy

O projeto está hospedado na **Vercel**, com deploy automático a partir da branch `dev` (configurada como *Production Branch* do projeto).

Dois detalhes de configuração específicos deste projeto:

- **Keep-alive do banco:** como o Supabase pausa projetos gratuitos após 7 dias de inatividade, um Cron Job da Vercel (definido em `vercel.json`) chama `/api/keep-alive` a cada 3 dias, mantendo o banco ativo.
- **Driver adapter do Prisma:** o Prisma 7 exige um driver adapter explícito para conectar ao Postgres — por isso a dependência `@prisma/adapter-pg`, configurada em `src/server/db.js`.

## 🔒 Segurança

- A área `/admin` é protegida por senha e cookie de sessão assinado, verificado em `middleware.js` a cada requisição.
- Chaves sensíveis (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `SESSION_SECRET`) nunca são expostas ao navegador — só são acessadas em código que roda no servidor.
- O catálogo público não requer autenticação, por design: qualquer visitante pode consultar as espécies cadastradas.

---

*Projeto desenvolvido para uso educativo da escola CEDVB.*