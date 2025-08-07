// export const addCategoryAPI = async (formData) => {
//   const response = await axios.post("/your-api-endpoint", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export const addCategoryAPI = async (formData) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/category", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Category");
    }
  
    return response.json();
  };
  

  export async function getCategoryTableData(filter) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/category?limit="+filter.limit+"&skip="+filter.page); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteCategoryAPI = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));

const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete Category");
    }
  
    return response.json();
  };


  
  

  export const getCategoryById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/category/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Category");
    }
  
    return response.json();
  };


  export const updateCategoryAPI = async (id,category) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
   
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/category/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: category,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Category");
    }
  
    return response.json();
  };