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
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add Robot");
  }

  return response.json();
};

// Optimized function with proper error handling and caching
export async function getRobotTableData(filter: { limit: number; page: number }, token?: string) {
  try {
    // Get token from localStorage if not provided
    if (!token && typeof window !== 'undefined') {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        token = userData?.token;
      } catch (err) {
        console.error("Error parsing user data from localStorage:", err);
      }
    }
    
    if (!token) {
      const error = new Error("Authentication required. Please log in.");
      if (typeof window === 'undefined') {
        console.warn("No auth token available on server-side");
        return { items: [], totalCount: 0 };
      }
      throw error;
    }

    // Calculate skip value (convert page to 0-based index)
    const skip = Math.max(0, (filter.page - 1) * filter.limit);
    const limit = Math.max(1, filter.limit);

    const url = `${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot?limit=${limit}&skip=${skip}`;
    
    const requestOptions = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // Add cache control for better performance
      ...(typeof window === 'undefined' && { 
        next: { revalidate: 300 } // 5 minutes cache
      }),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        errorMessage = `${errorMessage}: ${response.statusText}`;
      }
      
      console.error(`API Error: ${errorMessage}`);
      
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error("Authentication failed. Please log in again.");
      } else if (response.status === 403) {
        throw new Error("Access denied. Insufficient permissions.");
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    // Validate and normalize response structure
    const items = Array.isArray(data.items) ? data.items : 
                 Array.isArray(data) ? data : [];
    
    const totalCount = typeof data.totalCount === 'number' ? data.totalCount :
                      typeof data.total === 'number' ? data.total :
                      items.length;

    return {
      items,
      totalCount,
      currentPage: filter.page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: skip + limit < totalCount,
      hasPrevPage: filter.page > 1
    };

  } catch (error) {
    console.error("getRobotTableData error:", error);
    
    // Re-throw authentication errors to handle them properly in UI
    if (error.message.includes("Authentication") || error.message.includes("log in")) {
      throw error;
    }
    
    // For other errors, return empty state with error logged
    return { 
      items: [], 
      totalCount: 0,
      currentPage: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
      error: error.message
    };
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
    // Remove body as it's not needed for DELETE with id in URL
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete Robot");
  }

  return response.json();
};

export const getRobotById = async (id: string, token?: string) => {
  // Only access localStorage on client-side
  if (!token && typeof window !== 'undefined') {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    token = userData?.token;
  }

  if (!token) {
    if (typeof window === 'undefined') {
      // Server-side: return null
      return null;
    } else {
      // Client-side: throw error
      throw new Error("User not authenticated!");
    }
  }

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
    body: formData,
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