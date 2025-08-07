export const addPropertyAPI = async (title) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token
console.log("title")
console.log(title)
    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/property", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: title,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Property");
    }
  
    return response.json();
  };
  

  export async function getPropertyTableData(filter) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
  // console.log("filter")
  // console.log(filter)
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/property?limit="+filter.limit+"&skip="+filter.page,
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


  export const deletePropertyAPI = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/property/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete Property");
    }
  
    return response.json();
  };


  
  

  export const getPropertyById = async (id: string) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token


    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/property/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Property");
    }
  
    return response.json();
  };


  export const updatePropertyAPI = async (id,property) => {
   
    const userData = JSON.parse(localStorage.getItem("user"));

const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/property/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: property,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Property");
    }
  
    return response.json();
  };


   export const deletePropertySinlgeImagesAPI = async (payload) => {
    const userData = JSON.parse(localStorage.getItem("user"));

const token =userData.token
  
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/property/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( payload),
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Property");
    }
  
    return response.json();
  };

