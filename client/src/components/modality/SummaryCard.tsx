import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreResult } from "@/lib/scoring";
import { AlertTriangle, CheckCircle, Download, FileText, AlertOctagon } from "lucide-react";

interface Props {
  scores: ScoreResult;
}

export function SummaryCard({ scores }: Props) {
  return (
    <Card className="border-t-4 border-t-green-600 shadow-lg mt-8 bg-slate-50">
      <CardHeader className="pb-2 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold text-foreground">Modality Decision Summary</CardTitle>
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" /> Export PDF
             </Button>
             <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" /> Save JSON
             </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 grid md:grid-cols-3 gap-6">
        
        {/* Recommendation Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Recommendation</h3>
          <div className="p-4 bg-white border rounded-lg shadow-sm">
            <div className="text-3xl font-black text-primary mb-1">{scores.recommendation}</div>
            <div className="text-sm text-muted-foreground">
              Based on highest fit score ({Math.max(scores.in_person, scores.blended, scores.online, scores.hyflex)}/100)
            </div>
            
            {scores.recommendation === 'HyFlex' && scores.hyflex < 60 && (
               <div className="mt-2 flex items-start gap-2 text-amber-600 text-xs bg-amber-50 p-2 rounded">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>Caution: HyFlex score is low despite being top rank. Review constraints.</span>
               </div>
            )}
          </div>

           <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white p-2 rounded border">
                 <div className="text-xs text-muted-foreground">In-Person</div>
                 <div className="font-bold">{scores.in_person}</div>
              </div>
              <div className="bg-white p-2 rounded border">
                 <div className="text-xs text-muted-foreground">Blended</div>
                 <div className="font-bold">{scores.blended}</div>
              </div>
              <div className="bg-white p-2 rounded border">
                 <div className="text-xs text-muted-foreground">Online</div>
                 <div className="font-bold">{scores.online}</div>
              </div>
              <div className="bg-white p-2 rounded border">
                 <div className="text-xs text-muted-foreground">HyFlex</div>
                 <div className="font-bold">{scores.hyflex}</div>
              </div>
           </div>
        </div>

        {/* Rationale Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Strongest Factors</h3>
          <div className="space-y-2">
             {scores.strongestFactors.length > 0 ? (
                scores.strongestFactors.map((factor, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-green-50 text-green-800 rounded-md border border-green-100 text-sm">
                     <CheckCircle className="h-4 w-4 text-green-600" />
                     {factor}
                  </div>
                ))
             ) : (
               <div className="text-sm text-muted-foreground italic">No dominant factors identified.</div>
             )}
          </div>
        </div>

        {/* Risks Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Risks & Considerations</h3>
          <div className="space-y-2">
             {scores.risks.length > 0 ? (
                scores.risks.map((risk, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-red-50 text-red-800 rounded-md border border-red-100 text-sm">
                     <AlertOctagon className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                     {risk}
                  </div>
                ))
             ) : (
               <div className="text-sm text-muted-foreground italic">No major risks flagged.</div>
             )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
