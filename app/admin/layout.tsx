"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Home, Users, Book, Video, Clipboard, Package2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

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
        title: "Grades",
        icon: <Package2 size={24} />,
        link: "/admin/grades"
    },
    {
        title: "Courses",
        icon: <Book size={24} />,
        link: "/admin/courses"
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
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
    return (
        <div className="h-screen bg-gray-100">
            <aside className={`fixed h-screen top-0 left-0 ${isCollapsed ? 'w-20' : 'w-64'} bg-darkNavy text-white flex flex-col transition-all duration-300 z-50`}>
                <div className="p-4 flex items-center justify-between">
                    <h2 className={`text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Admin Dashboard</h2>
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="focus:outline-none">
                        <Menu size={24} />
                    </button>
                </div>
                <nav className="flex-1">
                    <ul>
                        {sidemenuLinks.map((item, index) => {
                            const isActive = pathname === item.link;
                            return <li key={index} className={`px-4 hover:bg-green hover:text-textDarkNavy ${isActive ? 'bg-green text-textDarkNavy hover:bg-green' : 'bg-transparent'}`}>
                                <Link href={item.link} className='flex py-3 gap-2 w-full'>
                                    {item.icon}
                                    <p className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.title}</p>
                                </Link>
                            </li>
                        })

                        }

                    </ul>
                </nav>
            </aside>
            <main className={`p-6 relative ${isCollapsed ? 'left-20 w-[calc(100vw-80px)]' : 'left-64 w-[calc(100vw-256px)]'}`}>
                {/* <header className="bg-white shadow-md p-4 rounded-lg mb-4">
                    <h1 className="text-2xl font-bold text-darkNavy">{pathname}</h1>
                </header> */}
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
