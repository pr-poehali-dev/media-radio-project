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
      const selectors = [
        'a[href*="poehali"]',
        'a[href="https://poehali.dev"]',
        'a[target="_blank"]',
        '[id*="pp-"]',
        '[class*="pp-"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          const href = (el as HTMLAnchorElement).href;
          if (href && href.includes('poehali')) {
            (el as HTMLElement).style.cssText = `
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              width: 0 !important;
              height: 0 !important;
              position: fixed !important;
              top: -9999px !important;
              left: -9999px !important;
              pointer-events: none !important;
              z-index: -1 !important;
            `;
            el.remove();
          }
        });
      });
    };

    const observer = new MutationObserver(hidePoehaliIcon);
    observer.observe(document.body, { childList: true, subtree: true });
    
    const interval = setInterval(hidePoehaliIcon, 100);
    hidePoehaliIcon();

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
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