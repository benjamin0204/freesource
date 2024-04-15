"use client";
import { Input } from "@/components/ui/input";
import { Title } from "./Title";
import { useCallback, useEffect, useState } from "react";
import { searchForResources } from "@/actions/Resources";
import { IResource } from "@/types/topics";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValues, setOutputValues] = useState([] as any);
  const { toast } = useToast();

  const fetcher = useCallback(async (input: string) => {
    const { data, error } = await searchForResources(input);
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was an issue with the search bar, please try again",
      });
      return;
    }
    data && setOutputValues(data);
  }, []);

  useEffect(() => {
    if (inputValue.length > 0) {
      fetcher(inputValue);
    }

    console.log(outputValues);
  }, [inputValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <section className=" my-16 flex flex-col gap-4">
      <h2 className="text-3xl font-extrabold leading-tight tracking-tighter">
        <Title text={"Search resources"} />
      </h2>
      <Input
        className=" flex-1 rounded-full px-4 text-xl leading-none text-gray-800 dark:text-white bg-transparent focus:outline-none"
        placeholder="Search..."
        type="search"
        value={inputValue}
        onChange={handleChange}
      />
      {outputValues.length > 0 && (
        <section className="flex  w-full rounded-md border border-input bg-background px-3 py-2 text-sm flex-col gap-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Skill level</TableHead>
                <TableHead className="text-right">Subtopic</TableHead>
              </TableRow>
            </TableHeader>
            {outputValues.map((item) => (
              <TableBody>
                <TableRow>
                  <Link href={item.link} target="_blank">
                    <TableCell className="font-medium">{item.name}</TableCell>
                  </Link>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.skill_level}</TableCell>
                  <TableCell className="text-right">
                    <Title text={item.subTopics.name} />
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
        </section>
      )}
    </section>
  );
};
