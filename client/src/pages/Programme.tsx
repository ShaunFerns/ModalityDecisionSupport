import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, ArrowUpRight, BarChart3 } from "lucide-react";

export default function Programme() {
  const [selectedProgramme, setSelectedProgramme] = useState("BSc Computer Science");

  // Mock Data for 3 distinct demo modules
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">Programme Dashboard</h1>
            <p className="text-muted-foreground mt-1">Review programme-level coherence and modality distribution.</p>
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

        {/* Placeholder for future aggregated viz */}
        <div className="bg-muted/10 border-2 border-dashed border-gray-200 rounded-lg p-12 flex flex-col items-center justify-center text-center">
           <BarChart3 className="h-12 w-12 text-gray-300 mb-4" />
           <h3 className="text-lg font-medium text-gray-900">Programme Coherence Visualizations</h3>
           <p className="text-muted-foreground max-w-md mt-2">
             Aggregated heatmaps and workload distribution charts will appear here once real module data is connected.
           </p>
        </div>

      </div>
    </Layout>
  );
}
