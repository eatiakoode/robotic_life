export const addPropertypageAPI = async (formData) => {
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
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/propertypage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add property page");
    }
  
    return response.json();
  };
  

  export async function getPropertypageTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/propertypage"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deletePropertypageAPI = async (id: string) => {
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
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/propertypage/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete property page");
    }
  
    return response.json();
  };


  
  

  export const getPropertypageById = async (id: string) => {
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
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/propertypage/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get propertypage");
    }
  
    return response.json();
  };


  export const updatePropertypageAPI = async (id,propertypage) => {
    // const token = localStorage.getItem("token"); // 🔹 Retrieve token

    // const token =process.env.NEXT_PUBLIC_TOKEN;
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("userData.name");
console.log(userData.name);
// const token = localStorage.getItem("token"); // 🔹 Retrieve token
// // console.log("token")
//     const token =process.env.NEXT_PUBLIC_TOKEN;
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/propertypage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(propertypage),
      // body: propertypage,

    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add propertypage");
    }
  
    return response.json();
  };

  export const  getPropertypageByCategoryTableData = async (id: string) => {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/propertypage/bycategory/${id}`); // Replace with actual API endpoint
      
      if (!response.ok) {
        throw new Error("Failed to fetch property page");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching property page:", error);
      return []; // Return an empty array in case of an error
    }
  };