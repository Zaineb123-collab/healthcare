
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { patientService } from "@/services/patientService";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PatientForm } from "@/components/PatientForm";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const loadPatients = async () => {
    try {
      const data = await patientService.getPatients();
      setPatients(data);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load patients",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleAddPatient = async (data: any) => {
    await patientService.createPatient(data);
    loadPatients();
  };

  const handleDeletePatient = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    
    try {
      await patientService.deletePatient(id);
      toast({
        title: "Success",
        description: "Patient deleted successfully",
      });
      loadPatients();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete patient",
        variant: "destructive",
      });
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-healthcare-600 hover:bg-healthcare-700">
              <Plus className="w-5 h-5 mr-2" /> Add Patient
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add New Patient</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <PatientForm onSubmit={handleAddPatient} submitLabel="Add Patient" />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              placeholder="Search patients..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredPatients.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No patients found.</p>
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <Card key={patient.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{patient.name}</h3>
                    <p className="text-sm text-gray-500">{patient.contact}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigate(`/patients/${patient.id}/edit`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeletePatient(patient.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Patients;
