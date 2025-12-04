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
import { Download, Save, AlertTriangle, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "wouter";

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
    // Renamed labels to align with Panel B drivers
    labels: ["Learning Activities", "Assessment Types", "Learner Profile", "Stage Fit", "Resources & Staff"],
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

  return (
    <Layout>
      <div className="space-y-8 pb-12">
        
        {/* Top Row: Panels A & B (Inputs) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Column: Panel A */}
            <div className="space-y-8">
                <section>
                   <ModuleIdentityCard state={state} onChange={handleStateChange} />
                </section>
            </div>

            {/* Right Column: Panel B */}
            <div className="space-y-8">
                <section>
                   <h2 className="text-lg font-bold text-primary uppercase tracking-wide mb-4 border-l-4 border-primary pl-3">Panel B: Drivers</h2>
                   <div className="space-y-6">
                      
                      {/* B1 */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold">B1. Learning Activities</CardTitle>
                          <div className="text-xs text-muted-foreground mt-1 space-y-1">
                            <p>Select the learning activities that are central to how students achieve the learning outcomes.</p>
                            <p>Choose only those that represent the dominant teaching and learning approach in this module.</p>
                          </div>
                        </CardHeader>
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
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold">B2. Assessment Types</CardTitle>
                          <div className="text-xs text-muted-foreground mt-1 space-y-1">
                            <p>Indicate the role of each assessment type in this module.</p>
                            <p>Select Major only where the assessment is a significant or defining component of learner evidence.</p>
                          </div>
                        </CardHeader>
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
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold">B3. Resources & Constraints</CardTitle>
                          <div className="text-xs text-muted-foreground mt-1 space-y-1">
                            <p>Identify any resources or delivery constraints that shape how this module can be delivered.</p>
                            <p>These help establish what is feasible for different modalities.</p>
                          </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-2">
                           {Object.entries(state.resources).map(([key, val]) => (
                            <div key={key} className="flex items-center space-x-2">
                              {/* Removed staffComfort from here */}
                              <Checkbox id={`res-${key}`} checked={val} onCheckedChange={(c) => updateResource(key as any, c as boolean)} />
                              <Label htmlFor={`res-${key}`} className="capitalize text-sm font-normal cursor-pointer">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* B4 */}
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-bold">B4. Learner Profile & Equity</CardTitle>
                          <div className="text-xs text-muted-foreground mt-1 space-y-1">
                            <p>Select the characteristics that best describe the typical learners taking this module.</p>
                            <p>These factors help understand flexibility needs and equity considerations.</p>
                          </div>
                        </CardHeader>
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
                        <CardHeader className="pb-2">
                          <div className="flex flex-row items-center justify-between">
                            <CardTitle className="text-sm font-bold flex items-center gap-2">
                              B5. Staff Profile <span className="text-xs font-normal text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">Optional</span>
                            </CardTitle>
                            {/* Removed HelpCircle/Tooltip here */}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1 space-y-1">
                            <p>(Optional): Provide information about staff readiness and available teaching supports.</p>
                            <p>These items influence feasibility, not quality or performance.</p>
                          </div>
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
                          
                          {/* Moved Staff HyFlex Comfort Here */}
                          <div className="space-y-2">
                             <Label htmlFor="hyflexComfort" className="text-xs font-medium">Staff Comfortable with HyFlex?</Label>
                             <Select value={state.staffProfile.hyflexComfort} onValueChange={(v) => updateStaffProfile('hyflexComfort', v)}>
                                <SelectTrigger id="hyflexComfort"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Low">Low</SelectItem>
                                  <SelectItem value="Moderate">Moderate</SelectItem>
                                  <SelectItem value="High">High</SelectItem>
                                </SelectContent>
                             </Select>
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
        </div>

        {/* Bottom Row: Panels C & D (Outputs & Planning) */}
        <div className="space-y-8 border-t pt-8">
          
          {/* Panel C: Recommendation & Charts */}
          <section>
             <h2 className="text-lg font-bold text-primary uppercase tracking-wide mb-4 border-l-4 border-primary pl-3">Panel C: Recommendation</h2>
             
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {/* Recommendation Card */}
               <Card className="border-t-4 border-t-green-600 shadow-md bg-slate-50 lg:col-span-1">
                 <CardHeader className="pb-2">
                   <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-bold uppercase text-muted-foreground">Recommended</CardTitle>
                      <Link href="/evidence">
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full cursor-pointer hover:bg-green-200 transition-colors">Evidence-Based</span>
                      </Link>
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

               {/* Charts Group */}
               <div className="lg:col-span-2 space-y-6">
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
                     <CardContent className="p-2 h-[300px] flex items-center justify-center">
                        <Radar data={radarData} options={{ maintainAspectRatio: false, scales: { r: { suggestedMin: 0, suggestedMax: 100 } } }} />
                     </CardContent>
                   </Card>
               </div>
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
                  Conf: {state.staffProfile.digitalConfidence}, Exp: {state.staffProfile.onlineExperience}, HyFlex: {state.staffProfile.hyflexComfort}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>

          {/* Debug Panel (Temporary) */}
          <section>
            <Collapsible className="border rounded-md bg-slate-50 shadow-sm border-dashed border-slate-300">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-sm font-bold text-slate-700 hover:bg-slate-100">
                <div className="text-left">
                   <div>Debug: score breakdown (temporary)</div>
                   <div className="text-xs font-normal text-muted-foreground">For diagnostic use when calibrating the scoring model. Not visible in final user version.</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 text-xs space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-slate-200 pt-4">
                   
                   {/* Helper to render table */}
                   {['inPerson', 'blended', 'online', 'hyflex'].map((modality) => (
                     <div key={modality} className="border rounded bg-white p-2">
                        <h4 className="font-bold capitalize mb-2 border-b pb-1">{modality.replace(/([A-Z])/g, ' $1').trim()}</h4>
                        <table className="w-full text-left">
                           <thead>
                             <tr className="text-muted-foreground">
                               <th className="pb-1 font-medium">Dimension</th>
                               <th className="pb-1 font-medium text-right">Score</th>
                             </tr>
                           </thead>
                           <tbody className="space-y-1">
                              <tr>
                                <td>Learning Design</td>
                                <td className="text-right">{scores.dimensions.learningDesign[modality as keyof typeof scores.dimensions.learningDesign]}</td>
                              </tr>
                              <tr>
                                <td>Assessment Fit</td>
                                <td className="text-right">{scores.dimensions.assessment[modality as keyof typeof scores.dimensions.assessment]}</td>
                              </tr>
                              <tr>
                                <td>Learner Profile</td>
                                <td className="text-right">{scores.dimensions.learnerProfile[modality as keyof typeof scores.dimensions.learnerProfile]}</td>
                              </tr>
                              <tr>
                                <td>Stage Fit</td>
                                <td className="text-right">{scores.dimensions.stageFit[modality as keyof typeof scores.dimensions.stageFit]}</td>
                              </tr>
                              <tr>
                                <td>Feasibility</td>
                                <td className="text-right">{scores.dimensions.feasibility[modality as keyof typeof scores.dimensions.feasibility]}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                   ))}

                </div>
              </CollapsibleContent>
            </Collapsible>
          </section>

        </div>

        {/* Panel E Removed as requested */}
      </div>
    </Layout>
  );
}
