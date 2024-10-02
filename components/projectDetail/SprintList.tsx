import React from "react";
import SprintItemCard from "../card/sprintItemCard";
import { SprintType } from "@/types/types";
import { useSprintListQuery } from "@/redux/services/sprintApi";
import AddTaskDialog from "../form/addTaskDialog";

type Props = {
  id: string;
};
const SprintList = (props: Props) => {
  const { data, isLoading } = useSprintListQuery(props.id);
  return (
    <div className="mt-10">
      {data?.data?.map((sprint: SprintType) => {
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
