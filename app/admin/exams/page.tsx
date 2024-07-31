import { CreateDialog } from "@/components/admin/exams/create";

export default function AdminExams() {
    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Exams</h2>
            {/* Add exam management UI here */}
            <section>
                <CreateDialog />
            </section>
        </>
    );
}
