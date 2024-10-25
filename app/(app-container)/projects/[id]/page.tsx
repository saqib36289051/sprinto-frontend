import { getSprintListByProjectId } from "@/actions/projectList";
import AddSprintDialog from "@/components/form/AddSprintDialog";
import SprintList from "@/components/projectDetail/SprintList";
import WithHeader from "@/components/withHeader";
import React from "react";
const ProjectDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const sprintList = await getSprintListByProjectId(id);

  return (
    <div>
      <WithHeader
        labelHeading="Project Detail"
        renderProps={<AddSprintDialog projectId={id} />}
      />
      <SprintList sprintList={sprintList?.data ?? []} />
    </div>
  );
};

export default ProjectDetail;
