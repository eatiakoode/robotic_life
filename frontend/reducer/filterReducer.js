import { productMain } from "@/data/products";

export const initialState = {
  price: [0, 50000000], // Will be updated dynamically based on actual product prices
  priceBounds: [0, 50000000], // The actual min/max prices from products
  weight: [0, 5000], // Weight range in kg (kilograms as default)
  weightBounds: [0, 5000], // The actual min/max weights from products
  weightUnit: "kg", // Default weight unit: kg (kilograms)
  size: "All",
  availability: "All",
  activeFilterOnSale: false,
  brands: [],
  selectedParentCategory: null,
  selectedSubCategory: null,
  filtered: [], // Start with empty array, will be populated by API
  sortingOption: "Sort by (Default)",
  sorted: [], // Start with empty array, will be populated by API
  currentPage: 1,
  itemPerPage: 10, // Show 10 robots per page
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_PRICE":
      return { ...state, price: action.payload };
    
    case "SET_PRICE_BOUNDS":
      return { 
        ...state, 
        priceBounds: action.payload
        // Removed the automatic price update to prevent infinite loop
      };

    case "SET_WEIGHT":
      return { ...state, weight: action.payload };
    
    case "SET_WEIGHT_BOUNDS":
      return { 
        ...state, 
        weightBounds: action.payload
      };

    case "SET_WEIGHT_UNIT":
      return { ...state, weightUnit: action.payload };

    case "SET_SIZE":
      return { ...state, size: action.payload };

    case "SET_AVAILABILITY":
      return { ...state, availability: action.payload };
    case "SET_BRANDS":
      return { ...state, brands: action.payload };
    case "SET_PARENT_CATEGORY":
      return { ...state, selectedParentCategory: action.payload, selectedSubCategory: null };
    case "SET_SUB_CATEGORY":
      return { ...state, selectedSubCategory: action.payload };
    case "SET_FILTERED":
      return { ...state, filtered: [...action.payload] };
    case "SET_SORTING_OPTION":
      return { ...state, sortingOption: action.payload };
    case "SET_SORTED":
      return { ...state, sorted: [...action.payload] };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "TOGGLE_FILTER_ON_SALE":
      return { ...state, activeFilterOnSale: !state.activeFilterOnSale };
    case "SET_ITEM_PER_PAGE":
      return { ...state, itemPerPage: action.payload };
    case "CLEAR_FILTER":
      return {
        ...state,
        price: [...state.priceBounds], // Reset to actual product price bounds (create new array to avoid reference issues)
        weight: [...state.weightBounds], // Reset to actual product weight bounds
        weightUnit: "g", // Reset to default unit (grams)
        size: "All",
        availability: "All",
        brands: [],
        activeFilterOnSale: false,
        selectedParentCategory: null,
        selectedSubCategory: null,
        currentPage: 1, // Reset to first page when clearing filters
      };
    default:
      return state;
  }
}
