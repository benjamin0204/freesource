import { TopicCardSkeleton } from "@/components/Cards/Topics/TopicCard";
import { Title } from "@/components/Title";
import { TopicCardList } from "@/components/Cards/Topics/TopicCardList";
import { Suspense } from "react";

export default async function Page() {
  return (
    <section className="container grid items-center gap-6 pb-8 mt-8">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        <Title text={"Topics"} />
      </h1>
      <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        <Suspense fallback={<TopicCardSkeleton />}>
          <TopicCardList />
        </Suspense>
      </section>
    </section>
  );
}
