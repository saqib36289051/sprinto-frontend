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

// export async function getBoxById(id) {
//   try {
//     const response = await axiosInstance.get(`/box/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log("🚀 ~ getAllBoxes ~ error:", error);
//   }
// }
