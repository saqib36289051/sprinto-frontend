"use client";
import SprintItemCard from "@/components/card/sprintItemCard";
import AddSprintDialog from "@/components/projectDetail/AddSprintDialog";
import WithHeader from "@/components/withHeader";
import { useGetProjectByIdQuery } from "@/redux/services/projectApi";
import {
  useSprintListQuery,
} from "@/redux/services/sprintApi";
import { SprintType } from "@/types/types";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = typeof id === "string" ? id : "";
  const { data, isLoading } = useGetProjectByIdQuery(id);
  const { data: sprintList, isLoading: sprintListLoading } =
    useSprintListQuery(id);

  if (isLoading || sprintListLoading) {
    toast.loading("Project Detail Fetching...");
  } else {
    toast.dismiss();
  }
  return (
    <div>
      <WithHeader
        labelHeading="Project Detail"
        renderProps={<AddSprintDialog projectId={projectId} />}
      />
      {sprintList?.data?.map((sprint: SprintType) => {
        return <SprintItemCard key={sprint.id} {...sprint} />;
      })}
    </div>
  );
};

export default ProjectDetail;
