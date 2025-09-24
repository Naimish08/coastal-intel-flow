import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import ReportHazard from "./pages/ReportHazard";
import LiveMap from "./pages/LiveMap";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen">
              <Navigation />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/report" element={<ReportHazard />} />
                <Route path="/map" element={<LiveMap />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/community" element={<Community />} />
                <Route path="/login" element={<Login />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Footer */}
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
