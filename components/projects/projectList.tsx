import { useProjectListQuery } from "@/redux/services/projectApi";
import { ProjectType } from "@/types/types";
import React from "react";
import ProjectItemCard from "../card/projectItemCard";

type Props = {};

const ProjectList = (props: Props) => {
  const { data: projectsList, isLoading, isSuccess } = useProjectListQuery({});
  return (
    <div className="mt-10">
      <div className="grid grid-cols-4 gap-4">
        {projectsList?.data?.map((project: ProjectType) => {
          return <ProjectItemCard key={project.id} {...project} />;
        })}
      </div>
    </div>
  );
};

export default ProjectList;
