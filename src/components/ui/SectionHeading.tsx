import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 max-w-3xl md:mb-20">
      <Reveal className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.25em] text-warm uppercase">
        <span className="text-muted">{index}</span>
        <span className="h-px w-10 bg-gradient-to-r from-warm to-transparent" />
        {eyebrow}
      </Reveal>
      <h2 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance md:text-6xl">
        {/* key: ao trocar de idioma, o título é recriado e anima de novo */}
        <SplitText key={title} text={title} />
      </h2>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-6 text-lg text-pretty text-muted">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
