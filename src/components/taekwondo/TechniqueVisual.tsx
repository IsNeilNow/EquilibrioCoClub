import { lazy, Suspense } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CircleDot,
  CircleStop,
  Crosshair,
  Footprints,
  Hash,
  Hand,
  HeartPulse,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  ScanFace,
  ScanLine,
  Shield,
  Square,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { ITechniqueVisualProps } from "@/interfaces/ITaekwondo";
import { cn } from "@/lib/utils";

const TechniqueScene3D = lazy(() =>
  import("@/components/taekwondo/TechniqueScene3d").then((module) => ({
    default: module.TechniqueScene3D,
  })),
);

type VocabularyMotion =
  | "kick"
  | "block"
  | "strike"
  | "stance"
  | "bow"
  | "turn"
  | "ready"
  | "stop"
  | "reset"
  | "rest"
  | "continue"
  | "count";

function motionFor(label: string, category?: string): VocabularyMotion {
  const value = `${label} ${category ?? ""}`.toLowerCase();
  if (/conteo|nativo|sino-coreano|número/.test(value)) return "count";
  if (/charyeot|kyeong|saludo|respeto/.test(value)) return "bow";
  if (/junbi|preparado|sijak|comenzar/.test(value)) return "ready";
  if (/geuman|kalyeo|alto|terminar/.test(value)) return "stop";
  if (/baro|volver|inicial/.test(value)) return "reset";
  if (/swieo|descanso/.test(value)) return "rest";
  if (/kyesok|continuar/.test(value)) return "continue";
  if (/dora|girar/.test(value)) return "turn";
  if (/chagi|patada/.test(value)) return "kick";
  if (/makki|defensa/.test(value)) return "block";
  if (/jireugi|chigi|golpe/.test(value)) return "strike";
  if (/seogi|posición/.test(value)) return "stance";
  return "ready";
}

