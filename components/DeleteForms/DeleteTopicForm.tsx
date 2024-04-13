"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ITopic } from "@/types/topics";
import { Trash2 } from "lucide-react";
import {
  findTopicByIdAndDelete,
  findTopicByIdAndUpdate,
} from "@/actions/Topics";

const formSchema = z.object({
  id: z.string(),
});

type Props = {
  topic: ITopic;
};

export const DeleteTopicForm = ({ topic }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: topic.id,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { error } = await findTopicByIdAndDelete(topic);
    toast({
      className: "border border-sky-400",
      title: `Deleted ${topic.name}!`,
    });
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    }
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="group-hover/icons:cursor-pointer opacity-0  group-hover:opacity-100 absolute delay-1000 transition-all duration-300 ease-in-out group-hover:right-0 -right-10 top-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete - {topic.name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this topic?{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <DialogClose>
                <Button type="submit" variant="destructive">
                  Delete
                </Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
