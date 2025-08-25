// api/robot.ts

// 🔑 Safe helper for getting token (SSR compatible)
function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null; // No localStorage during SSR
  }
  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    return userData?.token || null;
  } catch {
    return null;
  }
}

/**
 * Add new robot
 */
export const addRobotAPI = async (formData: FormData) => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to add Robot");
  }

  return response.json();
};

/**
 * Get robot table data with pagination
 * ✅ SSR safe (returns empty if no token on server-side)
 */
export async function getRobotTableData(
  filter?: { limit?: number; page?: number },
  passedToken?: string
) {
  // Provide default values if no filter is passed
  const defaultFilter = {
    limit: 10,
    page: 1,
    ...filter
  };

  let token = passedToken || getAuthToken();

  // 🚀 On server, return empty instead of throwing
  if (!token && typeof window === "undefined") {
    return {
      items: [],
      totalCount: 0,
      currentPage: defaultFilter.page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }

  if (!token) throw new Error("Authentication required. Please log in.");

  try {
    const skip = Math.max(0, (defaultFilter.page - 1) * defaultFilter.limit);
    const limit = Math.max(1, defaultFilter.limit);

    const url = `${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot?limit=${limit}&skip=${skip}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(typeof window === "undefined" && {
        next: { revalidate: 300 },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      let errorMessage =
        errorData.message || errorData.error || `HTTP ${response.status}`;

      if (response.status === 401) errorMessage = "Authentication failed.";
      if (response.status === 403) errorMessage = "Access denied.";
      if (response.status >= 500) errorMessage = "Server error.";

      throw new Error(errorMessage);
    }

    const data = await response.json();

    const items = Array.isArray(data.items)
      ? data.items
      : Array.isArray(data)
      ? data
      : [];

    const totalCount =
      typeof data.totalCount === "number"
        ? data.totalCount
        : typeof data.total === "number"
        ? data.total
        : items.length;

    return {
      items,
      totalCount,
      currentPage: defaultFilter.page,
      totalPages: Math.ceil(totalCount / limit),
      hasNextPage: skip + limit < totalCount,
      hasPrevPage: defaultFilter.page > 1,
    };
  } catch (error: any) {
    console.error("getRobotTableData error:", error.message);

    // 🚀 Only bubble up auth error so UI can redirect
    if (error.message.includes("Authentication")) throw error;

    return {
      items: [],
      totalCount: 0,
      currentPage: defaultFilter.page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
      error: error.message,
    };
  }
}

/**
 * SWR-compatible fetcher
 */
export const robotFetcher = (url: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated!");
  return fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch robots");
    return res.json();
  });
};

/**
 * Delete robot
 */
export const deleteRobotAPI = async (id: string) => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete Robot");
  }

  return response.json();
};

/**
 * Get robot by ID
 */
export const getRobotById = async (id: string, passedToken?: string) => {
  const token = passedToken || getAuthToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot/${id}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to get Robot");
  }

  return response.json();
};

/**
 * Update robot
 */
export const updateRobotAPI = async (id: string, formData, passedToken?: string) => {
  const token = passedToken || getAuthToken();
  if (!token) throw new Error("User not authenticated!");
  console.log("formData data");
  console.log(formData);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot/${id}`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );

if (!response.ok) {
  let errorText = await response.text(); 
  console.error("Update Robot API error:", errorText);
  throw new Error(errorText || "Failed to update Robot");
}

  return response.json();
};

/**
 * Delete single robot image
 */
export const deleteRobotSingleImagesAPI = async (payload: {
  id: string;
  image: string;
}) => {
  const token = getAuthToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API_URL}api/robot/image`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete Robot image");
  }

  return response.json();
};
