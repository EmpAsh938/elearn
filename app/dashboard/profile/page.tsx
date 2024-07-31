"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

export default function Profile() {
    const [userName, setUserName] = useState("John Doe");
    const [userEmail, setUserEmail] = useState("john.doe@example.com");
    const [userRole, setUserRole] = useState("Student");
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmailUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic to update email (e.g., API call)
        setUserEmail(newEmail);
        setNewEmail("");
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // Logic to update password (e.g., API call)
            setPassword("");
            setConfirmPassword("");
        } else {
            alert("Passwords do not match!");
        }
    };

    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Profile</h1>
                <p className="text-lg text-darkNavy mb-4">View and update your profile information.</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Profile Information Card */}
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden py-2">
                    <div className="">
                        <Image src="/images/profile/user.jpeg" alt="Profile Picture"
                            width={600} height={600} className="h-36 w-36 object-cover rounded-full mx-auto" />
                    </div>
                    <CardHeader className="border-b border-gray-200">
                        <CardTitle className="text-2xl font-bold text-darkNavy text-center">
                            {userName}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4">
                        <p className="text-lg text-darkNavy mb-2"><strong>Email:</strong> {userEmail}</p>
                        <p className="text-lg text-darkNavy mb-4"><strong>Role:</strong> {userRole}</p>
                    </CardContent>
                </Card>

                {/* Update Basic Information Card */}
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="py-4 px-4 border-b border-gray-200">
                        <CardTitle className="text-2xl font-bold text-darkNavy">
                            Update Basic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-4 px-4">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-lg text-darkNavy mb-2">Name</label>
                                <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <Button type="submit" className="bg-green text-white w-full">Save Changes</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Update Email Card */}
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="py-4 px-4 border-b border-gray-200">
                        <CardTitle className="text-2xl font-bold text-darkNavy">
                            Update Email
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-4 px-4">
                        <form onSubmit={handleEmailUpdate}>
                            <div className="mb-4">
                                <label htmlFor="new-email" className="block text-lg text-darkNavy mb-2">New Email</label>
                                <input type="email" id="new-email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                            </div>
                            <Button type="submit" className="bg-blue text-white w-full">Update Email</Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Update Password Card */}
                <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="py-4 px-4 border-b border-gray-200">
                        <CardTitle className="text-2xl font-bold text-darkNavy">
                            Update Password
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-4 px-4">
                        <form onSubmit={handlePasswordUpdate}>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-lg text-darkNavy mb-2">New Password</label>
                                <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirm-password" className="block text-lg text-darkNavy mb-2">Confirm Password</label>
                                <input type="password" id="confirm-password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <Button type="submit" className="bg-red text-white w-full">Update Password</Button>
                        </form>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
