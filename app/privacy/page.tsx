// app/privacy/page.js
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function PrivacyPolicy() {
    return (
        <div className="overflow-x-hidden bg-gray-50">
            <Navbar />
            <main className="p-8 px-16">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Privacy Policy</h1>
                <p className="text-lg text-gray-600 mb-6 text-center">
                    Last updated: October 3, 2024
                </p>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Introduction</h2>
                    <p className="text-lg text-gray-700">
                        This Privacy Policy explains how we collect, use, and disclose your information when you use our services. By accessing our platform, you agree to the collection and use of information in accordance with this policy.
                    </p>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Information We Collect</h2>
                    <p className="text-lg text-gray-700">
                        We may collect the following types of information:
                    </p>
                    <ul className="list-disc pl-6 text-lg text-gray-700">
                        <li>Personal Identification Information (Name, Email, Phonenumber etc.)</li>
                        <li>Usage Data (How you use our services)</li>
                        <li>Cookies and Tracking Technologies</li>
                    </ul>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">How We Use Your Information</h2>
                    <p className="text-lg text-gray-700">
                        We use the collected information for various purposes, including:
                    </p>
                    <ul className="list-disc pl-6 text-lg text-gray-700">
                        <li>To provide and maintain our service</li>
                        <li>To notify you about changes to our service</li>
                        <li>To allow you to participate in interactive features of our service</li>
                        <li>To provide customer support</li>
                    </ul>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Disclosure of Your Information</h2>
                    <p className="text-lg text-gray-700">
                        We may disclose your information in the following situations:
                    </p>
                    <ul className="list-disc pl-6 text-lg text-gray-700">
                        <li>To comply with a legal obligation</li>
                        <li>To protect and defend our rights or property</li>
                        <li>To prevent or investigate possible wrongdoing in connection with the service</li>
                    </ul>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Changes to This Privacy Policy</h2>
                    <p className="text-lg text-gray-700">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                    </p>
                </section>
                <section className="mb-8 bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
                    <p className="text-lg text-gray-700">
                        If you have any questions about this Privacy Policy, please contact us:
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
