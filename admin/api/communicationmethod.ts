// src/api/country.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/communicationmethod";

// Add a new communication method (Admin only)
export const addCommunicationMethodAPI = async (title: string) => {
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

// Get all communication methods
export const getCommunicationMethodTableData = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching communication methods:", error);
    return [];
  }
};

// Delete a communication method (Admin only)
export const deleteCommunicationMethodAPI = async (id: string) => {
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

// Get a single communication method by ID
export const getCommunicationMethodById = async (id: string) => {
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

// Update a communication method (Admin only)
export const updateCommunicationMethodAPI = async (id: string, communicationMethod: { title: string }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    communicationMethod,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
