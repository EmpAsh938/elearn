import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateDialog({ onCreate }: { onCreate: (newClass: LiveClass) => void }) {
    const [title, setTitle] = useState<string>("");
    const [streamLink, setStreamLink] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startTime, setStartTime] = useState<string>(new Date().toISOString().slice(0, 16)); // Format the current date-time
    const [duration, setDuration] = useState<number>(60);

    const handleCreate = () => {
        const newLiveClass: LiveClass = {
            title,
            streamLink,
            description,
            startTime, // Keep this as a string because it's in the correct format for ISO datetime
            duration,
        };

        onCreate(newLiveClass);

        // Reset form fields
        setTitle("");
        setStreamLink("");
        setDescription("");
        setStartTime(new Date().toISOString().slice(0, 16)); // Reset to current date-time
        setDuration(60);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue">Create Live Class</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a Live Class</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new live class.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="stream-link" className="text-right">
                            Stream Link
                        </Label>
                        <Input
                            id="stream-link"
                            value={streamLink}
                            onChange={(e) => setStreamLink(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="start-time" className="text-right">
                            Start Time
                        </Label>
                        <Input
                            id="start-time"
                            type="datetime-local"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="duration" className="text-right">
                            Duration (minutes)
                        </Label>
                        <Input
                            id="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(parseInt(e.target.value))}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleCreate}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

interface LiveClass {
    title: string;
    streamLink: string;
    description: string;
    startTime: string; // Keeping startTime as a string for datetime-local input
    duration: number;
}
