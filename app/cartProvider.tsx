"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { TCourses } from "@/app/lib/types";

interface CartContextType {
    cart: TCourses[];
    addToCart: (cartItem: TCourses) => void;
    removeFromCart: (cartItem: TCourses) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<TCourses[]>([]);

    // Load cart from localStorage on initial render
    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);


    const addToCart = (cartItem: TCourses) => {
        setCart((prev) => {
            const updatedCart = [...prev, cartItem];
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (cartItem: TCourses) => {
        setCart((prev) => {
            const updatedCart = prev.filter((item) => item.categoryId !== cartItem.categoryId);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
