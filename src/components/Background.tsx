// Fundo estático do site todo: grafite com um calor laranja bem leve nas bordas.
// Só gradientes, sem animação nem blur, para não pesar na rolagem.
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_0%_100%,rgb(255_138_61/0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_100%_0%,rgb(255_181_71/0.04),transparent_70%)]" />
    </div>
  );
}
