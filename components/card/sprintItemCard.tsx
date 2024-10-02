"use client";
import { SprintType } from "@/types/types";
import React from "react";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import { formatDate } from "date-fns";
import ReusableCard from "./reusableCard";
import { useTaskListQuery } from "@/redux/services/taskApi";

type Props = SprintType & {
  renderAddNewTask: any;
};

const SprintItemCard = (props: Props) => {
  const navigation = useRouter();
  const { data, isLoading } = useTaskListQuery(props?.id);
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
      <ReusableCard.Body className=" space-x-2">
        {data?.data?.map((task) => (
          <div
            key={task?.id}
            className="flex justify-between items-center"
            onClick={() => navigation.push(`/task/${task?.id}`)}
          >
            <Label className="text-sm font-normal line-clamp-1">
              {task?.title}
            </Label>

            <Label className="text-sm font-normal line-clamp-1">
              {task?.status}
            </Label>
          </div>
        ))}
      </ReusableCard.Body>
    </ReusableCard>
  );
};

export default SprintItemCard;
