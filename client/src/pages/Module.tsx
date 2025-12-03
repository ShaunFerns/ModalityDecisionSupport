import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ModalityState, initialModalityState, scoreModality, ScoreResult } from "@/lib/scoring";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Download, Save, AlertTriangle, CheckCircle, Info } from "lucide-react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Module() {
  const [state, setState] = useState<ModalityState>(initialModalityState);
  const [scores, setScores] = useState<ScoreResult>(scoreModality(initialModalityState));
  
  // Micro Pattern Planner State (Panel D)
  const [microState, setMicroState] = useState({
    tutorialCapacity: 20,
    labCapacity: 16,
    lectureMode: "in-person",
    tutorialMode: "in-person",
    labMode: "in-person"
  });

  const handleStateChange = (updates: Partial<ModalityState>) => {
    const newState = { ...state, ...updates };
    setState(newState);
    setScores(scoreModality(newState));
  };

  const updateActivity = (key: keyof ModalityState['activities'], val: boolean) => {
    handleStateChange({ activities: { ...state.activities, [key]: val } });
  };

  const updateAssessment = (key: keyof ModalityState['assessments'], val: string) => {
    handleStateChange({ assessments: { ...state.assessments, [key]: val } });
  };

  const updateResource = (key: keyof ModalityState['resources'], val: boolean) => {
    handleStateChange({ resources: { ...state.resources, [key]: val } });
  };

  const updateProfile = (key: keyof ModalityState['profile'], val: boolean) => {
    handleStateChange({ profile: { ...state.profile, [key]: val } });
  };

  // Radar Data
  const radarData = {
    labels: ["Learning Design", "Assessment", "Learner Profile", "Stage Fit", "Feasibility"],
    datasets: [
      {
        label: "In-Person",
        data: [scores.dimensions.learningDesign.inPerson, scores.dimensions.assessment.inPerson, scores.dimensions.learnerProfile.inPerson, scores.dimensions.stageFit.inPerson, scores.dimensions.feasibility.inPerson],
        backgroundColor: "rgba(0, 85, 135, 0.1)",
        borderColor: "rgba(0, 85, 135, 1)",
        borderWidth: 2,
      },
      {
        label: "Blended",
        data: [scores.dimensions.learningDesign.blended, scores.dimensions.assessment.blended, scores.dimensions.learnerProfile.blended, scores.dimensions.stageFit.blended, scores.dimensions.feasibility.blended],
        backgroundColor: "rgba(102, 204, 255, 0.1)",
        borderColor: "rgba(102, 204, 255, 1)",
        borderWidth: 2,
      },
      {
        label: "Online",
        data: [scores.dimensions.learningDesign.online, scores.dimensions.assessment.online, scores.dimensions.learnerProfile.online, scores.dimensions.stageFit.online, scores.dimensions.feasibility.online],
        backgroundColor: "rgba(72, 187, 120, 0.1)",
        borderColor: "rgba(72, 187, 120, 1)",
        borderWidth: 2,
      },
      {
        label: "HyFlex",
        data: [scores.dimensions.learningDesign.hyflex, scores.dimensions.assessment.hyflex, scores.dimensions.learnerProfile.hyflex, scores.dimensions.stageFit.hyflex, scores.dimensions.feasibility.hyflex],
        backgroundColor: "rgba(159, 122, 234, 0.1)",
        borderColor: "rgba(159, 122, 234, 1)",
        borderWidth: 2,
      }
    ]
  };

  const getAssessmentColor = (type: string, modality: string) => {
     // Simple heuristic for heatmap
     const weight = state.assessments[type as keyof typeof state.assessments];
     if (weight === "No") return "bg-gray-100";
     
     // This logic mirrors the scoring logic vaguely for visual feedback
     if (modality === "in-person") {
        if (type === "exam" || type === "lab") return "bg-green-500 text-white";
     }
     if (modality === "online") {
        if (type === "portfolio") return "bg-green-500 text-white";
        if (type === "exam" || type === "lab") return "bg-red-300";
     }
     return "bg-yellow-200";
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Panels A & B (Inputs) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Panel A: Module Identity */}
          <section>
            <h2 className="text-lg font-bold text-primary uppercase tracking-wide mb-4 border-l-4 border-primary pl-3">Panel A: Module Identity</h2>
            <Card>
              <CardContent className="grid gap-4 pt-6">
                <div className="grid gap-2">
                  <Label htmlFor="moduleName">Module Name</Label>
                  <Input value={state.moduleName} onChange={(e) => handleStateChange({ moduleName: e.target.value })} placeholder="Module Name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Stage</Label>
                    <Select value={state.stage} onValueChange={(val) => handleStateChange({ stage: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Stage 1</SelectItem>
                        <SelectItem value="2">Stage 2</SelectItem>
                        <SelectItem value="3">Stage 3</SelectItem>
                        <SelectItem value="4">Stage 4</SelectItem>
                        <SelectItem value="M">Masters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                   <div className="grid gap-2">
                    <Label>Credits (ECTS)</Label>
                    <Input type="number" value={state.credits} onChange={(e) => handleStateChange({ credits: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Weekly Hours</Label>
                    <Input type="number" value={state.hours} onChange={(e) => handleStateChange({ hours: Number(e.target.value) })} />
                  </div>
                   <div className="grid gap-2">
                    <Label>Students</Label>
                    <Input type="number" value={state.students} onChange={(e) => handleStateChange({ students: Number(e.target.value) })} />
                  </div>
                </div>
                <div className="grid gap-2">
                    <Label>Typical Learner Mix</Label>
                    <Select value={state.learnerMix} onValueChange={(val) => handleStateChange({ learnerMix: val })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Standard UG">Standard UG</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Work-based">Work-based</SelectItem>
                        <SelectItem value="International">International</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </CardContent>
            </Card>
          </section>

          {/* Panel B: Drivers */}
          <section>
             <h2 className="text-lg font-bold text-primary uppercase tracking-wide mb-4 border-l-4 border-primary pl-3">Panel B: Drivers</h2>
             <div className="space-y-6">
                
                {/* B1 */}
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">B1. Learning Activities</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2">
                    {Object.entries(state.activities).map(([key, val]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox id={`act-${key}`} checked={val} onCheckedChange={(c) => updateActivity(key as any, c as boolean)} />
                        <Label htmlFor={`act-${key}`} className="capitalize text-sm font-normal">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* B2 */}
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">B2. Assessment Types</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 gap-2">
                    {Object.entries(state.assessments).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between border-b pb-1 last:border-0">
                        <Label className="capitalize text-sm">{key}</Label>
                        <Select value={val} onValueChange={(v) => updateAssessment(key as any, v)}>
                           <SelectTrigger className="h-8 w-[100px]"><SelectValue /></SelectTrigger>
                           <SelectContent>
                             <SelectItem value="No">No</SelectItem>
                             <SelectItem value="Minor">Minor</SelectItem>
                             <SelectItem value="Major">Major</SelectItem>
                           </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* B3 */}
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">B3. Resources & Constraints</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2">
                     {Object.entries(state.resources).map(([key, val]) => (
                      <div key={key} className="flex items-center space-x-2">
                        {key === 'staffComfort' ? (
                           <div className="col-span-2 flex items-center justify-between w-full bg-muted/30 p-2 rounded">
                             <Label htmlFor={`res-${key}`} className="font-medium">Staff Comfortable with HyFlex?</Label>
                             <Switch id={`res-${key}`} checked={val} onCheckedChange={(c) => updateResource(key as any, c)} />
                           </div>
                        ) : (
                          <>
                            <Checkbox id={`res-${key}`} checked={val} onCheckedChange={(c) => updateResource(key as any, c as boolean)} />
                            <Label htmlFor={`res-${key}`} className="capitalize text-sm font-normal">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                          </>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* B4 */}
                <Card>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-bold">B4. Learner Profile & Equity</CardTitle></CardHeader>
                  <CardContent className="grid grid-cols-1 gap-2">
                     {Object.entries(state.profile).map(([key, val]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox id={`prof-${key}`} checked={val} onCheckedChange={(c) => updateProfile(key as any, c as boolean)} />
                        <Label htmlFor={`prof-${key}`} className="capitalize text-sm font-normal">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

             </div>
          </section>

        </div>

        {/* Right Column: Panels C & D (Outputs & Planning) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Panel C: Recommendation & Charts */}
          <section>
             <h2 className="text-lg font-bold text-primary uppercase tracking-wide mb-4 border-l-4 border-primary pl-3">Panel C: Recommendation</h2>
             
             <div className="space-y-6">
               {/* Recommendation Card */}
               <Card className="border-t-4 border-t-green-600 shadow-md bg-slate-50">
                 <CardHeader className="pb-2">
                   <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold uppercase text-muted-foreground">Recommended</CardTitle>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">Evidence-Based</span>
                   </div>
                 </CardHeader>
                 <CardContent>
                   <div className="text-4xl font-black text-primary mb-2 capitalize">{scores.recommendation.replace('_', '-')}</div>
                   <p className="text-sm text-muted-foreground mb-4">Based on highest fit score.</p>
                   
                   <div className="space-y-2 mb-4">
                     <h4 className="text-xs font-bold uppercase text-muted-foreground">Strongest Factors</h4>
                     {scores.strongestFactors.map((f, i) => (
                       <div key={i} className="flex items-center gap-2 text-sm bg-white p-1 rounded border border-slate-100">
                         <CheckCircle className="h-3 w-3 text-green-600" /> {f}
                       </div>
                     ))}
                   </div>

                    {scores.risks.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase text-red-800">Risks / Considerations</h4>
                        {scores.risks.map((r, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm bg-red-50 p-1 rounded border border-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 text-red-600" /> {r}
                          </div>
                        ))}
                      </div>
                    )}
                 </CardContent>
               </Card>

               {/* Projected Mix Tile */}
               <Card>
                 <CardHeader className="pb-2"><CardTitle className="text-sm font-bold uppercase text-muted-foreground">Projected Fit Scores</CardTitle></CardHeader>
                 <CardContent>
                    <div className="grid grid-cols-4 gap-2 text-center">
                       <div><div className="text-xl font-bold">{scores.in_person}</div><div className="text-xs text-muted-foreground">In-Person</div></div>
                       <div><div className="text-xl font-bold">{scores.blended}</div><div className="text-xs text-muted-foreground">Blended</div></div>
                       <div><div className="text-xl font-bold">{scores.online}</div><div className="text-xs text-muted-foreground">Online</div></div>
                       <div><div className="text-xl font-bold">{scores.hyflex}</div><div className="text-xs text-muted-foreground">HyFlex</div></div>
                    </div>
                 </CardContent>
               </Card>

               {/* Radar Chart */}
               <Card>
                 <CardContent className="p-2 h-[250px] flex items-center justify-center">
                    <Radar data={radarData} options={{ maintainAspectRatio: false, scales: { r: { suggestedMin: 0, suggestedMax: 100 } } }} />
                 </CardContent>
               </Card>
               
             </div>
          </section>

          {/* Panel D: Micro Pattern Planner */}
          <section>
            <h2 className="text-lg font-bold text-primary uppercase tracking-wide mb-4 border-l-4 border-primary pl-3 flex items-center gap-2">
              Panel D: Micro Pattern Planner
              <span className="text-xs font-normal bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Optional</span>
            </h2>
            
            <Card className="bg-muted/10 border-dashed border-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Use this to explore your weekly lecture/lab/tutorial structure. 
                  It does not change the recommended modality scores.
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                     <Label className="text-xs">Tutorial Capacity</Label>
                     <Input type="number" value={microState.tutorialCapacity} onChange={(e) => setMicroState({...microState, tutorialCapacity: Number(e.target.value)})} className="h-8" />
                     <div className="text-xs text-muted-foreground">Groups: {Math.ceil(state.students / microState.tutorialCapacity)}</div>
                   </div>
                   <div className="space-y-1">
                     <Label className="text-xs">Lab Capacity</Label>
                     <Input type="number" value={microState.labCapacity} onChange={(e) => setMicroState({...microState, labCapacity: Number(e.target.value)})} className="h-8" />
                     <div className="text-xs text-muted-foreground">Groups: {Math.ceil(state.students / microState.labCapacity)}</div>
                   </div>
                </div>

                <div className="space-y-3 border-t pt-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Lecture</Label>
                    <div className="flex gap-1">
                       {['in-person', 'online', 'hyflex'].map(m => (
                         <button 
                           key={m} 
                           onClick={() => setMicroState({...microState, lectureMode: m})}
                           className={`px-2 py-1 text-xs border rounded ${microState.lectureMode === m ? 'bg-primary text-primary-foreground' : 'bg-white'}`}
                         >
                           {m}
                         </button>
                       ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Tutorials</Label>
                    <div className="flex gap-1">
                       {['in-person', 'online', 'hyflex'].map(m => (
                         <button 
                           key={m} 
                           onClick={() => setMicroState({...microState, tutorialMode: m})}
                           className={`px-2 py-1 text-xs border rounded ${microState.tutorialMode === m ? 'bg-primary text-primary-foreground' : 'bg-white'}`}
                         >
                           {m}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Labs</Label>
                    <div className="flex gap-1">
                       {['in-person', 'online', 'hyflex'].map(m => (
                         <button 
                           key={m} 
                           disabled={(m === 'online' && state.resources.labRequired && !state.resources.simulation) || (m === 'hyflex' && !state.resources.staffComfort)}
                           onClick={() => setMicroState({...microState, labMode: m})}
                           className={`px-2 py-1 text-xs border rounded ${microState.labMode === m ? 'bg-primary text-primary-foreground' : 'bg-white'} disabled:opacity-30`}
                         >
                           {m}
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        
        </div>

      </div>

      {/* Panel E: Summary & Export */}
      <section className="mt-12 border-t pt-8">
        <div className="bg-slate-900 text-slate-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <div>
             <h3 className="text-xl font-bold">Module Decision Summary</h3>
             <p className="text-slate-400 text-sm">Review your evidence-based recommendation and export your findings.</p>
           </div>
           <div className="flex gap-3">
              <Button variant="secondary" className="gap-2"><Save className="h-4 w-4" /> Save JSON</Button>
              <Button className="gap-2 bg-white text-primary hover:bg-gray-100"><Download className="h-4 w-4" /> Export PDF Report</Button>
           </div>
        </div>
      </section>
    </Layout>
  );
}
