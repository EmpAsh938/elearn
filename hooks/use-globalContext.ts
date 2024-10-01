"use client"

import { AppContext } from "@/app/provider";
import { useContext } from "react";

export const useGlobalContext = () => {
    return useContext(AppContext);
}