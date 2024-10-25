"use client";
import { ProjectType } from "@/types/types";
import React from "react";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import ReusableCard from "./reusableCard";

type Props = ProjectType & {};

const ProjectItemCard = (props: Props) => {
  const navigation = useRouter();
  return (
    <ReusableCard onClick={() => navigation.push(`/project/${props?.id}`)}>
      <ReusableCard.Header label={props?.name} />
      <ReusableCard.Body>
        <Label className="text-sm font-normal">{props?.description}</Label>
      </ReusableCard.Body>
    </ReusableCard>
  );
};

export default ProjectItemCard;
