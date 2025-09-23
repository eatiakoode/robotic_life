// API functions for robot comparison functionality

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://thebotsworld.onrender.com';

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

// Helper function to format specifications
const formatSpecification = (spec) => {
  if (!spec || spec === null || spec === undefined) return 'N/A';
  if (typeof spec === 'object') {
    // Check if it's an empty object
    if (Object.keys(spec).length === 0) return 'N/A';
    
    if (spec.value && spec.unit) {
      return `${spec.value} ${spec.unit}`;
    }
    if (spec.name) {
      return spec.name;
    }
    if (Array.isArray(spec) && spec.length > 0) {
      return spec.map(item => item.name || item).join(', ');
    }
    return 'N/A';
  }
  if (typeof spec === 'string' && spec.trim() === '') return 'N/A';
  return spec.toString();
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
    
    // Basic info - try multiple possible paths
    category: robot.category?.name || robot.category?.title || (typeof robot.category === 'string' ? robot.category : 'N/A'),
    manufacturer: robot.manufacturer?.name || robot.manufacturer?.title || 'N/A',
    
    // Specifications - try multiple possible paths
    powerSource: robot.specifications?.powerSource?.name || robot.specifications?.powerSource?.title || robot.powerSource?.name || robot.powerSource?.title || 'N/A',
    weight: formatSpecification(robot.specifications?.weight || robot.weight),
    speed: formatSpecification(robot.specifications?.speed || robot.speed),
    range: formatSpecification(robot.specifications?.range || robot.range),
    loadCapacity: formatSpecification(robot.specifications?.loadCapacity || robot.loadCapacity || robot.LoadCapacity),
    batteryCapacity: formatSpecification(robot.specifications?.batteryCapacity || robot.batteryCapacity),
    runtime: formatSpecification(robot.specifications?.runtime || robot.runtime),
    dimensions: formatSpecification(robot.specifications?.dimensions || robot.dimensions),
    operatingTemperature: formatSpecification(robot.specifications?.operatingTemperature || robot.operatingTemperature),
    
    // Capabilities - try multiple possible paths
    primaryFunction: robot.capabilities?.primaryFunction?.name || robot.capabilities?.primaryFunction?.title || robot.primaryFunction?.name || robot.primaryFunction?.title || 'N/A',
    autonomyLevel: robot.capabilities?.autonomyLevel?.name || robot.capabilities?.autonomyLevel?.title || robot.autonomyLevel?.name || robot.autonomyLevel?.title || 'N/A',
    navigationTypes: robot.capabilities?.navigationTypes?.map(n => n.name || n.title) || robot.navigationType?.map(n => n.name || n.title) || [],
    communicationMethods: robot.capabilities?.communicationMethods?.map(c => c.name || c.title) || robot.communicationMethod?.map(c => c.name || c.title) || [],
    
    // Operational Environment - try multiple possible paths
    operatingEnvironment: robot.operationalEnvironmentAndApplications?.operatingEnvironment?.name || robot.operationalEnvironmentAndApplications?.operatingEnvironment?.title || robot.operatingEnvironment?.name || robot.operatingEnvironment?.title || 'N/A',
    terrainCapabilities: robot.operationalEnvironmentAndApplications?.terrainCapabilities?.map(t => t.name || t.title) || robot.terrainCapability?.map(t => t.name || t.title) || [],
    
    // Sensors & Software - try multiple possible paths
    sensors: robot.sensorsAndSoftware?.sensors?.map(s => s.name || s.title) || robot.sensors?.map(s => s.name || s.title) || [],
    aiSoftwareFeatures: robot.sensorsAndSoftware?.aiSoftwareFeatures?.map(a => a.name || a.title) || robot.aiSoftwareFeatures?.map(a => a.name || a.title) || [],
    
    // Payloads & Attachments - try multiple possible paths
    payloadTypes: robot.payloadsAndAttachments?.payloadTypes?.map(p => p.name || p.title) || robot.payloadTypesSupported?.map(p => p.name || p.title) || [],
    
    // Materials and Colors - try multiple possible paths
    materials: robot.specifications?.materials?.map(m => m.name || m.title) || robot.material?.map(m => m.name || m.title) || [],
    colors: robot.specifications?.color?.map(c => c.name || c.title) || robot.colors?.map(c => c.name || c.title) || [],
  };
  
  return transformed;
};
