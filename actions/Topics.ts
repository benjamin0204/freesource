"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

type FormData = {
  name: string;
  description: string;
  id?: string;
};

export const AddNewTopic = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("topics").insert([formData]).select();
};

export const findTopicsByName = async (name: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("topics")
    .select("*")
    .eq("name", name)
    .maybeSingle();
};

export const findTopicByIdAndUpdate = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("topics")
    .update({ ...formData })
    .eq("id", formData.id)
    .select();
};

export const findTopicByIdAndDelete = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("topics").delete().eq("id", id);
};
