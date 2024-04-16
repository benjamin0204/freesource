import { getFavourites } from "@/actions/Fetch";
import { ResourceCard } from "./ResourceCard";
import { IResource } from "@/types/topics";

export const ResourceCardList = async () => {
  const favourites = (await getFavourites()) as IResource[];

  return (
    <>
      {favourites?.map((resource, index) => {
        return <ResourceCard key={index} resource={resource} />;
      })}
    </>
  );
};
