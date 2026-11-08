import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { paises } from "@/data/home";
import type { IPais } from "@/interfaces/IPais";

const featuredCountries = ["co", "kr", "mx"]
  .map((id) => paises.find((country) => country.id === id))
  .filter((country) => country !== undefined);

export function HomeCountriesSection() {
  const [pais, setPais] = useState<IPais>(featuredCountries[0]!);

  function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = featuredCountries.length - 1;
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = lastIndex;
    } else {
      return;
    }
    event.preventDefault();
    setPais(featuredCountries[nextIndex]!);
    const tabs =
      event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]',
      );
    tabs?.[nextIndex]?.focus();
  }

  return (
    <section
      className="relative isolate overflow-hidden border-y border-border bg-card/40"
      data-home-scene="world"
    >
      <div className="relative mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
        <p className="eyebrow">08 — Colombia y el mundo</p>
        <h2 className="mt-3 text-4xl uppercase">El Taekwondo en el mundo</h2>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          Selecciona un país y descubre cómo llegó y cómo se estableció el
          Taekwondo allí.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <div
            role="tablist"
            aria-label="Países con historia de Taekwondo"
            className="flex flex-wrap gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {featuredCountries.map((country, index) => (
              <button
                key={country.id}
                onClick={() => setPais(country)}
                onKeyDown={(event) => navigateTabs(event, index)}
                id={`country-tab-${country.id}`}
                role="tab"
                aria-selected={pais.id === country.id}
                aria-controls={`country-panel-${country.id}`}
                tabIndex={pais.id === country.id ? 0 : -1}
                style={
                  {
                    "--flag-a": country.colores[0],
                    "--flag-b": country.colores[1],
                    "--flag-c": country.colores[2],
                  } as CSSProperties
                }
                className={`country-tab grid min-w-36 grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border px-4 py-3 text-left font-display text-sm uppercase transition-all duration-300 lg:min-w-0 ${
                  pais.id === country.id
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                <span className="text-xl">{country.bandera}</span>
                <span className="min-w-0 truncate">{country.nombre}</span>
              </button>
            ))}
          </div>

          <article
            key={pais.id}
            id={`country-panel-${pais.id}`}
            role="tabpanel"
            aria-labelledby={`country-tab-${pais.id}`}
            className="country-panel reveal relative overflow-hidden border border-border bg-background p-6 sm:p-8"
            style={
              {
                "--flag-a": pais.colores[0],
                "--flag-b": pais.colores[1],
                "--flag-c": pais.colores[2],
              } as CSSProperties
            }
          >
            <div className="country-panel__flag" aria-hidden="true" />
            <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="flex min-w-0 items-center gap-4">
                <span className="text-4xl">{pais.bandera}</span>
                <h3 className="min-w-0 text-3xl uppercase">{pais.nombre}</h3>
              </div>
              <span className="font-display text-primary">
                desde {pais.desde}
              </span>
            </div>
            <p className="relative mt-6 text-muted-foreground">{pais.historia}</p>
            <div className="relative mt-8 grid gap-px bg-border sm:grid-cols-3">
              {[
                ["Legado", pais.legado],
                ["Enfoque", pais.enfoque],
                ["Referencia", pais.figura],
              ].map(([title, description]) => (
                <div key={title} className="bg-background p-4">
                  <span className="eyebrow">{title}</span>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>
            <ul className="mt-8 space-y-3 border-t border-border pt-6">
              {pais.hitos.map((milestone) => (
                <li key={milestone} className="flex gap-3 text-sm">
                  <span className="mt-2 block h-px w-6 shrink-0 bg-primary" />
                  <span className="text-muted-foreground">{milestone}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
