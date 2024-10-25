import { useProjectListQuery } from "@/redux/services/projectApi";
import { ProjectType } from "@/types/types";
import React from "react";
import ProjectItemCard from "../card/projectItemCard";

type Props = {
  projectsList: ProjectType[] | null;
};

const ProjectList = ({ projectsList }: Props) => {
  // const { data: projectsList, isLoading, isSuccess } = useProjectListQuery({});
  if (!projectsList) return <p>Loading...</p>;
  return (
    <div className="mt-10">
      <div className="grid grid-cols-4 gap-4">
        {projectsList?.map((project: ProjectType) => {
          return <ProjectItemCard key={project.id} {...project} />;
        })}
      </div>
    </div>
  );
};

export default ProjectList;
