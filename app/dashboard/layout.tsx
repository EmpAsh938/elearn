import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen">
            <Sidebar />
            <Topbar />
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    )
}