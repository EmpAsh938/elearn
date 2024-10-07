import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "./provider";

const ubuntu = Ubuntu({
    weight: ['300', '400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Utkrista Shikshya",
    description: "Welcome to Utkrista Shikshya, a leading online learning platform committed to providing accessible and high-quality education for all. Our mission is to break down barriers to education and empower learners everywhere with knowledge that is both affordable and effective.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${ubuntu.className} antialiased bg-[var(--c-white-1)] text-textDarkNavy`}>
                <AppProvider>

                    {children}
                    <Toaster />
                </AppProvider>
            </body>
        </html>
    );
}
