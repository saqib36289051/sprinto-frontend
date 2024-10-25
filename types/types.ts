import { PRIORITIES, Status } from "@/constants/Enum";

export type UserType = {
  id: string;
  name: string;
  fullName: string;
  email: string;
  role: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  token: string | null;
};

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  members: [];
};

export type SprintType = {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
};

export type TaskType = {
  id: string;
  sprintId: string;
  title: string;
  description: string;
  assignedTo: string | null;
  status: Status;
  priority: PRIORITIES;
};
