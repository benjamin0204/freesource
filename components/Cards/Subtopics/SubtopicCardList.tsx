import { AddNewTopicForm } from "../../AddItemForms/AddNewTopicForm";
import { findSubTopicsByTopicId } from "@/actions/SubTopic";
import { ItemCard } from "./ItemCard";
import { ITopic } from "@/types/topics";

type Props = {
  topic: ITopic;
};

export const SubtopicCardList = async ({ topic }: Props) => {
  const data = await findSubTopicsByTopicId(topic.id);
  return (
    <>
      {data?.map((item, index) => {
        return <ItemCard key={index} item={item} topicName={topic.name} />;
      })}
      <AddNewTopicForm />
    </>
  );
};
