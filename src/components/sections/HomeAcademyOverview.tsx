import { Link } from "@tanstack/react-router";

const nativeNumbers = [
  ["하나", "Hana", "1"],
  ["둘", "Dul", "2"],
  ["셋", "Set", "3"],
  ["넷", "Net", "4"],
  ["다섯", "Daseot", "5"],
  ["여섯", "Yeoseot", "6"],
  ["일곱", "Ilgop", "7"],
  ["여덟", "Yeodeol", "8"],
  ["아홉", "Ahop", "9"],
  ["열", "Yeol", "10"],
];

const sinoNumbers = [
  ["일", "Il", "1"],
  ["이", "I", "2"],
  ["삼", "Sam", "3"],
  ["사", "Sa", "4"],
  ["오", "O", "5"],
  ["육", "Yuk", "6"],
  ["칠", "Chil", "7"],
  ["팔", "Pal", "8"],
  ["구", "Gu", "9"],
  ["십", "Sip", "10"],
];

export function HomeAcademyOverview() {
  return (
    <section id="academia" className="academy-overview border-b border-border">
      <div className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8 sm:py-28 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow">06 — Academia Equilibrio</p>
            <h2 className="mt-3 text-4xl uppercase sm:text-6xl">
              Aprende el
              <span className="text-primary"> Taekwondo.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Una ruta de estudio que separa formas, técnicas y cultura para que
            cada alumno encuentre el contenido adecuado a su momento.
          </p>
        </div>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-3">
          {[
            ["Poomsae", "Secuencias organizadas de ataque y defensa para desarrollar coordinación, equilibrio, concentración y precisión.", "/poomsae"],
            ["Técnicas de brazo", "Bloqueos, golpes y defensas organizados con el material audiovisual disponible en el club.", "/poomsae#tecnicas-academia"],
            ["Técnicas de pie y piso", "Patadas, movilidad y trabajo corporal con enfoque progresivo, deportivo y seguro.", "/poomsae#tecnicas-academia"],
          ].map(([title, detail, href]) => (
            <a key={title} href={href} className="group bg-background p-6 transition-colors hover:bg-card sm:p-8">
              <span className="font-display text-xs text-primary">01 / ACADEMIA</span>
              <h3 className="mt-8 text-2xl uppercase transition-colors group-hover:text-primary">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{detail}</p>
            </a>
          ))}
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">El idioma del Taekwondo</p>
            <h3 className="mt-3 text-3xl uppercase">Hangul y conteo</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              El Hangul fue creado durante el siglo XV bajo el rey Sejong el
              Grande. En el dojang conviven el sistema nativo para contar
              repeticiones y el sino-coreano para fechas y cantidades.
            </p>
            <Link to="/vocabulario" className="mt-6 inline-flex border border-primary px-4 py-3 font-display text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary hover:text-primary-foreground">
              Explorar vocabulario
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ["Nativo", nativeNumbers],
              ["Sino-coreano", sinoNumbers],
            ].map(([title, numbers]) => (
              <div key={title as string} className="border border-border bg-card/40 p-5">
                <h4 className="font-display text-sm uppercase text-primary">{title as string}</h4>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(numbers as string[][]).map(([hangul, romanization, number]) => (
                    <div key={`${title}-${number}`} className="border border-border/70 bg-background p-2">
                      <span className="text-lg">{hangul}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{romanization}</span>
                      <span className="mt-1 block font-display text-[0.65rem] text-primary">{number}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
