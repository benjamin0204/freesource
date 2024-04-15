"use client";
import { favouriteResourceById } from "@/actions/Resources";
import { IResource } from "@/types/topics";
import { Heart } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
type Props = {
  resource: IResource;
};
export const FavouriteResourceIcon = ({ resource }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleClick = async () => {
    const { success, message } = await favouriteResourceById(resource.id);
    if (!success) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message ?? "",
      });
    } else {
      toast({
        className: "border border-sky-400",
        title: `Added ${resource.name} to your favourites`,
      });
    }
    router.refresh();
  };
  return (
    <Heart
      onClick={handleClick}
      className="group-hover/icons:cursor-pointer opacity-0  group-hover:opacity-100 absolute delay-1300 transition-all duration-300 ease-in-out group-hover:right-0 -right-10 top-16"
    />
  );
};
