"use server";

import axiosInstance from "@/helper/axios"; 

export async function getAllProjects() {
  try {
    const response = await axiosInstance.get(`/project`)
    return response?.data
  } catch (error) {
    console.log("🚀 ~ getAllProjects ~ error:", error);
  }
}

export async function getSprintListByProjectId(id : string) {
  try {
    const response = await axiosInstance.get(`/sprint/${id}`);
    return response.data;
  } catch (error) {
    console.log("🚀 ~ getAllSprints ~ error:", error);
  }
}