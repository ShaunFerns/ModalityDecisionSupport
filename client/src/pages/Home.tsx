import React from "react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, LayoutDashboard, BarChart3, Info } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Modality Decision Support Tool
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-muted-foreground">
          Evidence-based support for determining module delivery modality across In-Person, Blended, Online, and HyFlex formats, aligned with programme-level coherence.
        </p>
      </section>

      {/* Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/module">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-primary h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Start with a Module
              </CardTitle>
              <CardDescription>
                Get an evidence-based modality recommendation for a single module.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full group">
                Go to Module Tool <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/programme">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-secondary h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-secondary" />
                Review a Programme
              </CardTitle>
              <CardDescription>
                View programme-level coherence and weekly load distributions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group">
                View Dashboard <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/visualisations">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-t-4 border-t-accent-foreground h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-accent-foreground" />
                Explore Visualisations
              </CardTitle>
              <CardDescription>
                Deep dive into visual data across modules and programmes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full group">
                See Charts <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* How it works */}
      <section className="bg-muted/30 rounded-xl p-8 border border-border">
        <div className="flex items-start gap-4">
          <Info className="h-8 w-8 text-primary shrink-0 mt-1" />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">How this tool works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Evidence-Based Decisions</h3>
                <p className="text-sm text-muted-foreground">
                  Module decisions are informed by learning design, assessment suitability, learner profile, stage appropriateness, and resource constraints.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Programme Coherence</h3>
                <p className="text-sm text-muted-foreground">
                  The programme view allows teams to see how individual module decisions aggregate into a coherent student experience with balanced weekly loads.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">Collegial Support</h3>
                <p className="text-sm text-muted-foreground">
                  There are no approvals or sign-offs in this tool. It is designed to support collegial discussion and design, not hierarchical control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
