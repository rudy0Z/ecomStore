import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { Navigation } from "@/components/layout/Navigation";
import { ShoppingCart } from "@/components/store/ShoppingCart";
import { LandingPage } from "@/pages/LandingPage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { OffersPage } from "@/pages/OffersPage";
import { WishlistPage } from "@/pages/WishlistPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ShoppingCart />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
