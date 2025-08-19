// export const addBuilderAPI = async (formData) => {
//   const response = await axios.post("/your-api-endpoint", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export const addManufacturerAPI = async (formData) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/manufacturer", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Manufacturer");
    }
  
    return response.json();
  };
  

  export async function getManufacturerTableData(filter) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/manufacturer?limit="+filter.limit+"&skip="+filter.page, {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteManufacturerAPI = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/manufacturer/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete Manufacturer");
    }
  
    return response.json();
  };


  
  

  export const getManufacturerById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/manufacturer/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Manufacturer");
    }
  
    return response.json();
  };


  export const updateManufacturerAPI = async (id, manufacturer) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }


    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/manufacturer/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: manufacturer,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update Manufacturer");
    }
  
    return response.json();
  };