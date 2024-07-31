import { CreateDialog } from "@/components/admin/courses/create";

export default function AdminCourses() {
    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Courses</h2>
            {/* Add course management UI here */}
            <section>
                <CreateDialog />
            </section>
        </>
    );
}
