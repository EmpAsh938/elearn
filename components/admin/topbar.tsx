"use client";

import { useState } from 'react';
import { LucideUser, FileText, LogOut, Shield, User, LucideCross, LucideMenu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import Notifications from '../dashboard/notifications';
import Link from 'next/link';
// import SearchBar from './search';
import { useGlobalContext } from '@/hooks/use-globalContext';
import Image from 'next/image';

type Props = {
    isOpen: boolean;
    // handleOpen: (value: boolean) => void;
}

const Topbar = ({ isOpen }: Props) => {
    const { user } = useGlobalContext();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            const request = await fetch('/api/auth/logout');
            const response = await request.json();

            if (response.status !== 200) throw Error(response.error);

            localStorage.clear();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
        closeDropdown();
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <header className={`fixed top-0 ${isOpen ? 'l-20' : 'l-64'} w-full  h-16 bg-white shadow-md flex justify-between items-center px-4 md:px-6 z-50`}>

            {/* Mobile Menu Button */}
            <div className="md:hidden ml-2">
                {/* <button onClick={() => handleOpen(!isOpen)}> */}
                <button>
                    <LucideMenu className="w-6 h-6" />
                </button>
            </div>

            {/* Search Input */}
            <div className="flex-1 ml-4 md:ml-0">
                {/* <SearchBar /> */}

            </div>

            {/* Notification and User Icons */}
            <div className="flex items-center space-x-4">
                <Notifications />

                <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenuTrigger className="ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none">
                        <div>
                            {user && user.imageName ? (
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/image/${user.imageName}`}
                                    alt={user.name}
                                    width={50}
                                    height={50}
                                    className="w-10 h-10 object-cover rounded-full cursor-pointer"
                                />
                            ) : (
                                <LucideUser className="w-10 h-10 text-gray-600 cursor-pointer" />
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-60">
                        <DropdownMenuSeparator />
                        {user && (
                            <DropdownMenuItem>
                                <Link
                                    href="/admin/profile"
                                    className="flex items-center"
                                    onClick={closeDropdown} // Close on click
                                >
                                    {user.imageName ? (
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_ENDPOINT}users/image/${user.imageName}`}
                                            alt={user.name}
                                            width={50}
                                            height={50}
                                            className="w-6 h-6 mr-2 object-cover rounded-full cursor-pointer"
                                        />
                                    ) : (
                                        <User className="w-6 h-6 mr-2" />
                                    )}
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                            <Link
                                href="/admin/terms"
                                className="flex items-center"
                                onClick={closeDropdown} // Close on click
                            >
                                <FileText className="w-6 h-6 mr-2" /> Terms & Conditions
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href="/admin/privacy"
                                className="flex items-center"
                                onClick={closeDropdown} // Close on click
                            >
                                <Shield className="w-6 h-6 mr-2" /> Privacy
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                            <LogOut className="w-6 h-6 mr-2" /> Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Topbar;
