import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 bg-white z-50 w-screen h-[80px]">
            <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-5 py-4">
                <Link href="/">
                    <Image src="/images/logo.avif" alt="logo" height={300} width={300} className="w-14 object-cover" />
                </Link>

                <div className="flex items-center gap-4">
                    <ul className="flex items-center gap-4">
                        <li className="hover:cursor-pointer"><Link href="/courses">Courses</Link></li>
                        <li className="hover:cursor-pointer"><Link href="/live-class">Live Classes</Link></li>
                        <li className="hover:cursor-pointer"><Link href="/exams">Exams</Link></li>
                        <li className="hover:cursor-pointer"><Link href="/contact">Contact</Link></li>
                    </ul>
                    <Link href="/signup">
                        <Button className="bg-green hover:bg-green">Signup</Button>
                    </Link>
                    <Link href="/login">
                        <Button className="bg-blue hover:bg-blue">Login</Button>
                    </Link>
                </div>
            </nav>
        </div>

    )
}