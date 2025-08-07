export const addPaymentPlanAPI = async (fromdata) => {
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
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/landingpayment", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: fromdata,
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add payment plan");
    }
  
    return response.json();
  };
  

  export async function getPaymentplanTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/landingpayment"); // Replace with actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deletePaymentplanAPI = async (id: string) => {
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
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/landingpayment/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete payment plan");
    }
  
    return response.json();
  };


  
  

  export const getPaymentplanById = async (id: string) => {
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
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/landingpayment/byid/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get landingpayment");
    }
  
    return response.json();
  };


  export const updatePaymentplanAPI = async (id,landingpayment) => {
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
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/landingpayment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(landingpayment),
    });
  
    if (!response.status) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add landingpayment");
    }
  
    return response.json();
  };

  export const  getPaymentplanByCategoryTableData = async (id: string) => {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
  
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/landingpayment/bycategory/${id}`); // Replace with actual API endpoint
      
      if (!response.ok) {
        throw new Error("Failed to fetch payment plan");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching payment plan:", error);
      return []; // Return an empty array in case of an error
    }
  };