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
import { AddNewCard } from "./AddNewCard";
import { AddNewDialogHeader } from "./AddNewDialog/AddNewDialogHeader";
import { AddNewTopic } from "@/actions/Topics";
import { Textarea } from "../ui/textarea";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  created_by: z.string(),
});
export const AddNewTopicForm = () => {
  const { user } = useUser();

  const { toast } = useToast();
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      created_by: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    values.created_by = user.id;
    const { data, error } = await AddNewTopic(values);
    if (error) console.error(error);
    if (data) {
      toast({
        className: "border border-sky-400",
        title: "Added new Topic!",
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <Dialog>
      <AddNewCard />

      <DialogContent className="sm:max-w-md">
        <AddNewDialogHeader header={"topic"} subHeader={"Add a Topic? "} />
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
                      <Input placeholder="Topic" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the new topic{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormDescription>
                      Short descsription of the new topic
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
