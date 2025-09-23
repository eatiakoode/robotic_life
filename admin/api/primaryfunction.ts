// src/api/primaryfunction.ts
import axios from "axios";

const normalizeAdminBase = (base: string) => {
  let normalized = (base || "").trim();
  if (!normalized) return "/admin/";
  if (!normalized.endsWith("/")) normalized += "/";
  if (!/\/admin\/$/.test(normalized)) normalized += "admin/";
  return normalized;
};

const ADMIN_BASE = normalizeAdminBase(process.env.NEXT_PUBLIC_ADMIN_API_URL as string);
const API_BASE_URL = ADMIN_BASE + "api/primaryfunction";

// Add a new primary function (Admin only)
export const addPrimaryFunctionAPI = async (title: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.post(
  API_BASE_URL,
  { name: title }, 
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
  return response.data;
};

// Get all primary functions
export const getPrimaryFunctionTableData = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    const response = await axios.get(API_BASE_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching primary functions:", error);
    throw error;
  }
};

// Delete a primary function (Admin only)
export const deletePrimaryFunctionAPI = async (id: string) => {
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

// Get a single primary function by ID
export const getPrimaryFunctionById = async (id: string) => {
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

// Update a primary function (Admin only)
export const updatePrimaryFunctionAPI = async (id: string, primaryFunction: { title: string; status?: boolean }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) throw new Error("User not authenticated!");

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    {
      name: primaryFunction.title, 
      status: primaryFunction.status,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data; // { message, data }
};
