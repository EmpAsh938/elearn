"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function LiveClassRoom({ params }: { params: { id: string } }) {
    const { id } = params;
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [isMuted, setIsMuted] = useState(true); // State to manage mute status

    useEffect(() => {
        const videoElement = videoRef.current;
        const streamUrl = 'http://localhost/hls/stream.m3u8'; // Update to your actual stream URL

        if (videoElement) {
            videoElement.src = streamUrl;
            videoElement.muted = isMuted; // Set initial muted status
            videoElement.play()
                .then(() => {
                    setIsStreaming(true);
                })
                .catch((error) => {
                    console.error('Error playing video:', error);
                    setIsStreaming(false);
                });

            videoElement.onerror = (e) => {
                console.error('Video Error:', e);
                setIsStreaming(false);
            };

            return () => {
                videoElement.pause();
                videoElement.src = '';
            };
        }
    }, [isMuted]); // Re-run effect if mute status changes

    const handlePlayVideo = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = isMuted; // Set muted status based on state
            videoElement.play()
                .then(() => {
                    setIsStreaming(true);
                })
                .catch((error) => {
                    console.error('Error playing video:', error);
                    setIsStreaming(false);
                });
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    return (
        <div className="p-6 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-darkNavy mb-4">Live Class: {id}</h1>
            <div className="flex flex-col lg:flex-row w-full gap-6">
                <div className="w-full lg:w-2/3">
                    {!isStreaming ? (
                        <div>
                            <p className="text-lg text-darkNavy text-center">Waiting for the teacher to start the stream...</p>
                            <button onClick={handlePlayVideo} className="mt-4 bg-blue text-white rounded-lg p-2">
                                Play Video
                            </button>
                        </div>
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
