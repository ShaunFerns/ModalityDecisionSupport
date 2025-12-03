import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, BookOpen, BarChart3, Home as HomeIcon, Layers, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/module", label: "Modules", icon: BookOpen },
    { href: "/programme", label: "Programme", icon: Settings },
    { href: "/visualisations", label: "Visualisations", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-primary text-white sticky top-0 z-50 shadow-md border-b border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3 mr-8">
              <div className="bg-secondary/20 p-1.5 rounded-md">
                 <Layers className="h-6 w-6 text-secondary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">MDST Tool</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              
              {/* Home Button (Distinct Style) */}
              <Link href="/">
                <a className={cn(
                  "inline-flex items-center px-4 py-2 rounded-md text-sm font-bold transition-all duration-200 shadow-sm",
                  location === "/" 
                    ? "bg-secondary text-white hover:bg-secondary/90" 
                    : "bg-secondary text-white hover:bg-secondary/90" // Always button style for Home
                )}>
                  <LayoutDashboard className="w-4 h-4 mr-2" /> {/* Using Grid/Dashboard icon for Home button as per ref, or HomeIcon */}
                  Home
                </a>
              </Link>

              {/* Other Nav Items */}
              {navItems.map((item) => {
                 const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
                 return (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={cn(
                        "inline-flex items-center text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4 mr-2", isActive ? "text-white" : "text-white/70")} />
                      {item.label}
                    </a>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Placeholder (Optional) */}
            <div className="md:hidden">
               <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  Menu
               </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
          {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Curriculum Insight Suite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
