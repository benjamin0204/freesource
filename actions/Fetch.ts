import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export async function getData(table: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data, error } = await supabase.from(table).select("*");

  if (error) throw new Error("Failed to fetch data");

  return data;
}
