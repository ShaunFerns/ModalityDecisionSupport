import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BarChart3, FileText, Settings, Plus, BookOpen, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-primary py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
             <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                Curriculum Insight Suite
              </h1>
              <p className="text-lg text-blue-100 max-w-2xl">
                Evidence-based modality decision support for programme design.
              </p>
            </div>
            <Link href="/programme?mode=new">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold shadow-lg hover:shadow-xl transition-all border-0 rounded-md gap-2">
                <Plus className="h-5 w-5" /> Create New Programme
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pb-12 space-y-8">
        
        {/* Recent Programmes Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" /> Recent Programmes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mock Programme 1 */}
            <Link href="/programme">
              <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-primary group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-blue-50 text-primary border-blue-100 mb-2">TU856</Badge>
                    <Settings className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">BSc Computer Science</CardTitle>
                  <CardDescription>4 Year Degree • School of CS</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> 3 Modules</span>
                    <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> Stage 1</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 text-xs text-gray-400">
                  Last edited 2 hours ago
                </CardFooter>
              </Card>
            </Link>

            {/* Mock Programme 2 */}
            <Link href="/programme">
              <Card className="hover:shadow-md transition-all cursor-pointer border-l-4 border-l-secondary group">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-cyan-50 text-secondary border-cyan-100 mb-2">TU857</Badge>
                    <Settings className="h-4 w-4 text-gray-400 group-hover:text-secondary transition-colors" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-secondary transition-colors">MSc Data Analytics</CardTitle>
                  <CardDescription>1 Year Masters • School of CS</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> 12 Modules</span>
                    <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> PG</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 text-xs text-gray-400">
                  Last edited 1 day ago
                </CardFooter>
              </Card>
            </Link>

            {/* Add New Card */}
            <Link href="/programme?mode=new">
              <Card className="hover:shadow-md transition-all cursor-pointer border-dashed border-2 border-gray-200 bg-gray-50/50 flex flex-col items-center justify-center h-full min-h-[180px] hover:border-primary/50 hover:bg-blue-50/30 group">
                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-3 group-hover:border-primary/50 group-hover:text-primary transition-all">
                  <Plus className="h-6 w-6 text-gray-400 group-hover:text-primary" />
                </div>
                <h3 className="font-medium text-gray-600 group-hover:text-primary">Add New Programme</h3>
              </Card>
            </Link>
          </div>
        </div>

        {/* Quick Actions / Tools */}
        <div className="space-y-4 pt-8 border-t">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" /> Tools & Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/module">
              <Card className="hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary">Module Modality Tool</h3>
                    <p className="text-sm text-gray-500">Quick access to decision tool</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            
            <Link href="/visualisations">
              <Card className="hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary">Visualisations</h3>
                    <p className="text-sm text-gray-500">View aggregate data</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-border py-8 mt-auto">
         <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
               &copy; 2025 Curriculum Insight Suite. All rights reserved.
            </p>
         </div>
      </footer>
    </div>
  );
}
