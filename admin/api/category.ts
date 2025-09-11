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
  
  // Build query parameters
  const params = new URLSearchParams();
  
  // Add pagination
  if (filter.limit) params.append('limit', filter.limit.toString());
  if (filter.page) params.append('page', filter.page.toString());
  
  // Add search
  if (filter.search) params.append('search', filter.search);
  
  // Add sorting
  if (filter.sort) {
    switch (filter.sort) {
      case 'Recent':
        params.append('sortBy', 'createdAt');
        params.append('sortOrder', 'desc');
        break;
      case 'Old Review':
        params.append('sortBy', 'createdAt');
        params.append('sortOrder', 'asc');
        break;
      case 'Name A-Z':
        params.append('sortBy', 'name');
        params.append('sortOrder', 'asc');
        break;
      case 'Name Z-A':
        params.append('sortBy', 'name');
        params.append('sortOrder', 'desc');
        break;
      case 'Featured First':
      default:
        params.append('sortBy', 'status');
        params.append('sortOrder', 'desc');
        break;
    }
  }

  const response = await fetch(`${ADMIN_BASE}api/category?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch categories");
  }
  const result = await response.json();

  // Normalize to { items, totalCount }
  let categories: any[] = [];
  if (Array.isArray(result)) categories = result;
  else if (Array.isArray(result.items)) categories = result.items;
  else if (Array.isArray(result.data)) categories = result.data;
  else if (Array.isArray(result.categories)) categories = result.categories;

  const totalCount = (typeof result?.totalCount === "number")
    ? result.totalCount
    : categories.length;

  // If backend doesn't paginate, emulate client-side pagination for UI
  const limitNum = Number(filter?.limit) || categories.length || 0;
  const pageNum = Number(filter?.page) || 1;
  const start = (pageNum - 1) * limitNum;
  
  // Apply client-side filtering if backend doesn't support it
  let filteredCategories = categories;
  
  // Client-side search if backend doesn't support it
  if (filter.search && !result.items) {
    const searchTerm = filter.search.toLowerCase();
    filteredCategories = categories.filter(category => 
      category.name?.toLowerCase().includes(searchTerm) ||
      category.description?.toLowerCase().includes(searchTerm)
    );
  }
  
  // Client-side sorting if backend doesn't support it
  if (filter.sort && !result.items) {
    filteredCategories.sort((a, b) => {
      switch (filter.sort) {
        case 'Recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'Old Review':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'Name A-Z':
          return (a.name || '').localeCompare(b.name || '');
        case 'Name Z-A':
          return (b.name || '').localeCompare(a.name || '');
        case 'Featured First':
        default:
          return (b.status ? 1 : 0) - (a.status ? 1 : 0);
      }
    });
  }
  
  const items = filteredCategories.slice(start, start + limitNum);
  const finalTotalCount = filteredCategories.length;

  return { items, totalCount: finalTotalCount };
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
