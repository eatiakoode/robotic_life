export async function getLandingpageTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/landingpage/list"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch landingpage");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching landingpage:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const getLandingpageById = async (id: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/landingpage/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get landingpage");
    }
  
    return response.json();
  };
  export const getLandingpageBySlug = async (id: string) => {
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/landingpage/slug/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get landingpage");
    }
  
    return response.json();
  };

