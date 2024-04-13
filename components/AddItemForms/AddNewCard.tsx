import { DialogTrigger } from "../ui/dialog";
import { Card } from "../ui/card";
import { Plus } from "lucide-react";
export const AddNewCard = () => {
  return (
    <div className=" min-h-44 flex w-full h-full items-center justify-center">
      <div className="w-full h-full rounded-xl bg-gradient-to-r to-emerald-600 from-sky-400 p-1">
        <DialogTrigger asChild>
          <Card className=" h-full w-full cursor-pointer relative overflow-hidden hover:scale-95 transition-all ">
            <Plus className="absolute z-0 h-full w-full " />
          </Card>
        </DialogTrigger>
      </div>
    </div>
  );
};
