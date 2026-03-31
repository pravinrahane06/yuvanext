import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import VisionMission from "./pages/VisionMission";
import Objectives from "./pages/Objectives";
import Programs from "./pages/Programs";
import Activities from "./pages/Activities";
import ActivityDetail from "./pages/ActivityDetail";
import GetInvolved from "./pages/GetInvolved";
import Donate from "./pages/Donate";
import Transparency from "./pages/Transparency";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateActivity from "./pages/admin/CreateActivity";
import ManageActivities from "./pages/admin/ManageActivities";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageVolunteers from "./pages/admin/ManageVolunteers";
import ManageDonations from "./pages/admin/ManageDonations";

// Auth pages
import JoinUs from "./pages/auth/JoinUs";
import Login from "./pages/auth/Login";

// Dashboards
import UserDashboard from "./pages/user/UserDashboard";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/vision-mission" element={<VisionMission />} />
              <Route path="/objectives" element={<Objectives />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/activities/:id" element={<ActivityDetail />} />
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/contact" element={<Contact />} />

              {/* Admin */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin-create-activity" element={<CreateActivity />} />
              <Route path="/admin-manage-activities" element={<ManageActivities />} />
              <Route path="/admin-users" element={<ManageUsers />} />
              <Route path="/admin-volunteers" element={<ManageVolunteers />} />
              <Route path="/admin-donations" element={<ManageDonations />} />

              {/* Auth */}
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/login" element={<Login />} />

              {/* Dashboards */}
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
