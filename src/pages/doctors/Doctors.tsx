
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Doctors = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
        <Button className="bg-healthcare-600 hover:bg-healthcare-700">
          <Plus className="w-5 h-5 mr-2" /> Add Doctor
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search doctors..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="text-center py-12 text-gray-500">
          <p>No doctors found. Add your first doctor to get started.</p>
        </div>
      </Card>
    </div>
  );
};

export default Doctors;
