// Weight unit conversion utility
// Converts between grams (g), kilograms (kg), and pounds (lb)

/**
 * Convert weight from one unit to another
 * @param {number} value - The weight value to convert
 * @param {string} fromUnit - The source unit ('g', 'kg', 'lb')
 * @param {string} toUnit - The target unit ('g', 'kg', 'lb')
 * @returns {number} - The converted weight value
 */
export const convertWeight = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;
  
  // First convert to grams (base unit)
  let grams;
  switch (fromUnit) {
    case 'g':
      grams = value;
      break;
    case 'kg':
      grams = value * 1000;
      break;
    case 'lb':
      grams = value * 453.592;
      break;
    default:
      console.warn(`Unknown weight unit: ${fromUnit}`);
      return value;
  }
  
  // Then convert from grams to target unit
  switch (toUnit) {
    case 'g':
      return Math.round(grams);
    case 'kg':
      return Math.round(grams / 1000 * 100) / 100; // Round to 2 decimal places
    case 'lb':
      return Math.round(grams / 453.592 * 100) / 100; // Round to 2 decimal places
    default:
      console.warn(`Unknown target weight unit: ${toUnit}`);
      return grams;
  }
};

/**
 * Convert all weights in a product array to a specific unit for consistent filtering
 * @param {Array} products - Array of products with weight objects
 * @param {string} targetUnit - The unit to convert all weights to
 * @returns {Array} - Array of products with normalized weights
 */
export const normalizeWeights = (products, targetUnit = 'kg') => {
  return products.map(product => {
    if (product.weight && product.weight.value && product.weight.unit) {
      const normalizedValue = convertWeight(product.weight.value, product.weight.unit, targetUnit);
      return {
        ...product,
        weight: {
          ...product.weight,
          normalizedValue,
          normalizedUnit: targetUnit
        }
      };
    }
    return product;
  });
};

/**
 * Get the best display unit for a weight value
 * @param {number} value - The weight value
 * @param {string} currentUnit - The current unit
 * @returns {string} - The best unit for display
 */
export const getBestDisplayUnit = (value, currentUnit) => {
  if (currentUnit === 'g' && value >= 1000) {
    return 'kg';
  } else if (currentUnit === 'kg' && value < 1) {
    return 'g';
  } else if (currentUnit === 'lb' && value < 1) {
    return 'g';
  }
  return currentUnit;
};

/**
 * Format weight for display with appropriate unit
 * @param {number} value - The weight value
 * @param {string} unit - The weight unit
 * @returns {string} - Formatted weight string
 */
export const formatWeight = (value, unit) => {
  if (unit === 'kg' && value < 1) {
    const grams = Math.round(value * 1000);
    return `${grams} g`;
  } else if (unit === 'g' && value >= 1000) {
    const kg = (value / 1000).toFixed(2);
    return `${kg} kg`;
  } else if (unit === 'lb' && value < 1) {
    const grams = Math.round(value * 453.592);
    return `${grams} g`;
  }
  return `${value} ${unit}`;
};

/**
 * Get weight bounds in a specific unit
 * @param {Array} products - Array of products
 * @param {string} targetUnit - The target unit for bounds
 * @returns {Array} - [minWeight, maxWeight] in target unit
 */
export const getWeightBounds = (products, targetUnit = 'g') => {
  const weights = products
    .map(p => p.weight?.value)
    .filter(weight => weight > 0 && !isNaN(weight))
    .map(weight => {
      // Convert to target unit if needed
      const product = products.find(p => p.weight?.value === weight);
      if (product && product.weight?.unit && product.weight.unit !== targetUnit) {
        return convertWeight(weight, product.weight.unit, targetUnit);
      }
      return weight;
    });

  if (weights.length === 0) return [0, 1000];

  // Always set min weight to 0, only calculate max weight
  const maxWeight = Math.ceil(Math.max(...weights));
  
  return [0, maxWeight];
};
