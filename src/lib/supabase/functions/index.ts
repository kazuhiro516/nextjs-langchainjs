import { supabase, type Database } from "@/lib/supabase";

type InsertProps = Pick<Database, "message" | "nickName" | "avatarUrl">;

const TABLE_NAME = "nextjs-langchainjs";

const fetchDatabase = async () => {
  try {
    const { data } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("createdAt");
    return data;
  } catch (error) {
    console.error(error);
  }
};

const addSupabaseData = async ({
  message,
  avatarUrl,
  nickName,
}: InsertProps) => {
  try {
    await supabase.from(TABLE_NAME).insert({ message, avatarUrl, nickName });
  } catch (error) {
    console.error(error);
  }
};

export { addSupabaseData, fetchDatabase, TABLE_NAME };
