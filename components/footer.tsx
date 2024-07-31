import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-darkNavy text-white p-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-2">

                    {/* logo */}
                    <div className="">
                        <Image src="/images/logo.avif" width={600} height={600} alt="elearning platform" className="w-20 object-cover" />
                    </div>
                    {/* About Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-2">About Us</h3>
                        <p className="text-gray-400 mb-4">
                            Our e-learning platform provides comprehensive resources to help you enhance your skills and knowledge.
                        </p>
                        <Link href="/about" className="text-blue-400 hover:underline">Learn more</Link>
                    </div>
                </div>


                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-2">Quick Links</h3>
                    <div className="flex gap-2">
                        <Link href="/contact" className="hover:underline">Contact Us</Link>
                        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                        <Link href="/terms" className="hover:underline">Terms of Service</Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                    <p className="text-gray-400">&copy; 2024 E-Learning Platform. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:underline"><Facebook className="w-6 h-6 text-blue-600" /></a>
                    <a href="#" className="hover:underline"><Twitter className="w-6 h-6 text-blue-400" /></a>
                    <a href="#" className="hover:underline"><Linkedin className="w-6 h-6 text-blue-700" /></a>
                    <a href="#" className="hover:underline"><Instagram className="w-6 h-6 text-pink-600" /></a>
                    <a href="#" className="hover:underline"><Youtube className="w-6 h-6 text-red-600" /></a>
                </div>
            </div>
        </footer>
    );
}
