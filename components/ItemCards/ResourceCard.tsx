import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { IResource } from "@/types/topics";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { EditResourceForm } from "../EditItemForms/EditResourceForm";
import { DeleteResourceForm } from "../DeleteForms/DeleteResourceForm";

export const ResourceCard = ({ resource }: { resource: IResource }) => {
  return (
    <div className="mx-auto flex  w-full h-full items-center justify-center">
      <div className="w-full h-full rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
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
            </div>
          </CardHeader>
          <CardFooter>{resource.type}</CardFooter>
        </Card>
      </div>
    </div>
  );
};
