"use client";

import { LucideHome, LucideBookOpen, LucideMessageSquare, LucideBookCopy, ClipboardCheck, Video, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
    isOpen: boolean;
};

const Sidebar = ({ isOpen }: Props) => {
    const pathname = usePathname(); // Get current path

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-[50] md:p-4 w-20 transition-all duration-300 md:w-52 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >

            {/* Logo and Utkrista Shiksha in Nepali */}
            <div className="mb-8 flex items-center justify-start">
                <Image
                    src="/images/utkrista-logo.png"
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
                <ul>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard"
                        >
                            <LucideHome className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline font-medium">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard/browse' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard/browse"
                        >
                            <LucideBookOpen className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline font-medium">Browse Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard/courses' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard/courses"
                        >
                            <LucideBookCopy className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline font-medium">My Courses</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard/exams' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard/exams"
                        >
                            <ClipboardCheck className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline font-medium">Exams</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard/live-classes' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard/live-classes"
                        >
                            <Video className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline font-medium">Live Class</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard/calendar' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard/calendar"
                        >
                            <Calendar className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline font-medium">Calendar</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/dashboard/faq' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/dashboard/faq"
                        >
                            <LucideMessageSquare className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline font-medium">FAQs</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
