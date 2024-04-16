import { findSubtopicByName } from "@/actions/SubTopic";
import { AddNewResourceForm } from "@/components/AddItemForms/AddNewResourceForm";
import { ResourceCardList } from "@/components/Cards/Resources/FavouriteCardList";
import { ItemCardSkeleton } from "@/components/Cards/Subtopics/ItemCard";
import { Title } from "@/components/Title";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { subtopic: string; topic: string };
}) {
  const { data: subtopic } = await findSubtopicByName(
    params.subtopic.replaceAll("%20", " ")
  );

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
        <Suspense fallback={<ItemCardSkeleton />}>
          <ResourceCardList id={subtopic?.id} />
        </Suspense>

        {subtopic && <AddNewResourceForm subtopic={subtopic} />}
      </section>
    </section>
  );
}
