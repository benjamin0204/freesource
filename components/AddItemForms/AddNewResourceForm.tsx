"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { ISubtopic } from "@/types/topics";
import { AddNewResource } from "@/actions/Resources";
import { AddNewCard } from "./AddNewCard";
import { AddNewDialogHeader } from "./AddNewDialog/AddNewDialogHeader";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),

  link: z.string().url().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  skill_level: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  subtopic_id: z.string(),
  created_by: z.string(),
});

type Props = {
  subtopic: ISubtopic;
};

export const AddNewResourceForm = ({ subtopic }: Props) => {
  const { user } = useUser();

  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      link: "",
      skill_level: "",
      subtopic_id: subtopic.id,
      created_by: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.created_by = user.id;
    const { data, error } = await AddNewResource(values);
    if (data) {
      toast({
        className: "border border-sky-400",
        title: "Added new resource!",
      });
    }
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
      <AddNewCard />
      <DialogContent className="sm:max-w-md">
        <AddNewDialogHeader
          header={subtopic?.name?.replaceAll("%20", " ")}
          subHeader={"Add a resource?"}
        />

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
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the new resource
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Documentation" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the type of resource you&apos;re adding
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="www.github.com" {...field} />
                    </FormControl>
                    <FormDescription>The link to the resource</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skill_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skill level</FormLabel>
                    <FormControl>
                      <Input placeholder="Beginner" {...field} />
                    </FormControl>
                    <FormDescription>
                      Rough guide to who can use this resource
                    </FormDescription>
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
