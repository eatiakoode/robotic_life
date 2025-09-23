// export const addTestimonialAPI = async (formData) => {
//   const response = await axios.post("/your-api-endpoint", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

export const addTestimonialAPI = async (formData) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData?.token;

    if (!token) {
      throw new Error("User not authenticated!");
    }
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"admin/api/testimonial", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add testimonial");
    }
  
    const data = await response.json();
    return data;
  };
  

  export async function getTestimonialTableData() {
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 10));
    
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const token = userData?.token;

      if (!token) {
        console.warn("No authentication token found for testimonial API");
        return [];
      }

      const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:5000/';
      const response = await fetch(apiUrl + "admin/api/testimonial", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error(`Testimonial API error: ${response.status} ${response.statusText}`);
        return [];
      }
      
      const data = await response.json();
      return data.data || data || [];
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return []; // Return an empty array in case of an error
    }
  }


  export const deleteTestimonialAPI = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token
    if (!token) {
      throw new Error("User not authenticated!");
    }
  
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`admin/api/testimonial/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete testimonial");
    }
  
    return response.json();
  };


  
  

  export const getTestimonialById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData?.token;
    
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const apiUrl = (process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:5000/") + `admin/api/testimonial/${id}`;
  
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get testimonial");
    }

    return response.json();
  };


  export const updateTestimonialAPI = async (id,testimonial) => {
    
    const userData = JSON.parse(localStorage.getItem("user"));
const token =userData.token

  
    if (!token) {
      throw new Error("User not authenticated!");
    }
    
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`admin/api/testimonial/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: testimonial,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update testimonial");
    }
  
    return response.json();
  };