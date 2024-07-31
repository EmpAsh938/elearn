import { CreateDialog } from "@/components/admin/packages/create";

export default function LiveClasses() {
    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Packages/Grades</h2>
            <section>
                <CreateDialog />
            </section>
        </>
    );
}
