import React from "react";
import ProjectHeader from "@/components/projects/projectHeader";
import ProjectList from "@/components/projects/projectList";
import { projectApi } from "@/redux/services/projectApi";
import { BASE_URL } from "@/redux";
import { ProjectType } from "@/types/types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getAllProjects } from "@/actions/projectList";

type Props = {};

const Projects = async () => {
  const boxlists = await getAllProjects()
  return (
    <div>
      <ProjectHeader />
      <ProjectList projectsList={boxlists} />
    </div>
  );
};

export default Projects;
