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
  console.log('transformRobotForComparison called with:', robot);
  
  if (!robot) {
    console.log('No robot data provided, returning null');
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
    category: robot.category?.name || 'N/A',
    manufacturer: robot.manufacturer?.name || 'N/A',
    powerSource: robot.powerSource?.name || 'N/A',
    primaryFunction: robot.primaryFunction?.name || 'N/A',
    operatingEnvironment: robot.operatingEnvironment?.name || 'N/A',
    autonomyLevel: robot.autonomyLevel?.name || 'N/A',
    colors: robot.color?.map(c => c.name) || [],
    materials: robot.material?.map(m => m.name) || [],
    navigationTypes: robot.navigationType?.map(n => n.name) || [],
    sensors: robot.sensors?.map(s => s.name) || [],
    aiSoftwareFeatures: robot.aiSoftwareFeatures?.map(a => a.name) || [],
    terrainCapabilities: robot.terrainCapability?.map(t => t.name) || [],
    communicationMethods: robot.communicationMethod?.map(c => c.name) || [],
    payloadTypes: robot.payloadTypesSupported?.map(p => p.name) || [],
    // Specifications
    weight: robot.weight || null,
    speed: robot.speed || null,
    range: robot.range || null,
    loadCapacity: robot.loadCapacity || null,
    batteryCapacity: robot.batteryCapacity || null,
    runtime: robot.runtime || null,
    dimensions: robot.dimensions || null,
    operatingTemperature: robot.operatingTemperature || null,
  };
  
  console.log('Transformed robot data:', transformed);
  return transformed;
};
