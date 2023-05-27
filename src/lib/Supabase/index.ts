import { createClient } from "@supabase/supabase-js";

export type Database = {
  id: string;
  createdAt: string;
  message: string;
  nickName: string;
  avatarUrl: string;
};

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export { supabase };
