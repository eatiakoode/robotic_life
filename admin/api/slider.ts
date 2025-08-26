export const addSliderAPI = async (formData) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData.token;

    if (!token) {
      throw new Error("User not authenticated!");
    }

    console.log("Sending request to:", process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/slider");
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/slider", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData
    });
  
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Failed to add Slider");
    }
  
    const result = await response.json();
    console.log("Success response:", result);
    return result;
  };
  

  export async function getSliderTableData(filter) {
    // Provide default values if no filter is passed
    const defaultFilter = {
      limit: 10,
      page: 1,
      ...filter
    };

    await new Promise((resolve) => setTimeout(resolve, 10));
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;
      
      if (!token) {
        throw new Error("User not authenticated!");
      }

      const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+"api/slider?limit="+defaultFilter.limit+"&skip="+defaultFilter.page, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Slider response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch sliders");
      }
      
      const data = await response.json();
      
      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      } else if (data && Array.isArray(data.items)) {
        return data.items;
      } else if (data && data.success && Array.isArray(data.data)) {
        // Backend returns { success: true, data: sliders }
        return data.data;
      } else if (data && typeof data === 'object') {
        // Try to find any array property
        const arrayProps = Object.values(data).filter(val => Array.isArray(val));
        if (arrayProps.length > 0) {
          return arrayProps[0];
        }
      }
      
      return [];
    } catch (error) {
      console.error("Error fetching sliders:", error);
      return [];
    }
  }


  export const deleteSliderAPI = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/slider/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete Slider");
    }
  
    return response.json();
  };

  export const getSliderById = async (id: string) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData.token;
    if (!token) {
      throw new Error("User not authenticated!");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/slider/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Slider");
    }
  
    const data = await response.json();
    console.log("Slider by ID response:", data);
    return data;
  };


  export const updateSliderAPI = async (id, slider) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData.token;

    if (!token) {
      throw new Error("User not authenticated!");
    }


    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API_URL+`api/slider/${id}`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: slider,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update Slider");
    }
  
    return response.json();
  };