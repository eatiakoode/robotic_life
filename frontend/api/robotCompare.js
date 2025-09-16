// API functions for robot comparison functionality

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Compare robots by IDs
 * @param {string[]} robotIds - Array of robot IDs to compare (max 3)
 * @returns {Promise<Object>} Comparison data
 */
export const compareRobots = async (robotIds) => {
  if (!robotIds || robotIds.length === 0) {
    throw new Error('No robot IDs provided for comparison');
  }

  if (robotIds.length > 3) {
    throw new Error('You can compare maximum 3 robots at a time');
  }

  try {
    const idsParam = robotIds.join(',');
    const response = await fetch(`${API_BASE_URL}/frontend/api/robot/compare?ids=${idsParam}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || 'Failed to fetch robot comparison data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Compare robots error:', error);
    throw error;
  }
};

/**
 * Get robot by ID for comparison
 * @param {string} robotId - Robot ID
 * @returns {Promise<Object>} Robot data
 */
export const getRobotById = async (robotId) => {
  if (!robotId) {
    throw new Error('Robot ID is required');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/frontend/api/robot/${robotId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || 'Failed to fetch robot data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get robot by ID error:', error);
    throw error;
  }
};

/**
 * Transform robot data for comparison display
 * @param {Object} robot - Raw robot data from API
 * @returns {Object} Transformed robot data
 */
export const transformRobotForComparison = (robot) => {
  if (!robot) {
    return null;
  }


  const transformed = {
    id: robot._id || robot.id,
    title: robot.title || 'Untitled Robot',
    slug: robot.slug || '',
    description: robot.description || '',
    price: robot.totalPrice || robot.price || 0,
    launchYear: robot.launchYear || '',
    images: robot.images || (robot.imgSrc ? [robot.imgSrc] : []),
    
    // Basic info
    category: robot.category?.name || 'N/A',
    manufacturer: robot.manufacturer?.name || 'N/A',
    
    // Specifications (flattened structure - direct access)
    powerSource: robot.powerSource?.name || robot.specifications?.powerSource?.name || 'N/A',
    weight: robot.weight || robot.specifications?.weight || null,
    speed: robot.speed || robot.specifications?.speed || null,
    range: robot.range || robot.specifications?.range || null,
    loadCapacity: robot.LoadCapacity || robot.specifications?.loadCapacity || null,
    batteryCapacity: robot.batteryCapacity || robot.specifications?.batteryCapacity || null,
    runtime: robot.runtime || robot.specifications?.runtime || null,
    dimensions: robot.dimensions || robot.specifications?.dimensions || null,
    operatingTemperature: robot.operatingTemperature || robot.specifications?.operatingTemperature || null,
    
    // Capabilities (flattened structure - direct access)
    primaryFunction: robot.primaryFunction?.name || robot.capabilities?.primaryFunction?.name || 'N/A',
    autonomyLevel: robot.autonomyLevel?.name || robot.capabilities?.autonomyLevel?.name || 'N/A',
    navigationTypes: robot.navigationType?.map(n => n.name) || robot.capabilities?.navigationTypes?.map(n => n.name) || [],
    communicationMethods: robot.communicationMethod?.map(c => c.name) || robot.capabilities?.communicationMethods?.map(c => c.name) || [],
    
    // Operational Environment (flattened structure - direct access)
    operatingEnvironment: robot.operatingEnvironment?.name || robot.operationalEnvironmentAndApplications?.operatingEnvironment?.name || 'N/A',
    terrainCapabilities: robot.terrainCapability?.map(t => t.name) || robot.operationalEnvironmentAndApplications?.terrainCapabilities?.map(t => t.name) || [],
    
    // Sensors & Software (flattened structure - direct access)
    sensors: robot.sensors?.map(s => s.name) || robot.sensorsAndSoftware?.sensors?.map(s => s.name) || [],
    aiSoftwareFeatures: robot.aiSoftwareFeatures?.map(a => a.name) || robot.sensorsAndSoftware?.aiSoftwareFeatures?.map(a => a.name) || [],
    
    // Payloads & Attachments (flattened structure - direct access)
    payloadTypes: robot.payloadTypesSupported?.map(p => p.name) || robot.payloadsAndAttachments?.payloadTypes?.map(p => p.name) || [],
    
    // Materials and Colors (flattened structure - direct access)
    materials: robot.material?.map(m => m.name) || robot.specifications?.materials?.map(m => m.name) || [],
    colors: robot.colors?.map(c => c.name) || robot.specifications?.color?.map(c => c.name) || [],
  };
  
  return transformed;
};
