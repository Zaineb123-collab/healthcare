
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PatientForm } from "@/components/PatientForm";
import { patientService } from "@/services/patientService";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const EditPatient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [patient, setPatient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPatient = async () => {
      if (!id) return;
      try {
        const data = await patientService.getPatientById(id);
        setPatient(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load patient",
          variant: "destructive",
        });
        navigate("/patients");
      } finally {
        setIsLoading(false);
      }
    };

    loadPatient();
  }, [id, navigate, toast]);

  const handleUpdatePatient = async (data: any) => {
    if (!id) return;
    await patientService.updatePatient(id, data);
    navigate("/patients");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/patients")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Patient</h1>
      </div>

      <Card className="p-6">
        {patient && (
          <PatientForm
            onSubmit={handleUpdatePatient}
            initialData={patient}
            submitLabel="Update Patient"
          />
        )}
      </Card>
    </div>
  );
};

export default EditPatient;
