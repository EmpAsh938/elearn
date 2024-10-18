"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Home, Users, Book, Video, Clipboard, Package2, LogOut, BookImage, GraduationCap, BookUser, DollarSign } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Topbar from '@/components/admin/topbar';

interface LayoutProps {
    children: React.ReactNode;
}


const sidemenuLinks = [
    {
        title: "Home",
        icon: <Home size={24} />,
        link: "/admin"
    },
    {
        title: "Users",
        icon: <Users size={24} />,
        link: "/admin/users"
    },

    {
        title: "Students",  // Added Students route
        icon: <GraduationCap size={24} />, // Icon for students (you can change this to any suitable icon)
        link: "/admin/students"
    },
    {
        title: "Teachers",  // Added Teachers route
        icon: <BookUser size={24} />, // Icon for teachers (use a relevant icon for teachers)
        link: "/admin/teachers"
    },
    {
        title: "Bookings",
        icon: <BookImage size={24} />,
        link: "/admin/bookings"
    },
    {
        title: "Payments",
        icon: <DollarSign size={24} />, // Use an appropriate icon, like `DollarSign`
        link: "/admin/payment"         // Replace with the correct payments route
    },
    {
        title: "Packages",
        icon: <Package2 size={24} />,
        link: "/admin/packages"
    },
    {
        title: "Live Classes",
        icon: <Video size={24} />,
        link: "/admin/live-classes"
    },
    {
        title: "Exams",
        icon: <Clipboard size={24} />,
        link: "/admin/exams"
    },
    // {
    //     title: "Courses",
    //     icon: <Book size={24} />,
    //     link: "/admin/course"
    // },
    // {
    //     title: "Recent Activities",
    //     icon: <Activity size={24} />,
    //     link: "/dashboard/activities"
    // },
    // {
    //     title: "Profile",
    //     icon: <User size={24} />,
    //     link: "/dashboard/profile"
    // }
];


const AdminLayout = ({ children }: LayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const pathname = usePathname();

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
        <div className="h-screen bg-gray-100">
            <Topbar isOpen={isCollapsed} />
            <aside className={`fixed h-screen top-0 left-0 ${isCollapsed ? 'w-20' : 'w-64'} bg-darkNavy text-white flex flex-col transition-all duration-300 z-50`}>
                <div className={`p-0 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between p-1'} my-4`}>
                    <h2 className={`text-xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Admin Dashboard</h2>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="focus:outline-none">
                        <Menu size={24} />
                    </button>
                </div>
                <nav className="flex-1">
                    <ul>
                        {sidemenuLinks.map((item, index) => {
                            const isActive = pathname === item.link;
                            return <li key={index} className={`px-4 hover:bg-green hover:text-textDarkNavy ${isActive ? 'bg-green text-textDarkNavy hover:bg-green' : 'bg-transparent'}`}>
                                <Link href={item.link} className={`flex py-3 gap-2 w-full ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
                                    {item.icon}
                                    <p className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.title}</p>
                                </Link>
                            </li>
                        })

                        }

                    </ul>
                </nav>

                <div className="flex items-center justify-start pb-2 pl-4">
                    <Button onClick={handleLogout} variant="ghost" className={`flex gap-2 w-full justify-start ${isCollapsed ? 'justify-center' : 'justify-start'} text-red hover:bg-transparent hover:text-red`}>
                        <LogOut size={24} />
                        {isCollapsed || <span>Logout</span>}
                    </Button>
                </div>
            </aside>
            <main className={`pt-16 ${isCollapsed ? 'pl-20' : 'pl-64'}`}>
                {/* <header className="bg-white shadow-md p-4 rounded-lg mb-4">
                    <h1 className="text-2xl font-bold text-darkNavy">{pathname}</h1>
                </header> */}
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
