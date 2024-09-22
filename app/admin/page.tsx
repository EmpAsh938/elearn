import AdminBarChart from '@/components/admin/charts/barchart';
import AdminPieChart from '@/components/admin/charts/piechart';
import Link from 'next/link';

export default function AdminHome() {
    return (
        <div className='p-6'>
            <h2 className="text-3xl font-bold text-darkNavy mb-4">Welcome, Admin</h2>
            <p className="text-lg text-darkNavy mb-4">
                This is the admin dashboard where you can manage users, courses, and exams.
            </p>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-darkNavy mb-2">Users</h3>
                    <p className="text-darkNavy mb-4">Manage and view all registered users.</p>
                    <Link href="/admin/users">
                        <p className="text-blue hover:underline">Go to Users</p>
                    </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-darkNavy mb-2">Courses</h3>
                    <p className="text-darkNavy mb-4">Create, edit, and manage courses.</p>
                    <Link href="/admin/courses">
                        <p className="text-blue hover:underline">Go to Courses</p>
                    </Link>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-darkNavy mb-2">Exams</h3>
                    <p className="text-darkNavy mb-4">Create, edit, and manage exams.</p>
                    <Link href="/admin/exams">
                        <p className="text-blue hover:underline">Go to Exams</p>
                    </Link>
                </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
                <AdminBarChart />
                <AdminPieChart />
            </section>
        </div>
    );
}
