import { type ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { PunchInteractionLayer } from "@/features/punch-interaction/components/PunchInteractionLayer";
import { usePunchInteraction } from "@/features/punch-interaction/hooks/usePunchInteraction";
import { RouteExperience } from "@/components/taekwondo/RouteExperience";

interface AppProps {
  queryClient: QueryClient;
  children: ReactNode;
}

export function App({ queryClient, children }: AppProps) {
  const punchInteraction = usePunchInteraction();

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="app-content"
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
