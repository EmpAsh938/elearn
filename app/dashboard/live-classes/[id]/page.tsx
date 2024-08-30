"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default function LiveClassRoom({ params }: { params: { id: string } }) {
    const { id } = params;
    const videoRef = useRef(null);
    const playerRef = useRef<videojs.Player | null>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const streamUrl = 'http://localhost/hls/stream.m3u8'; // Update to your actual stream URL

    useEffect(() => {
        const checkStreamAvailability = async () => {
            try {
                const response = await fetch(streamUrl, { method: 'HEAD' });
                if (response.ok) {
                    setIsStreaming(true);
                    setError('');
                } else {
                    setIsStreaming(false);
                    setError('Stream is not available');
                }
            } catch (error) {
                console.error('Error checking stream:', error);
                setIsStreaming(false);
                setError('Error checking stream availability');
            }
        };

        const intervalId = setInterval(checkStreamAvailability, 5000);
        checkStreamAvailability(); // Initial check

        return () => clearInterval(intervalId);
    }, [streamUrl]);

    useEffect(() => {
        if (isStreaming) {
            if (!playerRef.current) {
                const videoElement = videoRef.current;
                if (!videoElement) return;

                playerRef.current = videojs(videoElement, {
                    autoplay: false,
                    controls: true,
                    sources: [{ src: streamUrl, type: 'application/x-mpegURL' }],
                });

                playerRef.current.on('error', (error: any) => {
                    console.error('Video.js Error:', error);
                    setError('Error playing video');
                });
            }
        } else {
            playerRef.current?.dispose();
            playerRef.current = null;
        }
    }, [isStreaming, streamUrl]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

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
                            <p className="text-lg text-darkNavy text-center">
                                {error || "Waiting for the teacher to start the stream..."}
                            </p>
                        </div>
                    ) : (
                        <div>
                            <div data-vjs-player>
                                <video ref={videoRef} className="video-js vjs-default-skin w-full bg-black rounded-lg" />
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full lg:w-1/3 flex flex-col">
                    <h2 className="text-xl font-semibold">Live Chat</h2>
                    <div ref={chatRef} className="flex-1 overflow-y-auto mb-4 border border-gray-300 rounded-lg p-4 py-1 max-h-[400px]">
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
