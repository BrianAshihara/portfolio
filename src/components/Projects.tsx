"use client";

import { ArrowUpRight, ExternalLink } from "lucide-react";
import { shared, type Project } from "@/data/content";
import { useLanguage } from "@/i18n/LanguageProvider";
import { GithubIcon } from "./ui/icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/SpotlightCard";

function ProjectCard({ project, index, labels }: { project: Project; index: number; labels: { code: string; live: string } }) {
  return (
    <SpotlightCard>
      <article className="flex h-full flex-col p-7 md:p-8">
        <span className="mb-6 font-mono text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>

        <h3 className="font-display text-3xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-4 text-pretty text-muted">{project.description}</p>

        {project.highlight && (
          <p className="mt-5 border-l-2 border-warm/60 pl-3 font-mono text-xs leading-relaxed text-warm/90">
            {project.highlight}
          </p>
        )}

        <div className="mt-auto pt-8">
          <ul className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted">
                {tag}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors duration-500 ease-smooth hover:border-fg hover:bg-fg hover:text-bg"
            >
              <GithubIcon className="h-4 w-4" /> {labels.code}
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fg via-[#ffe6d1] to-accent-soft bg-[length:200%_100%] bg-left px-4 py-2 text-sm font-medium text-bg transition-[background-position] duration-700 ease-smooth hover:bg-right"
              >
                <ExternalLink size={14} /> {labels.live}
              </a>
            )}
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}

export function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projetos" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" eyebrow={t.projects.eyebrow} title={t.projects.title} description={t.projects.description} />

        <div className="grid gap-6 md:grid-cols-2">
          {t.projects.items.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.1} className="h-full">
              <ProjectCard project={project} index={i} labels={t.projects} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <a
            href={shared.githubRepos}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-muted transition-colors duration-700 ease-smooth hover:border-fg hover:text-fg"
          >
            {t.projects.viewAll}
            <ArrowUpRight size={16} className="transition-transform duration-700 ease-smooth group-hover:rotate-45" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
