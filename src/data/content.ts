// Todo o conteúdo do site fica aqui. Edite este arquivo para atualizar textos,
// projetos, stacks e links sem mexer nos componentes.
// O que é igual nos dois idiomas fica em `shared`; os textos ficam em `content.pt` e `content.en`.

export type Lang = "pt" | "en";

export const languages: { id: Lang; label: string }[] = [
  { id: "pt", label: "PT" },
  { id: "en", label: "EN" },
];

export const defaultLang: Lang = "pt";


const shared = {
  // Endereço oficial do site (usado nos metadados para Google, LinkedIn e afins).
  siteUrl: "https://portfolio-brian-ashihara.vercel.app",
  name: "Brian Ashihara",
  fullName: "Brian Citro Ashihara",
  email: "brian09.c.a@gmail.com",
  gmailCompose: "https://mail.google.com/mail/?view=cm&fs=1&to=brian09.c.a@gmail.com",
  // Foto em /public. A moldura usa a proporção 3:4.
  photo: "/me.jpg",
  githubRepos: "https://github.com/BrianAshihara?tab=repositories",
  // Saudações do hero, em ordem. Começa pela do idioma atual do site.
  greetings: [
    { text: "Olá!", lang: "pt-BR" },
    { text: "Hello!", lang: "en" },
    { text: "¡Hola!", lang: "es" },
    { text: "Bonjour !", lang: "fr" },
    { text: "Ciao!", lang: "it" },
    { text: "Hallo!", lang: "de" },
    { text: "こんにちは！", lang: "ja" },
    { text: "Привет!", lang: "ru" },
    { text: "Hoi!", lang: "nl" },
    { text: "Hej!", lang: "sv" },
    { text: "Ahoj!", lang: "cs" },
    { text: "Szia!", lang: "hu" },
    { text: "Xin chào!", lang: "vi" },
    { text: "Aloha!", lang: "haw" },
  ],
};

export const socials = [
  { id: "github", label: "GitHub", handle: "@BrianAshihara", href: "https://github.com/BrianAshihara" },
  { id: "linkedin", label: "LinkedIn", handle: "in/brianashihara", href: "https://www.linkedin.com/in/brianashihara/" },
] as const;

// Os ícones vêm do skillicons.dev (o mesmo do seu README do GitHub).
const stacks = {
  languages: [
    { name: "Go", icon: "go" },
    { name: "TypeScript", icon: "ts" },
    { name: "JavaScript", icon: "js" },
    { name: "Python", icon: "python" },
    { name: "C++", icon: "cpp" },
    { name: "Rust", icon: "rust" },
  ],
  frontend: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "Vite", icon: "vite" },
    { name: "Tailwind", icon: "tailwind" },
  ],
  backend: [
    { name: "Node.js", icon: "nodejs" },
    { name: "Flask", icon: "flask" },
  ],
  data: [
    { name: "PostgreSQL", icon: "postgres" },
    { name: "MySQL", icon: "mysql" },
    { name: "SQLite", icon: "sqlite" },
    { name: "Firebase", icon: "firebase" },
  ],
  tools: [
    { name: "GCP", icon: "gcp" },
    { name: "Cloudflare", icon: "cloudflare" },
    { name: "Git", icon: "git" },
    { name: "Postman", icon: "postman" },
  ],
};

// A ordem aqui é a ordem dos cards na grade (2 por linha).
const projectBase = {
  coreledger: { title: "CoreLedger", tags: ["Go", "PostgreSQL", "ADRs"], repo: "https://github.com/BrianAshihara/CoreLedger" },
  celerpay: { title: "CelerPay", tags: ["C++23", "SIMD", "CMake", "Fintech"], repo: "https://github.com/BrianAshihara/CelerPay" },
  pokedex: {
    title: "Pokédex",
    tags: ["React 19", "TypeScript", "Vite", "PokeAPI"],
    repo: "https://github.com/BrianAshihara/pokedex",
    live: "https://brianpokedex.vercel.app/",
  },
  imperium: { title: "Imperium", tags: ["Next.js 16", "React 19", "Node.js", "SQLite", "JWT"], repo: "https://github.com/BrianAshihara/imperium-web" },
  tudu: { title: "Tudu", tags: ["Tauri 2", "Rust", "React", "SQLite"], repo: "https://github.com/BrianAshihara/Tudu" },
  patchbot: { title: "Patch Bot", tags: ["TypeScript", "Cloudflare Workers", "D1", "Discord API"], repo: "https://github.com/BrianAshihara/PatchBot" },
  blockchain: { title: "", tags: ["Python", "Flask", "ECDSA", "P2P", "TypeScript"], repo: "https://github.com/BrianAshihara/blockchainVotacao" },
  ytdownloader: { title: "YTDownloader", tags: ["Python", "customtkinter", "yt-dlp", "FFmpeg"], repo: "https://github.com/BrianAshihara/YTDownloader" },
};

