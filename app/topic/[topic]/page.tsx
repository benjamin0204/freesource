import { Title } from "@/components/Title";
import { ItemCard } from "@/components/ItemCards/ItemCard";
import { AddNewSubtopicForm } from "@/components/AddItemForms/AddNewSubtopicForm";
import { findTopicsByName } from "@/actions/Topics";
import { findSubTopicsByTopicId } from "@/actions/SubTopic";

export default async function Page({ params }: { params: { topic: string } }) {
  const readableTopic = params.topic.replace("%20", " ");

  const { data: topic, error: topicError } = await findTopicsByName(
    readableTopic
  );

  const { data: subTopics, error: subTopicError } =
    await findSubTopicsByTopicId(topic.id);

  if (topicError || subTopicError)
    console.error("error", topicError || subTopicError);

  return (
    <section className="container grid items-center gap-6 pb-8 mt-8">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        <Title text={topic.name} />
      </h1>
      <p>{topic.description}</p>
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {subTopics?.map((item, index) => {
          return <ItemCard key={index} item={item} topicName={params.topic} />;
        })}

        <AddNewSubtopicForm topic={topic} />
      </section>
    </section>
  );
}
