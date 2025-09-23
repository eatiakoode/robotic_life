export async function getLocationTableData(filter) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 10));
  
  try {
    let querystring = ""
    
    if(filter.limit){
      querystring += "?limit=" + filter.limit
    }
    if(filter.istrending){
      querystring += "&istrending=" + filter.istrending
    }
    if(filter.page){
      querystring += "&page=" + filter.page
    }
    
    // Fallback URL if environment variable is not set
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || 'http://localhost:3000/';
    const response = await fetch(baseUrl + "api/location" + querystring);
    
    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching location data:", error);
    // Return mock data for development
    return [
      { id: 1, name: "Sample Location 1", city: "Sample City", country: "Sample Country" },
      { id: 2, name: "Sample Location 2", city: "Sample City", country: "Sample Country" }
    ];
  }
}

export const getLocationById = async (id: string) => {
  try {
    // Fallback URL if environment variable is not set
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || 'http://localhost:3000/';
    
    const response = await fetch(baseUrl + `api/location/${id}`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get location");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching location by ID:", error);
    // Return mock data for development
    return { 
      id: id, 
      name: "Sample Location", 
      city: "Sample City", 
      country: "Sample Country" 
    };
  }
};

