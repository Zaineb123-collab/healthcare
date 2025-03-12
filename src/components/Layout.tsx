
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  UserPlus,
  Stethoscope,
  LogIn,
  LogOut,
  Menu,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Patients", path: "/patients" },
    { icon: Stethoscope, label: "Doctors", path: "/doctors" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-healthcare-50/30">
        <Sidebar className="border-r border-healthcare-100">
          <SidebarContent className="flex flex-col h-full">
            <div className="px-6 py-4">
              <h1 className="text-2xl font-bold text-healthcare-800">HealthCare</h1>
            </div>
            <nav className="flex-1 px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-healthcare-100/50 transition-all duration-200",
                    location.pathname === item.path && "bg-healthcare-100 text-healthcare-800"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
            <div className="p-3 border-t border-healthcare-100">
              {isAuthenticated ? (
                <button 
                  className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-gray-700 hover:bg-healthcare-100/50"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-healthcare-100/50"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <SidebarTrigger className="lg:hidden mb-4">
              <Menu className="w-6 h-6" />
            </SidebarTrigger>
            <div className="animate-fadeIn">{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
