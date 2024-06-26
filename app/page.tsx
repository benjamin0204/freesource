import { Title } from "@/components/Title";
import { TopicCardSkeleton } from "@/components/Cards/Topics/TopicCard";

import { SearchBar } from "@/components/SearchBar";
import { ResourceCardSkeleton } from "@/components/Cards/Resources/ResourceCard";
import { Suspense } from "react";
import { TopicCardList } from "@/components/Cards/Topics/TopicCardList";
import { FavouriteCardList } from "@/components/Cards/Resources/FavouriteCardList";

export default async function Home() {
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
        <Suspense fallback={<TopicCardSkeleton />}>
          <TopicCardList />
        </Suspense>
      </section>
      <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
        <Title text={"Favourites"} />
      </h2>
      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <Suspense fallback={<ResourceCardSkeleton />}>
          <FavouriteCardList />
        </Suspense>
      </section>

      {/* <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
        <Title text={"Pathways"} />
      </h2>
      <section className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"></section> */}
    </section>
  );
}
