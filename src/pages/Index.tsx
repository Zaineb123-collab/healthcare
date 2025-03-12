
import { Card } from "@/components/ui/card";
import { Users, Stethoscope, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      icon: Users,
      link: "/patients",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Active Doctors",
      value: "56",
      icon: Stethoscope,
      link: "/doctors",
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Appointments",
      value: "89",
      icon: Calendar,
      link: "/appointments",
      color: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to HealthCare</h1>
        <p className="text-gray-600 mt-2">Manage your patients and doctors efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.link}>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Patients</h2>
          <p className="text-gray-600">No recent patients</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Active Doctors</h2>
          <p className="text-gray-600">No active doctors</p>
        </Card>
      </div>
    </div>
  );
};

export default Index;