function VocabularySymbol({
  motion,
  technique,
}: {
  motion: VocabularyMotion;
  technique: string;
}) {
  const symbols: Record<VocabularyMotion, { icon: LucideIcon; caption: string; color: string }> = {
    kick: { icon: Footprints, caption: "patada", color: "red" },
    block: { icon: Shield, caption: "defensa", color: "blue" },
    strike: { icon: Hand, caption: "puño", color: "gold" },
    stance: { icon: CircleDot, caption: "posición", color: "green" },
    bow: { icon: HeartPulse, caption: "respeto", color: "violet" },
    turn: { icon: RotateCw, caption: "giro", color: "orange" },
    ready: { icon: Play, caption: "comenzar", color: "green" },
    stop: { icon: Square, caption: "detener", color: "red" },
    reset: { icon: RotateCcw, caption: "regresar", color: "blue" },
    rest: { icon: Pause, caption: "descanso", color: "gold" },
    continue: { icon: Wind, caption: "continuar", color: "violet" },
    count: { icon: Hash, caption: "conteo", color: "blue" },
  };
  const uniqueSymbols: Record<string, { icon: LucideIcon; caption: string; color: string }> = {
    charyeot: { icon: ScanFace, caption: "alinear", color: "violet" },
    "kyeong-nye": { icon: HeartPulse, caption: "reverencia", color: "violet" },
    junbi: { icon: Shield, caption: "listo", color: "green" },
    sijak: { icon: Play, caption: "iniciar", color: "green" },
    geuman: { icon: CircleStop, caption: "alto", color: "red" },
    baro: { icon: RotateCcw, caption: "volver", color: "blue" },
    swieo: { icon: Pause, caption: "descansar", color: "gold" },
    dora: { icon: RotateCw, caption: "girar", color: "orange" },
    kyesok: { icon: ArrowRight, caption: "seguir", color: "violet" },
    kalyeo: { icon: ArrowLeft, caption: "separar", color: "blue" },
    "juchum-seogi": { icon: CircleDot, caption: "jinete", color: "green" },
    "ap-seogi": { icon: ArrowRight, caption: "paso corto", color: "green" },
    "ap-kubi": { icon: ArrowDown, caption: "base frontal", color: "green" },
    "dwit-kubi": { icon: ArrowLeft, caption: "base atrás", color: "blue" },
    "moa-seogi": { icon: CircleDot, caption: "pies juntos", color: "gold" },
    "beom-seogi": { icon: Crosshair, caption: "tigre", color: "orange" },
    "hakdari-seogi": { icon: ArrowUp, caption: "equilibrio", color: "violet" },
    "ap-chagi": { icon: ArrowUp, caption: "frontal", color: "red" },
    "dollyo-chagi": { icon: RotateCw, caption: "circular", color: "orange" },
    "yeop-chagi": { icon: ArrowRight, caption: "lateral", color: "red" },
    "dwit-chagi": { icon: ArrowLeft, caption: "atrás", color: "blue" },
    "naeryeo-chagi": { icon: ArrowDown, caption: "descendente", color: "gold" },
    "huryeo-chagi": { icon: RotateCcw, caption: "gancho", color: "violet" },
    "twio-chagi": { icon: ArrowUp, caption: "salto", color: "green" },
    "mireo-chagi": { icon: ArrowRight, caption: "empuje", color: "red" },
    "arae-makki": { icon: ArrowDown, caption: "baja", color: "blue" },
    "momtong-makki": { icon: Shield, caption: "media", color: "green" },
    "eolgul-makki": { icon: ArrowUp, caption: "alta", color: "gold" },
    "hansonnal-makki": { icon: Hand, caption: "mano abierta", color: "violet" },
    jireugi: { icon: Crosshair, caption: "recto", color: "red" },
    chigi: { icon: RotateCw, caption: "percusión", color: "orange" },
    chireugi: { icon: ArrowRight, caption: "punta", color: "red" },
    dojang: { icon: CircleDot, caption: "espacio", color: "blue" },
    dobok: { icon: Shield, caption: "uniforme", color: "green" },
    ti: { icon: Wind, caption: "grado", color: "gold" },
    sabeomnim: { icon: HeartPulse, caption: "maestro", color: "violet" },
    kwanjangnim: { icon: Crosshair, caption: "director", color: "orange" },
    poomsae: { icon: RotateCw, caption: "forma", color: "red" },
    kyorugi: { icon: Shield, caption: "combate", color: "blue" },
    kyokpa: { icon: Square, caption: "rotura", color: "gold" },
    kamsahamnida: { icon: HeartPulse, caption: "gracias", color: "violet" },
  };
  const item = uniqueSymbols[technique] ?? symbols[motion];
  const Icon = item.icon;
  const countValue: Record<string, string> = {
    hana: "1",
    dul: "2",
    set: "3",
    net: "4",
    daseot: "5",
    yeoseot: "6",
    ilgop: "7",
    yeodeol: "8",
    ahop: "9",
    yeol: "10",
  };

  return (
    <span className={`technique-visual__vocab-symbol technique-visual__vocab-symbol--${item.color}`}>
      {motion === "count" ? (
        <strong className="technique-visual__count-number">{countValue[technique] ?? "0"}</strong>
      ) : (
        <Icon aria-hidden="true" />
      )}
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
          <VocabularySymbol motion={motion} technique={techniqueId} />
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
      {!compact && (
        <>
          <span className="pointer-events-none absolute left-3 top-3 z-10 flex items-center gap-1.5 font-display text-[10px] uppercase text-muted-foreground">
            <ScanLine className="h-3 w-3 text-primary" aria-hidden /> Articulación 3D
          </span>
          <span className="pointer-events-none absolute bottom-3 right-3 z-10 max-w-[70%] truncate font-display text-[10px] uppercase text-muted-foreground">
            {label}
          </span>
        </>
      )}
    </div>
  );
}
