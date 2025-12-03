import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ModalityState } from "@/lib/scoring";
import { Beaker, Monitor, Users, BookOpen, Building } from "lucide-react";

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
    if (val) onChange({ weekly: { ...state.weekly, [key]: val } });
  };

  return (
    <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3", "item-4", "item-5"]} className="w-full space-y-4">
      
      {/* B1. Learning Activities */}
      <AccordionItem value="item-1" className="border border-border rounded-lg bg-card px-4 shadow-sm">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2 text-base font-bold text-foreground">
            <BookOpen className="h-5 w-5 text-secondary" />
            <span>B1. Learning Activities</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-2">
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
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
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* B2. Assessment Types */}
      <AccordionItem value="item-2" className="border border-border rounded-lg bg-card px-4 shadow-sm">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2 text-base font-bold text-foreground">
            <Users className="h-5 w-5 text-secondary" />
            <span>B2. Assessment Types</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-2">
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
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
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* B3. Resources & Constraints */}
      <AccordionItem value="item-3" className="border border-border rounded-lg bg-card px-4 shadow-sm">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2 text-base font-bold text-foreground">
            <Beaker className="h-5 w-5 text-secondary" />
            <span>B3. Resources & Constraints</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
             {Object.entries(state.resources).map(([key, val]) => (
              <div key={key} className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md border border-transparent hover:border-muted-foreground/20 transition-colors">
                <Checkbox 
                  id={`res-${key}`} 
                  checked={val} 
                  onCheckedChange={(c) => updateResource(key as any, c as boolean)} 
                />
                <Label htmlFor={`res-${key}`} className="capitalize text-xs font-medium cursor-pointer leading-tight">
                   {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

       {/* B4. Learner Profile */}
      <AccordionItem value="item-4" className="border border-border rounded-lg bg-card px-4 shadow-sm">
        <AccordionTrigger className="hover:no-underline py-3">
           <div className="flex items-center gap-2 text-base font-bold text-foreground">
            <Users className="h-5 w-5 text-secondary" />
            <span>B4. Learner Profile</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-2">
          <div className="grid grid-cols-1 gap-2">
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
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* B5. Weekly Delivery Pattern */}
      <AccordionItem value="item-5" className="border border-border rounded-lg bg-card px-4 shadow-sm">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2 text-base font-bold text-foreground">
            <Building className="h-5 w-5 text-secondary" />
            <span>B5. Weekly Delivery Pattern</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-2">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label className="font-medium text-muted-foreground uppercase tracking-wider text-xs">Lecture</Label>
              <ToggleGroup type="single" value={state.weekly.lecture} onValueChange={(val) => updateWeekly('lecture', val)} className="justify-start w-full">
                {['in-person', 'online', 'hyflex'].map((mode) => (
                  <ToggleGroupItem key={mode} value={mode} className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border border-input shadow-sm">
                    {mode === 'in-person' ? 'In-Person' : mode === 'online' ? 'Online' : 'HyFlex'}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            <div className="flex flex-col gap-2">
              <Label className="font-medium text-muted-foreground uppercase tracking-wider text-xs">Lab / Practical</Label>
              <ToggleGroup type="single" value={state.weekly.lab} onValueChange={(val) => updateWeekly('lab', val)} className="justify-start w-full">
                {['in-person', 'online', 'hyflex'].map((mode) => (
                  <ToggleGroupItem key={mode} value={mode} className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border border-input shadow-sm">
                    {mode === 'in-person' ? 'In-Person' : mode === 'online' ? 'Online' : 'HyFlex'}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label className="font-medium text-muted-foreground uppercase tracking-wider text-xs">Tutorial</Label>
              <ToggleGroup type="single" value={state.weekly.tutorial} onValueChange={(val) => updateWeekly('tutorial', val)} className="justify-start w-full">
                {['in-person', 'online'].map((mode) => (
                  <ToggleGroupItem key={mode} value={mode} className="flex-1 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground border border-input shadow-sm">
                    {mode === 'in-person' ? 'In-Person' : 'Online'}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
}
