# Weight Filter Implementation

## Overview
This document describes the implementation of a weight filter system for the robotic life application that supports multiple weight units (g, kg, lb) with automatic conversion between units.

## Features

### 1. Multi-Unit Weight Support
- **Grams (g)**: Default unit for lightweight robots (e.g., 500g, 1000g)
- **Kilograms (kg)**: For medium-weight robots (e.g., 1.5kg, 5kg)
- **Pounds (lb)**: For robots measured in imperial units (e.g., 2.2lb, 10lb)

### 2. Automatic Unit Conversion
- All weight filtering is done in the selected unit
- Automatic conversion between units for consistent filtering
- Real-time bounds calculation in the selected unit

### 3. Dynamic Weight Bounds
- Weight range automatically adjusts based on available products
- Bounds update when switching between units
- Bounds expand when new products are added

## Implementation Details

### Frontend Components

#### Weight Converter Utility (`frontend/utils/weightConverter.js`)
- `convertWeight(value, fromUnit, toUnit)`: Converts weight between units
- `getWeightBounds(products, targetUnit)`: Calculates min/max weights in target unit
- `normalizeWeights(products, targetUnit)`: Normalizes all weights to target unit
- `formatWeight(value, unit)`: Formats weight for display

#### Filter Reducer (`frontend/reducer/filterReducer.js`)
- Added `weightUnit` state for tracking selected weight unit
- Added `SET_WEIGHT_UNIT` action for updating weight unit
- Weight unit resets to 'g' when clearing filters
- Min weight is always set to 0 for both price and weight filters

#### Products Component (`frontend/components/products/Products1.jsx`)
- Weight filtering with unit conversion
- Dynamic weight bounds calculation
- Weight bounds refresh when unit changes
- Weight filter notifications

#### Filter Modal (`frontend/components/products/FilterModal.jsx`)
- Weight unit selector dropdown
- Weight range slider with unit display
- Min and Max weight input fields (same style as price filter)
- Available weight range information

#### Filter Meta (`frontend/components/products/FilterMeta.jsx`)
- Weight filter tags with correct units
- Clear weight filter functionality

### Backend Components

#### Robot Controller (`backend/controller/frontend/robotFrntCtrl.js`)
- Weight filtering with unit conversion
- Support for `weightUnit` query parameter
- In-memory weight filtering for complex unit scenarios

## Usage

### 1. Selecting Weight Unit
Users can select their preferred weight unit from the dropdown in the filter panel:
- **Grams (g)**: Default unit, best for lightweight robots
- **Kilograms (kg)**: Good for medium-weight robots
- **Pounds (lb)**: For users familiar with imperial units

### 2. Setting Weight Range
- Use the range slider to set maximum weight (minimum is always 0)
- Range automatically adjusts based on available products
- Range updates when switching between units

### 3. Filtering Results
- Weight filter works alongside other filters (price, color, brand, etc.)
- Results show robots within the specified weight range
- Weight is displayed in the original unit from the database

## Technical Implementation

### Weight Conversion Logic
```javascript
// Example: Convert 1000g to kg
const weightInKg = convertWeight(1000, 'g', 'kg'); // Returns 1

// Example: Convert 2.2lb to kg
const weightInKg = convertWeight(2.2, 'lb', 'kg'); // Returns 1
```

### Filter Application
```javascript
// Filter products by weight range in selected unit
filteredProducts = products.filter(product => {
  const weightInTargetUnit = convertWeight(
    product.weight.value, 
    product.weight.unit, 
    selectedWeightUnit
  );
  return weightInTargetUnit >= minWeight && weightInTargetUnit <= maxWeight;
});
```

### Dynamic Bounds Calculation
```javascript
// Calculate weight bounds in selected unit
const [minWeight, maxWeight] = getWeightBounds(products, weightUnit);
```

## Database Schema

The weight is stored in the Robot model as:
```javascript
weight: {
  value: Number,    // The weight value
  unit: String      // The weight unit ('g', 'kg', 'lb')
}
```

## API Endpoints

### Filter Robots
```
GET /api/robots/filter?minWeight=1&maxWeight=5&weightUnit=kg
```

**Query Parameters:**
- `minWeight`: Minimum weight in the specified unit
- `maxWeight`: Maximum weight in the specified unit
- `weightUnit`: Weight unit for filtering ('g', 'kg', 'lb')

## Testing

### Weight Conversion Tests
Run the test file to verify weight conversions:
```bash
# In browser console
import('./utils/weightConverter.test.js')
```

### Manual Testing
1. Load the products page
2. Open the filter panel
3. Select different weight units
4. Adjust weight range slider
5. Verify filtering works correctly
6. Check weight bounds update when switching units

## Future Enhancements

1. **Advanced Weight Filtering**: Add weight comparison operators (>, <, >=, <=)
2. **Weight Categories**: Predefined weight ranges (Light, Medium, Heavy)
3. **Unit Preferences**: Save user's preferred weight unit
4. **Weight Sorting**: Sort products by weight in selected unit
5. **Weight Statistics**: Show weight distribution charts

## Troubleshooting

### Common Issues

1. **Weight Filter Not Working**
   - Check if products have weight data
   - Verify weight unit conversion
   - Check console for error messages

2. **Weight Bounds Not Updating**
   - Ensure weight unit is selected
   - Check if products are loaded
   - Verify weight converter utility

3. **Unit Conversion Errors**
   - Check weight converter utility
   - Verify weight unit values in database
   - Test with known weight values

### Debug Information
The implementation includes extensive console logging for debugging:
- Weight filter application
- Weight bounds calculation
- Unit conversion details
- Filter results

## Performance Considerations

1. **Weight Conversion**: Done in-memory for small datasets
2. **Bounds Calculation**: Cached and updated only when needed
3. **Filter Application**: Efficient filtering with early returns
4. **Unit Switching**: Minimal overhead when changing units

## Security

- Weight filtering uses safe number conversion
- Input validation for weight ranges
- No SQL injection risks (MongoDB queries)
- Sanitized weight unit values
