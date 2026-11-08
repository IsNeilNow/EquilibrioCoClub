import { lazy, Suspense } from "react";
import {
  ArrowUpRight,
  CircleDot,
  Footprints,
  Hand,
  HeartPulse,
  RotateCw,
  ScanLine,
  Shield,
  Wind,
} from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { ITechniqueVisualProps } from "@/interfaces/ITaekwondo";
import { cn } from "@/lib/utils";

const TechniqueScene3D = lazy(() =>
  import("@/components/taekwondo/TechniqueScene3d").then((module) => ({
    default: module.TechniqueScene3D,
  })),
);

function motionFor(label: string, category?: string) {
  const value = `${label} ${category ?? ""}`.toLowerCase();
  if (/chagi|patada/.test(value)) return "kick";
  if (/makki|defensa/.test(value)) return "block";
  if (/jireugi|chigi|golpe/.test(value)) return "strike";
  if (/seogi|posición/.test(value)) return "stance";
  if (/kyeong|saludo/.test(value)) return "bow";
  if (/dora|girar/.test(value)) return "turn";
  return "ready";
}

function VocabularySymbol({ motion }: { motion: string }) {
  const symbols = {
    kick: { icon: Footprints, caption: "pie" },
    block: { icon: Shield, caption: "defensa" },
    strike: { icon: Hand, caption: "puño" },
    stance: { icon: CircleDot, caption: "base" },
    bow: { icon: HeartPulse, caption: "respeto" },
    turn: { icon: RotateCw, caption: "giro" },
    ready: { icon: Wind, caption: "flujo" },
  } as const;
  const item = symbols[motion as keyof typeof symbols] ?? symbols.ready;
  const Icon = item.icon;

  return (
    <span className="technique-visual__vocab-symbol">
      <Icon aria-hidden="true" />
      <small>{item.caption}</small>
    </span>
  );
}

export function TechniqueVisual({
  label,
  compact = false,
  category,
  technique,
}: ITechniqueVisualProps) {
  const motion = motionFor(label, category);
  const techniqueId = technique ?? label.toLowerCase().replaceAll(" ", "-");
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "technique-visual relative isolate overflow-hidden border border-border bg-muted/40",
        compact ? "h-28 w-full" : "aspect-video w-full",
      )}
      role="img"
      aria-label={
        compact
          ? `Símbolo de ${label}. Abre la ficha para ver la animación.`
          : `Demostración animada de ${label}`
      }
      data-motion={motion}
      data-technique={techniqueId}
    >
      {compact ? (
        <div className="technique-visual__symbol" aria-hidden="true">
          <VocabularySymbol motion={motion} />
          <ArrowUpRight className="h-4 w-4" />
        </div>
      ) : isInView ? (
        <Suspense
          fallback={
            <div className="absolute inset-0 animate-pulse bg-muted/40" />
          }
        >
          <TechniqueScene3D technique={techniqueId} compact={compact} />
        </Suspense>
      ) : null}
      <span className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 font-display text-[10px] uppercase text-muted-foreground">
        {compact ? "Símbolo" : <><ScanLine className="h-3 w-3 text-primary" aria-hidden /> Articulación 3D</>}
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 z-10 max-w-[70%] truncate font-display text-[10px] uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
