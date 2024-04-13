import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ITopic } from "@/types/topics";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { EditTopicForm } from "../EditItemForms/EditTopicForm";
import { DeleteTopicForm } from "../DeleteForms/DeleteTopicForm";

type TopicCardProps = {
  item: ITopic;
};

export const TopicCard = ({ item }: TopicCardProps) => {
  return (
    <div className="mx-auto w-full h-full  flex  items-center justify-center">
      <div className="w-full h-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
        <Card className="group w-full h-full flex flex-col transition  ease-in-out hover:scale-95 hover:shadow-lg dark:hover:shadow-black/30">
          <CardHeader className="min-h-fit flex flex-row">
            <CardTitle className="pr-8">
              <Link href={`topic/${item.name}`}>{item.name}</Link>
            </CardTitle>
            <div className="ml-auto group/icons transition relative ">
              <EditTopicForm topic={item} />
              <DeleteTopicForm topic={item} />
            </div>
          </CardHeader>
          <div className="mt-auto">
            <Separator className="my-4" />
            <Link href={`/topic`}>
              <CardFooter className="flex justify-between">
                <p>Topic Page</p>
                <ArrowRight />
              </CardFooter>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
