import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Programme() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Programme Dashboard</h1>
          <span className="text-sm text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">Read Only View</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Programme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">BSc Computer Science</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dominant Modality</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">Blended</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/20 border border-dashed border-gray-300 rounded-lg p-12 text-center">
           <p className="text-muted-foreground">Programme visualizations (Heatmap, Weekly Load, Coherence Radar) will be implemented here using aggregated data from saved module JSONs.</p>
        </div>
      </div>
    </Layout>
  );
}
