import React from "react";
import AddProjectDialog from "./addProjectDialog";
import { Label } from "../ui/label";

const ProjectHeader = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <Label className="text-md">Projects</Label>
        <AddProjectDialog />
      </div>
    </>
  );
};

export default ProjectHeader;
