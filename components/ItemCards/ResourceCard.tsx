import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { IResource } from "@/types/topics";
import Link from "next/link";
import { EditResourceForm } from "../EditItemForms/EditResourceForm";
import { DeleteResourceForm } from "../DeleteForms/DeleteResourceForm";
import { FavouriteResourceIcon } from "./FavouriteResourceIcon";
import { auth } from "@clerk/nextjs";

type Props = {
  resource: IResource;
};

const likedStyles = "to-rose-500 from-pink-500";
const mainStyles = "from-pink-500 via-red-500 to-yellow-500";

export const ResourceCard = ({ resource }: Props) => {
  const { userId } = auth();
  let liked = false;
  if (userId && resource.favourited_by?.includes(userId)) {
    liked = true;
  }
  const gradient = liked ? likedStyles : mainStyles;
  return (
    <div className="mx-auto flex  w-full h-full items-center justify-center">
      <div
        className={`w-full h-full rounded-xl bg-gradient-to-r ${gradient} p-1`}
      >
        <Card className="group w-full h-full flex flex-col transition  ease-in-out hover:scale-95 hover:shadow-lg dark:hover:shadow-black/30">
          <CardHeader className="min-h-fit flex flex-row">
            <CardTitle className="pr-8">
              <Link target="_blank" href={resource.link}>
                <CardTitle>{resource.name}</CardTitle>
                <CardDescription>{resource.skill_level}</CardDescription>
              </Link>
            </CardTitle>
            <div className="ml-auto group/icons transition relative ">
              <EditResourceForm resource={resource} />
              <DeleteResourceForm resource={resource} />
              <FavouriteResourceIcon resource={resource} />
            </div>
          </CardHeader>
          <CardFooter>{resource.type}</CardFooter>
        </Card>
      </div>
    </div>
  );
};
