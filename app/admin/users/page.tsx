import { UsersTable } from "@/components/admin/users/userstable";

export default function AdminUsers() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Users</h2>
            <section className="">
                <UsersTable />
            </section>
        </div>
    );
}
