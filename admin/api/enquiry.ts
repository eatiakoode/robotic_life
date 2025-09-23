export const addEnquiryAPI = async (title: string) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData.token


  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + "admin/api/enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add Enquiry");
  }

  return response.json();
};


  export async function getEnquiryTableData(filter) {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;

      if (!token) {
        console.warn("No authentication token found for enquiry API");
        return { items: [], totalCount: 0 };
      }

      const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://thebotsworld.onrender.com/';
      const response = await fetch(apiUrl + "admin/api/enquiry", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 }
      });

      if (!response.ok) {
        console.error(`Enquiry API error: ${response.status} ${response.statusText}`);
        return { items: [], totalCount: 0 };
      }
      
      const data = await response.json();
      
      // Transform the response to match expected format
      return {
        items: data.data || [],
        totalCount: data.count || 0
      };
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      return { items: [], totalCount: 0 }; // Return an empty object in case of an error
    }
  }



export const deleteEnquiryAPI = async (id: string) => {
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token


  // const token =process.env.NEXT_PUBLIC_TOKEN;
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData.name);
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token
  // // console.log("token")
  //     const token =process.env.NEXT_PUBLIC_TOKEN;
  const token = userData.token
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `admin/api/enquiry/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete Enquiry");
  }

  return response.json();
};





export const getEnquiryById = async (id: string) => {
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token


  // const token =process.env.NEXT_PUBLIC_TOKEN;
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData.name);
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token
  // // console.log("token")
  //     const token =process.env.NEXT_PUBLIC_TOKEN;
  const token = userData.token
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `admin/api/enquiry/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get Enquiry");
  }

  return response.json();
};


export const updateEnquiryAPI = async (id, enquiry) => {
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token

  // const token =process.env.NEXT_PUBLIC_TOKEN;
  const userData = JSON.parse(localStorage.getItem("user"));
  console.log(userData.name);
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token
  // // console.log("token")
  //     const token =process.env.NEXT_PUBLIC_TOKEN;
  const token = userData.token


  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL + `admin/api/enquiry/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(enquiry),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add Enquiry");
  }

  return response.json();
};