import CreateUser from "@/components/admin/users/create-users";
import { UsersTable } from "@/components/admin/users/userstable";

export default function AdminUsers() {
    return (
        <>
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Users</h2>
            <section className="">
                <CreateUser />
                <UsersTable />
            </section>
        </>
    );
}
