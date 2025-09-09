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

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"admin/api/manufacturer", {
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
    // Provide default values if no filter is passed
    const defaultFilter = {
      limit: 10,
      page: 1,
      ...filter
    };

    await new Promise((resolve) => setTimeout(resolve, 10));
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;

      if (!token) {
        console.warn("No authentication token found for manufacturer API");
        return [];
      }

      const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:5000/';
      const response = await fetch(apiUrl+"admin/api/manufacturer?limit="+defaultFilter.limit+"&skip="+defaultFilter.page, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Manufacturer response:", response);
      if (!response.ok) {
        console.error(`Manufacturer API error: ${response.status} ${response.statusText}`);
        return [];
      }
      
      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.items)) {
        return data.items;
      } else if (data && typeof data === 'object') {
        // Try to find any array property
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          return arrayProps[0];
        }
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      return []; 
    }
  }


  export const deleteManufacturerAPI = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`admin/api/manufacturer/${id}`, {
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

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`admin/api/manufacturer/${id}`, {
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


    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`admin/api/manufacturer/${id}`, {
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