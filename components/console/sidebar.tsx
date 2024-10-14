"use client";

import {
    LucideHome,
    LucideBookOpen,
    LucideMessageSquare,
    LucideHelpCircle,
    LucideFacebook,
    LucideInstagram,
    LucideYoutube
} from 'lucide-react';
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
            className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 z-[50] md:p-4 w-20 transition-all duration-300 md:w-52 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >

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
            <nav className='flex-1'>
                <ul>
                    {/* Dashboard */}
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/console' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/console"
                        >
                            <LucideHome className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline">Dashboard</span>
                        </Link>
                    </li>

                    {/* Classes */}
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/console/classes' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/console/classes"
                        >
                            <LucideBookOpen className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline">Classes</span>
                        </Link>
                    </li>


                    {/* Support */}
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/console/support' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/console/support"
                        >
                            <LucideHelpCircle className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline">Support</span>
                        </Link>
                    </li>

                    {/* FAQs */}
                    <li>
                        <Link
                            className={`flex gap-4 justify-center md:justify-start items-end text-base tracking-wide hover:cursor-pointer py-2 ${pathname === '/console/faq' ? 'bg-gray-100' : 'bg-white'}`}
                            href="/console/faq"
                        >
                            <LucideMessageSquare className="inline-block sm:w-6 sm:h-6" />
                            <span className="hidden md:inline">FAQs</span>
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Social Links */}
            <div className="mt-8 flex flex-col gap-2 md:flex-row items-center md:gap-0 justify-center md:justify-start">
                <Link href="https://www.facebook.com" target="_blank">
                    <LucideFacebook className="w-6 h-6 mx-2" />
                </Link>
                <Link href="https://www.instagram.com" target="_blank">
                    <LucideInstagram className="w-6 h-6 mx-2" />
                </Link>
                <Link href="https://www.youtube.com" target="_blank">
                    <LucideYoutube className="w-6 h-6 mx-2" />
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
