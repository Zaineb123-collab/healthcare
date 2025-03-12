
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xohibkhosabqblptjbtc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaGlia2hvc2FicWJscHRqYnRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MjMxNTIsImV4cCI6MjA1NzI5OTE1Mn0.FbgYITJAnGq1worfXsw66FsHMVHa2MYbIuAKhzmB1jM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
