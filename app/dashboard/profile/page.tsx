"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
    id: string;
    name: string;
    collegename: string;
    email: string;
    imageName: string;
}

export default function UserProfile() {
    const [user, setUser] = useState<UserProfile | null>(null); // Initialize user as null
    const [isEditing, setIsEditing] = useState(false);
    const [profilePicture, setProfilePicture] = useState<string>("/images/profile/user.jpeg"); // Default profile picture
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // To hold the selected file
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch fresh user data from API
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        if (Object.entries(userData).length === 0) {
            console.log("User not found");
            setLoading(false);
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`/api/user/id?userId=${userData.id}`); // Replace with actual API URL
                const data = await response.json();
                setUser(data.body);

                // Update profile picture after user data is fetched
                if (data.body?.imageName) {
                    setProfilePicture(process.env.NEXT_PUBLIC_API_ENDPOINT + "users/image/" + data.body.imageName);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => (prevUser ? { ...prevUser, [name]: value } : null)); // Handle null state
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file); // Set the selected file
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result as string); // Update the profile picture preview
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadProfilePicture = async () => {
        if (!selectedFile || !user) return null; // If no file is selected, skip upload

        const formData = new FormData();
        formData.append("file", selectedFile); // Append the file to FormData
        formData.append("userId", user.id); // Append the userId to FormData

        try {
            const response = await fetch("/api/user/image", {
                method: "POST",
                body: formData, // Send FormData
            });

            const data = await response.json();
            return;
        } catch (error: any) {
            console.error("Error uploading profile picture:", error);
            toast({ variant: "destructive", description: error.message });
            return null;
        }
    };

    const saveProfile = async () => {
        if (!user) return; // Check if user is defined
        setIsEditing(false);

        try {
            // Upload profile picture if a new one is selected
            await uploadProfilePicture();

            // Make the PUT request to save the profile data
            const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    email: user.email,
                    name: user.name,
                    collegename: user.collegename
                }),
            });

            await response.json();
            toast({ description: "Profile updated successfully" });
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast({ variant: "destructive", description: error.message });
        }
    };

    if (loading) {
        return (
            <div className="md:ml-52 mt-16 p-6">

                <p>Loading...</p>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="md:ml-52 mt-16 p-6">

                <p>User data not found.</p>
            </div>)
    }

    console.log(profilePicture)

    return (
        <div className="md:ml-52 mt-16 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Section - Profile Picture and Info */}
                <div className="text-center lg:text-left">
                    <div className="relative mx-auto lg:mx-0 w-32 h-32 rounded-full overflow-hidden">
                        <Image
                            src={profilePicture}
                            alt={user.name || "User Profile Picture"} // Fallback alt text
                            layout="fill"
                            className="object-cover"
                        />
                    </div>
                    <h2 className="text-2xl font-bold mt-4">{user.name || "Loading..."}</h2>
                    <p className="text-gray-500">
                        <span className="inline-block mr-2">&#128197;</span>Member since 2024
                    </p>

                    {!isEditing && (
                        <Button onClick={() => setIsEditing(true)} className="bg-gray-800 mt-4 w-48 lg:w-full">
                            Edit Profile
                        </Button>
                    )}
                </div>

                {/* Right Section - Basic Info */}
                <div className="col-span-2">
                    <h3 className="text-xl font-semibold mb-6">Basic Info</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold">Name</label>
                            {!isEditing ? (
                                <p className="text-lg">{user.name || "Loading..."}</p>
                            ) : (
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold">Mobile Number</label>
                            <p className="text-lg">{user.email || "Loading..."}</p>
                        </div>

                        {/* College Name */}
                        {/* <div>
                            <label className="block mb-1 text-sm font-semibold">College Name</label>
                            <p className="text-lg">{user.collegename || "Loading..."}</p>
                        </div> */}

                        {/* State (Static) */}
                        <div>
                            <label className="block mb-1 text-sm font-semibold">State</label>
                            <p className="text-lg">Nepal</p>
                        </div>
                    </div>

                    {isEditing && (
                        <div className="mt-6">
                            <label className="block mb-1 text-sm font-semibold">Upload Profile Picture</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="mb-4"
                            />
                            <Button onClick={saveProfile} className="bg-green text-white">
                                Save Changes
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
