import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { TCourses } from "@/app/lib/types";
import { Textarea } from "@/components/ui/textarea";

type Props = {
    faculty: TCourses;
    open: boolean;
    onClose: () => void;
    onSave: any;
}

const predefinedType = ["Pre-booking", "upcoming"];


export function UpdateModal({ faculty, open, onClose, onSave }: Props) {
    const [title, setTitle] = useState(faculty?.categoryTitle || "");
    const [description, setDescription] = useState(faculty?.categoryDescription || "");
    const [file, setFile] = useState<File | null>(null); // State for the uploaded file

    const [type, setType] = useState(faculty.courseType || "upcoming");
    const [price, setPrice] = useState(faculty.price || "");


    const handleSave = async () => {
        let imageUrl = ""; // Variable to store the image URL if uploaded

        // Step 1: Upload the image if a file is selected
        if (file) {
            const formData = new FormData();
            formData.append("file", file); // Append the file to FormData
            formData.append("categoryId", faculty.categoryId); // Append the file to FormData

            try {
                const imageResponse = await fetch('/api/upload/categories', {
                    method: 'POST',
                    body: formData,
                });

                const imageData = await imageResponse.json();

                if (imageResponse.status !== 200) {
                    throw new Error(imageData.error || "Error uploading image");
                }

                imageUrl = imageData.url; // Assuming the API returns the URL of the uploaded image
            } catch (error) {
                console.error("Failed to upload image:", error);
                // Optionally show a toast or error message here
                return; // Exit the function if the image upload fails
            }
        }

        // Step 2: Update the package details
        const updatedData = {
            categoryId: faculty.categoryId, // Assuming faculty has an id property
            categoryTitle: title,
            categoryDescription: description,
            price,
            courseType: type
        };

        try {
            const updateResponse = await fetch('/api/faculty', {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send updated data as JSON
            });

            const updateData = await updateResponse.json();

            if (updateResponse.status !== 200) {
                throw new Error(updateData.error || "Error updating package");
            }

            onSave(updateData); // Call the onSave function with the updated data
            onClose(); // Close the modal after saving

        } catch (error) {
            console.error("Failed to update package:", error);
            // Optionally show a toast or error message here
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Package</DialogTitle>
                    <DialogDescription>
                        Make changes to the package&apos;s information below.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Name" />
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                    {/* File Input for image upload */}
                    <Image
                        src={faculty.imageName ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}categories/image/${faculty.imageName}` : "/images/courses/default.png"}
                        alt={faculty.categoryTitle}
                        width={50}
                        height={50}
                        className="h-8 w-8 rounded-full object-cover mx-auto"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target.files[0]); // Update the state with the selected file
                            }
                        }}
                    />
                    {/* Dropdown for predefined types */}
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        {predefinedType.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1500" />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
