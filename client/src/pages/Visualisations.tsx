import React, { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModalityState, initialModalityState, scoreModality } from "@/lib/scoring";
import { Radar, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
} from "chart.js";
import { BarChart3, ArrowRight, CheckCircle, AlertTriangle, ArrowUpRight, Download } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
);

interface VisModule {
  code: string;
  name: string;
  stage: string;
  credits: number;
  modality: string;
  score: number;
  risk: string;
  contactHours: number;
  learnerProfile: string[];
  resources: string[];
  dimensionScores: {
    learningDesign: number;
    assessment: number;
    learnerProfile: number;
    stageFit: number;
    feasibility: number;
  };
  staffProfile: {
    digitalConfidence: 'Low' | 'Moderate' | 'High';
    onlineExperience: 'None' | 'Some' | 'Substantial';
  };
  assessments: { type: string; role: 'Major' | 'Minor' | 'No' }[];
}

export default function Visualisations() {
  const [selectedProgramme, setSelectedProgramme] = useState("ALL");
  const radarChartRef = useRef<any>(null);
  const modalityStageRef = useRef<any>(null);
  const contactHoursRef = useRef<any>(null);
  const equityRef = useRef<any>(null);
  const resourcesRef = useRef<any>(null);
  const staffRef = useRef<any>(null);
  
  // State for displayed modules based on selection
  const [displayedModules, setDisplayedModules] = useState<VisModule[]>([]);

  // Mock Data Store with enriched fields
  const programmeData: Record<string, VisModule[]> = {
    "BSc Computer Science": [
      { 
        code: "CMPU1001", name: "Introduction to Programming", stage: "1", credits: 5, modality: "In-Person", score: 92, risk: "Low",
        contactHours: 4, learnerProfile: ['commuter'], resources: ['lab'],
        dimensionScores: { learningDesign: 90, assessment: 85, learnerProfile: 80, stageFit: 95, feasibility: 88 },
        staffProfile: { digitalConfidence: 'Moderate', onlineExperience: 'Some' },
        assessments: [{ type: 'exam', role: 'Major' }, { type: 'practical', role: 'Major' }]
      },
      { 
        code: "CMPU2045", name: "Cloud Computing Architecture", stage: "2", credits: 10, modality: "Online", score: 85, risk: "Low",
        contactHours: 2, learnerProfile: ['working', 'digitalAccess'], resources: ['remoteFriendly'],
        dimensionScores: { learningDesign: 85, assessment: 90, learnerProfile: 85, stageFit: 80, feasibility: 92 },
        staffProfile: { digitalConfidence: 'High', onlineExperience: 'Substantial' },
        assessments: [{ type: 'project', role: 'Major' }, { type: 'quiz', role: 'Minor' }]
      },
      { 
        code: "CMPU3012", name: "User Experience Design", stage: "3", credits: 5, modality: "Blended", score: 78, risk: "Medium",
        contactHours: 3, learnerProfile: ['commuter', 'working'], resources: ['studio'],
        dimensionScores: { learningDesign: 75, assessment: 80, learnerProfile: 70, stageFit: 85, feasibility: 78 },
        staffProfile: { digitalConfidence: 'Moderate', onlineExperience: 'Some' },
        assessments: [{ type: 'portfolio', role: 'Major' }, { type: 'presentation', role: 'Major' }]
      }
    ],
    "BA Digital Media": [
      { 
        code: "DIGM1001", name: "Digital Storytelling", stage: "1", credits: 5, modality: "Blended", score: 88, risk: "Low",
        contactHours: 3, learnerProfile: [], resources: ['studio'],
        dimensionScores: { learningDesign: 88, assessment: 85, learnerProfile: 85, stageFit: 90, feasibility: 85 },
        staffProfile: { digitalConfidence: 'High', onlineExperience: 'Some' },
        assessments: [{ type: 'project', role: 'Major' }, { type: 'reflection', role: 'Major' }]
      },
      { 
        code: "DIGM2010", name: "Video Production", stage: "2", credits: 10, modality: "In-Person", score: 95, risk: "Low",
        contactHours: 5, learnerProfile: ['commuter'], resources: ['lab', 'studio'],
        dimensionScores: { learningDesign: 95, assessment: 90, learnerProfile: 88, stageFit: 92, feasibility: 95 },
        staffProfile: { digitalConfidence: 'Moderate', onlineExperience: 'None' },
        assessments: [{ type: 'practical', role: 'Major' }]
      },
      { 
        code: "DIGM3005", name: "Web Aesthetics", stage: "3", credits: 5, modality: "Online", score: 82, risk: "Low",
        contactHours: 2, learnerProfile: ['working'], resources: ['remoteFriendly'],
        dimensionScores: { learningDesign: 80, assessment: 85, learnerProfile: 90, stageFit: 85, feasibility: 82 },
        staffProfile: { digitalConfidence: 'High', onlineExperience: 'Substantial' },
        assessments: [{ type: 'portfolio', role: 'Major' }]
      }
    ],
    "MSc Data Analytics": [
      { 
        code: "DATA9001", name: "Machine Learning", stage: "1", credits: 10, modality: "HyFlex", score: 75, risk: "Medium",
        contactHours: 3, learnerProfile: ['working', 'digitalAccess'], resources: ['hyflexRoom'],
        dimensionScores: { learningDesign: 75, assessment: 70, learnerProfile: 85, stageFit: 78, feasibility: 72 },
        staffProfile: { digitalConfidence: 'High', onlineExperience: 'Some' },
        assessments: [{ type: 'exam', role: 'Major' }, { type: 'project', role: 'Major' }]
      },
      { 
        code: "DATA9002", name: "Big Data Architecture", stage: "1", credits: 10, modality: "Online", score: 90, risk: "Low",
        contactHours: 2, learnerProfile: ['working'], resources: ['remoteFriendly'],
        dimensionScores: { learningDesign: 90, assessment: 92, learnerProfile: 95, stageFit: 88, feasibility: 90 },
        staffProfile: { digitalConfidence: 'High', onlineExperience: 'Substantial' },
        assessments: [{ type: 'exam', role: 'Major' }]
      }
    ]
  };

  // Update data when selection changes
  useEffect(() => {
    if (selectedProgramme === "ALL") {
        const allModules = Object.values(programmeData).flat();
        setDisplayedModules(allModules);
    } else if (programmeData[selectedProgramme]) {
      setDisplayedModules(programmeData[selectedProgramme]);
    }
  }, [selectedProgramme]);

  // Function to download chart as PNG
  const downloadChart = (ref: any, name: string) => {
    if (ref.current) {
      const link = document.createElement('a');
      link.download = `${name}.png`;
      link.href = ref.current.toBase64Image();
      link.click();
    }
  };

  // --- Aggregation Logic ---

  // Visual 1: Modality mix by stage
  const stages = Array.from(new Set(displayedModules.map(m => m.stage))).sort();
  const modalityMixData = {
    labels: stages.map(s => `Stage ${s}`),
    datasets: ['In-Person', 'Blended', 'Online', 'HyFlex'].map(modality => ({
      label: modality,
      data: stages.map(stage => displayedModules.filter(m => m.stage === stage && m.modality === modality).length),
      backgroundColor: modality === 'In-Person' ? '#005587' : modality === 'Blended' ? '#66CCFF' : modality === 'Online' ? '#48BB78' : '#9F7AEA',
    }))
  };

  // Visual 2: Weekly contact hours by stage
  const contactHoursData = {
    labels: stages.map(s => `Stage ${s}`),
    datasets: [{
      label: 'Avg Contact Hours',
      data: stages.map(stage => {
        const mods = displayedModules.filter(m => m.stage === stage);
        return mods.length ? Math.round(mods.reduce((sum, m) => sum + m.contactHours, 0) / mods.length) : 0;
      }),
      backgroundColor: '#005587',
    }]
  };

  // Visual 3: Equity profile by stage (Learner Profile flags)
  const equityFlags = ['commuter', 'working', 'digitalAccess'];
  const equityData = {
    labels: stages.map(s => `Stage ${s}`),
    datasets: equityFlags.map((flag, i) => ({
      label: flag.charAt(0).toUpperCase() + flag.slice(1),
      data: stages.map(stage => displayedModules.filter(m => m.stage === stage && m.learnerProfile.includes(flag)).length),
      backgroundColor: ['#F6E05E', '#F6AD55', '#FC8181'][i],
    }))
  };

  // Visual 4: Specialist resource demand
  const resourceTypes = ['lab', 'studio', 'hyflexRoom', 'remoteFriendly'];
  const resourceData = {
    labels: resourceTypes.map(r => r.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())),
    datasets: [{
      label: 'Modules Requiring',
      data: resourceTypes.map(r => displayedModules.filter(m => m.resources.includes(r)).length),
      backgroundColor: '#66CCFF',
      indexAxis: 'y' as const,
    }]
  };

  // Visual 5: Programme alignment profile (Average Radar)
  const avgDimensions = displayedModules.length > 0 ? {
    learningDesign: displayedModules.reduce((sum, m) => sum + m.dimensionScores.learningDesign, 0) / displayedModules.length,
    assessment: displayedModules.reduce((sum, m) => sum + m.dimensionScores.assessment, 0) / displayedModules.length,
    learnerProfile: displayedModules.reduce((sum, m) => sum + m.dimensionScores.learnerProfile, 0) / displayedModules.length,
    stageFit: displayedModules.reduce((sum, m) => sum + m.dimensionScores.stageFit, 0) / displayedModules.length,
    feasibility: displayedModules.reduce((sum, m) => sum + m.dimensionScores.feasibility, 0) / displayedModules.length,
  } : { learningDesign: 0, assessment: 0, learnerProfile: 0, stageFit: 0, feasibility: 0 };

  const radarData = {
    labels: ["Learning Activities", "Assessment Types", "Learner Profile", "Stage Fit", "Resources & Staff"],
    datasets: [
      {
        label: "Programme Average",
        data: [avgDimensions.learningDesign, avgDimensions.assessment, avgDimensions.learnerProfile, avgDimensions.stageFit, avgDimensions.feasibility],
        backgroundColor: "rgba(0, 85, 135, 0.2)",
        borderColor: "rgba(0, 85, 135, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Target Zone (80+)",
        data: [80, 80, 80, 80, 80],
        borderColor: "rgba(0,0,0,0.1)",
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      }
    ]
  };

  // Visual 6: Staff digital readiness
  const staffConfidenceData = {
    labels: ['Low', 'Moderate', 'High'],
    datasets: [{
      data: ['Low', 'Moderate', 'High'].map(l => displayedModules.filter(m => m.staffProfile.digitalConfidence === l).length),
      backgroundColor: ['#FC8181', '#F6AD55', '#68D391'],
    }]
  };

  // Visual 7: Assessment–modality pattern (Matrix calculation)
  const assessmentTypes = ['exam', 'project', 'portfolio', 'practical', 'presentation', 'reflection', 'quiz'];
  const modalities = ['In-Person', 'Blended', 'Online', 'HyFlex'];
  
  const assessmentMatrix = assessmentTypes.map(type => {
    return modalities.map(mod => {
      return displayedModules.filter(m => m.modality === mod && m.assessments.some(a => a.type === type && a.role === 'Major')).length;
    });
  });


  // KPIs
  const totalModules = displayedModules.length;
  const highRiskModules = displayedModules.filter(m => m.risk === 'High' || m.risk === 'Medium').length;
  const modalityCounts = displayedModules.reduce((acc, m) => {
    acc[m.modality] = (acc[m.modality] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sortedModalities = Object.entries(modalityCounts).sort((a, b) => b[1] - a[1]);
  const dominantModality = sortedModalities.length > 0 ? sortedModalities[0][0] : "N/A";
  const dominantPercentage = totalModules > 0 ? Math.round((modalityCounts[dominantModality] / totalModules) * 100) : 0;

  return (
    <Layout>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Section 1: Programme Dashboard */}
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
                  <SelectItem value="ALL">All Programmes</SelectItem>
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
                <div className="text-3xl font-bold text-primary mt-2">{totalModules}</div>
                <div className="text-xs text-green-600 mt-1 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> All defined</div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-secondary shadow-sm">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground uppercase">Dominant Modality</div>
                <div className="text-3xl font-bold text-secondary mt-2">{dominantModality}</div>
                <div className="text-xs text-muted-foreground mt-1">{dominantPercentage}% of modules</div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-yellow-500 shadow-sm">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground uppercase">Risk Review</div>
                <div className="text-3xl font-bold text-yellow-600 mt-2">{highRiskModules}</div>
                <div className="text-xs text-yellow-600 mt-1 flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> Review required</div>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-green-500 shadow-sm">
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground uppercase">Avg. Contact Hours</div>
                <div className="text-3xl font-bold text-green-600 mt-2">
                   {totalModules > 0 ? Math.round(displayedModules.reduce((sum, m) => sum + m.contactHours, 0) / totalModules) : 0}h
                </div>
                <div className="text-xs text-muted-foreground mt-1">Per week (Avg)</div>
              </CardContent>
            </Card>
          </div>

          {/* Module List Table */}
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
                    {displayedModules.map((m, i) => (
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

        {/* Section 2: Deep Dive Analysis */}
        <div className="space-y-8 pt-8 border-t">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Deep Dive Analysis</h2>
             <Link href="/module">
               <Button variant="outline"> <ArrowRight className="mr-2 h-4 w-4 rotate-180" /> Back to Module</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             
             {/* Visual 1: Modality Mix by Stage */}
             <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Modality Mix by Stage</CardTitle>
                   <Button variant="ghost" size="icon" onClick={() => downloadChart(modalityStageRef, 'modality-mix')}><Download className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                   <Bar ref={modalityStageRef} data={modalityMixData} options={{ maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }} />
                </CardContent>
             </Card>

             {/* Visual 2: Contact Hours by Stage */}
             <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Avg Contact Hours by Stage</CardTitle>
                   <Button variant="ghost" size="icon" onClick={() => downloadChart(contactHoursRef, 'contact-hours')}><Download className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                   <Bar ref={contactHoursRef} data={contactHoursData} options={{ maintainAspectRatio: false }} />
                </CardContent>
             </Card>

             {/* Visual 3: Equity Profile */}
             <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Equity Profile by Stage</CardTitle>
                   <Button variant="ghost" size="icon" onClick={() => downloadChart(equityRef, 'equity-profile')}><Download className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                   <Bar ref={equityRef} data={equityData} options={{ maintainAspectRatio: false }} />
                </CardContent>
             </Card>

             {/* Visual 4: Specialist Resource Demand */}
             <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Resource Demand</CardTitle>
                   <Button variant="ghost" size="icon" onClick={() => downloadChart(resourcesRef, 'resource-demand')}><Download className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                   <Bar ref={resourcesRef} data={resourceData} options={{ maintainAspectRatio: false, indexAxis: 'y' }} />
                </CardContent>
             </Card>

             {/* Visual 5: Programme Alignment Radar */}
             <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Programme Alignment</CardTitle>
                   <Button variant="ghost" size="icon" onClick={() => downloadChart(radarChartRef, 'programme-radar')}><Download className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                   <Radar ref={radarChartRef} data={radarData} options={{ maintainAspectRatio: false, scales: { r: { suggestedMin: 0, suggestedMax: 100 } } }} />
                </CardContent>
             </Card>

             {/* Visual 6: Staff Digital Readiness */}
             <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                   <CardTitle className="text-sm font-bold uppercase text-muted-foreground">Staff Digital Confidence</CardTitle>
                   <Button variant="ghost" size="icon" onClick={() => downloadChart(staffRef, 'staff-readiness')}><Download className="w-4 h-4" /></Button>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center">
                   <Doughnut ref={staffRef} data={staffConfidenceData} options={{ maintainAspectRatio: false }} />
                </CardContent>
             </Card>

          </div>

          {/* Visual 7: Assessment Matrix */}
          <Card className="shadow-sm mt-6">
             <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold text-gray-800">Major Assessment Types vs. Recommended Modality</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="overflow-x-auto">
                   <table className="w-full text-sm border-collapse">
                      <thead>
                         <tr className="bg-gray-50">
                            <th className="p-2 text-left border font-medium text-gray-500">Assessment Type</th>
                            {modalities.map(m => <th key={m} className="p-2 text-center border font-medium text-gray-500">{m}</th>)}
                         </tr>
                      </thead>
                      <tbody>
                         {assessmentTypes.map((type, i) => (
                            <tr key={type}>
                               <td className="p-2 border font-medium capitalize">{type}</td>
                               {assessmentMatrix[i].map((count, j) => (
                                  <td key={j} className="p-2 border text-center">
                                     {count > 0 ? (
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                           count >= 3 ? 'bg-blue-600 text-white' : 
                                           count >= 2 ? 'bg-blue-400 text-white' : 
                                           'bg-blue-100 text-blue-800'
                                        }`}>
                                           {count}
                                        </span>
                                     ) : <span className="text-gray-300">-</span>}
                                  </td>
                               ))}
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </CardContent>
          </Card>

        </div>

      </div>
    </Layout>
  );
}
