import { Title } from "@/components/Title";
import { TopicCard } from "@/components/ItemCards/TopicCard";

import { getData } from "@/actions/Fetch";
import { AddNewTopicForm } from "@/components/AddItemForms/AddNewTopicForm";
import { SearchBar } from "@/components/SearchBar";

export default async function Home() {
  const data = await getData("topics");

  return (
    <section className="container grid items-center gap-6 pb-8 mt-24 md:py-10">
      <div className="flex items-center">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Welcome to - <Title text="Freesource" />{" "}
            <br className="hidden sm:inline" />
            Your Ultimate Developer Resource Hub
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Are you a passionate developer looking to enhance your skills, stay
            updated with the latest technologies, and connect with a vibrant
            community of like-minded professionals? Look no further!{" "}
            <Title text="Freesource" /> is your one-stop destination for all
            things related to software development.
          </p>
        </div>
      </div>
      <SearchBar />
      <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
        <Title text={"Topics"} />
      </h2>
      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {data?.map((item, index) => {
          return <TopicCard key={index} item={item} />;
        })}
        <AddNewTopicForm />
      </section>

      {/* <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
        <Title text={"Pathways"} />
      </h2>
      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"></section> */}
    </section>
  );
}
