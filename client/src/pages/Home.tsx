import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BarChart3, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="bg-primary py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
             <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-secondary blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Modality Decision Support Tool
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed">
            Evidence-based support for determining module delivery modality across In-Person, Blended, Online, and HyFlex formats, aligned with programme-level coherence.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/module">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-6 text-base h-auto shadow-lg hover:shadow-xl transition-all border-0 rounded-md">
                Start with a Module
              </Button>
            </Link>
            
            <Link href="/visualisations">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10 font-medium px-8 py-6 text-base h-auto backdrop-blur-sm">
                View Visualisations <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <Link href="/programme">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer overflow-hidden">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Review Programme</h3>
                <p className="text-gray-500 leading-relaxed">
                  View programme-level coherence and weekly load distributions to ensure balanced student workloads.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Card 2 */}
          <Link href="/module">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer overflow-hidden">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Define Module</h3>
                <p className="text-gray-500 leading-relaxed">
                  Input module details, learning activities, and assessments to get an evidence-based modality recommendation.
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Card 3 */}
          <Link href="/visualisations">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group cursor-pointer overflow-hidden">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Visualize</h3>
                <p className="text-gray-500 leading-relaxed">
                  Deep dive into visual data with radar charts, heatmaps, and modality mix analysis.
                </p>
              </CardContent>
            </Card>
          </Link>

        </div>
      </div>
      
      {/* Bottom Info Section */}
      <div className="bg-white border-t py-12 mt-auto">
         <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
               This tool is designed to support collegial discussion and design. There are no approvals or sign-offs required. 
               Decisions are informed by learning design, assessment suitability, learner profile, and resource constraints.
            </p>
         </div>
      </div>
    </div>
  );
}
