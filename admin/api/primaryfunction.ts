// src/api/country.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/primaryfunction";

// Add a new power source (Admin only)
export const addPrimaryFunctionAPI = async (title: string) => {
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
export const getPrimaryFunctionTableData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching primary functions:", error);
    return [];
  }
};

// Delete a power source (Admin only)
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

// Get a single power source by ID
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

// Update a power source (Admin only)
export const updatePrimaryFunctionAPI = async (id: string, primaryFunction: { title: string }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    primaryFunction,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
