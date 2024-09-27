"use client";
import React from "react";
import ProjectHeader from "@/components/projects/projectHeader";
import ProjectList from "@/components/projects/projectList";

type Props = {};

const Projects = (props: Props) => {
  return (
    <div>
      <ProjectHeader />
      <ProjectList />
    </div>
  );
};

export default Projects;
