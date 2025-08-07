export const addAmenityAPI = async (formData) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token

    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));

const token =userData.token
  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/amenity", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      body: formData,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add amenity");
    }
  
    return response.json();
  };
  

  export async function getAmenityTableData(filter) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/amenity?limit="+filter.limit+"&skip="+filter.page); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteAmenityAPI = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));

const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/amenity/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete amenity");
    }
  
    return response.json();
  };


  
  

  export const getAmenityById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));

const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/amenity/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get amenity");
    }
  
    return response.json();
  };


  export const updateAmenityAPI = async (id,amenity) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token

    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));

const token =userData.token
  
    if (!token) {
      throw new Error("User not authenticated!");
    }
    
    const title = amenity.get("title");
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/amenity/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: amenity,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add amenity");
    }
  
    return response.json();
  };