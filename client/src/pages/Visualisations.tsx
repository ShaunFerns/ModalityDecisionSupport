import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModalityState, initialModalityState, scoreModality } from "@/lib/scoring";
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
import { BarChart3, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Visualisations() {
  // Using initial state as example/demo for the visualization page since we don't have a global store
  // In a real app, this would pull from a context or database
  const demoState: ModalityState = {
    ...initialModalityState,
    moduleName: "Demo Module: Advanced Software Engineering",
    moduleCode: "CMPU4010",
    stage: "4",
    activities: { ...initialModalityState.activities, project: true, discussion: true, workshops: true },
    assessments: { ...initialModalityState.assessments, authentic: "Major", presentation: "Minor" },
    resources: { ...initialModalityState.resources, remoteFriendly: true },
    profile: { ...initialModalityState.profile, working: true, digitalConfidence: true },
    staffProfile: { ...initialModalityState.staffProfile, hyflexComfort: "High" } // Updated for new interface
  };
  
  const scores = scoreModality(demoState);

  const radarData = {
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
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">Visualisation Gallery</h1>
            <p className="text-muted-foreground mt-1">Deep dive into visual data patterns across modules and programmes.</p>
          </div>
          <Link href="/module">
             <Button variant="outline"> <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back to Module</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           
           {/* Radar Chart Demo */}
           <Card className="shadow-md">
              <CardHeader>
                 <CardTitle className="text-lg font-bold text-primary">Multi-Dimensional Fit Analysis</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center p-4">
                 <Radar data={radarData} options={{ maintainAspectRatio: false, scales: { r: { suggestedMin: 0, suggestedMax: 100 } } }} />
              </CardContent>
           </Card>

           {/* Heatmap Placeholder / Explanation */}
           <div className="space-y-6">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-primary">Assessment-Modality Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      This visualization (available on individual module pages) maps assessment types against optimal modalities.
                      Green indicates strong alignment, while Red indicates potential risks or mismatch.
                    </p>
                    <div className="grid grid-cols-5 gap-1 text-xs text-center opacity-80">
                       <div className="font-bold text-left pl-2">Type</div>
                       <div className="font-bold">IP</div>
                       <div className="font-bold">Blend</div>
                       <div className="font-bold">Online</div>
                       <div className="font-bold">HyFlex</div>
                       
                       {['Exam', 'Lab', 'Portfolio', 'Group Project'].map((k) => (
                         <React.Fragment key={k}>
                           <div className="text-left pl-2 py-2">{k}</div>
                           <div className="bg-green-500/20 m-1 rounded"></div>
                           <div className="bg-blue-500/20 m-1 rounded"></div>
                           <div className="bg-yellow-500/20 m-1 rounded"></div>
                           <div className="bg-red-500/20 m-1 rounded"></div>
                         </React.Fragment>
                       ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-white">
                 <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                    <BarChart3 className="h-12 w-12 text-secondary" />
                    <h3 className="text-xl font-bold">More Visualisations Coming Soon</h3>
                    <p className="text-blue-100 max-w-md">
                       Future updates will include Programme Coherence Radar, Student Workload Heatmaps, and Comparative Modality Analysis.
                    </p>
                 </CardContent>
              </Card>
           </div>

        </div>
      </div>
    </Layout>
  );
}
