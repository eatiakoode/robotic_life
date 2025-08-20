// api/robot.ts

export const addRobotAPI = async (formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // ✅ sending FormData, no Content-Type
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add Robot");
  }

  return response.json();
};

// Modified to accept token as parameter instead of reading from localStorage
export async function getRobotTableData(filter: { limit: number; page: number }, token?: string) {
  try {
    // Check if we're on the client side and token is not provided
    if (!token && typeof window !== 'undefined') {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      token = userData?.token;
    }

    if (!token) throw new Error("User not authenticated!");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot?limit=${filter.limit}&skip=${filter.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ fixed missing token
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch robots");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching robots:", error);
    return [];
  }
}

export const deleteRobotAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete Robot");
  }

  return response.json();
};

export const getRobotById = async (id: string, token?: string) => {
  // Check if we're on the client side and token is not provided
  if (!token && typeof window !== 'undefined') {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    token = userData?.token;
  }

  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get Robot");
  }

  return response.json();
};

export const updateRobotAPI = async (id: string, formData: FormData) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData, // ✅ FormData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update Robot");
  }

  return response.json();
};

export const deleteRobotSingleImagesAPI = async (payload: { id: string; image: string }) => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const token = userData?.token;

  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot/image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete Robot image");
  }

  return response.json();
};