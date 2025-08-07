 export async function getBuilderTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/builder/list"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch builder");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching builder:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const getBuilderById = async (id: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/builder/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get builder");
    }
  
    return response.json();
  };
  export const getBuilderBySlug = async (id: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/builder/slug/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get builder");
    }
  
    return response.json();
  };
  export const getBuilderBySlugWithProperty = async (id: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/builder/byidwithproperty/slug/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get builder");
    }
  
    return response.json();
  };
  