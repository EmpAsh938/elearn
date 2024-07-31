import { CreateDialog } from "@/components/admin/live-classes/create";

export default function LiveClasses() {
    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Live Class</h2>
            <section>
                <CreateDialog />
            </section>
        </>
    );
}
