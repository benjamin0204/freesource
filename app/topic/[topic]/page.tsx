import { Title } from "@/components/Title";
import { AddNewSubtopicForm } from "@/components/AddItemForms/AddNewSubtopicForm";
import { findTopicsByName } from "@/actions/Topics";
import { findSubTopicsByTopicId } from "@/actions/SubTopic";
import {
  ItemCard,
  ItemCardSkeleton,
} from "@/components/Cards/Subtopics/ItemCard";
import { SubtopicCardList } from "@/components/Cards/Subtopics/SubtopicCardList";
import { Suspense } from "react";

export default async function Page({ params }: { params: { topic: string } }) {
  const readableTopic = params.topic.replaceAll("%20", " ");

  const { data: topic, error: topicError } = await findTopicsByName(
    readableTopic
  );
  return (
    <section className="container grid items-center gap-6 pb-8 mt-8">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        <Title text={topic.name} />
      </h1>
      <p>{topic.description}</p>
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <Suspense fallback={<ItemCardSkeleton />}>
          <SubtopicCardList topic={topic} />
        </Suspense>
      </section>
    </section>
  );
}
