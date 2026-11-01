import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
let supabaseClient;

export async function saveAdmissionLead(lead) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase is not configured. Add your project URL and anon key to .env, then restart Vite.",
    );
  }

  supabaseClient ??= createClient(supabaseUrl, supabaseAnonKey);

  const { error } = await supabaseClient
    .from("admissions_leads")
    .insert(lead);

  if (error) {
    throw new Error(`Registration could not be saved: ${error.message}`);
  }
}
