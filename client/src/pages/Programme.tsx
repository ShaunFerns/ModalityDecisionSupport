import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, ArrowRight, Edit, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";

// Interfaces
interface Module {
  id: number;
  code: string;
  name: string;
}

interface Programme {
  id: string;
  name: string;
  code: string;
  modules: Module[];
  lastModified: string;
}

// Mock data for initial state
const initialModules = [
  { id: 1, code: "CMPU1001", name: "Introduction to Programming" },
  { id: 2, code: "CMPU2045", name: "Cloud Computing Architecture" },
  { id: 3, code: "CMPU3012", name: "User Experience Design" }
];

// Mock saved programmes
const initialSavedProgrammes: Programme[] = [
  {
    id: "prog-1",
    name: "BSc Computer Science",
    code: "TU856",
    modules: initialModules,
    lastModified: new Date().toISOString()
  },
  {
    id: "prog-2",
    name: "MSc Data Analytics",
    code: "TU999",
    modules: [
      { id: 1, code: "DATA9001", name: "Machine Learning" },
      { id: 2, code: "DATA9002", name: "Big Data Architecture" }
    ],
    lastModified: new Date(Date.now() - 86400000).toISOString() // Yesterday
  }
];

export default function Programme() {
  // State for the list of programmes
  const [savedProgrammes, setSavedProgrammes] = useState<Programme[]>(initialSavedProgrammes);
  const [currentProgrammeId, setCurrentProgrammeId] = useState<string | null>("prog-1");

  // Form State
  const [programmeName, setProgrammeName] = useState("BSc Computer Science");
  const [programmeCode, setProgrammeCode] = useState("TU856");
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [newModuleCode, setNewModuleCode] = useState("");
  const [newModuleName, setNewModuleName] = useState("");

  // Load programme into form when selected
  const loadProgramme = (prog: Programme) => {
    setCurrentProgrammeId(prog.id);
    setProgrammeName(prog.name);
    setProgrammeCode(prog.code);
    setModules(prog.modules);
  };

  const handleNewProgramme = () => {
    setCurrentProgrammeId(null);
    setProgrammeName("");
    setProgrammeCode("");
    setModules([]);
    setNewModuleCode("");
    setNewModuleName("");
  };

  const handleSaveProgramme = () => {
    if (!programmeName || !programmeCode) return;

    const newProgramme: Programme = {
      id: currentProgrammeId || `prog-${Date.now()}`,
      name: programmeName,
      code: programmeCode,
      modules: modules,
      lastModified: new Date().toISOString()
    };

    if (currentProgrammeId) {
      // Update existing
      setSavedProgrammes(prev => prev.map(p => p.id === currentProgrammeId ? newProgramme : p));
    } else {
      // Create new
      setSavedProgrammes(prev => [newProgramme, ...prev]);
      setCurrentProgrammeId(newProgramme.id);
    }
  };

  const handleDeleteProgramme = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedProgrammes(prev => prev.filter(p => p.id !== id));
    if (currentProgrammeId === id) {
      handleNewProgramme();
    }
  };

  const handleAddModule = () => {
    if (newModuleCode && newModuleName) {
      const newModule = {
        id: Date.now(),
        code: newModuleCode,
        name: newModuleName
      };
      setModules([...modules, newModule]);
      setNewModuleCode("");
      setNewModuleName("");
    }
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter(m => m.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary">Programme Management</h1>
          <Button onClick={handleNewProgramme} className="gap-2">
            <Plus className="w-4 h-4" /> New Programme
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar: Programme List */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Programmes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savedProgrammes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No programmes saved yet.</p>
                ) : (
                  savedProgrammes.map((prog) => (
                    <div 
                      key={prog.id}
                      onClick={() => loadProgramme(prog)}
                      className={`
                        group flex items-center justify-between p-3 rounded-md border cursor-pointer transition-all
                        ${currentProgrammeId === prog.id 
                          ? "bg-primary/5 border-primary ring-1 ring-primary" 
                          : "bg-white hover:bg-slate-50 border-slate-200"}
                      `}
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="font-medium text-sm truncate">{prog.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="font-mono bg-slate-100 px-1 rounded">{prog.code}</span>
                          <span>• {prog.modules.length} modules</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button 
                           variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                           onClick={(e) => handleDeleteProgramme(prog.id, e)}
                         >
                           <Trash2 className="h-3 w-3" />
                         </Button>
                         <ChevronRight className={`h-4 w-4 ${currentProgrammeId === prog.id ? "text-primary" : "text-slate-300"}`} />
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content: Programme Editor */}
          <div className="lg:col-span-8 space-y-6">
            {/* Programme Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>{currentProgrammeId ? "Edit Programme" : "Create New Programme"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="progName">Programme Name</Label>
                    <Input 
                      id="progName" 
                      value={programmeName} 
                      onChange={(e) => setProgrammeName(e.target.value)} 
                      placeholder="e.g. BSc Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="progCode">Programme Code</Label>
                    <Input 
                      id="progCode" 
                      value={programmeCode} 
                      onChange={(e) => setProgrammeCode(e.target.value)} 
                      placeholder="e.g. TU856"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                    <Button onClick={handleSaveProgramme} className="gap-2" disabled={!programmeName || !programmeCode}>
                      <Save className="w-4 h-4" /> {currentProgrammeId ? "Update Programme" : "Save Programme"}
                    </Button>
                </div>
              </CardContent>
            </Card>

            {/* Module List Management */}
            <Card className={!currentProgrammeId && !programmeName ? "opacity-50 pointer-events-none" : ""}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Programme Modules</CardTitle>
                <span className="text-sm text-muted-foreground">{modules.length} Modules</span>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Add Module Form */}
                <div className="flex flex-col md:flex-row gap-4 items-end bg-muted/20 p-4 rounded-md">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="newCode">Module Code</Label>
                    <Input 
                      id="newCode" 
                      placeholder="e.g. CMPU1010" 
                      value={newModuleCode}
                      onChange={(e) => setNewModuleCode(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 flex-[2]">
                    <Label htmlFor="newName">Module Name</Label>
                    <Input 
                      id="newName" 
                      placeholder="e.g. Advanced Algorithms" 
                      value={newModuleName}
                      onChange={(e) => setNewModuleName(e.target.value)}
                    />
                  </div>
                  <Button onClick={handleAddModule} disabled={!newModuleCode || !newModuleName}>
                    <Plus className="w-4 h-4 mr-2" /> Add Module
                  </Button>
                </div>

                {/* Module List Table */}
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-500 font-medium uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3">Code</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {modules.map((module) => (
                        <tr key={module.id} className="hover:bg-gray-50/50">
                          <td className="px-4 py-3 font-medium">{module.code}</td>
                          <td className="px-4 py-3">{module.name}</td>
                          <td className="px-4 py-3 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleRemoveModule(module.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {modules.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                            No modules added yet. Use the form above to add modules.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </CardContent>
            </Card>

            {/* Save and Continue Button */}
            <div className="flex justify-end pt-4 border-t">
              <Link href="/module">
                <Button size="lg" className="gap-2">Save and Continue to Modules <ArrowRight className="w-4 h-4" /></Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </Layout>
  );
}
