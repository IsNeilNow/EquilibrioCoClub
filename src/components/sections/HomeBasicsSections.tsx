import hero from "@/assets/hero.jpg";
import { grados, principios } from "@/data/home";
import type { CSSProperties, PointerEvent } from "react";

const beltStages = [
  "Inicio",
  "Raíz",
  "Crecimiento",
  "Altura",
  "Control",
  "Madurez",
];

export function HomeHeroSection() {
  function tiltHeadline(event: PointerEvent<HTMLElement>) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--hero-tilt-x", `${y * -3}deg`);
    event.currentTarget.style.setProperty("--hero-tilt-y", `${x * 4}deg`);
  }

  function resetHeadline(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--hero-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--hero-tilt-y", "0deg");
  }

  return (
    <section
      id="inicio"
      data-home-scene="dojo"
      className="home-hero relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden border-b border-border"
      onPointerMove={tiltHeadline}
      onPointerLeave={resetHeadline}
    >
      <div className="absolute inset-0 ink-grid" aria-hidden />
      <span className="home-hero__sun" aria-hidden="true" />
      <div className="home-hero__painting" aria-hidden="true">
        <span className="home-hero__calligraphy">도</span>
        <span className="home-hero__seal">
          태권도
          <br />
          대한민국
        </span>
        <span className="home-hero__brush-line" />
      </div>
      <img
        src={hero}
        alt="Atleta de taekwondo ejecutando una patada en salto"
        width={1600}
        height={1008}
        className="home-hero__photo absolute inset-0 h-full w-full object-cover"
      />
      <div className="home-hero__wash absolute inset-0" />
      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-6 py-24 sm:px-8 sm:py-32 lg:px-10">
        <div className="max-w-4xl">
          <p className="eyebrow reveal">
            태권도 · Fundación Equilibrio · Colombia
          </p>
          <h1 className="home-hero__title reveal mt-6 max-w-4xl text-5xl uppercase leading-[0.91] sm:text-7xl lg:text-[7.5rem]">
            El camino de la <span>PATADA </span> y del <span>PUÑO</span>
          </h1>
          <p className="reveal mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Taekwondo es arte marcial, deporte y práctica de formación. Un
            camino de precisión, respeto y equilibrio que une el cuerpo con el
            carácter.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-8 border-t border-border/70 pt-6 sm:gap-12">
            {[
              ["1945", "Nacimiento de escuelas"],
              ["1955", "Nombre unificado"],
              ["1973", "Federación Mundial"],
              ["2000", "Deporte olímpico"],
              ["+80", "Países federados"],
              ["+210", "Alcance global"],
            ].map(([number, label]) => (
              <div key={label} className="home-hero__stat">
                <p className="font-display text-3xl text-primary sm:text-4xl">
                  {number}
                </p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <a
          href="#historia"
          className="home-hero__scroll mt-12 inline-flex items-center gap-3 font-display text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          Desciende por el camino
          <span aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export function HomeFoundationSection() {
  return (
    <section
      id="fundamento"
      data-home-scene="dojo"
      className="home-foundation relative overflow-hidden border-y border-border/70"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <p className="eyebrow">02 — Fundamento</p>
        <h2 className="mt-3 max-w-3xl text-4xl uppercase sm:text-6xl">
          Tres sílabas. <span className="text-primary">Un camino.</span>
        </h2>
        <div className="mt-12 grid border-y border-border/80 md:grid-cols-3">
          {[
            ["태", "Tae", "Pie", "Trayectoria y equilibrio"],
            ["권", "Kwon", "Puño", "Precisión y control"],
            ["도", "Do", "Camino", "Disciplina para toda la vida"],
          ].map(([hangul, romanization, meaning, value], index) => (
            <article
              key={romanization}
              className="home-concept group relative min-h-60 border-b border-border/70 p-6 last:border-0 md:border-b-0 md:border-r md:p-8 md:last:border-0"
            >
              <span className="home-concept__index">0{index + 1}</span>
              <p className="home-concept__hangul" lang="ko">
                {hangul}
              </p>
              <div className="relative z-10 mt-8">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-primary">
                  {romanization} · {meaning}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{value}</p>
              </div>
              <span className="home-concept__orbit" aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Es arte marcial, método de defensa personal y deporte olímpico. Su
          práctica reúne poomsae, kyorugi, kyokpa y hosinsul; como deporte lo
          regula World Taekwondo y su currículo técnico se certifica en
          Kukkiwon, Seúl.
        </p>
        <div className="home-pillars mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Poomsae", "Forma · memoria y precisión"],
            ["02", "Kyorugi", "Combate · distancia y estrategia"],
            ["03", "Kyokpa", "Rotura · decisión y enfoque"],
            ["04", "Hosinsul", "Defensa · control y cuidado"],
          ].map(([number, title, description]) => (
            <div key={title} className="home-pillar bg-background/90 p-5">
              <span className="font-display text-xs text-primary">
                {number}
              </span>
              <h3 className="mt-5 font-display text-2xl uppercase">{title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePrinciplesSection() {
  return (
    <section
      id="principios"
      data-home-scene="history"
      className="home-principles relative isolate overflow-hidden border-y border-border"
    >
      <div className="relative z-10 mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
        <header className="home-principles__heading">
          <p className="eyebrow">03 — Doctrina</p>
          <h2 className="uppercase">
            Los cinco
            <br />
            principios
          </h2>
        </header>
        <div className="home-principles__grid mt-10 grid sm:mt-14">
          {principios.map((principle) => (
            <article
              key={principle.es}
              className="home-principle group relative transition-colors duration-300"
            >
              <p className="home-principle__hangul">
                {principle.ko.replace(/\s/g, "")}
              </p>
              <h3 className="mt-8 font-display text-base uppercase sm:text-lg">
                {principle.es}
              </h3>
              <p className="mt-2 font-display text-xs tracking-[0.08em] text-muted-foreground">
                {principle.d.split(" — ")[0]}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {principle.d.split(" — ").slice(1).join(" — ")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeBeltsSection() {
  return (
    <section
      id="grados"
      data-home-scene="history"
      className="home-belts relative overflow-hidden border-y border-border"
    >
      <div className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr_0.8fr] md:items-start">
          <p className="eyebrow pt-2">04 — Progresión</p>
          <h2 className="home-belts__title text-4xl uppercase leading-[0.95] sm:text-6xl">
            El color registra el proceso.
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:pt-20">
            Cada cinturón representa una etapa de comprensión, no un destino.
            Avanzar es volver a lo esencial con más control.
          </p>
        </div>
        <ol
          className="home-belt-track mt-16 grid grid-cols-6"
          aria-label="Progresión de cinturones de Taekwondo"
        >
          {grados.map((grade, index) => (
            <li
              key={grade.c}
              className="home-belt group relative flex min-w-0 flex-col items-center text-center"
              style={
                {
                  "--belt-color": grade.hex,
                  "--belt-node-size": "clamp(4.75rem, 6.5vw, 5.75rem)",
                } as CSSProperties
              }
            >
              <span className="home-belt__node">
                <span className="home-belt__disc" />
              </span>
              <span className="mt-5 font-display text-sm uppercase sm:text-base">
                {grade.c}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                {beltStages[index]}
              </span>
              <span className="mt-2 text-[0.65rem] text-muted-foreground/80">
                {grade.n}
              </span>
              <span className="mt-4 text-[0.65rem] text-muted-foreground/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="sr-only">
                {grade.n}. {grade.t}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
