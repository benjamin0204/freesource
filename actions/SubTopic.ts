"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

type FormData = {
  name: string;
  description: string;
  id?: string;
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
  return await supabase.from("subTopics").select("*").eq("topic_id", topicId);
};

export const findSubtopicByIdAndUpdate = async (formData: FormData) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase
    .from("subTopics")
    .update({ ...formData })
    .eq("id", formData.id)
    .select();
};

export const findSubtopicByIdAndDelete = async ({ id }: { id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.from("subTopics").delete().eq("id", id);
};
