import React, { useState } from "react";
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
import { BarChart3, ArrowRight, CheckCircle, AlertTriangle, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Visualisations() {
  const [selectedProgramme, setSelectedProgramme] = useState("BSc Computer Science");

  // Mock Data for 3 distinct demo modules (Moved from old Programme page)
  const modules = [
    { 
      code: "CMPU1001", 
      name: "Introduction to Programming", 
      stage: "1", 
      credits: 5, 
      modality: "In-Person", 
      score: 92, 
      risk: "Low" 
    },
    { 
      code: "CMPU2045", 
      name: "Cloud Computing Architecture", 
      stage: "2", 
      credits: 10, 
      modality: "Online", 
      score: 85, 
      risk: "Low" 
    },
    { 
      code: "CMPU3012", 
      name: "User Experience Design", 
      stage: "3", 
      credits: 5, 
      modality: "Blended", 
      score: 78, 
      risk: "Medium" 
    }
  ];

  // Using initial state as example/demo for the visualization page
  const demoState: ModalityState = {
    ...initialModalityState,
    moduleName: "Demo Module: Advanced Software Engineering",
    moduleCode: "CMPU4010",
    stage: "4",
    activities: { ...initialModalityState.activities, project: true, discussion: true, workshops: true },
    assessments: { ...initialModalityState.assessments, authentic: "Major", presentation: "Minor" },
    resources: { ...initialModalityState.resources, remoteFriendly: true },
    profile: { ...initialModalityState.profile, working: true, digitalConfidence: true },
    staffProfile: { ...initialModalityState.staffProfile, hyflexComfort: "High" }
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
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Section 1: Programme Dashboard (Moved from Programme Page) */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-primary tracking-tight">Visualisation & Dashboard</h1>
              <p className="text-muted-foreground mt-1">Programme-level dashboard and deep-dive visualisations.</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedProgramme} onValueChange={setSelectedProgramme}>
                <SelectTrigger className="w-[280px] bg-white shadow-sm">
                  <SelectValue placeholder="Select Programme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BSc Computer Science">BSc Computer Science</SelectItem>
                  <SelectItem value="BA Digital Media">BA Digital Media</SelectItem>
                  <SelectItem value="MSc Data Analytics">MSc Data Analytics</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary">Export Report</Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-t-4 border-t-primary shadow-sm">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground uppercase">Total Modules</div>
                <div className="text-3xl font-bold text-primary mt-2">12</div>
                <div className="text-xs text-green-600 mt-1 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> All defined</div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-secondary shadow-sm">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground uppercase">Dominant Modality</div>
                <div className="text-3xl font-bold text-secondary mt-2">Blended</div>
                <div className="text-xs text-muted-foreground mt-1">45% of modules</div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-yellow-500 shadow-sm">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground uppercase">High Risk Modules</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">2</div>
                <div className="text-xs text-yellow-600 mt-1 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> Review required</div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-green-500 shadow-sm">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground uppercase">Avg. Student Load</div>
                <div className="text-3xl font-bold text-green-600 mt-2">18h</div>
                <div className="text-xs text-muted-foreground mt-1">Per week (Contact)</div>
              </CardContent>
            </Card>
          </div>

          {/* Module List / Matrix Placeholder */}
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg font-bold text-gray-800">Module Modality Status</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3">Module Code</th>
                      <th className="px-6 py-3">Module Name</th>
                      <th className="px-6 py-3">Stage</th>
                      <th className="px-6 py-3">Credits</th>
                      <th className="px-6 py-3">Rec. Modality</th>
                      <th className="px-6 py-3">Fit Score</th>
                      <th className="px-6 py-3">Risk Level</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {modules.map((m, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{m.code}</td>
                        <td className="px-6 py-4 text-gray-600">{m.name}</td>
                        <td className="px-6 py-4 text-gray-500">Stage {m.stage}</td>
                        <td className="px-6 py-4 text-gray-500">{m.credits}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${m.modality === 'In-Person' ? 'bg-blue-100 text-blue-800' : 
                              m.modality === 'Online' ? 'bg-green-100 text-green-800' : 
                              m.modality === 'Blended' ? 'bg-cyan-100 text-cyan-800' : 
                              'bg-purple-100 text-purple-800'}`}>
                            {m.modality}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-700">{m.score}%</td>
                        <td className="px-6 py-4">
                           {m.risk === 'High' && <span className="text-red-600 font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> High</span>}
                           {m.risk === 'Medium' && <span className="text-yellow-600 font-medium">Medium</span>}
                           {m.risk === 'Low' && <span className="text-green-600 font-medium">Low</span>}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowUpRight className="h-4 w-4 text-gray-400" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 2: Deep Dive Visualisations */}
        <div className="space-y-8 pt-8 border-t">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Deep Dive Analysis</h2>
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

      </div>
    </Layout>
  );
}
