import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTermino, terminos } from "@/data/vocabularioData";
import { TechniqueVisual } from "@/components/taekwondo/TechniqueVisual";
import { createPageTitle } from "@/utils/pageTitle";

export const Route = createFileRoute("/vocabulario/$slug")({
  loader: ({ params }) => {
    const termino = getTermino(params.slug);
    if (!termino) throw notFound();
    return { termino };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: createPageTitle("Término no encontrado") },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { termino } = loaderData;
    const title = createPageTitle(termino.romanizacion);
    return {
      meta: [
        { title },
        { name: "description", content: termino.descripcion.slice(0, 155) },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: termino.descripcion.slice(0, 155),
        },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: TerminoNoEncontrado,
  component: TerminoDetalle,
});

function TerminoNoEncontrado() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="text-4xl uppercase">Término no encontrado</h1>
      <Link to="/vocabulario" className="mt-6 inline-block text-primary">
        ← Volver al vocabulario
      </Link>
    </div>
  );
}

function TerminoDetalle() {
  const { termino } = Route.useLoaderData();
  const relacionados = terminos
    .filter(
      (otroTermino) =>
        otroTermino.categoria === termino.categoria &&
        otroTermino.slug !== termino.slug,
    )
    .slice(0, 6);
  const busqueda = `taekwondo ${termino.romanizacion} ${termino.significado}`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
      <Link
        to="/vocabulario"
        className="font-display text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
      >
        ← Vocabulario
      </Link>

      <p className="eyebrow reveal mt-8">{termino.categoria}</p>
      <p className="reveal mt-4 text-5xl text-primary">{termino.hangul}</p>
      <h1 className="reveal mt-3 text-4xl uppercase leading-[0.95] sm:text-5xl">
        {termino.romanizacion}
      </h1>
      <p className="reveal mt-3 text-xl text-muted-foreground">
        {termino.significado}
      </p>

      <div className="reveal mt-8">
        <TechniqueVisual
          label={termino.romanizacion}
          category={termino.categoria}
          technique={termino.slug}
        />
      </div>

      <section className="reveal mt-12 border-l-2 border-primary pl-6">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary">
          De qué se trata
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          {termino.descripcion}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary">
          Cómo se hace
        </h2>
        <ol className="mt-5 divide-y divide-border border-y border-border">
          {termino.pasos.map((paso, indice) => (
            <li
              key={paso}
              className="flex gap-5 py-4 transition-[padding] duration-300 hover:pl-3"
            >
              <span className="font-display text-lg text-primary">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-muted-foreground">{paso}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary">
          Video
        </h2>
        {termino.idVideo ? (
          <div className="mt-5 aspect-video w-full border border-border">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${termino.idVideo}`}
              title={`Video de ${termino.romanizacion}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(busqueda)}`}
            target="_blank"
            rel="noreferrer"
            className="group mt-5 block border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
          >
            <p className="text-lg uppercase group-hover:text-primary">
              Ver demostraciones de {termino.romanizacion}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Abre videos de referencia en YouTube para observar la ejecución
              real de la técnica.
            </p>
            <span className="mt-4 block font-display text-xs uppercase tracking-[0.2em] text-primary">
              Ver en YouTube →
            </span>
          </a>
        )}
      </section>

      {relacionados.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-sm uppercase tracking-[0.2em] text-primary">
            Relacionados · {termino.categoria}
          </h2>
          <div className="mt-5 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((r) => (
              <Link
                key={r.slug}
                to="/vocabulario/$slug"
                params={{ slug: r.slug }}
                className="bg-background p-5 transition-colors hover:bg-card"
              >
                <p className="text-lg text-primary">{r.hangul}</p>
                <p className="mt-1 font-display uppercase tracking-[0.1em]">
                  {r.romanizacion}
                </p>
                <p className="text-sm text-muted-foreground">{r.significado}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
