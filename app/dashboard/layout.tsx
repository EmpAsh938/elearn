"use client";

import { useState, useEffect } from "react";

import Sidebar from "@/components/dashboard/sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleCollapse = (value: boolean) => {
        setIsCollapsed(value);
    }

    // Check screen size on mount
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)"); // Small screen sizes (e.g., mobile or tablet)

        // Set initial collapsed state based on screen size
        if (mediaQuery.matches) {
            setIsMobile(true); // Collapse sidebar by default for small screens
        }

        // Update collapse state when window resizes
        const handleResize = () => {
            setIsMobile(mediaQuery.matches); // Collapse if matches small screen
        };

        mediaQuery.addEventListener('change', handleResize);

        // Cleanup listener on unmount
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    return (
        <div className="min-h-screen">
            {/* Sidebar */}
            <Sidebar isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

            {/* Main Content */}
            <main className={`flex-1 bg-gray-100 ${isCollapsed ? "pl-28" : "pl-64"} ${isMobile ? 'pl-0' : 'pl-64'} transition-all`}>
                {children}
            </main>
        </div>
    );
}
