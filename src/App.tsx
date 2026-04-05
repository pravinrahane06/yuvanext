import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
import ManageCampaigns from "./pages/admin/ManageCampaigns";
import AdminReports from "./pages/admin/AdminReports";
import AdminEmail from "./pages/admin/AdminEmail";
import AdminReceipts from "./pages/admin/AdminReceipts";

// Public campaign & donation pages
import Campaigns from "./pages/Campaigns";
import CampaignDetail from "./pages/CampaignDetail";
import DonatePage from "./pages/DonatePage";
import DonationSuccess from "./pages/DonationSuccess";

// New NGO feature pages
import SupporterWall from "./pages/SupporterWall";
import Fundraising from "./pages/Fundraising";
import CreateFundraiser from "./pages/CreateFundraiser";
import FundraiserDetail from "./pages/FundraiserDetail";
import CSR from "./pages/CSR";
import DonorIdCard from "./pages/DonorIdCard";
import NotificationPreferences from "./pages/NotificationPreferences";

// Auth pages
import JoinUs from "./pages/auth/JoinUs";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

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
              <Route path="/activities/:id" element={<ActivityDetail />} /> {/* :id is slug */}
              <Route path="/get-involved" element={<GetInvolved />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donate-now" element={<DonatePage />} />
              <Route path="/donation-success" element={<DonationSuccess />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaigns/:slug" element={<CampaignDetail />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/contact" element={<Contact />} />

              {/* Auth */}
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected: Admin */}
              <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin-create-activity" element={<ProtectedRoute allowedRoles={["admin"]}><CreateActivity /></ProtectedRoute>} />
              <Route path="/admin-manage-activities" element={<ProtectedRoute allowedRoles={["admin"]}><ManageActivities /></ProtectedRoute>} />
              <Route path="/admin-users" element={<ProtectedRoute allowedRoles={["admin"]}><ManageUsers /></ProtectedRoute>} />
              <Route path="/admin-volunteers" element={<ProtectedRoute allowedRoles={["admin"]}><ManageVolunteers /></ProtectedRoute>} />
              <Route path="/admin-donations" element={<ProtectedRoute allowedRoles={["admin"]}><ManageDonations /></ProtectedRoute>} />
              <Route path="/admin-campaigns" element={<ProtectedRoute allowedRoles={["admin"]}><ManageCampaigns /></ProtectedRoute>} />
              <Route path="/admin-reports" element={<ProtectedRoute allowedRoles={["admin"]}><AdminReports /></ProtectedRoute>} />
              <Route path="/admin-email" element={<ProtectedRoute allowedRoles={["admin"]}><AdminEmail /></ProtectedRoute>} />
              <Route path="/admin-receipts" element={<ProtectedRoute allowedRoles={["admin"]}><AdminReceipts /></ProtectedRoute>} />

              {/* Protected: Donor */}
              <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["donor", "admin"]}><UserDashboard /></ProtectedRoute>} />

              {/* Protected: Volunteer */}
              <Route path="/volunteer-dashboard" element={<ProtectedRoute allowedRoles={["volunteer", "admin"]}><VolunteerDashboard /></ProtectedRoute>} />

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
