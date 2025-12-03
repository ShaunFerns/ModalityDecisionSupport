import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for initial state
const initialModules = [
  { id: 1, code: "CMPU1001", name: "Introduction to Programming" },
  { id: 2, code: "CMPU2045", name: "Cloud Computing Architecture" },
  { id: 3, code: "CMPU3012", name: "User Experience Design" }
];

export default function Programme() {
  const [programmeName, setProgrammeName] = useState("BSc Computer Science");
  const [programmeCode, setProgrammeCode] = useState("TU856");
  const [modules, setModules] = useState(initialModules);
  const [newModuleCode, setNewModuleCode] = useState("");
  const [newModuleName, setNewModuleName] = useState("");

  const handleAddModule = () => {
    if (newModuleCode && newModuleName) {
      const newModule = {
        id: modules.length + 1,
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
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold text-primary">Programme Details</h1>
        
        {/* Programme Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Programme Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="progName">Programme Name</Label>
                <Input 
                  id="progName" 
                  value={programmeName} 
                  onChange={(e) => setProgrammeName(e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="progCode">Programme Code</Label>
                <Input 
                  id="progCode" 
                  value={programmeCode} 
                  onChange={(e) => setProgrammeCode(e.target.value)} 
                />
              </div>
            </div>
            <div className="flex justify-end">
                <Button className="gap-2"><Save className="w-4 h-4" /> Save Programme</Button>
            </div>
          </CardContent>
        </Card>

        {/* Module List Management */}
        <Card>
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
      </div>
    </Layout>
  );
}
