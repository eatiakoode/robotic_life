 export async function getCityTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/city/list"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const getCityById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    const token =process.env.NEXT_PUBLIC_TOKEN;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/city/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get city");
    }
  
    return response.json();
  };



  export const  getCityByStateTableData = async (id: string) => {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/city/bystate/${id}`); // Replace with actual API endpoint
      
      if (!response.ok) {
        throw new Error("Failed to fetch state");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching state:", error);
      return []; // Return an empty array in case of an error
    }
  };

  export async function countPropertiesByCity() {
    try {
      // Fallback URL if environment variable is not set
      const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || 'http://localhost:3000/';
      
      const response = await fetch(
        baseUrl + "api/city/countpropertiesbycity",
        {
          next: { revalidate: 60 },
        }
      ); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch city property count data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching city property count data:", error);
      // Return mock data for development
      return [
        { city: "Sample City 1", count: 25 },
        { city: "Sample City 2", count: 18 },
        { city: "Sample City 3", count: 32 }
      ];
    }
  }

  export async function getCityWithLocation() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/city/citywithlocation"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }
  export async function getCityWithPropertyPage() {
    try {
      // Fallback URL if environment variable is not set
      const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || 'http://localhost:3000/';
      
      const response = await fetch(baseUrl + "api/city/citywithpropertypage", {
        next: { revalidate: 60 }
      }); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch city with property page data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching city with property page data:", error);
      // Return mock data for development
      return [
        { id: 1, name: "Sample City 1", propertyCount: 25, image: "/images/city1.jpg" },
        { id: 2, name: "Sample City 2", propertyCount: 18, image: "/images/city2.jpg" },
        { id: 3, name: "Sample City 3", propertyCount: 32, image: "/images/city3.jpg" }
      ];
    }
  }
export const getCityTableglimpseData = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    const token =process.env.NEXT_PUBLIC_TOKEN;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/city/byidglimpse/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get city");
    }
  
    return response.json();
  };
  