  export async function getPropertytypeTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/propertytype",
        {
          next: { revalidate: 60 }
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


  

  export const getPropertytypeById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    const token =process.env.NEXT_PUBLIC_TOKEN;
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/propertytype/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get propertytype");
    }
  
    return response.json();
  };


  

  export const  getPropertytypeByCategoryTableData = async (id: string) => {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/propertytype/bycategory/${id}`,{
          next: { revalidate: 60 }
        }); // Replace with actual API endpoint
      
      if (!response.ok) {
        throw new Error("Failed to fetch property type");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching property type:", error);
      return []; // Return an empty array in case of an error
    }
  };

  export async function countPropertiesByType() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/propertytype/listwithpropertcount",
        {
          next: { revalidate: 60 }
        }
      ); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }