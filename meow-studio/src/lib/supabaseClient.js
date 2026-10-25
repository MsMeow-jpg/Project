
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase не настроен. Проверь .env.local: VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
