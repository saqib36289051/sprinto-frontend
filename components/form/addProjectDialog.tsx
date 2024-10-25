'use client'
import React, { SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
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
import { useCreateProjectMutation } from "@/redux/services/projectApi";
import { toast } from "sonner";

type ProjectInputFields = {
  name: string;
  description: string;
};

type OptionalProjectInputFields = Partial<ProjectInputFields>;
const AddProjectDialog = () => {
  const [inputFields, setInputFields] = useState({
    name: "",
    description: "",
  });
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<OptionalProjectInputFields>();
  const [createProject, { isLoading, error }] = useCreateProjectMutation();

  async function handleSubmit() {
    const isValidate = validateFields(inputFields);
    if (!isValidate) return;

    const res = await createProject(inputFields);
    if (res?.data?.success) {
      setInputFields({ name: "", description: "" });
      setOpen(false);
      toast.success("Project Created Successfully");
    } else {
      console.log("error");
    }
  }

  function validateFields(fields: ProjectInputFields) {
    const errors: SetStateAction<OptionalProjectInputFields> = {};
    if (!fields.name) {
      errors.name = "Name is required";
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
        <Button variant="default" onClick={() => setOpen(true)}>
          Start New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            Add a new project to your workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-flow-row gap-4">
          <div>
            <Input
              placeholder="Project Name"
              value={inputFields.name}
              onChange={(e) =>
                setInputFields({ ...inputFields, name: e.target.value })
              }
            />
            {errors?.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Description"
              value={inputFields.description}
              onChange={(e) =>
                setInputFields({ ...inputFields, description: e.target.value })
              }
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

export default AddProjectDialog;
