import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ModalityState, initialModalityState, scoreModality, ScoreResult } from "@/lib/scoring";
import { ModuleIdentityCard } from "@/components/modality/ModuleIdentityCard";
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
import { Download, Save, AlertTriangle, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

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
  const [transparencyOpen, setTransparencyOpen] = useState(false);
  
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

  const updateStaffProfile = (key: keyof ModalityState['staffProfile'], val: any) => {
    handleStateChange({ staffProfile: { ...state.staffProfile, [key]: val } });
  };

  const handleExportJSON = () => {
    const data = {
      state,
      scores,
      generatedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MDST-${state.moduleCode || 'module'}.json`;
    a.click();
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
     const weight = state.assessments[type as keyof typeof state.assessments];
     if (weight === "No") return "bg-gray-100";
     
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
            <ModuleIdentityCard state={state} onChange={handleStateChange} />
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
                        <Label htmlFor={`act-${key}`} className="capitalize text-sm font-normal cursor-pointer">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
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
                           <div className="col-span-2 flex items-center justify-between w-full bg-muted/30 p-2 rounded mt-2">
                             <Label htmlFor={`res-${key}`} className="font-medium cursor-pointer">Staff Comfortable with HyFlex?</Label>
                             <Switch id={`res-${key}`} checked={val} onCheckedChange={(c) => updateResource(key as any, c)} />
                           </div>
                        ) : (
                          <>
                            <Checkbox id={`res-${key}`} checked={val} onCheckedChange={(c) => updateResource(key as any, c as boolean)} />
                            <Label htmlFor={`res-${key}`} className="capitalize text-sm font-normal cursor-pointer">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
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
                        <Label htmlFor={`prof-${key}`} className="capitalize text-sm font-normal cursor-pointer">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* B5: Staff Profile (NEW) */}
                <Card className="border-l-4 border-l-secondary">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                      B5. Staff Profile <span className="text-xs font-normal text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">Optional</span>
                    </CardTitle>
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>These items help assess feasibility. They do not evaluate staff performance or influence workload planning.</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="digitalConfidence" className="text-xs font-medium">Digital Confidence for Teaching</Label>
                        <Select value={state.staffProfile.digitalConfidence} onValueChange={(v) => updateStaffProfile('digitalConfidence', v)}>
                          <SelectTrigger id="digitalConfidence"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Moderate">Moderate</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="onlineExperience" className="text-xs font-medium">Online Teaching Experience</Label>
                        <Select value={state.staffProfile.onlineExperience} onValueChange={(v) => updateStaffProfile('onlineExperience', v)}>
                          <SelectTrigger id="onlineExperience"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Some">Some</SelectItem>
                            <SelectItem value="Substantial">Substantial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Access to Suitable Technology / Spaces</Label>
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="accessDevice" checked={state.staffProfile.accessDevice} onCheckedChange={(c) => updateStaffProfile('accessDevice', c)} />
                          <Label htmlFor="accessDevice" className="text-sm font-normal cursor-pointer">Reliable personal device + microphone</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="accessHyFlexRoom" checked={state.staffProfile.accessHyFlexRoom} onCheckedChange={(c) => updateStaffProfile('accessHyFlexRoom', c)} />
                          <Label htmlFor="accessHyFlexRoom" className="text-sm font-normal cursor-pointer">Access to a HyFlex-equipped room</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="accessDigitalTools" checked={state.staffProfile.accessDigitalTools} onCheckedChange={(c) => updateStaffProfile('accessDigitalTools', c)} />
                          <Label htmlFor="accessDigitalTools" className="text-sm font-normal cursor-pointer">Access to digital tools (e.g. VLE, breakout features)</Label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="workload" className="text-xs font-medium">Workload Complexity</Label>
                        <Select value={state.staffProfile.workload} onValueChange={(v) => updateStaffProfile('workload', v)}>
                          <SelectTrigger id="workload"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2">Teaching 1–2 modules</SelectItem>
                            <SelectItem value="3+">Teaching 3+ modules</SelectItem>
                            <SelectItem value="HeavyPractical">Heavy lab/studio/practical load</SelectItem>
                          </SelectContent>
                        </Select>
                    </div>

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

               {/* Assessment Matrix Heatmap */}
               <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold uppercase text-muted-foreground">
                    Assessment–Modality Matrix
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-1 text-xs text-center">
                    <div className="font-bold text-left pl-2">Type</div>
                    <div className="font-bold">IP</div>
                    <div className="font-bold">Blend</div>
                    <div className="font-bold">Online</div>
                    <div className="font-bold">HyFlex</div>

                    {Object.keys(state.assessments).map((key) => (
                      <React.Fragment key={key}>
                        <div className="text-left pl-2 capitalize py-1 truncate" title={key}>{key}</div>
                        <div className={`py-1 rounded-sm ${getAssessmentColor(key, 'in-person')}`}></div>
                        <div className={`py-1 rounded-sm ${getAssessmentColor(key, 'blended')}`}></div>
                        <div className={`py-1 rounded-sm ${getAssessmentColor(key, 'online')}`}></div>
                        <div className={`py-1 rounded-sm ${getAssessmentColor(key, 'hyflex')}`}></div>
                      </React.Fragment>
                    ))}
                  </div>
                </CardContent>
              </Card>
               
             </div>
          </section>

          {/* Transparency Panel */}
          <section>
            <Collapsible open={transparencyOpen} onOpenChange={setTransparencyOpen} className="border rounded-md bg-white shadow-sm">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-sm font-medium hover:bg-gray-50">
                <span>Inputs used for recommendation</span>
                {transparencyOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 text-xs text-muted-foreground space-y-2">
                <div className="grid grid-cols-2 gap-4 border-t pt-2">
                  <div>
                    <strong className="block text-gray-700">Identity</strong>
                    {state.moduleCode} {state.moduleName} ({state.credits} ECTS)
                  </div>
                  <div>
                    <strong className="block text-gray-700">Profile</strong>
                    {state.learnerMix}, {state.stage}
                  </div>
                </div>
                <div>
                  <strong className="block text-gray-700">Activities</strong>
                  {Object.entries(state.activities).filter(([_, v]) => v).map(([k]) => k).join(", ") || "None"}
                </div>
                <div>
                  <strong className="block text-gray-700">Assessments</strong>
                  {Object.entries(state.assessments).filter(([_, v]) => v !== "No").map(([k, v]) => `${k} (${v})`).join(", ") || "None"}
                </div>
                <div>
                  <strong className="block text-gray-700">Constraints</strong>
                  {Object.entries(state.resources).filter(([_, v]) => v === true).map(([k]) => k).join(", ") || "None"}
                </div>
                <div>
                  <strong className="block text-gray-700">Staff Profile</strong>
                  Conf: {state.staffProfile.digitalConfidence}, Exp: {state.staffProfile.onlineExperience}, Work: {state.staffProfile.workload}
                </div>
              </CollapsibleContent>
            </Collapsible>
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
              <Button variant="secondary" className="gap-2" onClick={handleExportJSON}><Save className="h-4 w-4" /> Save JSON</Button>
              <Button className="gap-2 bg-white text-primary hover:bg-gray-100"><Download className="h-4 w-4" /> Export PDF Report</Button>
           </div>
        </div>
      </section>
    </Layout>
  );
}
