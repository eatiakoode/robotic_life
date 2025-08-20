// src/api/payloadtype.ts
import axios from "axios";

const normalizeAdminBase = (base: string) => {
  let normalized = (base || "").trim();
  if (!normalized) return "/admin/";
  if (!normalized.endsWith("/")) normalized += "/";
  if (!/\/admin\/$/.test(normalized)) normalized += "admin/";
  return normalized;
};

const ADMIN_BASE = normalizeAdminBase(process.env.NEXT_PUBLIC_ADMIN_API_URL as string);
const API_BASE_URL = ADMIN_BASE + "api/payloadtype";

// Add a new payload type (Admin only)
export const addPayloadTypeAPI = async (title: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.post(
  API_BASE_URL,
  { name: title }, // ✅ backend expects this
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
  return response.data;
};

// Get all payload types
export const getPayloadTypeTableData = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;
    const response = await axios.get(API_BASE_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching payload types:", error);
    throw error;
  }
};

// Delete a payload type (Admin only)
export const deletePayloadTypeAPI = async (id: string) => {
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

// Get a single payload type by ID
export const getPayloadTypeById = async (id: string) => {
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

// Update a payload type (Admin only)
export const updatePayloadTypeAPI = async (id: string, payloadType: { title: string; status?: boolean }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) throw new Error("User not authenticated!");

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    {
      name: payloadType.title, // ✅ backend expects "name"
      status: payloadType.status,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data; // { message, data }
};
