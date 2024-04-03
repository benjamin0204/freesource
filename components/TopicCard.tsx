import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, SquareArrowRight } from "lucide-react";
import Link from "next/link";

type TopicCardProps = {
  item: {
    name: string;
    description: string;
    subtopics: {
      name: string;
      description: string;
      resources?: {
        type: string;
        name: string;
        link: string;
        seniority_level: string;
      }[];
    }[];
  };
};

export const TopicCard = ({ item }: TopicCardProps) => {
  return (
    <Card className="flex flex-col transition duration-600 ease-in-out hover:scale-95 hover:shadow-lg dark:hover:shadow-black/30">
      <CardHeader className="min-h-32">
        <CardTitle>
          <Link href={`topic/${item.name}`}>{item.name}</Link>
        </CardTitle>
      </CardHeader>
      <Separator className="my-4" />
      {item.subtopics.map((subTopic, index) => {
        return (
          <CardContent key={index}>
            <Link href={`/topic/${subTopic.name}`}>
              <p>{subTopic.name}</p>
            </Link>
          </CardContent>
        );
      })}
      <div className="mt-auto">
        <Separator className="my-4" />
        <Link href={`/topic/${item.name}`}>
          <CardFooter className="flex justify-between">
            <p>Topic Page</p>
            <ArrowRight />
          </CardFooter>
        </Link>
      </div>
    </Card>
  );
};
