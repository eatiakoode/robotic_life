import { buildApiUrl, getAuthHeaders } from './config';

  export const addSliderAPI = async (formData) => {
    const apiUrl = buildApiUrl("api/slider");
    console.log("Sending request to:", apiUrl);
    
    const headers = getAuthHeaders();
    // Remove Content-Type for FormData to let browser set it with boundary
    delete headers["Content-Type"];

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add Slider");
    }

    return response.json();
  };
  

  export async function getSliderTableData(filter = {}) {
    // Provide default values if no filter is passed
    const defaultFilter = {
      limit: 10,
      page: 1,
      ...filter
    };

    await new Promise((resolve) => setTimeout(resolve, 10));
    try {
      const headers = getAuthHeaders();
      const apiUrl = buildApiUrl(`api/slider?limit=${defaultFilter.limit}&skip=${defaultFilter.page}`);
      
      console.log("Fetching sliders from:", apiUrl);
      console.log("Using headers:", headers);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers,
      });
      
      console.log("Slider response status:", response.status);
      console.log("Slider response ok:", response.ok);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Slider API error response:", errorText);
        throw new Error(`Failed to fetch sliders: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("Slider API response data:", data);
      
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
      
      console.warn("No slider data found in response:", data);
      return [];
    } catch (error) {
      console.error("Error fetching sliders:", error);
      throw error; // Re-throw to let the hook handle it
    }
  }


  export const deleteSliderAPI = async (id: string) => {
    const headers = getAuthHeaders();
    const apiUrl = buildApiUrl(`api/slider/${id}`);

    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ id }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete Slider");
    }
  
    return response.json();
  };

  export const getSliderById = async (id: string) => {
    const headers = getAuthHeaders();
    const apiUrl = buildApiUrl(`api/slider/${id}`);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get Slider");
    }
  
    return response.json();
  };


  export const updateSliderAPI = async (id, slider) => {
    const headers = getAuthHeaders();
    const apiUrl = buildApiUrl(`api/slider/${id}`);

    // Remove Content-Type for FormData to let browser set it with boundary
    if (slider instanceof FormData) {
      delete headers["Content-Type"];
    }

    const response = await fetch(apiUrl, {
      method: "PUT",
      headers,
      body: slider,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update Slider");
    }
  
    return response.json();
  };