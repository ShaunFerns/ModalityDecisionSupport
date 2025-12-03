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

export function ModuleIdentityCard({ state, onChange }: Props) {
  return (
    <Card className="border-t-4 border-t-primary shadow-md overflow-hidden">
      <CardHeader className="bg-slate-50 pb-3 border-b">
        <CardTitle className="text-lg font-bold text-primary uppercase tracking-wide flex items-center justify-between">
          <span>Panel A: Module Identity</span>
          <span className="text-xs font-normal bg-primary/10 px-2 py-1 rounded text-primary">Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="moduleCode">Module Code</Label>
            <Input 
              id="moduleCode" 
              value={state.moduleCode || ""} 
              onChange={(e) => onChange({ moduleCode: e.target.value })} 
              placeholder="e.g. CMPU1010"
              className="font-medium uppercase"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="moduleName">Module Name</Label>
            <Input 
              id="moduleName" 
              value={state.moduleName} 
              onChange={(e) => onChange({ moduleName: e.target.value })} 
              placeholder="e.g. Advanced Data Structures"
              className="font-medium"
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
