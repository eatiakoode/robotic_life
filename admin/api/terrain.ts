// src/api/terrain.ts
import axios from "axios";

const normalizeAdminBase = (base: string) => {
  let normalized = (base || "").trim();
  if (!normalized) return "/admin/";
  if (!normalized.endsWith("/")) normalized += "/";
  if (!/\/admin\/$/.test(normalized)) normalized += "admin/";
  return normalized;
};

const ADMIN_BASE = normalizeAdminBase(process.env.NEXT_PUBLIC_ADMIN_API_URL as string);
const API_BASE_URL = ADMIN_BASE + "api/terraincapability";

// Add a new terrain capability (Admin only)
export const addTerrainCapabilityAPI = async (title: string) => {
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

// Get all terrain capabilities
export const getTerrainCapabilityTableData = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    const response = await axios.get(API_BASE_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching terrain capabilities:", error);
    throw error;
  }
};

// Delete a terrain capability (Admin only)
export const deleteTerrainCapabilityAPI = async (id: string) => {
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

// Get a single terrain capability by ID
export const getTerrainCapabilityById = async (id: string) => {
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

// Update a terrain capability (Admin only)
export const updateTerrainCapabilityAPI = async (id: string, terrainCapability: { title: string }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    terrainCapability,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
