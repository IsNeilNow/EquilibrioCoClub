import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/taekwondo/ThemeToggle";
import { EquilibrioMark } from "@/components/taekwondo/EquilibrioMark";

const links = [
  { to: "/", label: "Taekwondo" },
  { to: "/fundacion", label: "Fundación" },
  { to: "/vocabulario", label: "Vocabulario" },
  { to: "/poomsae", label: "Poomsae" },
  { to: "/logros", label: "Logros" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[90rem] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Link to="/" className="group flex items-center gap-3">
          <EquilibrioMark />
          <span className="font-display text-xl uppercase tracking-[0.3em]">
            Equilibrio
          </span>
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "!text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex flex-col gap-1.5 border border-border"
          >
            <span className="block h-px w-4 bg-foreground" />
            <span className="block h-px w-4 bg-foreground" />
          </Button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col border-t border-border lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="border-b border-border/60 px-5 py-3 font-display text-sm uppercase tracking-[0.2em] text-muted-foreground"
              activeProps={{ className: "!text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-[90rem] gap-8 px-6 py-12 sm:grid-cols-3 sm:px-8 sm:py-14 lg:px-10">
        <div>
          <h3 className="text-2xl uppercase tracking-[0.2em]">Equilibrio</h3>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Fundación deportiva de Colombia dedicada a la formación integral a
            través del Taekwondo.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="eyebrow mb-3">Contacto</p>
          <p>Medellín, Colombia</p>
          <p>CRR 77B #53-26</p>
          <p>4216611</p>
          <a className="mt-2 block hover:text-foreground" href="mailto:equilibrioartesmarciales@gmail.com">
            equilibrioartesmarciales@gmail.com
          </a>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="eyebrow mb-3">Referencias</p>
          <a
            className="block hover:text-foreground"
            href="https://www.worldtaekwondo.org/"
            target="_blank"
            rel="noreferrer"
          >
            World Taekwondo
          </a>
          <a
            className="block hover:text-foreground"
            href="http://www.kukkiwon.or.kr/front/eng/main.action"
            target="_blank"
            rel="noreferrer"
          >
            Kukkiwon
          </a>
          <a
            className="block hover:text-foreground"
            href="https://fedetaekwondo.com/"
            target="_blank"
            rel="noreferrer"
          >
            Fedetaekwondo Colombia
          </a>
        </div>
      </div>
      <p className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Fundación Deportiva Equilibrio
      </p>
    </footer>
  );
}
