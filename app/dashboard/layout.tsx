"use client";

import { useState } from "react";

import Sidebar from "@/components/dashboard/sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = (value: boolean) => {
        setIsCollapsed(value);
    }

    return (
        <div className="min-h-screen">
            {/* Sidebar */}
            <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

            {/* Main Content */}
            <main className={`flex-1 p-6 pl-28 bg-gray-100 ${isCollapsed ? "pl-28" : "pl-64"} transition-all`}>
                {children}
            </main>
        </div>
    );
}
