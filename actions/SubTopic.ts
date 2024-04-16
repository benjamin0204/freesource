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

export const AddNewSubtopic = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("subTopics").insert([formData]).select();
};

export const findSubtopicByName = async (name: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("subTopics")
    .select("*")
    .eq("name", name)
    .maybeSingle();
};

export const findSubTopicsByTopicId = async (topicId: string | number) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("subTopics")
    .select("*")
    .eq("topic_id", topicId);
  console.log(error);
  if (error) throw new Error("Failed to fetch data");

  return data;
};

export const findSubtopicByIdAndUpdate = async (formData: FormData) => {
  const { userId } = auth();

  if (formData.created_by !== userId) {
    return { error: { message: "You don't have permission to do that" } };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("subTopics")
    .update({ ...formData })
    .eq("id", formData.id)
    .select();
};

export const findSubtopicByIdAndDelete = async (formData: FormData) => {
  const { userId } = auth();
  if (formData.created_by !== userId) {
    return { error: { message: "You don't have permission to do that" } };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("subTopics").delete().eq("id", formData.id);
};
