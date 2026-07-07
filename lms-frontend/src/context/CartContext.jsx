import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (course) => {
    setItems((prev) => (prev.some((c) => c.id === course.id) ? prev : [...prev, course]));
  };

  const removeFromCart = (courseId) => {
    setItems((prev) => prev.filter((c) => c.id !== courseId));
  };

  const clearCart = () => setItems([]);

  const isInCart = (courseId) => items.some((c) => c.id === courseId);

  const subtotal = useMemo(() => items.reduce((sum, c) => sum + c.price, 0), [items]);
  const originalTotal = useMemo(() => items.reduce((sum, c) => sum + c.originalPrice, 0), [items]);

  const value = { items, addToCart, removeFromCart, clearCart, isInCart, subtotal, originalTotal, count: items.length };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
