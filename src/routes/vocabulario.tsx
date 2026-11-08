import { createFileRoute, Link } from "@tanstack/react-router";
import { categorias, terminos } from "@/data/vocabularioData";
import { useMemo, useState } from "react";
import { TechniqueVisual } from "@/components/taekwondo/TechniqueVisual";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/vocabulario")({
  head: () => ({
    meta: [
      { title: createPageTitle("Vocabulario") },
      {
        name: "description",
        content:
          "Diccionario de términos coreanos del Taekwondo: órdenes del dojang, posiciones, patadas, defensas, conteo y etiqueta, con hangul y pronunciación.",
      },
      { property: "og:title", content: "Vocabulario Coreano del Taekwondo" },
      {
        property: "og:description",
        content:
          "Órdenes, posiciones, técnicas y conteo en coreano con pronunciación.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Vocabulario,
});

function Vocabulario() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const terminosFiltrados = useMemo(
    () =>
      terminos.filter(
        (termino) =>
          (categoriaSeleccionada === "Todos" ||
            termino.categoria === categoriaSeleccionada) &&
          (busqueda.trim() === "" ||
            `${termino.romanizacion} ${termino.significado} ${termino.hangul}`
              .toLowerCase()
              .includes(busqueda.toLowerCase())),
      ),
    [categoriaSeleccionada, busqueda],
  );

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
      <p className="eyebrow reveal">한국어 · Lenguaje del dojang</p>
      <h1 className="reveal mt-4 text-4xl uppercase leading-[0.95] sm:text-5xl">
        Vocabulario <span className="text-primary">coreano</span>
      </h1>
      <p className="reveal mt-5 max-w-2xl text-muted-foreground">
        En el Taekwondo las órdenes, posiciones y técnicas se nombran siempre en
        coreano. Dominar el vocabulario es parte del examen de grado y de la
        etiqueta del dojang.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <label htmlFor="vocabulario-busqueda" className="sr-only">
          Buscar término
        </label>
        <input
          id="vocabulario-busqueda"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar término…"
          className="w-full max-w-xs border border-border bg-card px-4 py-2 text-sm outline-none transition-colors focus:border-primary"
        />
        <div className="flex flex-wrap gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              aria-pressed={categoriaSeleccionada === categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`border px-3 py-2 font-display text-xs uppercase tracking-[0.15em] transition-colors ${
                categoriaSeleccionada === categoria
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>

      <div className="vocabulary-grid mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {terminosFiltrados.map((termino) => (
          <Link
            key={termino.slug}
            to="/vocabulario/$slug"
            params={{ slug: termino.slug }}
            className="vocabulary-card group grid grid-cols-[7.25rem_1fr] gap-4 border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-card"
          >
            <TechniqueVisual
              label={termino.romanizacion}
              category={termino.categoria}
              technique={termino.slug}
              compact
            />
            <div className="min-w-0 self-center">
              <p className="text-xl text-primary">{termino.hangul}</p>
              <h2 className="mt-2 font-display text-lg uppercase group-hover:text-primary">
                {termino.romanizacion}
              </h2>
              <p className="text-sm text-muted-foreground">
                {termino.significado}
              </p>
              <p className="mt-3 text-[10px] uppercase text-muted-foreground/70">
                {termino.categoria} · Ver ficha →
              </p>
            </div>
          </Link>
        ))}
      </div>
      {terminosFiltrados.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">Sin resultados.</p>
      )}

      <section className="mt-16 border border-border bg-card/50 p-8">
        <p className="eyebrow">Fuentes oficiales</p>
        <h2 className="mt-3 text-3xl uppercase">Amplía el tema</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            [
              "Kukkiwon",
              "Terminología y currículo técnico oficial.",
              "http://www.kukkiwon.or.kr/front/eng/main.action",
            ],
            [
              "World Taekwondo",
              "Reglamento de competencia y arbitraje.",
              "https://www.worldtaekwondo.org/",
            ],
            [
              "Fedetaekwondo Colombia",
              "Federación Colombiana de Taekwondo.",
              "https://fedetaekwondo.com/",
            ],
          ].map(([t, d, href]) => (
            <a
              key={t}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group border border-border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
            >
              <h3 className="text-lg uppercase group-hover:text-primary">
                {t}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              <span className="mt-4 block font-display text-xs uppercase tracking-[0.2em] text-primary">
                Visitar →
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
