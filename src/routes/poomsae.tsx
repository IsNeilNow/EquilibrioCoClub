import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import poomsaeImg from "@/assets/poomsae.jpg";
import { TaegeukElement } from "@/components/taekwondo/TaegeukElement";
import { TechniqueAcademySection } from "@/components/sections/TechniqueAcademySection";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/poomsae")({
  head: () => ({
    meta: [
      { title: createPageTitle("Poomsae") },
      {
        name: "description",
        content:
          "Las formas (poomsae) Taegeuk del Taekwondo: significado, descripción técnica y video de cada una para estudiar paso a paso.",
      },
      {
        property: "og:title",
        content: "Poomsae: Formas del Taekwondo con Video",
      },
      {
        property: "og:description",
        content: "Significado, descripción y video de cada forma Taegeuk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Poomsae,
});

const PLAYLIST = "PLgjWu0wTERydqRT7PpnEMYsLE2tXUmK1j";

type Forma = {
  n: string;
  ko: string;
  trigrama: string;
  grado: string;
  significado: string;
  descripcion: string;
  videoId: string;
  index: number;
};

const formas: [Forma, ...Forma[]] = [
  {
    n: "Taegeuk Il Jang",
    ko: "태극 1장",
    trigrama: "☰ Keon — Cielo",
    grado: "8º Gup (amarillo)",
    significado:
      "Representa el cielo y la luz: el origen de todo, el comienzo de la creación y del camino del practicante.",
    descripcion:
      "Movimientos básicos en ap seogi y ap kubi: defensa baja (arae makki), puñetazo medio (momtong jireugi), defensa media y patada frontal. Enseña el ritmo y la respiración inicial.",
    videoId: "omSFb-pcBCw",
    index: 1,
  },
  {
    n: "Taegeuk Ee Jang",
    ko: "태극 2장",
    trigrama: "☱ Tae — Lago",
    grado: "7º Gup (amarillo punta verde)",
    significado:
      "El lago: serenidad interior y firmeza. La calma que oculta profundidad.",
    descripcion:
      "Se introduce la defensa alta (eolgul makki) y se repiten patadas frontales encadenadas con puñetazo. Trabaja la suavidad del movimiento sin perder fuerza.",
    videoId: "5EL6ZlyYax0",
    index: 2,
  },
  {
    n: "Taegeuk Sam Jang",
    ko: "태극 3장",
    trigrama: "☲ Ri — Fuego",
    grado: "6º Gup (verde)",
    significado:
      "El fuego y el sol: pasión, entusiasmo y energía constante en el entrenamiento.",
    descripcion:
      "Aparece el canto de mano (sonnal makki) y el dwit kubi. Combinaciones rápidas de patada frontal y doble puñetazo que exigen control del centro.",
    videoId: "ajjltvy04OE",
    index: 3,
  },
  {
    n: "Taegeuk Sa Jang",
    ko: "태극 4장",
    trigrama: "☳ Jin — Trueno",
    grado: "5º Gup (verde punta azul)",
    significado:
      "El trueno: poder y majestad. Ante el peligro se actúa con calma y valentía.",
    descripcion:
      "Incluye sonnal momtong makki, pyonsonkeut chireugi, patada lateral (yeop chagi) y defensa con giro. Es la forma donde la técnica se vuelve marcial.",
    videoId: "pVwPk-bswCc",
    index: 4,
  },
  {
    n: "Taegeuk O Jang",
    ko: "태극 5장",
    trigrama: "☴ Seon — Viento",
    grado: "4º Gup (azul)",
    significado:
      "El viento: fuerza suave pero capaz de ser devastadora. Humildad y adaptabilidad.",
    descripcion:
      "Introduce mejumeok naeryeo chigi (golpe descendente con martillo), palkup chigi (codo) y la posición koa seogi cruzada.",
    videoId: "V-7eMkACfeo",
    index: 5,
  },
  {
    n: "Taegeuk Yuk Jang",
    ko: "태극 6장",
    trigrama: "☵ Gam — Agua",
    grado: "3er Gup (azul punta roja)",
    significado:
      "El agua: fluidez constante que supera cualquier obstáculo sin romperse.",
    descripcion:
      "Patada circular (dollyo chagi), defensa alta con canto de mano y batangson momtong makki. El desplazamiento debe ser continuo y sin cortes.",
    videoId: "oDWZZr6NW1A",
    index: 6,
  },
  {
    n: "Taegeuk Chil Jang",
    ko: "태극 7장",
    trigrama: "☶ Gan — Montaña",
    grado: "2º Gup (rojo)",
    significado:
      "La montaña: estabilidad, ponderación y madurez. No se avanza por impulso.",
    descripcion:
      "Beom seogi (posición del tigre), juchum seogi, gawi makki (defensa en tijera), patada de rodilla y golpe doble de puño. Es la forma más rica en variedad técnica.",
    videoId: "8FvUQOUdVbE",
    index: 7,
  },
  {
    n: "Taegeuk Pal Jang",
    ko: "태극 8장",
    trigrama: "☷ Gon — Tierra",
    grado: "1er Gup (rojo punta negra)",
    significado:
      "La tierra: raíz y fin del ciclo. Cierra el recorrido Taegeuk antes del cinturón negro.",
    descripcion:
      "Doble patada frontal en salto (dubal dangsang chagi), palkup dollyo chigi y combinaciones completas. Exige potencia, precisión y resistencia.",
    videoId: "jLF9i1a-MWg",
    index: 8,
  },
  {
    n: "Poomsae Koryo",
    ko: "고려",
    trigrama: "Koryo — Primera avanzada",
    grado: "Avanzado",
    significado: "Forma avanzada que continúa el estudio después de las ocho Taegeuk.",
    descripcion:
      "Consulta el video en español para estudiar la secuencia completa con acompañamiento del instructor.",
    videoId: "lbqHWt7NHWc",
    index: 9,
  },
];

function Poomsae() {
  const [activa, setActiva] = useState<Forma>(() => formas[0]);

  return (
    <div className="poomsae-page">
      <section className="poomsae-hero relative overflow-hidden border-b border-border">
        <img
          src={poomsaeImg}
          alt="Practicante ejecutando una forma de taekwondo"
          width={1200}
          height={900}
          className="poomsae-hero__image absolute inset-0 h-full w-full object-cover"
        />
        <div className="poomsae-hero__wash absolute inset-0" />
        <div className="poomsae-hero__glyph" aria-hidden="true">
          八
        </div>
        <div className="relative mx-auto min-h-[65vh] max-w-[90rem] px-6 py-20 sm:flex sm:items-end sm:px-8 sm:py-24 lg:min-h-[72vh] lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow reveal">품새 · El lenguaje de las formas</p>
            <h1 className="reveal mt-5 text-5xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
              Poomsae <span className="text-primary">Taegeuk</span>
            </h1>
            <p className="reveal mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Ocho formas Taegeuk y Koryo basadas en los trigramas del I Ching. Cada una tiene
              un significado, un contenido técnico y un grado asociado.
              Selecciona una para ver su video.
            </p>
            <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-border/70 py-5">
              <div>
                <strong className="block font-display text-2xl text-primary">
                  9
                </strong>
                <span className="text-xs uppercase text-muted-foreground">
                  formas
                </span>
              </div>
              <div>
                <strong className="block font-display text-2xl text-primary">
                  18
                </strong>
                <span className="text-xs uppercase text-muted-foreground">
                  movimientos base
                </span>
              </div>
              <div>
                <strong className="block font-display text-2xl text-primary">
                  1
                </strong>
                <span className="text-xs uppercase text-muted-foreground">
                  camino
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[90rem] px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="poomsae-selector sticky top-[4.6rem] z-30 -mx-5 flex gap-2 overflow-x-auto border-y border-border bg-background/90 px-5 py-3 backdrop-blur-xl">
          {formas.map((f, index) => (
            <button
              key={f.n}
              onClick={() => setActiva(f)}
              data-poomsae-index={index}
              className={`poomsae-chip shrink-0 border px-4 py-2 font-display text-xs uppercase transition-all duration-300 ${
                activa.n === f.n
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f.n}
            </button>
          ))}
        </div>

        <div
          key={activa.n}
          className="poomsae-focus reveal mt-12 grid gap-0 border border-border lg:grid-cols-[1.2fr_.8fr]"
        >
          <div className="poomsae-video aspect-video w-full bg-card lg:aspect-auto lg:min-h-[34rem]">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${activa.videoId}`}
              title={`Video de ${activa.n}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <article className="relative overflow-hidden border-t border-border bg-card/35 p-6 sm:p-9 lg:border-l lg:border-t-0">
            <div className="relative mb-8 ml-auto w-36 sm:w-44">
              <TaegeukElement index={activa.index} />
            </div>
            <div className="relative z-10">
              <p className="text-3xl text-primary">{activa.ko}</p>
              <h2 className="mt-2 text-4xl uppercase">{activa.n}</h2>
              <div className="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.12em]">
                <span className="border border-border px-3 py-1 text-muted-foreground">
                  {activa.trigrama}
                </span>
                <span className="border border-primary/60 px-3 py-1 text-primary">
                  {activa.grado}
                </span>
              </div>

              <p className="eyebrow mt-8">Significado</p>
              <p className="mt-2 text-muted-foreground">{activa.significado}</p>

              <p className="eyebrow mt-6">Descripción técnica</p>
              <p className="mt-2 text-muted-foreground">{activa.descripcion}</p>

              <a
                href={`https://www.youtube.com/watch?v=${activa.videoId}&list=${PLAYLIST}`}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block border border-primary px-5 py-3 font-display text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Ver la lista completa en YouTube
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="poomsae-index border-t border-border bg-card/40">
        <div className="mx-auto max-w-[90rem] px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
          <p className="eyebrow">Referencia rápida</p>
          <h2 className="mt-3 text-3xl uppercase">Las ocho Taegeuk y Koryo</h2>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2">
            {formas.map((f, index) => (
              <button
                key={f.n}
                onClick={() => setActiva(f)}
                data-poomsae-index={index}
                className="poomsae-row group grid w-full grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-4 bg-background p-5 text-left transition-all duration-300 hover:bg-card"
              >
                <span className="font-display text-2xl text-primary transition-transform duration-300 group-hover:scale-110">
                  {f.index}
                </span>
                <span className="shrink-0">
                  <TaegeukElement index={f.index} compact />
                </span>
                <span className="min-w-0">
                  <strong className="block truncate font-display uppercase">
                    {f.n}
                  </strong>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {f.trigrama} · {f.grado}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <TechniqueAcademySection />
    </div>
  );
}
