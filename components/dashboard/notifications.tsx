"use client";

import { LucideBell, MessageCircle, Calendar, Video } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";

export default function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "New message from John", time: "5 mins ago", icon: <MessageCircle className="w-4 h-4 text-blue-500" /> },
        { id: 2, message: "Assignment deadline tomorrow", time: "2 hours ago", icon: <Calendar className="w-4 h-4 text-yellow-500" /> },
        { id: 3, message: "Live class starting soon", time: "1 day ago", icon: <Video className="w-4 h-4 text-green-500" /> },
    ]);

    // Unread notification count
    const notificationCount = 0;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                <LucideBell className="w-6 h-6 text-gray-600 cursor-pointer" />
                {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red rounded-full">
                        {notificationCount}
                    </span>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white shadow-lg rounded-lg p-2 max-h-64 overflow-y-auto">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {false ? (
                    notifications.map((notification) => (
                        <div key={notification.id}>
                            <DropdownMenuItem className="flex items-start p-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                <div className="mr-3">{notification.icon}</div>
                                <div className="flex flex-col">
                                    <span>{notification.message}</span>
                                    <span className="text-xs text-gray-400">{notification.time}</span>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </div>
                    ))
                ) : (
                    <DropdownMenuItem className="p-2 text-sm text-gray-500">No new notifications</DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
