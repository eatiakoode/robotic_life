export async function getPropertyFeatureData(filter) {
  try {
    // Fallback URL if environment variable is not set
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL || 'http://localhost:3000/';
    
    const response = await fetch(baseUrl + "api/property/feature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    }); // Replace with actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch property feature data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching property feature data:", error);
    // Return mock data for development
    return [
      { id: 1, name: "Sample Feature 1", description: "Sample description" },
      { id: 2, name: "Sample Feature 2", description: "Sample description" }
    ];
  }
}
  export async function getPropertyHotData() {
   
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/list?hot=yes&limit=6",
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

  export const getPropertyById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/property/detail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 }
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Property");
    }
  
    return response.json();
  };

  export async function getPropertyFilterData(filter) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
   
    let querystring=""
    if(filter.category){
      querystring +="&category="+filter.category
    }
    if(filter.keyword){
      querystring +="&keyword="+filter.keyword
    }
    if(filter.city){
      querystring +="&city="+filter.city
    }
    
    if(filter.propertytype){
      querystring +="&propertytype="+filter.propertytype
    }
    if(filter.location){
      querystring +="&location="+filter.location
    }
   
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/filterlist?limit="+filter.limit+"&skip="+filter.page+querystring,
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

  export async function getPropertyCompareData(propertycomparelist) {
    
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/propertyidlist?prolist="+propertycomparelist,
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

  export const getPropertyBySlug = async (slug: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+`api/property/slug/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
      next: { revalidate: 60 }
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Property");
    }
  
    return response.json();
  };

  export const addPropertyAPI = async (title) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/sell", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: title,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Property");
    }
  
    return response.json();
  };


  export async function getPropertyListbyPropertypage(propertypage) {
   
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/propertylistpage/"+propertypage,
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
  };

  export async function getPropertyListTrends(propertytypeid,categoriesid) {
    
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/propertylisttrends?propertytypeid="+propertytypeid+"&categoriesid="+categoriesid,
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
  };

  export async function getPropertyListbyBuilder(builderid) {
    
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_FRONTEND_API_URL+"api/property/propertylistbuilder/"+builderid,
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
  };