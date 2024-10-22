"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js"; // Import hls.js

export default function LiveClassRoom({ params }: { params: { id: string } }) {
    const { id } = params;
    const videoRef = useRef<HTMLVideoElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [isMuted, setIsMuted] = useState(true);
    const [error, setError] = useState('');

    const streamUrl = 'http://143.244.135.137:8088/hls/test.m3u8'; // Update to your actual stream URL

    useEffect(() => {
        const checkStreamAvailability = async () => {
            try {
                const response = await fetch(streamUrl);
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
                setError('Stream has either ended or has not started');
            }
        };

        const intervalId = setInterval(checkStreamAvailability, 5000);
        checkStreamAvailability(); // Initial check

        return () => clearInterval(intervalId);
    }, [streamUrl]);

    useEffect(() => {
        const videoElement = videoRef.current;

        // If HLS is supported in the browser
        if (videoElement && isStreaming) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(streamUrl);
                hls.attachMedia(videoElement);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoElement.play().catch((error) => {
                        console.error("Error playing video:", error);
                        setError("Error playing video");
                    });
                });
            } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                // For Safari (which natively supports HLS)
                videoElement.src = streamUrl;
                videoElement.play().catch((error) => {
                    console.error("Error playing video:", error);
                    setError("Error playing video");
                });
            }
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

    const toggleMute = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.muted = !isMuted;
        }
        setIsMuted(!isMuted);
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
                            <video
                                ref={videoRef}
                                controls
                                className="w-full bg-black rounded-lg"
                                muted={isMuted}
                            />
                            <Button onClick={toggleMute} className="mt-2 bg-blue text-white rounded-lg p-2">
                                {isMuted ? 'Unmute' : 'Mute'}
                            </Button>
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
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
