// src/api/material.ts
import axios from "axios";

const normalizeAdminBase = (base: string) => {
  let normalized = (base || "").trim();
  if (!normalized) return "/admin/";
  if (!normalized.endsWith("/")) normalized += "/";
  if (!/\/admin\/$/.test(normalized)) normalized += "admin/";
  return normalized;
};

const ADMIN_BASE = normalizeAdminBase(process.env.NEXT_PUBLIC_ADMIN_API_URL as string);
const API_BASE_URL = ADMIN_BASE + "api/material";

// Add a new material (Admin only)
export const addMaterialAPI = async (title: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await axios.post(
      API_BASE_URL,
      { name: title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || "Failed to add material";
    throw new Error(message);
  }
};

// Get all materials
export const getMaterialTableData = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    const response = await axios.get(API_BASE_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw error;
  }
};

// Delete a material (Admin only)
export const deleteMaterialAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || "Failed to delete material";
    throw new Error(message);
  }
};

// Get a single material by ID
export const getMaterialById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message || "Failed to fetch material";
    throw new Error(message);
  }
};

// Update a material (Admin only)
export const updateMaterialAPI = async (id: string, name: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/${id}`,
      { name },  // ✅ ensure it's always { name: value }
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to update material";
    throw new Error(message);
  }
};

