import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ModalityState } from "@/lib/scoring";
import { Beaker, Monitor, Users, BookOpen, Building, Wifi } from "lucide-react";

interface Props {
  state: ModalityState;
  onChange: (updates: Partial<ModalityState>) => void;
}

export function QuickInputs({ state, onChange }: Props) {
  
  const updateActivity = (key: keyof ModalityState['activities'], val: boolean) => {
    onChange({ activities: { ...state.activities, [key]: val } });
  };

  const updateAssessment = (key: keyof ModalityState['assessments'], val: boolean) => {
    onChange({ assessments: { ...state.assessments, [key]: val } });
  };

  const updateResource = (key: keyof ModalityState['resources'], val: boolean) => {
    onChange({ resources: { ...state.resources, [key]: val } });
  };

  const updateProfile = (key: keyof ModalityState['profile'], val: boolean) => {
    onChange({ profile: { ...state.profile, [key]: val } });
  };

  const updateWeekly = (key: keyof ModalityState['weekly'], val: string) => {
    onChange({ weekly: { ...state.weekly, [key]: val } });
  };

  return (
    <div className="space-y-6">
      {/* B1. Learning Activities */}
      <Card className="border-l-4 border-l-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-secondary" />
            B1. Learning Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-y-3 gap-x-4 pt-2">
          {Object.entries(state.activities).map(([key, val]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox 
                id={`act-${key}`} 
                checked={val} 
                onCheckedChange={(c) => updateActivity(key as any, c as boolean)} 
              />
              <Label htmlFor={`act-${key}`} className="capitalize text-sm font-normal cursor-pointer">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* B2. Assessment Types */}
      <Card className="border-l-4 border-l-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-secondary" />
            B2. Assessment Types
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-y-3 gap-x-4 pt-2">
           {Object.entries(state.assessments).map(([key, val]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={`ass-${key}`} className="capitalize text-sm font-normal">
                {key}
              </Label>
              <Select value={val ? "yes" : "no"} onValueChange={(v) => updateAssessment(key as any, v === "yes")}>
                <SelectTrigger className="h-8 w-[80px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* B3. Resources & Constraints */}
      <Card className="border-l-4 border-l-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <Beaker className="h-4 w-4 text-secondary" />
            B3. Resources & Constraints
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 pt-2">
           {Object.entries(state.resources).map(([key, val]) => (
            <div key={key} className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md">
              <Checkbox 
                id={`res-${key}`} 
                checked={val} 
                onCheckedChange={(c) => updateResource(key as any, c as boolean)} 
              />
              <Label htmlFor={`res-${key}`} className="capitalize text-xs font-medium cursor-pointer">
                 {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

       {/* B4. Learner Profile */}
      <Card className="border-l-4 border-l-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <Users className="h-4 w-4 text-secondary" />
            B4. Learner Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2 pt-2">
          {Object.entries(state.profile).map(([key, val]) => (
            <div key={key} className="flex items-center space-x-3">
              <Checkbox 
                id={`prof-${key}`} 
                checked={val} 
                onCheckedChange={(c) => updateProfile(key as any, c as boolean)} 
              />
              <Label htmlFor={`prof-${key}`} className="capitalize text-sm cursor-pointer">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* B5. Weekly Delivery Pattern */}
      <Card className="border-l-4 border-l-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
            <Building className="h-4 w-4 text-secondary" />
            B5. Weekly Delivery Pattern
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label className="font-medium">Lecture</Label>
            <div className="flex gap-1">
              {['In-Person', 'Online', 'HyFlex'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateWeekly('lecture', mode.toLowerCase())}
                  className={`px-2 py-1 text-xs border rounded-md transition-colors ${
                    state.weekly.lecture === mode.toLowerCase() 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="font-medium">Lab / Practical</Label>
            <div className="flex gap-1">
              {['In-Person', 'Online', 'HyFlex'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateWeekly('lab', mode.toLowerCase())}
                  className={`px-2 py-1 text-xs border rounded-md transition-colors ${
                    state.weekly.lab === mode.toLowerCase() 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label className="font-medium">Tutorial</Label>
            <div className="flex gap-1">
              {['In-Person', 'Online'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateWeekly('tutorial', mode.toLowerCase())}
                  className={`px-2 py-1 text-xs border rounded-md transition-colors ${
                    state.weekly.tutorial === mode.toLowerCase() 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background hover:bg-muted'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
