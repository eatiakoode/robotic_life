// src/api/category.ts
const getToken = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  return userData?.token || null;
};

const API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_URL || "";

const normalizeAdminBase = (base: string) => {
  let normalized = base.trim();
  if (!normalized) return "/admin/";
  if (!normalized.endsWith("/")) normalized += "/";
  // Ensure it ends with /admin/
  if (!/\/admin\/$/.test(normalized)) normalized += "admin/";
  return normalized;
};

const ADMIN_BASE = normalizeAdminBase(API_BASE);

// Add Category
export const addCategoryAPI = async (formData: FormData) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${ADMIN_BASE}api/category`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add Category");
  }
  return response.json();
};

// Get all categories (optionally fetch all or just parents)
export const getCategoriesAPI = async (fetchAll: boolean = false) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${ADMIN_BASE}api/category`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch categories");
  }

  const result = await response.json();

  let categories: any[] = [];
  if (Array.isArray(result)) categories = result;
  else if (Array.isArray(result.data)) categories = result.data;
  else if (Array.isArray(result.items)) categories = result.items;
  else if (Array.isArray(result.categories)) categories = result.categories;

  return fetchAll ? categories : categories.filter((c) => !c.parent);
};

export const getParentCategoriesAPI = async () => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated!");
  const response = await fetch(`${ADMIN_BASE}api/category/parent`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch parent categories");
  }

  return response.json();
};

export const getSubCategoriesAPI = async (parentId: string) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated!");
  const response = await fetch(`${ADMIN_BASE}api/category/sub/${parentId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch subcategories");
  }

  return response.json();
};

// Table data
export const getCategoryTableData = async (filter: Record<string, any>) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated!");
  const queryString = new URLSearchParams(filter as any).toString();

  const response = await fetch(`${ADMIN_BASE}api/category?${queryString}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch categories");
  }
  return response.json();
};

// Delete category
export const deleteCategoryAPI = async (id: string) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${ADMIN_BASE}api/category/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete Category");
  }
  return response.json();
};

// Get category by ID
export const getCategoryById = async (id: string) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${ADMIN_BASE}api/category/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get Category");
  }
  return response.json();
};

// Update category
export const updateCategoryAPI = async (id: string, formData: FormData) => {
  const token = getToken();
  if (!token) throw new Error("User not authenticated!");

  const response = await fetch(`${ADMIN_BASE}api/category/${id}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update Category");
  }
  return response.json();
};
