"use client";

import { LucideSearch, LucideUser, FileText, LogOut, Shield, User } from 'lucide-react';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Notifications from './notifications';
import Link from 'next/link';

const Topbar = () => {
    const handleLogout = async () => {
        try {
            const request = await fetch('/api/auth/logout');
            const response = await request.json();
            console.log(response);
            if (response.status !== 200) throw Error(response.error);
            localStorage.clear();
            window.location.href = "/";

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <header className="fixed top-0 left-20 md:left-52 w-[calc(100vw-80px)] md:w-[calc(100vw-208px)] h-16 bg-white shadow-md flex justify-between items-center px-6 z-50 sm:left-20 sm:w-[calc(100%-5rem)]">
            {/* Search Input and Icon */}
            <div className="hidden md:flex items-center space-x-2 border border-gray-300 px-2 rounded">
                <Input placeholder="Search..." className="w-64 border-none outline-none ring-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-0" />
                <LucideSearch className="w-6 h-6 text-gray-600 cursor-pointer" />
            </div>

            <div className="block md:hidden"></div>

            {/* Notification and User Icons */}
            <div className="flex items-center space-x-4">
                <Notifications />

                <DropdownMenu>
                    <DropdownMenuTrigger className="ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                        <div className="h-full">

                            <LucideUser className="w-6 h-6 text-gray-600 cursor-pointer" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60">
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/dashboard/profile" className="flex items-center">
                                <User className="w-4 h-4 mr-2" /> Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/terms" className="flex items-center">
                                <FileText className="w-4 h-4 mr-2" /> Terms & Conditions
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/privacy" className="flex items-center">
                                <Shield className="w-4 h-4 mr-2" /> Privacy
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>
        </header>
    );
};

export default Topbar;
