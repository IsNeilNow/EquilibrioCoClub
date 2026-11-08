import { useState } from "react";

type VideoCategory = "paz" | "todos" | "femenina";

const activities = [
  ["01", "Intercambios", "Entrenamientos grupales con otros clubes para compartir conocimientos y experiencias."],
  ["02", "Torneos", "Participación anual en torneos de Taekwondo e Intercolegiados."],
  ["03", "Entrenamientos", "Clases de formación los martes, miércoles y sábados."],
  ["04", "Artes Marciales por la Paz", "Iniciativa deportiva y social que el club participa y promueve."],
  ["05", "Acompañamiento psicológico", "Apoyo psicológico para los integrantes de la corporación."],
  ["06", "Liderazgo", "Formación de personas íntegras con valores y enseñanzas para la vida."],
  ["07", "Crecimiento personal", "Talleres cada dos meses orientados por el psicólogo."],
];

const schedule = [
  ["Martes", "6:40 p. m. – 7:40 p. m.", "Niños"],
  ["Martes", "7:40 p. m. – 9:00 p. m.", "Avanzados"],
  ["Miércoles", "6:15 p. m. – 7:40 p. m.", "Niños"],
  ["Miércoles", "7:40 p. m. – 8:30 p. m.", "Avanzados"],
  ["Sábados", "8:00 a. m. – 10:00 a. m.", "Avanzados"],
  ["Sábados", "10:00 a. m. – 11:00 a. m.", "Niños"],
  ["Sábados", "11:00 a. m. – 1:00 p. m.", "Avanzados"],
];

const videos: { category: VideoCategory; title: string; id: string; description: string }[] = [
  { category: "paz", title: "Artes Marciales por la Paz I", id: "L_d6ukP4xPE", description: "Actividad deportiva y social del club." },
  { category: "paz", title: "Artes Marciales por la Paz II", id: "MvcGdwXTsMU", description: "Encuentro y formación a través del movimiento." },
  { category: "paz", title: "Artes Marciales por la Paz III", id: "AnpFferFjDc", description: "El deporte como espacio de convivencia." },
  { category: "todos", title: "Artes Marciales para Todos", id: "kjMV3Z7InZY", description: "Una práctica abierta a la comunidad." },
  { category: "femenina", title: "Defensa Personal Femenina", id: "Sw40sLAyX4o", description: "Fortaleza, prevención y autonomía." },
];

export function ClubProgram() {
  const [category, setCategory] = useState<VideoCategory>("paz");
  const filteredVideos = videos.filter((video) => video.category === category);

  return (
    <>
      <section id="club" className="club-program border-y border-border bg-card/30">
        <div className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">04 — Club Equilibrio</p>
              <h2 className="mt-3 text-4xl uppercase sm:text-6xl">
                Del débil, <span className="text-primary">fuerte.</span>
                <br />
                Del fuerte, <span className="text-primary">noble.</span>
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Somos una asociación deportiva de derecho privado, sin ánimo de
              lucro, fundada el 12 de junio de 2009 por Nelson Andrés Pérez
              Zuluaga. Usamos las artes marciales para formar personas
              integrales: física, mental, emocional y socialmente.
            </p>
          </div>
          <div className="mt-12 grid gap-px bg-border md:grid-cols-3">
            {[
              ["Misión", "Potencializar las capacidades psicosociales y emocionales mediante valores, disciplina y respeto."],
              ["Visión", "Formar líderes, aprovechar el tiempo libre y brindar un entorno sano y libre de costos."],
              ["Comunidad", "Sin importar edad, capacidad, género, estrato social o discapacidad."],
            ].map(([title, detail]) => (
              <article key={title} className="bg-background p-6 sm:p-8">
                <h3 className="font-display text-xl uppercase text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-16">
            <p className="eyebrow">Nuestras actividades</p>
            <div className="mt-6 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              {activities.map(([number, title, detail]) => (
                <article key={title} className="club-program__activity group bg-background p-5 transition-transform duration-300 hover:-translate-y-1">
                  <span className="font-display text-xs text-primary">{number}</span>
                  <h3 className="mt-8 text-lg uppercase">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">Cronograma semanal</p>
              <div className="mt-5 overflow-x-auto border border-border">
                <table className="w-full min-w-[34rem] text-left text-sm">
                  <thead className="bg-card font-display text-xs uppercase tracking-[0.15em] text-primary">
                    <tr><th className="p-4">Día</th><th className="p-4">Horario</th><th className="p-4">Grupo</th></tr>
                  </thead>
                  <tbody>
                    {schedule.map(([day, time, group]) => (
                      <tr key={`${day}-${time}`} className="border-t border-border/70">
                        <td className="p-4">{day}</td><td className="p-4 text-muted-foreground">{time}</td><td className="p-4 text-muted-foreground">{group}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <p className="eyebrow">Datos del plan deportivo</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>Entrenamientos semestrales: 72 días.</li>
                <li>Intercolegiados: anualmente, en julio.</li>
                <li>Talleres de crecimiento personal: cada dos meses.</li>
                <li>Intercambios con otros clubes: cuatro veces al año.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="accion" className="club-videos border-b border-border">
        <div className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8 lg:px-10">
          <p className="eyebrow">05 — Equilibrio en acción</p>
          <h2 className="mt-3 text-4xl uppercase sm:text-5xl">Galería audiovisual</h2>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Categorías de videos">
            {[
              ["paz", "Artes Marciales por la Paz"],
              ["todos", "Artes Marciales para Todos"],
              ["femenina", "Defensa Personal Femenina"],
            ].map(([value, label]) => (
              <button key={value} type="button" role="tab" aria-selected={value === category} onClick={() => setCategory(value as VideoCategory)} className="border border-border px-4 py-3 font-display text-xs uppercase tracking-[0.1em] transition-colors hover:border-primary aria-selected:border-primary">
                {label}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <article key={video.id} className="overflow-hidden border border-border bg-card">
                <div className="aspect-video bg-black">
                  <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${video.id}`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
                <div className="p-5"><h3 className="uppercase">{video.title}</h3><p className="mt-2 text-sm text-muted-foreground">{video.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