type ProjectId = keyof typeof projectBase;
type ProjectText = { title?: string; description: string; highlight?: string };

export type Project = {
  id: ProjectId;
  title: string;
  description: string;
  highlight?: string;
  tags: string[];
  repo: string;
  live?: string;
};

const buildProjects = (text: Record<ProjectId, ProjectText>): Project[] =>
  (Object.keys(projectBase) as ProjectId[]).map((id) => {
    const base: { title: string; tags: string[]; repo: string; live?: string } = projectBase[id];
    return { id, ...base, ...text[id], title: text[id].title ?? base.title };
  });

const pt = {
  meta: {
    title: `${shared.name} - Desenvolvedor Full Stack`,
    description: "Desenvolvedor Full Stack e estudante de Engenharia de Computação.",
  },
  nav: {
    items: [
      { id: "sobre", label: "Sobre" },
      { id: "stacks", label: "Stacks" },
      { id: "projetos", label: "Projetos" },
      { id: "contato", label: "Contato" },
    ],
    backToTop: "Voltar ao topo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Idioma",
  },
  hero: {
    roleLine: "Desenvolvedor Full Stack Júnior",
    tagline: "Gosto de criar coisas simples e bem feitas, do banco de dados à interface.",
    cta: "Ver projetos",
    scroll: "Rolar para baixo",
  },
  about: {
    eyebrow: "Quem sou",
    title: "Sobre mim",
    photoAlt: `Foto de ${shared.name}`,
    paragraphs: [
      "Sou desenvolvedor Full Stack e estudante de Engenharia de Computação. Trabalho com aplicações web de ponta a ponta, do banco de dados à interface, principalmente com Go, Node.js, React e Next.js.",
      "Comecei pela programação competitiva em C++, que me ensinou a pensar em algoritmos e a quebrar problemas em partes menores. Foi assim que, com a minha equipe, conquistei o 1º lugar na maratona de programação CPIF 2025. Gosto de entender como as coisas funcionam por dentro, e boa parte dos meus projetos nasce dessa curiosidade.",
      "Hoje trabalho na Marketize Sales e, nas horas livres, sigo desenvolvendo projetos pessoais, alguns para estudar e outros para usar no dia a dia.",
    ],
    facts: [
      { label: "Formação", value: "Cursando Eng. de Computação" },
      { label: "Atualmente", value: "Marketize Sales" },
      { label: "Idiomas", value: "PT nativo · EN avançado" },
    ],
  },
  stacks: {
    eyebrow: "Stacks",
    title: "Ferramentas que uso para tirar ideias do papel.",
    description: "Linguagens e ferramentas que uso no dia a dia, do backend ao frontend.",
    groups: [
      { title: "Linguagens", items: stacks.languages },
      { title: "Frontend", items: stacks.frontend },
      { title: "Backend", items: stacks.backend },
      { title: "Dados", items: stacks.data },
      { title: "Cloud & Ferramentas", items: stacks.tools },
    ],
  },
  projects: {
    eyebrow: "Portfólio",
    title: "Projetos Pessoais",
    description: "Alguns projetos que desenvolvi para estudar ou para resolver problemas do dia a dia.",
    code: "Código",
    live: "Ver online",
    viewAll: "Ver todos no GitHub",
    items: buildProjects({
      coreledger: {
        description:
          "Motor de ledger de partidas dobradas que simula a infraestrutura de movimentação de dinheiro de uma fintech. Foco em corretude sob concorrência, idempotência e auditabilidade.",
        highlight: "100 transferências concorrentes, exatamente 50 sucessos, sempre.",
      },
      celerpay: {
        description:
          "Biblioteca C++23 para pagamentos brasileiros: PIX (BR Code e QR Code próprio), boleto, CPF/CNPJ alfanumérico e conciliação de CNAB 240, OFX e PIX recebidos.",
        highlight: "SIMD, dinheiro em centavos e zero dependências.",
      },
      pokedex: {
        description:
          "Pokédex interativa com dados em tempo real da PokeAPI: atributos, fraquezas, formas alternativas, cadeia de evolução, golpes e comparador.",
      },
      imperium: {
        description:
          "App de finanças pessoais em pt-BR: dashboard com comprometido, variável e livre, limites, compromissos do mês e histórico de entradas e saídas.",
      },
      tudu: {
        description:
          "Gerenciador de tarefas desktop, local e sem conta. Lista, quadro Kanban, notas em Markdown e desfazer exclusão. Os dados ficam num SQLite na sua máquina.",
      },
      patchbot: {
        description:
          "Bot de Discord que posta as notas de patch de Deadlock, CS2, Marvel Rivals e outros assim que saem, com cards, threads e destaque para updates grandes.",
        highlight: "Roda 100% no plano gratuito da Cloudflare.",
      },
      blockchain: {
        title: "Blockchain de Votação",
        description:
          "TCC de Engenharia de Computação: votação distribuída onde cada instância é um nó P2P. Votos assinados com ECDSA, minerados com Proof-of-Work e consenso de Nakamoto.",
      },
      ytdownloader: {
        description:
          "App desktop para baixar vídeos em MP4 e áudios em MP3 do YouTube direto para a pasta Downloads, com barra de progresso, validação de URL e novas tentativas automáticas em caso de falha.",
      },
    }),
  },
  contact: {
    eyebrow: "Contato",
    title: "Entre em contato",
    emailLabel: "E-mail",
    send: "Enviar e-mail",
    copy: "Copiar e-mail",
    copied: "Copiado!",
    viewProfile: "Ver perfil",
  },
};

