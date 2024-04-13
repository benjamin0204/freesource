"use server";

import { createClient } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs";
import { cookies } from "next/headers";

type FormData = {
  name: string;
  description: string;
  id?: string;
  created_by: string;
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
  const { userId } = auth();
  if (formData.created_by !== userId) {
    return { error: { message: "You don't have permission to do that" } };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("topics")
    .update({ ...formData })
    .eq("id", formData.id)
    .select();
};

export const findTopicByIdAndDelete = async (formData: FormData) => {
  const { userId } = auth();
  if (formData.created_by !== userId) {
    return { error: { message: "You don't have permission to do that" } };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("topics").delete().eq("id", formData.id);
};
