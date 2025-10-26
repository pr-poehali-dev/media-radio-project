import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const hidePoehaliIcon = () => {
      const links = document.querySelectorAll('a[href*="poehali"]');
      links.forEach((link) => {
        (link as HTMLElement).style.cssText = `
          opacity: 0.03 !important;
          width: 20px !important;
          height: 20px !important;
          transform: scale(0.25) !important;
          pointer-events: none !important;
          z-index: 1 !important;
          position: fixed !important;
          bottom: 12px !important;
          right: 12px !important;
        `;
        const children = link.querySelectorAll('*');
        children.forEach((child) => {
          (child as HTMLElement).style.cssText = `
            width: 16px !important;
            height: 16px !important;
            max-width: 16px !important;
            max-height: 16px !important;
          `;
        });
      });
    };

    const observer = new MutationObserver(hidePoehaliIcon);
    observer.observe(document.body, { childList: true, subtree: true });
    
    hidePoehaliIcon();
    setTimeout(hidePoehaliIcon, 100);
    setTimeout(hidePoehaliIcon, 500);
    setTimeout(hidePoehaliIcon, 1000);

    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;