import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
type Props = {
  header: string;
  subHeader: string;
};
export const AddNewDialogHeader = ({ header, subHeader }: Props) => {
  return (
    <DialogHeader>
      <DialogTitle>{header}</DialogTitle>
      <DialogDescription>{subHeader} </DialogDescription>
    </DialogHeader>
  );
};
