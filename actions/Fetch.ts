import { createClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";

export async function getData(table: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data, error } = await supabase.from(table).select("*");

  if (error) throw new Error("Failed to fetch data");

  return data;
}

export async function getFavourites() {
  const { userId } = auth();
  if (!userId) {
    return { error: { message: "You don't have permission to do that" } };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let { data, error } = await supabase
    .from("resources")
    .select("*")
    .contains("favourited_by", [userId]);

  if (error) console.log("error", error);

  return data;
}
