"use client"

import { CartContext } from "@/app/cartProvider";
import { useContext } from "react";

export const useCartContext = () => {
    return useContext(CartContext);
}