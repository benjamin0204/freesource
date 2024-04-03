import data from "@/Data.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <section className="container grid items-center gap-6 pb-8 mt-8">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        <Title text={"Topics"} />
      </h1>
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data.topics.map((item, index) => {
          return (
            <Item key={index} name={item.name} description={item.description} />
          );
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

const Item = ({ name, description }: { name: string; description: string }) => {
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
