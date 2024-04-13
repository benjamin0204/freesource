import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { EditTopicForm } from "../EditItemForms/EditTopicForm";
import { DeleteTopicForm } from "../DeleteForms/DeleteTopicForm";
import { ISubtopic, ITopic } from "@/types/topics";
import { EditSubtopicForm } from "../EditItemForms/EditSuobtopic";
import { DeleteSubtopicForm } from "../DeleteForms/DeleteSubtopicForm";

type ItemCardProps = {
  item: ITopic | ISubtopic;
  topicName?: string;
};

export const ItemCard = ({ item, topicName }: ItemCardProps) => {
  const { name, description } = item;
  const link = topicName ? `/topic/${topicName}/${name}` : `/topic/${name}`;
  return (
    <div className="mx-auto flex  w-full h-full items-center justify-center">
      <div className="w-full h-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
        <Card className="group w-full h-full flex flex-col transition  ease-in-out hover:scale-95 hover:shadow-lg dark:hover:shadow-black/30">
          <CardHeader className="min-h-fit flex flex-row">
            <CardTitle className="pr-8">
              <Link href={link}>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </Link>
            </CardTitle>
            <div className="ml-auto group/icons transition relative ">
              {topicName ? (
                <>
                  <EditSubtopicForm subtopic={item as ISubtopic} />
                  <DeleteSubtopicForm subtopic={item as ISubtopic} />
                </>
              ) : (
                <>
                  <EditTopicForm topic={item as ITopic} />
                  <DeleteTopicForm topic={item as ITopic} />
                </>
              )}
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};
