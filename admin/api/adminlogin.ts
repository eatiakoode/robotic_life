export const addAdminLoginAPI = async (title) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"admin/api/user/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(title ),
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Country");
    }
  
    return response.json();
  };