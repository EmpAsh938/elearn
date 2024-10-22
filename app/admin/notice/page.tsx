"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";


export default function NoticePage() {
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const [noticeTo, setNoticeTo] = useState<string>(""); // Selected package or recipients
    // const [notices, setNotices] = useState<any[]>([]); // Store sent notices

    // Dummy notice data
    const [notices, setNotices] = useState<any[]>([
        {
            id: 1,
            title: "Midterm Exam Notice",
            body: "Midterm exams are scheduled for next week.",
            noticeTo: "students",
            createdAt: "2024-10-18T09:30:00Z",
        },
        {
            id: 2,
            title: "Assignment Deadline",
            body: "Submit your project assignment by the end of the month.",
            noticeTo: "students",
            createdAt: "2024-10-15T11:45:00Z",
        },
        {
            id: 3,
            title: "Staff Meeting",
            body: "A staff meeting will be held tomorrow at 10 AM.",
            noticeTo: "teachers",
            createdAt: "2024-10-14T08:00:00Z",
        },
    ]);

    // Fetch previously sent notices
    const fetchNotices = async () => {
        return;
        try {
            const response = await fetch("/api/notices"); // API endpoint to fetch all notices
            if (!response.ok) throw new Error("Failed to fetch notices");

            const data = await response.json();
            setNotices(data.notices);
        } catch (error: any) {
            console.log({
                variant: "destructive",
                title: "Error",
                description: error.toString(),
            });
        }
    };

    useEffect(() => {
        fetchNotices(); // Fetch notice history on component mount
    }, []);

    // Handle sending a new notice
    const handleSendNotice = async () => {
        try {
            const response = await fetch("/api/notice", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    body,
                    noticeTo,
                }),
            });

            if (!response.ok) throw new Error("Failed to send notice");

            toast({
                description: `Notice sent to ${noticeTo}`,
            });

            // Reset form fields
            setTitle("");
            setBody("");
            setNoticeTo("");

            // Refetch notices after sending a new one
            fetchNotices();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Send a Notice</h2>

            {/* Form to send a new notice */}
            <div className="space-y-2 max-w-lg w-full">
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                />

                <Textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full"
                />

                <Select onValueChange={setNoticeTo} defaultValue={noticeTo}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Notice Recipients" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="students">Students</SelectItem>
                        <SelectItem value="teachers">Teachers</SelectItem>
                    </SelectContent>
                </Select>

                <Button className="bg-blue text-white w-full" onClick={handleSendNotice}>
                    Send
                </Button>
            </div>

            {/* History of sent notices */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold">Previous Notices</h3>
                {notices.length === 0 ? (
                    <p className="text-gray-500">No notices sent yet.</p>
                ) : (
                    <ul className="space-y-4">
                        {notices.map((notice) => (
                            <li key={notice.id} className="border p-4 rounded-lg shadow-sm">
                                <h4 className="font-bold">{notice.title}</h4>
                                <p className="text-sm text-gray-600">{notice.body}</p>
                                <p className="text-xs text-gray-400">To: {notice.noticeTo}</p>
                                <p className="text-xs text-gray-400">Date: {new Date(notice.createdAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
