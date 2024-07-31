
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Activity, User, Menu, FileText, Video, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


type Props = {
    isCollapsed: boolean;
    toggleCollapse: (value: boolean) => void;
}

const sidemenuLinks = [
    {
        title: "Home",
        icon: <Home size={24} />,
        link: "/dashboard"
    },
    {
        title: "Courses",
        icon: <BookOpen size={24} />,
        link: "/dashboard/courses"
    },
    {
        title: "Live Classes",
        icon: <Video size={24} />,
        link: "/dashboard/live-classes"
    },
    {
        title: "Exams",
        icon: <FileText size={24} />,
        link: "/dashboard/exams"
    },
    // {
    //     title: "Recent Activities",
    //     icon: <Activity size={24} />,
    //     link: "/dashboard/activities"
    // },
    {
        title: "Profile",
        icon: <User size={24} />,
        link: "/dashboard/profile"
    }
];

export default function Sidebar({ isCollapsed, toggleCollapse }: Props) {
    const pathname = usePathname();
    return (
        <aside className={`fixed top-0 left-0 h-screen bg-white text-textDarkNavy flex flex-col ${isCollapsed ? "w-28" : "w-64"} transition-all duration-300`}>
            <Image src="/images/logo.avif" alt="Company logo" height={300} width={300} className="w-20 object-cover pl-4 pt-2" />
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 pr-0`}>
                {isCollapsed || <h2 className="text-2xl font-bold">Dashboard</h2>}
                <Button variant="ghost" className="hover:bg-transparent" onClick={() => toggleCollapse(!isCollapsed)}>
                    <Menu size={24} />
                </Button>
            </div>
            <nav className="flex-1 px-4">
                <ul className="space-y-4">
                    {sidemenuLinks.map((item, index) => {
                        const isActive = pathname === item.link;

                        return (
                            <li key={index}>
                                <Link href={item.link}>
                                    <p className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-start gap-2'} py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-blue text-lightBlue' : 'hover:bg-blue hover:text-lightBlue'}`}>
                                        {item.icon}
                                        {isCollapsed || <span>{item.title}</span>}
                                    </p>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="flex items-center justify-start pb-2 pl-4">
                <Button variant="ghost" className={`flex gap-2 w-full justify-start ${isCollapsed ? 'justify-center' : 'justify-start'} text-red hover:bg-transparent hover:text-red`}>
                    <LogOut size={24} />
                    {isCollapsed || <span>Logout</span>}
                </Button>
            </div>
        </aside>
    );
}
