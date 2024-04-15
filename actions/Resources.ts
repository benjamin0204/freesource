"use server";

import { createClient } from "@/lib/supabase/server";
import { auth, useAuth, useUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

type FormData = {
  id?: string;
  name: string;
  type: string;
  link: string;
  skill_level: string;
  subtopic_id?: string;
  created_by: string;
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
  const { userId } = auth();
  if (formData.created_by !== userId) {
    return { error: { message: "You don't have permission to do that" } };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("resources")
    .update({ ...formData })
    .eq("id", formData.id)
    .select();
};

export const findResourceByIdAndDelete = async (formData: FormData) => {
  const { userId } = auth();
  if (formData.created_by !== userId) {
    return { error: { message: "You don't have permission to do that" } };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("resources").delete().eq("id", formData.id);
};

export const searchForResources = async (input: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("resources")
    .select(
      `*,
        subTopics (*)
      `
    )
    .textSearch("name", input);
};
