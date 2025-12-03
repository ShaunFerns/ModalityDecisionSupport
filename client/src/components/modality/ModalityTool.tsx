import React, { useState, useEffect } from "react";
import { ModuleIdentityCard } from "./ModuleIdentityCard";
import { QuickInputs } from "./QuickInputs";
import { Visualizations } from "./Visualizations";
import { SummaryCard } from "./SummaryCard";
import { initialModalityState, scoreModality, ModalityState, ScoreResult } from "@/lib/scoring";

export function ModalityTool() {
  const [state, setState] = useState<ModalityState>(initialModalityState);
  const [scores, setScores] = useState<ScoreResult>(scoreModality(initialModalityState));

  // Recalculate scores whenever state changes
  useEffect(() => {
    const newScores = scoreModality(state);
    setScores(newScores);
  }, [state]);

  const handleStateChange = (updates: Partial<ModalityState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 font-sans text-foreground">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
          Modality Decision Support Tool (MDST)
        </h1>
        <p className="text-muted-foreground mt-2">
          Evidence-based support for determining module delivery modality across In-Person, Blended, Online, and HyFlex formats.
        </p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs (Panel A & B) */}
        <div className="lg:col-span-7 space-y-8">
          <section>
            <ModuleIdentityCard state={state} onChange={handleStateChange} />
          </section>
          
          <section>
            <h2 className="text-lg font-bold text-primary uppercase tracking-wide mb-4 border-l-4 border-primary pl-3">
              Panel B: Quick Inputs
            </h2>
            <QuickInputs state={state} onChange={handleStateChange} />
          </section>
        </div>

        {/* Right Column: Visualizations (Sticky) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="lg:sticky lg:top-8 space-y-6">
             <h2 className="text-lg font-bold text-primary uppercase tracking-wide mb-4 border-l-4 border-primary pl-3">
              Real-time Analysis
            </h2>
            <Visualizations scores={scores} state={state} />
          </div>
        </div>
      </main>

      {/* Bottom: Summary Card */}
      <section className="mt-12">
        <SummaryCard scores={scores} />
      </section>
    </div>
  );
}
