
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Patient = Database['public']['Tables']['patients']['Row'];
type PatientInsert = Database['public']['Tables']['patients']['Insert'];

export const patientService = {
  async createPatient(data: Omit<PatientInsert, 'id' | 'created_at' | 'updated_at' | 'created_by'>) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }
    
    const { data: patient, error } = await supabase
      .from('patients')
      .insert({
        ...data,
        created_by: userData.user.id,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return patient;
  },

  async getPatients() {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }
    
    const { data: patients, error } = await supabase
      .from('patients')
      .select('*')
      .eq('created_by', userData.user.id)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return patients;
  },

  async getPatientById(id: string) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }
    
    const { data: patient, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .eq('created_by', userData.user.id)
      .single();

    if (error) throw new Error(error.message);
    return patient;
  },

  async updatePatient(id: string, data: Partial<PatientInsert>) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }
    
    const { data: patient, error } = await supabase
      .from('patients')
      .update(data)
      .eq('id', id)
      .eq('created_by', userData.user.id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return patient;
  },

  async deletePatient(id: string) {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw new Error("User not authenticated");
    }
    
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id)
      .eq('created_by', userData.user.id);

    if (error) throw new Error(error.message);
  }
};
