import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InterviewPage from "./pages/InterviewPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const minimizePoehaliIcon = () => {
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
              opacity: 0.015 !important;
              filter: brightness(0.3) !important;
              width: 16px !important;
              height: 16px !important;
              min-width: 16px !important;
              max-width: 16px !important;
              min-height: 16px !important;
              max-height: 16px !important;
              transform: scale(0.25) !important;
              transform-origin: bottom left !important;
              position: fixed !important;
              bottom: 90px !important;
              left: 8px !important;
              pointer-events: none !important;
              z-index: 1 !important;
              font-size: 0 !important;
            `;
          }
        });
      });
    };

    const observer = new MutationObserver(minimizePoehaliIcon);
    observer.observe(document.body, { childList: true, subtree: true });
    
    const interval = setInterval(minimizePoehaliIcon, 100);
    minimizePoehaliIcon();

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
            <Route path="/interview/:slug" element={<InterviewPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;