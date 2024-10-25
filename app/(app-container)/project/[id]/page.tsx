"use client";
import AddSprintDialog from "@/components/form/AddSprintDialog";
import SprintList from "@/components/projectDetail/SprintList";
import WithHeader from "@/components/withHeader";
import { useGetProjectByIdQuery } from "@/redux/services/projectApi";
import { useParams } from "next/navigation";
import React from "react";
const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = typeof id === "string" ? id : "";
  // const { data, isLoading } = useGetProjectByIdQuery(id);

  return (
    <div>
      <WithHeader
        labelHeading="Project Detail"
        renderProps={<AddSprintDialog projectId={projectId} />}
      />
      <SprintList id={projectId} />
    </div>
  );
};

export default ProjectDetail;
