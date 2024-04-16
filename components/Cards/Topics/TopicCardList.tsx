import { getData } from "@/actions/Fetch";
import { TopicCard } from "./TopicCard";
import { AddNewTopicForm } from "../../AddItemForms/AddNewTopicForm";

export const TopicCardList = async () => {
  const topics = await getData("topics");

  return (
    <>
      {topics?.map((item, index) => {
        return <TopicCard key={index} item={item} />;
      })}
      <AddNewTopicForm />
    </>
  );
};
