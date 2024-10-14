"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // Import Image for using avatars

export default function TeacherChat() {
    // State to manage messages
    const [messages, setMessages] = useState([
        { id: 1, sender: "Student", text: "I have a question about the assignment.", timestamp: new Date(), avatar: "/images/profile/user.jpeg" },
        { id: 2, sender: "Teacher", text: "Sure, how can I help you?", timestamp: new Date(), avatar: "/images/profile/user.jpeg" },
    ]);

    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom when a new message is added
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages((prev) => [
                ...prev,
                { id: prev.length + 1, sender: "Teacher", text: newMessage, timestamp: new Date(), avatar: "/images/profile/user.jpeg" },
            ]);
            setNewMessage(""); // Clear input after sending
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Teacher Chat</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col h-[400px]">
                        {/* Display messages */}
                        <div className="flex-1 overflow-y-auto p-2">
                            {messages.map((message) => (
                                <div key={message.id} className={`mb-2 flex ${message.sender === "Teacher" ? "justify-start" : "justify-end"}`}>
                                    <div className={`max-w-xs flex items-start space-x-2 p-2 ${message.sender === "Teacher" ? "bg-blue text-white" : "bg-green text-white"} rounded-lg`}>
                                        <Image
                                            src={message.avatar}
                                            alt={`${message.sender} avatar`}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <strong>{message.sender}: </strong>
                                            {message.text}
                                            <div className="text-xs text-gray-200">
                                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input area for new messages */}
                        <div className="flex mt-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message..."
                                className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
                            />
                            <Button onClick={handleSendMessage} className="h-full">Send</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
