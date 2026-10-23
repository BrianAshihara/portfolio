# Brian Ashihara · Portfólio

**Site:** [portfolio-brian-ashihara.vercel.app](https://portfolio-brian-ashihara.vercel.app)

Portfólio pessoal feito com **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Motion** (Framer Motion) e **Lenis** (scroll suave).

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Sobe a build |
| `npm run typecheck` | Checagem de tipos |

## Editando o conteúdo

Todo o texto fica em [`src/data/content.ts`](src/data/content.ts). O que é igual nos dois idiomas (nome, links, foto, ícones e tags) fica em `shared`, `socials`, `stacks` e `projectBase`; os textos ficam em `pt` e `en`. A ordem de `projectBase` é a ordem dos cards.

- **Foto:** `public/me.jpg` (a moldura usa a proporção 3:4).
- **Idioma:** português é o padrão. O botão PT/EN da navbar troca o idioma, e a escolha fica salva no navegador do visitante.

## Efeitos

- Scroll suave com Lenis e barra de progresso no topo
- Saudação em vários idiomas ao lado do nome, começando pelo idioma do site
- Parallax em camadas no hero: ao rolar, "Brian", "Ashihara", o restante do texto e a saudação se movem em velocidades diferentes, e os arcos do fundo crescem e giram
- Cards com brilho que segue o mouse
- Botões magnéticos, navbar que se esconde ao rolar e indicador de seção ativa
- Fundo estático e animações só com `transform`/`opacity`, para manter a rolagem leve
- Respeita `prefers-reduced-motion`

## Deploy na Vercel

O deploy está feito na Vercel.