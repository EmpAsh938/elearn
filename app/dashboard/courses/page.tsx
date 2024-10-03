import Booked from "@/components/dashboard/booked";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Courses() {
    return (
        <div className="ml-20 md:ml-52 mt-16 p-6">
            <section className="mb-4">
                <h2 className="text-left text-2xl font-semibold mb-4">My Courses</h2>

                <div className="flex items-center justify-end ">
                    <div className="flex items-center border border-gray-300 rounded px-2">

                        <Search className="h-4 w-4" />
                        <Input
                            type="text"
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for courses..."
                            className="w-full focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 ring-offset-0 border-none outline-none"
                        />
                    </div>


                </div>

            </section>
            <Booked />
        </div>
    )
}