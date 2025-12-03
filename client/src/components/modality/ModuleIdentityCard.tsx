import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ModalityState } from "@/lib/scoring";

interface Props {
  state: ModalityState;
  onChange: (updates: Partial<ModalityState>) => void;
}

// Mock modules list - In a real app, this would come from a context or API shared with Programme page
const availableModules = [
  { code: "CMPU1001", name: "Introduction to Programming" },
  { code: "CMPU2045", name: "Cloud Computing Architecture" },
  { code: "CMPU3012", name: "User Experience Design" },
  { code: "CMPU4010", name: "Advanced Software Engineering" }, // Extra one
];

export function ModuleIdentityCard({ state, onChange }: Props) {
  
  const handleModuleSelect = (value: string) => {
    const selected = availableModules.find(m => m.code === value);
    if (selected) {
      onChange({ 
        moduleCode: selected.code,
        moduleName: selected.name
      });
    }
  };

  return (
    <Card className="border-t-4 border-t-primary shadow-md overflow-hidden">
      <CardHeader className="bg-slate-50 pb-3 border-b">
        <CardTitle className="text-lg font-bold text-primary uppercase tracking-wide flex items-center justify-between">
          <span>Panel A: Module Identity</span>
          <span className="text-xs font-normal bg-primary/10 px-2 py-1 rounded text-primary">Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-4">
        
        {/* Module Selection Dropdown (Replaces Text Input) */}
        <div className="grid gap-2">
          <Label>Select Module from Programme</Label>
          <Select 
            value={state.moduleCode} 
            onValueChange={handleModuleSelect}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a module..." />
            </SelectTrigger>
            <SelectContent>
              {availableModules.map((mod) => (
                <SelectItem key={mod.code} value={mod.code}>
                  {mod.code} - {mod.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="moduleCode">Module Code</Label>
            <Input 
              id="moduleCode" 
              value={state.moduleCode || ""} 
              onChange={(e) => onChange({ moduleCode: e.target.value })} 
              placeholder="e.g. CMPU1010"
              className="font-medium uppercase bg-muted/50"
              readOnly // Making it read-only since it's selected from dropdown, or keep editable if override needed
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="moduleName">Module Name</Label>
            <Input 
              id="moduleName" 
              value={state.moduleName} 
              onChange={(e) => onChange({ moduleName: e.target.value })} 
              placeholder="e.g. Advanced Data Structures"
              className="font-medium bg-muted/50"
              readOnly // Making it read-only since it's selected from dropdown
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="stage">Stage (Year)</Label>
            <Select value={state.stage} onValueChange={(val) => onChange({ stage: val })}>
              <SelectTrigger id="stage">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Stage 1 (First Year)</SelectItem>
                <SelectItem value="2">Stage 2</SelectItem>
                <SelectItem value="3">Stage 3</SelectItem>
                <SelectItem value="4">Stage 4 (Final Year)</SelectItem>
                <SelectItem value="M">Masters / Postgrad</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="credits">Credits (ECTS)</Label>
            <Input 
              id="credits" 
              type="number" 
              value={state.credits} 
              onChange={(e) => onChange({ credits: Number(e.target.value) })} 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="hours">Weekly Hours</Label>
            <Input 
              id="hours" 
              type="number" 
              value={state.hours} 
              onChange={(e) => onChange({ hours: Number(e.target.value) })} 
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="students">No. of Students</Label>
            <Input 
              id="students" 
              type="number" 
              value={state.students} 
              onChange={(e) => onChange({ students: Number(e.target.value) })} 
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="learnerMix">Typical Learner Mix</Label>
          <Select value={state.learnerMix} onValueChange={(val) => onChange({ learnerMix: val })}>
            <SelectTrigger id="learnerMix">
              <SelectValue placeholder="Select mix" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard UG">Standard Undergraduate</SelectItem>
              <SelectItem value="Mature">Mature / Career Changers</SelectItem>
              <SelectItem value="International">International Cohort</SelectItem>
              <SelectItem value="Apprentice">Apprenticeship</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Work-based">Work-based</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
