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
          opacity: 0.01 !important;
          width: 8px !important;
          height: 8px !important;
          min-width: 8px !important;
          max-width: 8px !important;
          min-height: 8px !important;
          max-height: 8px !important;
          transform: scale(0.1) !important;
          transform-origin: top left !important;
          pointer-events: none !important;
          z-index: 1 !important;
          position: fixed !important;
          top: 4px !important;
          left: 4px !important;
          font-size: 0px !important;
          overflow: hidden !important;
        `;
        const children = link.querySelectorAll('*');
        children.forEach((child) => {
          (child as HTMLElement).style.cssText = `
            width: 6px !important;
            height: 6px !important;
            max-width: 6px !important;
            max-height: 6px !important;
            min-width: 6px !important;
            min-height: 6px !important;
          `;
        });
      });
    };

    const observer = new MutationObserver(hidePoehaliIcon);
    observer.observe(document.body, { childList: true, subtree: true });
    
    hidePoehaliIcon();
    setTimeout(hidePoehaliIcon, 50);
    setTimeout(hidePoehaliIcon, 100);
    setTimeout(hidePoehaliIcon, 300);
    setTimeout(hidePoehaliIcon, 500);
    setTimeout(hidePoehaliIcon, 1000);
    setTimeout(hidePoehaliIcon, 2000);

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