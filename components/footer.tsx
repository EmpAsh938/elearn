import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-darkNavy text-white p-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo and About Section */}
                <div className="flex flex-col items-start">
                    <Image
                        src="/images/logo.avif"
                        width={600}
                        height={600}
                        alt="Utkrista Shiksha logo"
                        className="w-24 object-cover mb-4"
                    />
                    <span className="font-bold text-white text-2xl mb-4">उत्कृष्ट शिक्षा</span>
                    <p className="text-gray-400 mb-4">
                        Utkrista Shiksha provides comprehensive resources to help you enhance your skills and knowledge through quality e-learning.
                    </p>
                    <Link href="/about-us" className="text-blue hover:underline">Learn more about us</Link>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
                        <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                        <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Services Section */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Our Services</h3>
                    <ul className="space-y-2">
                        <li><Link href="/courses" className="hover:underline">Courses</Link></li>
                        {/* <li><Link href="/resources" className="hover:underline">Learning Resources</Link></li> */}
                        {/* <li><Link href="/community" className="hover:underline">Community Support</Link></li> */}
                    </ul>
                </div>

                {/* Social Media Section */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                    <p className="text-gray-400 mb-4">
                        Stay connected with us through our social media channels.
                    </p>
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between gap-4 lg:gap-8">
                        <a href="#" className="hover:underline" aria-label="Facebook">
                            <Facebook className="w-8 h-8 text-blue" />
                        </a>
                        <a href="#" className="hover:underline" aria-label="Twitter">
                            <Twitter className="w-8 h-8 text-blue" />
                        </a>
                        <a href="#" className="hover:underline" aria-label="Linkedin">
                            <Linkedin className="w-8 h-8 text-blue-700" />
                        </a>
                        <a href="#" className="hover:underline" aria-label="Instagram">
                            <Instagram className="w-8 h-8 text-pink-600" />
                        </a>
                        <a href="#" className="hover:underline" aria-label="Youtube">
                            <Youtube className="w-8 h-8 text-red-600" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                    <p className="text-gray-400">&copy; 2024 Utkrista Shiksha. All rights reserved.</p>
                </div>
                <div className="flex space-x-6 text-sm text-gray-400 mt-4 md:mt-0">
                    <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                    <Link href="/terms" className="hover:underline">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
