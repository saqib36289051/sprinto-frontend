'use client'
import React, { SetStateAction, useReducer, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { PRIORITIES, Status } from "@/constants/Enum";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useCreateTaskMutation } from "@/redux/services/taskApi";
import { toast } from "sonner";

type ProjectInputFields = {
  title: string;
  description: string;
  assignedTo: string | null;
  status: Status;
  priority: PRIORITIES;
};

type Props = {
  sprintId: string;
};

type OptionalProjectInputFields = Partial<ProjectInputFields>;
const AddTaskDialog = (props: Props) => {
  const [inputFields, setInputFields] = useReducer(
    (state: ProjectInputFields, action: OptionalProjectInputFields) => {
      return {
        ...state,
        ...action,
      };
    },
    {
      title: "",
      description: "",
      assignedTo: null,
      status: Status.TODO,
      priority: PRIORITIES.MEDIUM,
    }
  );
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<OptionalProjectInputFields>();
  const [createTask, { isLoading, error }] = useCreateTaskMutation();

  const statusList = [Status.TODO, Status.IN_PROGRESS, Status.DONE];
  const priorityList = [PRIORITIES.LOW, PRIORITIES.MEDIUM, PRIORITIES.HIGH];

  async function handleSubmit() {
    const isValidate = validateFields(inputFields);
    if (!isValidate) return;

    const res = await createTask({ ...inputFields, sprintId: props.sprintId });
    if (res?.data?.success) {
      setInputFields({ title: "", description: "", assignedTo: "" });
      setOpen(false);
      toast.success("Task Created Successfully");
    } else {
      console.log("error");
    }
  }

  function validateFields(fields: ProjectInputFields) {
    const errors: SetStateAction<OptionalProjectInputFields> = {};
    if (!fields.title) {
      errors.title = "Title is required";
    }
    if (!fields.description) {
      errors.description = "Description is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" onClick={() => setOpen(true)}>
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Add a new Task to your sprint workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-flow-row gap-4">
          <div>
            <Input
              placeholder="Task Title"
              value={inputFields.title}
              onChange={(e) => setInputFields({ title: e.target.value })}
            />
            {errors?.title && (
              <p className="text-red-500 text-xs">{errors.title}</p>
            )}
          </div>
          <div>
            <Select
              value={inputFields.assignedTo as string}
              onValueChange={(value) => setInputFields({ assignedTo: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Assigned To" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={inputFields.status}
              onValueChange={(value: Status) =>
                setInputFields({ status: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Assigned To" />
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
          <div>
            <Select
              value={inputFields.priority}
              onValueChange={(value: PRIORITIES) =>
                setInputFields({ priority: value })
              }
            >
              <SelectTrigger className="mt-1">
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
            <Textarea
              placeholder="Description"
              value={inputFields.description}
              onChange={(e) => setInputFields({ description: e.target.value })}
            />
            {errors?.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
