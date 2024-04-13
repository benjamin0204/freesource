"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

type FormData = {
  id?: string;
  name: string;
  type: string;
  link: string;
  skill_level: string;
  subtopic_id: string;
};

export const AddNewResource = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("resources").insert([formData]).select();
};

export const findresourcesBySubtopicId = async (
  subtopicId: string | number
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("resources")
    .select("*")
    .eq("subtopic_id", subtopicId);
};

export const findResourceByIdAndUpdate = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("resources")
    .update({ ...formData })
    .eq("id", formData.id)
    .select();
};

export const findResourceByIdAndDelete = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("resources").delete().eq("id", id);
};
