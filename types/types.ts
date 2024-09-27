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
