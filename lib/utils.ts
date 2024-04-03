import { IResource, ITopic, ISubtopic, TopicsData } from "@/types/topics";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getResourcesBySubtopic(
  subtopicName: string,
  data: TopicsData
): IResource[] {
  const topics: ITopic[] = data.topics;
  for (const topic of topics) {
    const subtopic: ISubtopic | undefined = topic.subtopics.find(
      (sub) => sub.name === subtopicName
    );
    if (subtopic && subtopic.resources) {
      return subtopic.resources;
    }
  }
  return []; // Return empty array if subtopic is not found or doesn't have resources
}

export function getDescriptionBySubtopic(
  subtopicName: string,
  data: TopicsData
): string | undefined {
  const topics: ITopic[] = data.topics;
  for (const topic of topics) {
    const subtopic: ISubtopic | undefined = topic.subtopics.find(
      (sub) => sub.name === subtopicName
    );
    if (subtopic) {
      return subtopic.description;
    }
  }
  return undefined; // Return undefined if subtopic is not found
}
