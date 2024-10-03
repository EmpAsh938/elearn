"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button"; // shadcn button
import { Input } from "@/components/ui/input"; // shadcn input
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"; // shadcn sheet components
import { Menu, Search } from "lucide-react"; // Lucide React Icons

interface SearchResult {
    id: number;
    name: string;
}

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Replace with your actual search logic or API call
        if (query.length > 0) {
            setSearchResults([
                { id: 1, name: "Result 1" },
                { id: 2, name: "Result 2" },
                { id: 3, name: "Result 3" },
            ]);
            setIsSearchVisible(true);
        } else {
            setIsSearchVisible(false);
        }
    };

    return (
        <div className="bg-white z-50 w-screen md:h-[80px] relative">
            <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/logo.avif"
                        alt="logo"
                        height={300}
                        width={300}
                        className="w-14 object-cover"
                    />
                    <span className="font-bold text-blue">उत्कृष्ट शिक्षा</span>
                </Link>

                {/* Search Bar for Desktop */}
                <div className="relative mx-6 flex-1 md:block hidden">
                    <div className="relative">
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="border border-gray-300 rounded-md px-4 py-2 pl-10" // Added left padding for icon
                        />
                        <Search className="absolute left-3 top-2 text-gray-500" size={20} />
                    </div>

                    {/* Search Results */}
                    {isSearchVisible && (
                        <div className="absolute left-0 top-12 w-full bg-white shadow-lg rounded-md z-10">
                            <ul className="flex flex-col">
                                {searchResults.map((result) => (
                                    <li
                                        key={result.id}
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {result.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <li className="hover:cursor-pointer">
                            <Link href="/courses">Courses</Link>
                        </li>
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

                    <Link href="/signup">
                        <Button variant="default" className="bg-green">
                            Signup
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="default" className="bg-blue">
                            Login
                        </Button>
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
                            <Image
                                src="/images/logo.avif"
                                alt="logo"
                                height={300}
                                width={300}
                                className="w-14 object-cover"
                            />
                            <ul className="flex flex-col gap-4 mt-4">
                                <li className="hover:cursor-pointer">
                                    <Link href="/courses">Courses</Link>
                                </li>
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
                                    <Button className="bg-green w-full">Signup</Button>
                                </Link>
                                <Link href="/login">
                                    <Button className="bg-blue w-full">Login</Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            {/* Search Bar for Mobile - Below Navbar */}
            <div className="md:hidden px-4 py-2">
                <div className="relative">
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search..."
                        className="border border-gray-300 rounded-md px-4 py-2 pl-10 w-full" // Added left padding for icon
                    />
                    <Search className="absolute left-3 top-2 text-gray-500" size={20} />
                </div>

                {/* Search Results for Mobile */}
                {isSearchVisible && (
                    <div className="bg-white shadow-lg rounded-md mt-2 z-10">
                        <ul className="flex flex-col">
                            {searchResults.map((result) => (
                                <li
                                    key={result.id}
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                >
                                    {result.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