export type SiteContent = typeof pt;

const en: SiteContent = {
  meta: {
    title: `${shared.name} - Full Stack Developer`,
    description: "Full Stack Developer and Computer Engineering student.",
  },
  nav: {
    items: [
      { id: "sobre", label: "About" },
      { id: "stacks", label: "Stack" },
      { id: "projetos", label: "Projects" },
      { id: "contato", label: "Contact" },
    ],
    backToTop: "Back to top",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    roleLine: "Junior Full Stack Developer",
    tagline: "I like building simple, well-made things, from the database to the interface.",
    cta: "See projects",
    scroll: "Scroll down",
  },
  about: {
    eyebrow: "Who I am",
    title: "About me",
    photoAlt: `Photo of ${shared.name}`,
    paragraphs: [
      "I'm a Full Stack Developer and a Computer Engineering student. I build web applications end to end, from the database to the interface, mostly with Go, Node.js, React and Next.js.",
      "I started with competitive programming in C++, which taught me to think in algorithms and to break problems into smaller pieces. That's how my team and I won 1st place at the CPIF 2025 programming marathon. I like understanding how things work under the hood, and most of my projects come from that curiosity.",
      "Today I work at Marketize Sales and, in my free time, I keep building personal projects, some to learn and others to use day to day.",
    ],
    facts: [
      { label: "Education", value: "Computer Engineering student" },
      { label: "Currently", value: "Marketize Sales" },
      { label: "Languages", value: "PT native · EN advanced" },
    ],
  },
  stacks: {
    eyebrow: "Stack",
    title: "Tools I use to bring ideas to life.",
    description: "Languages and tools I use day to day, from backend to frontend.",
    groups: [
      { title: "Languages", items: stacks.languages },
      { title: "Frontend", items: stacks.frontend },
      { title: "Backend", items: stacks.backend },
      { title: "Data", items: stacks.data },
      { title: "Cloud & Tools", items: stacks.tools },
    ],
  },
  projects: {
    eyebrow: "Portfolio",
    title: "Personal Projects",
    description: "Some projects I built to learn or to solve everyday problems.",
    code: "Code",
    live: "Live demo",
    viewAll: "See all on GitHub",
    items: buildProjects({
      coreledger: {
        description:
          "Double-entry ledger engine that simulates the money-movement infrastructure of a fintech. Focused on correctness under concurrency, idempotency and auditability.",
        highlight: "100 concurrent transfers, exactly 50 successes, every time.",
      },
      celerpay: {
        description:
          "C++23 library for Brazilian payments: PIX (BR Code and a custom QR Code encoder), boleto, alphanumeric CPF/CNPJ and reconciliation of CNAB 240, OFX and received PIX.",
        highlight: "SIMD, money in cents and zero dependencies.",
      },
      pokedex: {
        description:
          "Interactive Pokédex with live data from PokeAPI: stats, weaknesses, alternate forms, evolution chains, moves and a comparison tool.",
      },
      imperium: {
        description:
          "Personal finance app (in Portuguese): dashboard with committed, variable and free money, limits, monthly bills and income and expense history.",
      },
      tudu: {
        description:
          "Local desktop task manager with no account needed. List, Kanban board, Markdown notes and undo delete. Data lives in a SQLite file on your machine.",
      },
      patchbot: {
        description:
          "Discord bot that posts patch notes for Deadlock, CS2, Marvel Rivals and more as soon as they're out, with cards, threads and highlights for major updates.",
        highlight: "Runs 100% on Cloudflare's free plan.",
      },
      blockchain: {
        title: "Voting Blockchain",
        description:
          "Computer Engineering capstone: distributed voting where each instance is a P2P node. Votes are signed with ECDSA, mined with Proof-of-Work and agreed on with Nakamoto consensus.",
      },
      ytdownloader: {
        description:
          "Desktop app to download YouTube videos as MP4 and audio as MP3 straight to your Downloads folder, with a progress bar, URL validation and automatic retries on failure.",
      },
    }),
  },
  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    emailLabel: "Email",
    send: "Send email",
    copy: "Copy email",
    copied: "Copied!",
    viewProfile: "View profile",
  },
};

export const content: Record<Lang, SiteContent> = { pt, en };
export { shared };
