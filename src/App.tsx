import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ContactModalProvider } from "@/hooks/use-contact-modal";
import { ThemeProvider } from "@/hooks/use-theme";
import { Preloader } from "@/components/Preloader";
import HomePage from "@/pages/HomePage";
import WorkPage from "@/pages/WorkPage";
import ServicesPage from "@/pages/ServicesPage";
import StoriesPage from "@/pages/StoriesPage";
import CareersPage from "@/pages/CareersPage";
import AwardsPage from "@/pages/AwardsPage";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import CookiePolicy from "@/pages/CookiePolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import NotFoundPage from "@/pages/NotFoundPage";
import ContactModal from "@/components/ContactModal";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/work" component={WorkPage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/stories" component={StoriesPage} />
      <Route path="/story" component={StoriesPage} />
      <Route path="/careers" component={CareersPage} />
      <Route path="/awards" component={AwardsPage} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/privacy_and_policy" component={PrivacyPolicy} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/cookie-policy" component={CookiePolicy} />
      <Route path="/refund-policy" component={RefundPolicy} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ContactModalProvider>
            <Preloader />
            <Router />
            <ContactModal />
            <Toaster />
          </ContactModalProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
