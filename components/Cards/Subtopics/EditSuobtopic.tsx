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
} from "../../ui/dialog";
import { useToast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";
import { ISubtopic } from "@/types/topics";
import { Pencil } from "lucide-react";
import { findSubtopicByIdAndUpdate } from "@/actions/SubTopic";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  id: z.string(),
  created_by: z.string(),
});

type Props = {
  subtopic: ISubtopic;
};

export const EditSubtopicForm = ({ subtopic }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subtopic.name,
      description: subtopic.description,
      id: subtopic.id,
      created_by: subtopic.created_by,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { error } = await findSubtopicByIdAndUpdate(values);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
    } else {
      toast({
        className: "border border-sky-400",
        title: `Updated ${subtopic.name}!`,
      });
    }
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil className="group-hover/icons:cursor-pointer opacity-0  group-hover:opacity-100 absolute delay-700 transition-all duration-300 ease-in-out group-hover:right-0 -right-10" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>{subtopic.name} </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogClose>
                <Button type="submit">Submit</Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
