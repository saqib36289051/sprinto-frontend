import React from "react";
import ProjectHeader from "@/components/projects/projectHeader";
import ProjectList from "@/components/projects/projectList";
import { getAllProjects } from "@/actions/projectList";

type Props = {};

const Projects = async () => {
  const list = await getAllProjects();
  return (
    <div>
      <ProjectHeader />
      <ProjectList projectsList={list?.data ?? []} />
    </div>
  );
};

export default Projects;
