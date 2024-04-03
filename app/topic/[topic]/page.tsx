import data from "@/Data.json";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getResourcesBySubtopic, getDescriptionBySubtopic } from "@/lib/utils";
import { IResource } from "@/types/topics";

export default function Page({ params }: { params: { topic: string } }) {
  const topic = data.topics.find(
    (e) => e.name === params.topic.replace("%20", " ")
  );

  let resources;
  if (!topic) {
    resources = getResourcesBySubtopic(params.topic.replace("%20", " "), data);
  }
  return (
    <section className="container grid items-center gap-6 pb-8 mt-8">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        <Title text={params.topic.replace("%20", " ")} />
      </h1>
      <p>
        {topic?.description ||
          getDescriptionBySubtopic(params.topic.replace("%20", " "), data)}
      </p>
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {topic?.subtopics.map((item, index) => {
          return (
            <Topic
              key={index}
              name={item.name}
              description={item.description}
            />
          );
        })}
        {resources?.map((item, index) => {
          return <Resource key={index} resource={item} />;
        })}
      </section>
    </section>
  );
}

const Title = ({ text }: { text: string }) => {
  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
      {text}
    </span>
  );
};

const Topic = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <Link href={`/topic/${name}`}>
      <Card className="shadow-lg cursor-pointer tansition duration-500 ease-in-out transform hover:-translate-y-5  hover:shadow-2xl">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

const Resource = ({ resource }: { resource: IResource }) => {
  return (
    <Link target="_blank" href={resource.link}>
      <Card className="shadow-lg cursor-pointer tansition duration-500 ease-in-out transform hover:-translate-y-5  hover:shadow-2xl">
        <CardHeader>
          <CardTitle>{resource.name}</CardTitle>
          <CardDescription>{resource.seniority_level}</CardDescription>
        </CardHeader>
        <CardFooter>{resource.type}</CardFooter>
      </Card>
    </Link>
  );
};
