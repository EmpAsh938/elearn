import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
    return (
        <div className="bg-white z-50 w-screen h-[80px]">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-5 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src="/images/logo.avif" alt="logo" height={300} width={300} className="w-14 object-cover" />
                    <span className="font-bold text-blue">उत्कृष्ट शिक्षा</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <li className="hover:cursor-pointer"><Link href="/courses">Courses</Link></li>
                        {/* <li className="hover:cursor-pointer"><Link href="/live-class">Live Classes</Link></li>
                        <li className="hover:cursor-pointer"><Link href="/exams">Exams</Link></li> */}
                        <li className="hover:cursor-pointer">
                            <Link href="/about-us">About us</Link>
                        </li>
                        <li className="hover:cursor-pointer">
                            <Link href="/articles">Articles</Link>
                        </li>
                        <li className="hover:cursor-pointer"><Link href="/contact">Contact</Link></li>
                    </ul>
                    <Link href="/signup">
                        <Button className="bg-green hover:bg-green">Signup</Button>
                    </Link>
                    <Link href="/login">
                        <Button className="bg-blue hover:bg-blue">Login</Button>
                    </Link>
                </div>

                {/* Mobile Navigation (Sheet) */}
                <div className="block md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost">
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="p-4">
                            <Image src="/images/logo.avif" alt="logo" height={300} width={300} className="w-14 object-cover" />
                            <ul className="flex flex-col gap-4 mt-4">
                                <li className="hover:cursor-pointer">
                                    <Link href="/courses">Courses</Link>
                                </li>
                                {/* <li className="hover:cursor-pointer">
                                    <Link href="/live-class">Live Classes</Link>
                                </li>
                                <li className="hover:cursor-pointer">
                                    <Link href="/exams">Exams</Link>
                                </li> */}
                                <li className="hover:cursor-pointer">
                                    <Link href="/about-us">About us</Link>
                                </li>
                                <li className="hover:cursor-pointer">
                                    <Link href="/articles">Articles</Link>
                                </li>
                                <li className="hover:cursor-pointer">
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                            <div className="mt-4 flex flex-col gap-2">
                                <Link href="/signup">
                                    <Button className="bg-green hover:bg-green w-full">Signup</Button>
                                </Link>
                                <Link href="/login">
                                    <Button className="bg-blue hover:bg-blue w-full">Login</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>
        </div>
    );
}
