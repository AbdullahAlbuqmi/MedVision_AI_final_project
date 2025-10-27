import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Doctor from "./pages/Doctor";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import HealthAssistant from "./pages/HealthAssistant";
import AdvancedClinicalChat from "./pages/AdvancedClinicalChat";
import Dermatology from "./pages/Dermatology";
import DrugInteractions from "./pages/DrugInteractions";
import DrugDescription from "./pages/DrugDescription";
import ChestXray from "./pages/ChestXray";
import KidneyAnalysis from "./pages/KidneyAnalysis";
import Ophthalmology from "./pages/Ophthalmology";
import BrainAnalysis from "./pages/BrainAnalysis";
import NotFound from "./pages/NotFound";
import { initializeAuth } from "./lib/auth";
import { initTheme } from "./lib/theme";
import { setLanguage, getLanguage } from "./lib/i18n";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize auth with seeded admin user
    initializeAuth();
    
    // Initialize theme
    initTheme();
    
    // Initialize language and direction
    const lang = getLanguage();
    setLanguage(lang);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/health-assistant" element={<HealthAssistant />} />
            <Route path="/advanced-clinical-chat" element={<AdvancedClinicalChat />} />
            <Route path="/dermatology" element={<Dermatology />} />
            <Route path="/drug-interactions" element={<DrugInteractions />} />
            <Route path="/drug-description" element={<DrugDescription />} />
            <Route path="/chest-xray" element={<ChestXray />} />
            <Route path="/kidney-analysis" element={<KidneyAnalysis />} />
            <Route path="/ophthalmology" element={<Ophthalmology />} />
            <Route path="/brain-analysis" element={<BrainAnalysis />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
