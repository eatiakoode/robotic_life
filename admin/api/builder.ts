// export const addBuilderAPI = async (formData) => {
//   const response = await axios.post("/your-api-endpoint", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export const addBuilderAPI = async (formData) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/builder", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Builder");
    }
  
    return response.json();
  };
  

  export async function getBuilderTableData(filter) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/builder?limit="+filter.limit+"&skip="+filter.page); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteBuilderAPI = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/builder/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete Builder");
    }
  
    return response.json();
  };


  
  

  export const getBuilderById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/builder/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Builder");
    }
  
    return response.json();
  };


  export const updateBuilderAPI = async (id,builder) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
   
        
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/builder/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: builder,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Builder");
    }
  
    return response.json();
  };