import { createFileRoute } from "@tanstack/react-router";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/logros")({
  head: () => ({
    meta: [
      { title: createPageTitle("Logros") },
      {
        name: "description",
        content:
          "Palmarés documentado de la Fundación Deportiva Equilibrio: resultados verificados de alumnos y maestros.",
      },
      {
        property: "og:title",
        content: "Logros de Alumnos y Maestros | Equilibrio",
      },
      {
        property: "og:description",
        content: "Medallas, títulos y ascensos de la Fundación Equilibrio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Logros,
});

type Logro = {
  id: string;
  anio: string;
  titulo: string;
  persona: string;
  categoria: string;
  detalle: string;
};

const iniciales: Logro[] = [];

function Logros() {
  const logros = iniciales;

  return (
    <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8 sm:py-20 lg:px-10">
      <p className="eyebrow reveal">Palmarés</p>
      <h1 className="reveal mt-4 text-5xl uppercase leading-[0.95]">
        Logros de <span className="text-primary">alumnos y maestros</span>
      </h1>
      <p className="reveal mt-5 max-w-2xl text-muted-foreground">
        Cada logro publicado debe corresponder a un resultado verificado por el
        Club Equilibrio. Esta sección se actualizará cuando exista información
        institucional documentada.
      </p>

      <div className="mt-12 space-y-px bg-border">
        {logros.length === 0 && (
          <p className="bg-background p-6 text-sm text-muted-foreground">
            Aún no hay logros documentados.
          </p>
        )}
        {logros.map((l) => (
          <article
            key={l.id}
            className="group grid gap-4 bg-background p-6 transition-colors duration-300 hover:bg-card sm:grid-cols-[90px_1fr_auto]"
          >
            <p className="font-display text-3xl text-primary">{l.anio}</p>
            <div>
              <h2 className="text-xl uppercase">{l.titulo}</h2>
              <p className="mt-1 text-sm text-primary">{l.persona}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l.detalle}</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="border border-border px-3 py-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {l.categoria}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
