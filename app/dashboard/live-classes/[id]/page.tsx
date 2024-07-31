"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
// import io from 'socket.io-client';

// const socket = io('http://your-socket-server-url'); // Replace with your socket server URL

export default function LiveClassRoom({ params }: { params: { id: string } }) {
    const { id } = params;
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Set up video stream
        const videoElement = videoRef.current;

        if (videoElement) {
            // URL of the HLS/DASH stream (replace with actual stream URL)
            videoElement.src = 'http://your-media-server-url/live/stream.m3u8';
            videoElement.play()
                .then(() => {
                    setIsStreaming(true);
                })
                .catch(error => {
                    console.error('Error playing video:', error);
                });
        }

        // Handle incoming chat messages
        // socket.on('chat message', (msg: string) => {
        //     setMessages(prevMessages => [...prevMessages, msg]);
        // });

        return () => {
            // socket.off('chat message');
        };
    }, []);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
            // socket.emit('chat message', message);
            setMessage('');
        }
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-darkNavy mb-4">Live Class: {id}</h1>
            <div className="flex flex-col lg:flex-row w-full gap-6">
                <div className="w-full lg:w-2/3">
                    {!isStreaming ? (
                        <p className="text-lg text-darkNavy text-center">Waiting for the teacher to start the stream...</p>
                    ) : (
                        <video ref={videoRef} controls className="w-full bg-black rounded-lg" />
                    )}
                </div>
                <div className="w-full lg:w-1/3 flex flex-col">
                    <h2 className="text-xl font-semibold">Live Chat</h2>
                    <div className="flex-1 overflow-y-auto mb-4 border border-gray-300 rounded-lg p-4 py-1">
                        {messages.map((msg, index) => (
                            <p key={index} className="text-lg text-darkNavy">{msg}</p>
                        ))}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg p-2 text-lg"
                        />
                        <Button
                            onClick={handleSendMessage}
                            className="ml-2 bg-blue text-white rounded-lg p-2 text-lg"
                        >
                            Send
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
