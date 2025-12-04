import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Module from "@/pages/Module";
import Programme from "@/pages/Programme";
import Visualisations from "@/pages/Visualisations";
import Evidence from "@/pages/Evidence";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/module" component={Module} />
      <Route path="/programme" component={Programme} />
      <Route path="/visualisations" component={Visualisations} />
      <Route path="/evidence" component={Evidence} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
