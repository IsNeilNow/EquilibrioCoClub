import { type ReactNode, useState } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { BreakingBoardIntro } from "@/components/intro/BreakingBoardIntro";
import { PunchInteractionLayer } from "@/features/punch-interaction/components/PunchInteractionLayer";
import { usePunchInteraction } from "@/features/punch-interaction/hooks/usePunchInteraction";
import { RouteExperience } from "@/components/taekwondo/RouteExperience";

interface AppProps {
  queryClient: QueryClient;
  children: ReactNode;
}

export function App({ queryClient, children }: AppProps) {
  const punchInteraction = usePunchInteraction();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {showIntro && (
        <BreakingBoardIntro
          onBreak={() => undefined}
          onEnter={() => setShowIntro(false)}
        />
      )}
      <div
        className={`app-content ${
          showIntro ? "app-content--intro" : "app-content--revealing"
        }`}
        onPointerMove={punchInteraction.onPointerMove}
        onPointerLeave={punchInteraction.onPointerLeave}
        onPointerDown={punchInteraction.onPointerDown}
      >
        <SiteNav />
        <main>
          <RouteExperience>{children}</RouteExperience>
        </main>
        <SiteFooter />
      </div>
      <PunchInteractionLayer
        impacts={punchInteraction.impacts}
        cursorRef={punchInteraction.cursorRef}
        onImpactEnd={punchInteraction.removeImpact}
      />
    </QueryClientProvider>
  );
}
