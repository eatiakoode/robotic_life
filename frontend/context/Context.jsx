"use client";
import { allProducts } from "@/data/products";
import { openCartModal } from "@/utlis/openCartModal";
import { openWistlistModal } from "@/utlis/openWishlist";

import React, { useEffect } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([1, 2, 3]);
  const [compareItem, setCompareItem] = useState([]);
  const [compareRobots, setCompareRobots] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(allProducts[0]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const isAddedToCartProducts = (id) => {
    if (cartProducts.filter((elm) => elm.id == id)[0]) {
      return true;
    }
    return false;
  };
  const addProductToCart = (id, qty, isModal = true) => {
    if (!isAddedToCartProducts(id)) {
      const item = {
        ...allProducts.filter((elm) => elm.id == id)[0],
        quantity: qty ? qty : 1,
      };
      setCartProducts((pre) => [...pre, item]);
      if (isModal) {
        openCartModal();
      }
    }
  };

  const updateQuantity = (id, qty) => {
    if (isAddedToCartProducts(id)) {
      let item = cartProducts.filter((elm) => elm.id == id)[0];
      let items = [...cartProducts];
      const itemIndex = items.indexOf(item);

      item.quantity = qty / 1;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };

  const addToWishlist = (id) => {
    if (!wishList.includes(id)) {
      setWishList((pre) => [...pre, id]);
      openWistlistModal();
    }
  };

  const removeFromWishlist = (id) => {
    if (wishList.includes(id)) {
      setWishList((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      if (compareItem.length >= 3) {
        // Show notification that limit is reached
        if (typeof window !== 'undefined') {
          // You can replace this with a proper toast notification
          alert('⚠️ You can compare maximum 3 robots at a time. Please remove a robot first.');
        }
        return;
      }
      setCompareItem((pre) => [...pre, id]);
    }
  };
  
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
      // Also remove from compareRobots if it exists
      setCompareRobots((pre) => [...pre.filter((robot) => robot.id !== id)]);
    }
  };

  // Robot comparison functions
  const addRobotToCompare = (robotData) => {
    if (!robotData || !robotData.id) {
      return;
    }


    if (!compareRobots.find(robot => robot.id === robotData.id)) {
      if (compareRobots.length >= 3) {
        if (typeof window !== 'undefined') {
          alert('⚠️ You can compare maximum 3 robots at a time. Please remove a robot first.');
        }
        return;
      }
      setCompareRobots((pre) => {
        const newList = [...pre, robotData];
        return newList;
      });
      setCompareItem((pre) => {
        const newList = [...pre, robotData.id];
        return newList;
      });
    } else {
      // Robot already in compare list
      if (typeof window !== 'undefined') {
        alert('This robot is already in your comparison list.');
      }
    }
  };

  const removeRobotFromCompare = (robotId) => {
    setCompareRobots((pre) => {
      const newList = pre.filter((robot) => robot.id !== robotId);
      return newList;
    });
    
    setCompareItem((pre) => {
      const newList = pre.filter((id) => id !== robotId);
      return newList;
    });
  };

  const clearAllCompareRobots = () => {
    setCompareRobots([]);
    setCompareItem([]);
  };

  // Function to open compare modal
  const openCompareModal = () => {
    if (typeof window !== 'undefined') {
      const { openOffcanvasModal } = require('@/utils/modalUtils');
      openOffcanvasModal('compare');
    }
  };
  const isAddedtoWishlist = (id) => {
    if (wishList.includes(id)) {
      return true;
    }
    return false;
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartList"));
    if (items?.length) {
      setCartProducts(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (items?.length) {
      setWishList(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  // Persist compare robots to localStorage
  useEffect(() => {
    localStorage.setItem("compareRobots", JSON.stringify(compareRobots));
  }, [compareRobots]);

  // Load compare robots from localStorage on mount
  useEffect(() => {
    const savedCompareRobots = JSON.parse(localStorage.getItem("compareRobots") || "[]");
    if (savedCompareRobots.length > 0) {
      setCompareRobots(savedCompareRobots);
      setCompareItem(savedCompareRobots.map(robot => robot.id));
    }
  }, []);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity,
    // Robot comparison
    compareRobots,
    setCompareRobots,
    addRobotToCompare,
    removeRobotFromCompare,
    clearAllCompareRobots,
    openCompareModal,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
