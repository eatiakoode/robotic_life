export const addBrochureEnquiryAPI = async (title: string) => {
  const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token


  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/brochureenquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add BrochureEnquiry");
  }

  return response.json();
};


export async function getBrochureEnquiryTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 10));
  

  try {
   const response = await fetch(
        process.env.NEXT_PUBLIC_ADMIN_API_URL + "api/brochureenquiry",
        {
          next: { revalidate: 60 }
        }
      );
 // Replace with actual API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of an error
  }
}


export const deleteBrochureEnquiryAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/brochureenquiry/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete BrochureEnquiry");
  }

  return response.json();
};





export const getBrochureEnquiryById = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/brochureenquiry/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get BrochureEnquiry");
  }

  return response.json();
};


export const updateBrochureEnquiryAPI = async (id,brochureenquiry) => {
  const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token


  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/brochureenquiry/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(brochureenquiry),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add BrochureEnquiry");
  }

  return response.json();
};