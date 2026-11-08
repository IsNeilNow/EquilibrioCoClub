import { useState } from "react";
import { InteractiveSymbolScene } from "@/components/taekwondo/InteractiveSymbolScene";

type IdentityId = "cobra" | "rosa" | "taegeuk" | "cinturones";

const identities: {
  id: IdentityId;
  label: string;
  hangul: string;
  description: string;
}[] = [
  {
    id: "cobra",
    label: "Cobra VAIPER",
    hangul: "용기",
    description:
      "La cobra representa la alerta y el valor: observar antes de actuar, moverse con precisión y proteger sin perder el control.",
  },
  {
    id: "rosa",
    label: "Rosa",
    hangul: "강인함",
    description:
      "La rosa representa la feminidad, la belleza y la fortaleza de las mujeres. Sus pétalos hablan de delicadeza; sus espinas, de una fuerza capaz de defenderse.",
  },
  {
    id: "taegeuk",
    label: "Yin-yang",
    hangul: "조화",
    description:
      "El Taegeuk une los opuestos: potencia y suavidad, ataque y defensa, esfuerzo y recuperación. El equilibrio es una práctica.",
  },
  {
    id: "cinturones",
    label: "Cinturones",
    hangul: "성장",
    description:
      "Cada color registra una etapa de comprensión. Avanzar no es acumular rangos, sino volver a lo esencial con más control.",
  },
];

const priorityLevels = [
  {
    title: "BIENESTAR",
    detail:
      "Tu bienestar es lo primero. Cuida tu cuerpo, recupera tus lesiones y adapta el entrenamiento con ayuda de tu profesor.",
  },
  {
    title: "FAMILIA",
    detail:
      "La familia da apoyo y amor. Es válido estar presente en los momentos importantes con tus seres queridos.",
  },
  {
    title: "ESTUDIO",
    detail:
      "El estudio construye tu futuro. Organiza tu tiempo y recuerda que entrenar también puede despejar la mente.",
  },
  {
    title: "TRABAJO",
    detail:
      "Cumplir tus responsabilidades es fundamental. Habla con tu profesor para encontrar una forma sostenible de seguir entrenando.",
  },
  {
    title: "EQUILIBRIO",
    detail:
      "El objetivo es balancear salud, familia, estudio, trabajo y entrenamiento. No podemos estar en todas partes, y eso está bien.",
  },
];

export function HomeIdentityLab() {
  const [activeIdentity, setActiveIdentity] = useState<IdentityId>("cobra");
  const [activePriority, setActivePriority] = useState(0);
  const identity = identities.find(({ id }) => id === activeIdentity) ?? identities[0];
  const priority = priorityLevels[activePriority];

  return (
    <section
      id="identidad"
      data-home-scene="history"
      className="identity-lab relative overflow-hidden border-y border-border"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="eyebrow">02 — Identidad</p>
            <h2 className="mt-3 max-w-3xl text-4xl uppercase sm:text-6xl">
              Un símbolo también
              <span className="text-primary"> entrena.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Explora los cuatro signos que acompañan el camino de Equilibrio.
              Cada uno traduce una actitud del dojang y se activa con teclado,
              toque o puntero.
            </p>
          </div>
          <div className="identity-lab__display" aria-live="polite">
            <div className={`identity-lab__mark identity-lab__mark--${identity.id}`}>
              <InteractiveSymbolScene kind={identity.id} label={identity.label} />
            </div>
            <div>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-primary">
                {identity.hangul}
              </p>
              <h3 className="mt-2 text-2xl uppercase">{identity.label}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {identity.description}
              </p>
            </div>
          </div>
        </div>
        <div className="identity-lab__tabs mt-10 grid sm:grid-cols-4" role="tablist" aria-label="Símbolos de identidad">
          {identities.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === activeIdentity}
              className="identity-lab__tab"
              onClick={() => setActiveIdentity(item.id)}
            >
              <span>{item.hangul}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-20 grid gap-10 border-t border-border/80 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="eyebrow">03 — El equilibrio de la vida</p>
            <h2 className="mt-3 text-3xl uppercase sm:text-5xl">
              Organizar para <span className="text-primary">avanzar.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Pulsa cada nivel para recordar qué debe sostener tu camino antes
              de volver al dojang.
            </p>
            <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Niveles de prioridad">
              {priorityLevels.map((level, index) => (
                <button
                  key={level.title}
                  type="button"
                  role="tab"
                  aria-selected={index === activePriority}
                  className="identity-lab__priority-button"
                  onClick={() => setActivePriority(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <p className="mt-6 font-display text-lg uppercase text-primary">
              {priority.title}
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {priority.detail}
            </p>
          </div>
          <div className="identity-lab__pyramid-wrap">
            <div className="identity-lab__pyramid" aria-label="Pirámide interactiva de prioridades">
              {priorityLevels.map((level, index) => (
                <button
                  key={level.title}
                  type="button"
                  className={`identity-lab__level identity-lab__level--${index + 1} ${index === activePriority ? "is-active" : ""}`}
                  onClick={() => setActivePriority(index)}
                  aria-label={`Nivel ${index + 1}: ${level.title}`}
                >
                  <span>{level.title}</span>
                </button>
              ))}
            </div>
            <InteractiveSymbolScene
              kind="taegeuk"
              priority={activePriority + 1}
              label={`Prioridad ${priority.title}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
