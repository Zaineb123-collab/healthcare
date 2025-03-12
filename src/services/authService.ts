
import { supabase } from "@/integrations/supabase/client";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    name?: string;
    email?: string;
  } | null;
  session: any;
}

export const authService = {
  // Register a new user
  async register(data: RegisterData): Promise<AuthResponse> {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name
        }
      }
    });

    if (error) {
      throw new Error(error.message || 'Registration failed');
    }

    return {
      user: authData.user ? {
        id: authData.user.id,
        email: authData.user.email,
        name: authData.user.user_metadata?.name
      } : null,
      session: authData.session
    };
  },

  // Login a user
  async login(data: LoginData): Promise<AuthResponse> {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });

    if (error) {
      throw new Error(error.message || 'Login failed');
    }

    return {
      user: authData.user ? {
        id: authData.user.id,
        email: authData.user.email,
        name: authData.user.user_metadata?.name
      } : null,
      session: authData.session
    };
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!supabase.auth.getSession();
  },

  // Get the current user
  async getCurrentUser() {
    const { data } = await supabase.auth.getUser();
    return data?.user;
  },

  // Sign out
  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message || 'Logout failed');
    }
  }
};
