 export async function getPropertyPageTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/propertypage/list",
        {
          next: { revalidate: 60 }
        }); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch blog");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching blog:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const getPropertyPageById = async (id: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/propertypage/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get blog");
    }
  
    return response.json();
  };
  export const getPropertyPageBySlug = async (id: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/propertypage/slug/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get blog");
    }
  
    return response.json();
  };

