
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PatientFormProps {
  onSubmit: (data: {
    name: string;
    contact: string;
    date_of_birth: string;
    medical_history?: string;
  }) => Promise<void>;
  initialData?: {
    name: string;
    contact: string;
    date_of_birth: string;
    medical_history?: string;
  };
  submitLabel?: string;
}

export const PatientForm = ({ onSubmit, initialData, submitLabel = "Save" }: PatientFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    contact: initialData?.contact ?? "",
    date_of_birth: initialData?.date_of_birth ?? "",
    medical_history: initialData?.medical_history ?? "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit(formData);
      toast({
        title: "Success",
        description: "Patient information saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="contact">Contact</Label>
        <Input
          id="contact"
          value={formData.contact}
          onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input
          id="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={(e) => setFormData(prev => ({ ...prev, date_of_birth: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="medical_history">Medical History</Label>
        <Input
          id="medical_history"
          value={formData.medical_history}
          onChange={(e) => setFormData(prev => ({ ...prev, medical_history: e.target.value }))}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
};
