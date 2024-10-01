"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from 'lucide-react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface LiveClass {
    liveid: string;
    title: string;
    streamlink: string;
    startingTime: string;
}

export default function LiveClasses() {
    const [liveClass, setLiveClass] = useState<LiveClass[]>([]);
    const [isForbidden, setIsForbidden] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedClass, setSelectedClass] = useState<LiveClass | null>(null);
    const [chatMessage, setChatMessage] = useState<string>('');
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const [user, setUser] = useState<{ id: string; faculty: string } | null>(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(storedUser);

        const fetchLiveClass = async () => {
            try {
                const req = await fetch(`/api/live/user?userId=${storedUser.id}`);
                const res = await req.json();
                if (res.status === 403) {
                    return setIsForbidden(true);
                }
                setLiveClass(res.body);
            } catch (error) {
                console.log(error);
            }
        };

        if (storedUser && storedUser.id) {
            fetchLiveClass();
        }
    }, []);

    const handleJoin = (liveClass: LiveClass) => {
        setSelectedClass(liveClass);
        setIsModalOpen(true);
    };

    const handleChatSubmit = () => {
        if (chatMessage.trim()) {
            setChatMessages([...chatMessages, chatMessage]);
            setChatMessage('');
        }
    };

    if (isForbidden) {
        return <div className="p-6 h-screen">
            <p>You are forbidden to access the resource/content with this current plan.</p>
        </div>;
    }

    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Live Classes</h1>
                {user && (
                    <p className="text-lg text-darkNavy mb-4">
                        Here are the live classes available for your{" "}
                        <span className="text-blue font-medium">{user.faculty} plan</span>.
                    </p>
                )}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveClass.map((item) => (
                    <Card key={item.liveid} className="bg-white shadow-lg">
                        <div className="relative w-full h-40">
                            <Image
                                src="/images/live-session.jpg"
                                alt={item.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                            />
                        </div>
                        <CardHeader className="py-2 border-b-2 border-gray-300 mb-1">
                            <CardTitle className="text-2xl font-bold text-darkNavy flex items-center">
                                <Video className="mr-2 text-green" /> {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-darkNavy mb-4">
                                <strong>Starts At:</strong> {item.startingTime}
                            </p>
                            <Button className="bg-red text-white w-full" onClick={() => handleJoin(item)}>
                                Join Live Class
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </section>

            {/* Dialog for showing live class */}
            {selectedClass && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold mb-4">{selectedClass.title}</DialogTitle>
                        </DialogHeader>

                        {/* Live stream video */}
                        <div className="mb-4">
                            {selectedClass.streamlink ? (
                                selectedClass.streamlink.endsWith('.mp4') ? (
                                    <video className="w-full h-auto" controls src={selectedClass.streamlink} />
                                ) : (
                                    <iframe
                                        className="w-full h-64 md:h-96"
                                        src={selectedClass.streamlink}
                                        title={`Live stream for ${selectedClass.title}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )
                            ) : (
                                <p>No stream available</p>
                            )}
                        </div>

                        {/* Chat section */}
                        <div className="mb-4">
                            <h3 className="text-lg font-bold mb-2">Live Chat</h3>
                            <div className="border p-2 mb-4 h-40 overflow-y-scroll">
                                {chatMessages.map((msg, index) => (
                                    <p key={index} className="mb-1">{msg}</p>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Enter message"
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                />
                                <Button onClick={handleChatSubmit}>Send</Button>
                            </div>
                        </div>

                        <Button onClick={() => setIsModalOpen(false)} className="mt-4">
                            Close
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
