import { ResourceCard } from "./ResourceCard";
import { findresourcesBySubtopicId } from "@/actions/Resources";

type Props = {
  id: string | number;
};

export const ResourceCardList = async ({ id }: Props) => {
  const { data: resources } = await findresourcesBySubtopicId(id);

  return (
    <>
      {resources?.map((resource, index) => {
        return <ResourceCard key={index} resource={resource} />;
      })}
    </>
  );
};
