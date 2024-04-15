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

export const favouriteResourceById = async (id: string) => {
  const { userId } = auth();
  if (!userId) {
    return { success: false, message: "You need to be logged in to do that!" };
  }
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // Retrieve the current array from the database
  const { data: currentData, error } = await supabase
    .from("resources")
    .select("favourited_by, created_by")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error retrieving current data:", error.message);
    return { success: false, message: error.message };
  }

  const currentFavourites = currentData ? currentData.favourited_by || [] : [];
  let updatedFavourites;
  if (currentFavourites.includes(userId)) {
    // remove value from array ( un favourite )
    const index = currentFavourites.indexOf(userId);
    if (index !== -1) {
      currentFavourites.splice(index, 1);
    }
    updatedFavourites = currentFavourites;
  } else {
    // Modify the array by adding the new userId
    updatedFavourites = [...currentFavourites, userId];
  }

  const createdBy = currentData ? currentData.created_by : null;

  // Upsert the modified array back into the database
  const { data: updatedData, error: upsertError } = await supabase
    .from("resources")
    .upsert({ id, favourited_by: updatedFavourites, created_by: createdBy })
    .eq("id", id)
    .select();

  if (upsertError) {
    console.error("Error upserting data:", upsertError.message);
    return { success: false, message: upsertError.message };
  }

  return { success: true };
};
