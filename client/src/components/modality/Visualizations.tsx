import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModalityState, ScoreResult } from "@/lib/scoring";

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Props {
  scores: ScoreResult;
  state: ModalityState;
}

export function Visualizations({ scores, state }: Props) {
  // Radar Chart Data
  const radarData = {
    labels: [
      "Learning Design",
      "Assessment Fit",
      "Learner Profile",
      "Stage Fit",
      "Feasibility",
    ],
    datasets: [
      {
        label: "Current Profile Fit",
        data: [
          scores.dimensions.learningDesign,
          scores.dimensions.assessment,
          scores.dimensions.learnerProfile,
          scores.dimensions.stageFit,
          scores.dimensions.feasibility,
        ],
        backgroundColor: "rgba(0, 85, 135, 0.2)", // Primary blue transparent
        borderColor: "rgba(0, 85, 135, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(0, 85, 135, 1)",
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: "rgba(0,0,0,0.1)",
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          backdropColor: "transparent",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  // Assessment Heatmap Helper
  const getCellColor = (assessmentType: string, modality: string) => {
    const type = assessmentType.toLowerCase();
    const mod = modality.toLowerCase();
    
    if (mod === "in-person") {
      if (type === "exam" || type === "lab" || type === "presentation") return "bg-green-500 text-white";
      return "bg-yellow-200";
    }
    if (mod === "online") {
      if (type === "portfolio" || type === "authentic") return "bg-green-500 text-white";
      if (type === "exam") return "bg-red-400 text-white";
      if (type === "lab") return "bg-red-500 text-white";
      return "bg-yellow-200";
    }
    if (mod === "blended") {
      return "bg-green-400 text-white";
    }
    if (mod === "hyflex") {
      if (type === "lab") return "bg-red-400 text-white";
      return "bg-yellow-400";
    }
    return "bg-gray-100";
  };

  // Calculate Current Selection % (Heuristic based on B5 Weekly Pattern)
  const calculateCurrentMix = () => {
    let ip = 0;
    let on = 0;
    let hf = 0;
    // Weights: Lecture 40%, Lab 40%, Tutorial 20%
    if (state.weekly.lecture === 'in-person') ip += 40;
    else if (state.weekly.lecture === 'online') on += 40;
    else hf += 40;

    if (state.weekly.lab === 'in-person') ip += 40;
    else if (state.weekly.lab === 'online') on += 40;
    else hf += 40;

    if (state.weekly.tutorial === 'in-person') ip += 20;
    else if (state.weekly.tutorial === 'online') on += 20;
    else hf += 20;

    return { ip, on, hf };
  };

  const currentMix = calculateCurrentMix();

  return (
    <div className="space-y-6">
      {/* 1. Radar Chart */}
      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase text-muted-foreground">
            Modality Dimension Fit
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center p-2">
          <Radar data={radarData} options={radarOptions} />
        </CardContent>
      </Card>

      {/* 4. Modality Mix Tile (New) */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
           <CardTitle className="text-sm font-bold uppercase text-muted-foreground">
            Projected Modality Mix
          </CardTitle>
        </CardHeader>
        <CardContent>
           <div className="flex h-16 w-full rounded-md overflow-hidden border">
              {currentMix.ip > 0 && (
                <div style={{ width: `${currentMix.ip}%` }} className="bg-primary h-full flex items-center justify-center text-white text-xs font-bold flex-col">
                   <span>{currentMix.ip}%</span>
                   <span className="text-[10px] font-normal opacity-80">In-Person</span>
                </div>
              )}
              {currentMix.on > 0 && (
                <div style={{ width: `${currentMix.on}%` }} className="bg-secondary h-full flex items-center justify-center text-white text-xs font-bold flex-col">
                   <span>{currentMix.on}%</span>
                   <span className="text-[10px] font-normal opacity-80">Online</span>
                </div>
              )}
              {currentMix.hf > 0 && (
                <div style={{ width: `${currentMix.hf}%` }} className="bg-purple-500 h-full flex items-center justify-center text-white text-xs font-bold flex-col">
                   <span>{currentMix.hf}%</span>
                   <span className="text-[10px] font-normal opacity-80">HyFlex</span>
                </div>
              )}
              {(currentMix.ip + currentMix.on + currentMix.hf === 0) && (
                 <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No selection</div>
              )}
           </div>
        </CardContent>
      </Card>

      {/* 2. Assessment Matrix Heatmap */}
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
                <div className={`py-1 rounded-sm ${getCellColor(key, 'in-person')}`}></div>
                <div className={`py-1 rounded-sm ${getCellColor(key, 'blended')}`}></div>
                <div className={`py-1 rounded-sm ${getCellColor(key, 'online')}`}></div>
                <div className={`py-1 rounded-sm ${getCellColor(key, 'hyflex')}`}></div>
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 4. Deviation from Default */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase text-muted-foreground">
            Deviation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
             <div className="flex justify-between text-xs text-muted-foreground">
                <span>Default (In-Person)</span>
                <span>100%</span>
             </div>
             <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400 w-full"></div>
             </div>
          </div>
          
          <div className="space-y-1">
             <div className="flex justify-between text-xs text-muted-foreground">
                <span>Evidence-Based ({scores.recommendation})</span>
                <span>High Fit</span>
             </div>
             <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: scores.recommendation === 'In-Person' ? '100%' : '70%' }}></div>
             </div>
          </div>

          <div className="space-y-1">
             <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current Selection</span>
                <span>{currentMix.ip}% IP</span>
             </div>
             <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${currentMix.ip}%` }}></div>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
