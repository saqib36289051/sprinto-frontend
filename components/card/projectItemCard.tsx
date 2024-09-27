import { ProjectType } from "@/types/types";
import React from "react";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { CircleCheckBig } from "lucide-react";

type Props = ProjectType & {};

const ProjectItemCard = (props: Props) => {
  return (
    <div className="shadow p-4 bg-white rounded-lg flex-col">
      <div className="grid grid-cols-[1fr,0.1fr] items-center">
        <Label className="text-sm line-clamp-2">{props?.name}</Label>
        <CircleCheckBig size={16} color="green" />
      </div>
      <Separator className="mt-1 mb-2" />
      <Label className="text-sm font-normal">{props?.description}</Label>
    </div>
  );
};

export default ProjectItemCard;
