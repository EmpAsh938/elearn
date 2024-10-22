"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mic, Paperclip, Send, Smile } from "lucide-react";

interface Message {
    id: number;
    from: string;
    content: string;
    createdAt: string;
}

export default function AdminMessagePage() {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [messageInput, setMessageInput] = useState<string>("");

    // Dummy data for users and messages
    const users = [
        { id: 1, name: "Ajay Shakya", avatar: "/images/profile/user.jpeg" },
        { id: 2, name: "Utkrista Shikshya", avatar: "/images/profile/user.jpeg" },
    ];

    const messages: Message[] = [
        {
            id: 1,
            from: "Ajay Shakya",
            content: "Hi! Can you help me with my course?",
            createdAt: "2024-10-19 18:56",
        },
        {
            id: 2,
            from: "Admin",
            content: "Sure, how can I assist you?",
            createdAt: "2024-10-19 19:00",
        },
    ];

    const handleSendMessage = () => {
        if (messageInput.trim() !== "") {
            console.log("Send message:", messageInput);
            setMessageInput("");
        }
    };

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            {/* Sidebar with users */}
            <div className={`lg:w-1/4 w-full border-r p-4 ${selectedUser ? "hidden lg:block" : "block"}`}>
                <Input placeholder="Search by mobile number" className="mb-4" />
                <ScrollArea className="h-[80%]">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer ${selectedUser === user.name ? "bg-gray-200" : ""
                                }`}
                            onClick={() => setSelectedUser(user.name)}
                        >
                            <Avatar className="mr-3">
                                <AvatarImage src={user.avatar} alt={user.name} />
                            </Avatar>
                            <div>
                                <p className="font-bold">{user.name}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date().toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>

            {/* Chat Interface */}
            <div className="lg:w-3/4 w-full flex flex-col">
                {selectedUser ? (
                    <>
                        {/* Back button for mobile */}
                        <div className="p-4 border-b flex items-center lg:hidden">
                            <button
                                className="mr-4"
                                onClick={() => setSelectedUser(null)}
                            >
                                {/* Add back icon (optional) */}
                                Back
                            </button>
                            <h2 className="text-lg font-bold">{selectedUser}</h2>
                        </div>

                        <div className="p-4 border-b items-center hidden lg:flex">
                            <Avatar className="mr-3">
                                <AvatarImage src={'/images/profile/user.jpeg'} alt={selectedUser} />
                            </Avatar>
                            <h2 className="text-lg font-bold">{selectedUser}</h2>
                        </div>

                        {/* Message List */}
                        <ScrollArea className="flex-1 p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.from === "Admin" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    <div className="p-3 rounded-lg max-w-xs bg-gray-400">
                                        <p className="text-sm">{msg.content}</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {msg.createdAt}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </ScrollArea>

                        <Separator />

                        {/* Message Input Area */}
                        <div className="p-4 flex items-center space-x-2">
                            <Button variant="ghost" size="icon">
                                <Paperclip />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Smile />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Mic />
                            </Button>
                            <Textarea
                                placeholder="Enter message"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                className="flex-grow"
                            />
                            <Button
                                className="bg-blue text-white"
                                onClick={handleSendMessage}
                            >
                                <Send className="mr-2" />
                                Send
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-500">
                        <p>Select a user to start conversation</p>
                    </div>
                )}
            </div>
        </div>
    );
}
