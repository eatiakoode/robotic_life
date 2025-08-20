// src/api/powersource.ts
import axios from "axios";

const normalizeAdminBase = (base: string) => {
  let normalized = (base || "").trim();
  if (!normalized) return "/admin/";
  if (!normalized.endsWith("/")) normalized += "/";
  if (!/\/admin\/$/.test(normalized)) normalized += "admin/";
  return normalized;
};

const ADMIN_BASE = normalizeAdminBase(process.env.NEXT_PUBLIC_ADMIN_API_URL as string);
const API_BASE_URL = ADMIN_BASE + "api/powersource";

// Add a new power source (Admin only)
export const addPowerSourceAPI = async (title: string) => {
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
    const message = error?.response?.data?.message || error.message || "Failed to add power source";
    throw new Error(message);
  }
};

// Get all power sources
export const getPowerSourceTableData = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    const response = await axios.get(API_BASE_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching power sources:", error);
    throw error;
  }
};

// Delete a power source (Admin only)
export const deletePowerSourceAPI = async (id: string) => {
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
    const message = error?.response?.data?.message || error.message || "Failed to delete power source";
    throw new Error(message);
  }
};

// Get a single power source by ID
export const getPowerSourceById = async (id: string) => {
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
    const message = error?.response?.data?.message || error.message || "Failed to fetch power source";
    throw new Error(message);
  }
};

// Update a power source (Admin only)
export const updatePowerSourceAPI = async (id: string, name: string) => {
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
      "Failed to update power source";
    throw new Error(message);
  }
};

