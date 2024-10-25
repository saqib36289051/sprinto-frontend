import React from "react";
import SprintItemCard from "../card/sprintItemCard";
import { SprintType } from "@/types/types";
import AddTaskDialog from "../form/addTaskDialog";

type Props = {
  sprintList: SprintType[];
};
const SprintList = ({sprintList}: Props) => {
  return (
    <div className="mt-10">
      {sprintList?.map((sprint: SprintType) => {
        return (
          <SprintItemCard
            key={sprint.id}
            {...sprint}
            renderAddNewTask={<AddTaskDialog sprintId={sprint.id} />}
          />
        );
      })}
    </div>
  );
};

export default SprintList;
