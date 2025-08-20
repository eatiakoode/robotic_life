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

// Add a new power source (Admin only)
export const addMaterialAPI = async (title: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.post(
    API_BASE_URL,
    { title },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get all power sources
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

// Delete a power source (Admin only)
export const deleteMaterialAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Get a single power source by ID
export const getMaterialById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.get(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Update a power source (Admin only)
export const updateMaterialAPI = async (id: string, material: { title: string }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    material,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
