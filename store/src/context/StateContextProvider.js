// context/StateContextProvider.js
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const StateContext = createContext();

export default function StateContextProvider({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [totalQty, setTotalQty] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cake, setCake] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const cakeRef = useRef();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (totalQty === 0) setTotalPrice(0);
  }, [totalQty]);

  const handleNavMenu = () => setIsNavOpen(!isNavOpen);
  const handleNavLinks = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsNavOpen(false);
  };
  const handleNavClick = () => {
    setIsNavOpen(false);
  };
  
  const displayCakeDetails = (item) => setCake(item);
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const updateCart = (product) => {
    const updatedCartItem = cartItems.map((item) =>
      item.index === product.index
        ? { ...item, quantity: item.quantity + quantity }
        : { ...item }
    );
    setCartItems(updatedCartItem);
  };

  const addToCart = (product) => {
    product.quantity = quantity;
    setCartItems((prev) => [product, ...prev]);
  };

  const onAddClick = (product, button) => {
    const existingProduct = cartItems.find((item) => item.index === product.index);
    if (existingProduct) {
      updateCart(product);
    } else {
      addToCart(product);
    }

    if (button.toLowerCase() === 'buy now') {
      handleCartClick();
    }

    setTotalPrice((prev) => prev + product.details.price * quantity);
    setTotalQty((prev) => prev + quantity);
    setQuantity(1);
  };

  const handleRemoveCart = (cake) => {
    const deleteItem = cartItems.filter((item) => item.index !== cake.index);
    setCartItems(deleteItem);
    setTotalPrice((prev) => prev - cake.quantity * cake.details.price);
    setTotalQty((prev) => prev - cake.quantity);
  };

  const cartItemQty = (value, id) => {
    const foundItem = cartItems.find((item) => item.index === id);
    if (!foundItem) return;

    if (value === 'inc') {
      const updateCartItem = cartItems.map((item) =>
        item.index === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updateCartItem);
      setTotalPrice((prev) => prev + foundItem.details.price);
      setTotalQty((prev) => prev + 1);
    }

    if (value === 'dec' && foundItem.quantity > 1) {
      const updateCartItem = cartItems.map((item) =>
        item.index === id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updateCartItem);
      setTotalPrice((prev) => prev - foundItem.details.price);
      setTotalQty((prev) => prev - 1);
    }
  };

  const handleCartClick = () => {
    setShowCart((prev) => !prev);
  };

  const formatPrice = (value) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleScrollToProducts = () => {
    cakeRef.current?.scrollIntoView({ behavior: 'smooth' });
    setShowCart(false);
  };

  // --- AUTH: Register ---
  const register = async (name, email, password, confirmPassword) => {
    try {
      const res = await axios.post('http://localhost:4000/api/auth/register', {
        name,
        email,
        password,
        confirmPassword,
      });
      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Registration failed',
      };
    }
  };

  // --- AUTH: Login ---
  const login = async (email, password) => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        console.log("Login response payload:", data.user);
        console.log("Is Admin:", data.user.isAdmin);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // --- AUTH: Logout ---
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <StateContext.Provider
      value={{
        isNavOpen,
        handleNavMenu,
        handleNavLinks,
        cartItems,
        updateCart,
        addToCart,
        onAddClick,
        totalPrice,
        handleRemoveCart,
        cartItemQty,
        cake,
        displayCakeDetails,
        quantity,
        totalQty,
        increaseQty,
        decreaseQty,
        showCart,
        handleCartClick,
        formatPrice,
        cakeRef,
        handleScrollToProducts,
        handleNavClick,
        // Auth states & methods
        user,
        token,
        register,
        login,
        logout,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
