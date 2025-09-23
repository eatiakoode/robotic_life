export const addFaqAPI = async (title) => {
  // const token = localStorage.getItem("token"); // 🔹 Retrieve token
// console.log("token")
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

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"admin/api/faq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify( title ),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add Faq");
  }

  return response.json();
};


export async function getFaqTableData(filter) {
  await new Promise((resolve) => setTimeout(resolve, 10));

  try {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const token = userData?.token;

    if (!token) {
      console.warn("No authentication token found for FAQ API");
      return { items: [], totalCount: 0 };
    }

    const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:5000/';
    const response = await fetch(apiUrl + "admin/api/faq?limit=" + filter.limit + "&skip=" + filter.page, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      console.error(`FAQ API error: ${response.status} ${response.statusText}`);
      return { items: [], totalCount: 0 };
    }

    const data = await response.json();

    return {
      items: data.data || [],
      totalCount: data.count || 0
    };
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return { items: [], totalCount: 0 };
  }
}


export const deleteFaqAPI = async (id: string) => {
  const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`admin/api/faq/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete Faq");
  }

  return response.json();
};





export const getFaqById = async (id: string) => {
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

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`admin/api/faq/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get Faq");
  }

  return response.json();
};


export const updateFaqAPI = async (id,faq) => {
  const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token


  if (!token) {
    throw new Error("User not authenticated!");
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`admin/api/faq/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(faq),
  });

  if (!response.status) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add faq");
  }

  return response.json();
};