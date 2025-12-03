import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, BookOpen, BarChart3, Home as HomeIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: HomeIcon },
    { href: "/module", label: "Module", icon: BookOpen },
    { href: "/programme", label: "Programme", icon: LayoutDashboard },
    { href: "/visualisations", label: "Visualisations", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-primary tracking-tight">MDST</span>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <a
                      className={cn(
                        "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full transition-colors",
                        location === item.href
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:border-gray-300 hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
               <span className="text-xs text-muted-foreground">TU Dublin Modality Tool</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Modality Decision Support Tool. Evidence-based decision support.
          </p>
        </div>
      </footer>
    </div>
  );
}
