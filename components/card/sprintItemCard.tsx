"use client";
import { SprintType, TaskType } from "@/types/types";
import React from "react";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { formatDate } from "date-fns";
import ReusableCard from "./reusableCard";
import { useTaskListQuery } from "@/redux/services/taskApi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PRIORITIES, Status } from "@/constants/Enum";
import axiosInstance from "@/helper/axios";

type Props = SprintType & {
  renderAddNewTask: any;
};

const SprintItemCard = (props: Props) => {
  const navigation = useRouter();
  const [taskList, setTaskList] = React.useState<TaskType[]>([]);
  console.log("🚀 ~ SprintItemCard ~ taskList:", taskList)
  // const { data, isLoading } = useTaskListQuery(props?.id);
  // const getAllTask = await getAllTasks(props?.id)

  React.useEffect(() => {
    (async () => {
      const res  = await axiosInstance.get(`/task/${props?.id}`);
      setTaskList(res?.data);
    })()
  }, [props?.id]);

  const statusList = [Status.TODO, Status.IN_PROGRESS, Status.DONE];
  const priorityList = [PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH];
  return (
    <ReusableCard>
      <ReusableCard.Header className="">
        <div className="flex justify-between items-center">
          <Label className="text-md line-clamp-1">{props?.name}</Label>
          <div className="flex space-x-8 items-center">
            <div className="space-x-2">
              <Label className="text-sm font-normal">
                {formatDate(props?.startDate, "dd LLL yy")}
              </Label>
              <Label className="text-sm italic font-light">to</Label>
              <Label className="text-sm font-normal">
                {formatDate(props?.endDate, "dd LLL yy")}
              </Label>
            </div>
            {props.renderAddNewTask}
          </div>
        </div>
      </ReusableCard.Header>
      <ReusableCard.Body className="space-y-2 mt-4">
        {taskList?.data?.map((task: TaskType) => (
          <div
            key={task?.id}
            className="grid grid-cols-[1fr,0.5fr,0.3fr,0.3fr] gap-4 items-center border p-2 rounded-md"
            onClick={() => navigation.push(`/task/${task?.id}`)}
          >
            <Label className="text-sm font-normal line-clamp-1">
              {task?.title}
            </Label>

            <Label className="text-sm font-normal">{task.assignedTo}</Label>

            <div>
              <Select
                value={task.priority}
                onValueChange={
                  (value: PRIORITIES) => {}
                  // setInputFields({ priority: value })
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Assigned To" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {priorityList.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select
                value={task.status}
                onValueChange={
                  (value: Status) => {}
                  // setInputFields({ priority: value })
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusList.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </ReusableCard.Body>
    </ReusableCard>
  );
};

export default SprintItemCard;
