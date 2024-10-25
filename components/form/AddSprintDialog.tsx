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
import { toast } from "sonner";
import { useCreateSprintMutation } from "@/redux/services/sprintApi";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type State = {
  name: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
};
type Action = Partial<State>;

type OptionalSprintInputFields = {
  name?: string;
  startDate?: string;
  endDate?: string;
};

type Props = {
  projectId: string;
};
const AddSprintDialog = ({ projectId }: Props) => {
  const [inputFields, setInputFields] = useReducer(
    (state: State, action: Action) => ({ ...state, ...action }),
    { name: "", startDate: new Date(), endDate: new Date() }
  );

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<OptionalSprintInputFields>();
  const [createSprint, { isLoading, error }] = useCreateSprintMutation();

  async function handleSubmit() {
    const isValidate = validateFields(inputFields);
    if (!isValidate) return;

    console.log("inputFields", inputFields, projectId);
    const res = await createSprint({ ...inputFields, projectId });
    if (res?.data?.success) {
      setInputFields({ name: "", startDate: new Date(), endDate: new Date() });
      setOpen(false);
      toast.success("Sprint Created Successfully");
    } else {
      console.log("error");
    }
  }

  function validateFields(fields: State) {
    const errors: SetStateAction<OptionalSprintInputFields> = {};
    if (!fields.name) {
      errors.name = "Name is required";
    }
    if (typeof fields.startDate === "undefined") {
      errors.startDate = "Start date is required";
    }

    if (typeof fields.endDate === "undefined") {
      errors.endDate = "End date is required";
    }

    if (
      fields.startDate &&
      fields.endDate &&
      fields.startDate > fields.endDate
    ) {
      errors.startDate = "Start date should be less than end date";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Create New Sprint
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            Add a new Sprint to your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-flow-row gap-4">
          <div>
            <Input
              placeholder="Sprint Name"
              value={inputFields.name}
              onChange={(e) => setInputFields({ name: e.target.value })}
            />
            {errors?.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full pl-3 text-left font-normal
                        ${!inputFields.startDate && "text-muted-foreground"}`}
                >
                  {inputFields.startDate ? (
                    format(inputFields.startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              {PopOverContent(inputFields, setInputFields, "startDate")}
            </Popover>
            {errors?.startDate && (
              <p className="text-red-500 text-xs">{errors?.startDate}</p>
            )}
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full pl-3 text-left font-normal
                        ${!inputFields.endDate && "text-muted-foreground"}`}
                >
                  {inputFields.endDate ? (
                    format(inputFields.endDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              {PopOverContent(inputFields, setInputFields, "endDate")}
            </Popover>

            {errors?.endDate && (
              <p className="text-red-500 text-xs">{errors?.endDate}</p>
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

export default AddSprintDialog;

function PopOverContent(
  inputFields: State,
  setInputFields: React.Dispatch<Partial<State>>,
  dateType: "startDate" | "endDate"
) {
  return (
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={inputFields[dateType]}
        onSelect={(date) => setInputFields({ [dateType]: date })}
        disabled={(date) => date < new Date("1900-01-01")}
        initialFocus
      />
    </PopoverContent>
  );
}
