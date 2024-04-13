import { findresourcesBySubtopicId } from "@/actions/Resources";
import { findSubtopicByName } from "@/actions/SubTopic";
import { AddNewResourceForm } from "@/components/AddItemForms/AddNewResourceForm";
import { ResourceCard } from "@/components/ItemCards/ResourceCard";
import { Title } from "@/components/Title";

export default async function Page({
  params,
}: {
  params: { subtopic: string; topic: string };
}) {
  const { data: subtopic, error: subtopicError } = await findSubtopicByName(
    params.subtopic.replace("%20", " ")
  );

  const { data: resources, error: resourcesError } =
    await findresourcesBySubtopicId(subtopic?.id);

  if (subtopicError || resourcesError)
    console.error("error", subtopicError || resourcesError);

  return (
    <section className="container grid items-center gap-6 pb-8 mt-8">
      <section className="mb-16 flex flex-col gap-4">
        <h1 className="font-extrabold leading-tight tracking-tighter text-4xl ">
          <Title text={subtopic?.name} />
        </h1>
        <p>{subtopic?.description}</p>
      </section>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
        <Title text={"Resources"} />
      </h2>
      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {resources?.map((resource, index) => {
          return <ResourceCard key={index} resource={resource} />;
        })}
        <AddNewResourceForm subtopic={subtopic} />
      </section>
    </section>
  );
}
