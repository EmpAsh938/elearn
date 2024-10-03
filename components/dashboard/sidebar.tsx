"use client";

import { LucideHome, LucideBookOpen, LucideMessageSquare, LucideBookCopy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname(); // Get current path

    return (
        <aside className="fixed top-0 left-0 h-screen bg-white border-r border-gray-200 p-4 pr-0 w-20 transition-all duration-300 md:w-52">
            {/* Logo and Utkrista Shiksha in Nepali */}
            <div className="mb-8 flex items-center justify-start">
                <Image
                    src="/images/utkrista.png"
                    alt="Logo"
                    width={600}
                    height={600}
                    className="w-14 h-14 md:ml-[-5px]"
                />
                <h1 className="text-xl font-semibold text-gray-700 hidden md:block">
                    उत्कृष्ट शिक्षा
                </h1>
            </div>

            {/* Navigation Links */}
            <nav>
                <ul className="">
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard"
                        >
                            <LucideHome className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard/browse' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard/browse"
                        >
                            <LucideBookOpen className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline">Browse Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard/courses' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard/courses"
                        >
                            <LucideBookCopy className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline">My Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/faq' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/faq"
                        >
                            <LucideMessageSquare className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline">FAQs</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
