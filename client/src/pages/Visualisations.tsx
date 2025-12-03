import React from "react";
import { Layout } from "@/components/Layout";

export default function Visualisations() {
  return (
    <Layout>
       <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">Visualisations Exploration</h1>
        <p className="text-muted-foreground">Deep dive into visual data across modules and programmes.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border">
              <span className="text-muted-foreground">Multi-module Radar Comparison</span>
           </div>
           <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border">
              <span className="text-muted-foreground">Full-screen Modality Heatmap</span>
           </div>
        </div>
      </div>
    </Layout>
  );
}
