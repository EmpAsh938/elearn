"use client";

import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = (value: boolean) => {
        setIsOpen(value);
    }
    return (
        <div className="min-h-screen overflow-x-hidden">
            <Sidebar isOpen={isOpen} />
            <Topbar isOpen={isOpen} handleOpen={handleOpen} />
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    )
}