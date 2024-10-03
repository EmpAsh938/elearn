import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Terms() {
    return (
        <div className="overflow-x-hidden bg-gray-50">
            <Navbar />
            <main className="p-8 px-16">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Terms and Conditions</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">
                    Last updated: October 3, 2024
                </p>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
                    <p className="text-lg text-gray-700">
                        These Terms and Conditions outline the rules and regulations for the use of our services. By accessing our platform, you agree to abide by these terms.
                    </p>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Acceptance of Terms</h2>
                    <p className="text-lg text-gray-700">
                        By using our services, you confirm that you accept these Terms and Conditions and that you agree to comply with them.
                    </p>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Responsibilities</h2>
                    <p className="text-lg text-gray-700">
                        Users are responsible for:
                    </p>
                    <ul className="list-disc pl-6 text-lg text-gray-700">
                        <li>Providing accurate and complete information.</li>
                        <li>Maintaining the confidentiality of account credentials.</li>
                        <li>Not engaging in any conduct that may harm the platform or its users.</li>
                    </ul>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Intellectual Property</h2>
                    <p className="text-lg text-gray-700">
                        All content, trademarks, and other intellectual property rights associated with our services are owned by us or our licensors. Unauthorized use of any materials may violate copyright, trademark, and other laws.
                    </p>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Limitation of Liability</h2>
                    <p className="text-lg text-gray-700">
                        We shall not be liable for any damages or losses resulting from your use of our services. This includes, but is not limited to, any direct, indirect, incidental, or consequential damages.
                    </p>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to Terms</h2>
                    <p className="text-lg text-gray-700">
                        We may revise these Terms and Conditions from time to time. The most current version will be posted on this page, and your continued use of our services after any changes constitutes your acceptance of the new Terms and Conditions.
                    </p>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
                    <p className="text-lg text-gray-700">
                        If you have any questions about these Terms and Conditions, please contact us:
                    </p>
                    <ul className="list-disc pl-6 text-lg text-gray-700">
                        <li>Email: support@example.com</li>
                        <li>Phone: (123) 456-7890</li>
                    </ul>
                </section>
            </main>
            <Footer />
        </div>
    );
}
