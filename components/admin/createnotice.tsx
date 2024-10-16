"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useLockBodyScroll } from '@/hooks/user-lockBodyScroll'; // Import the scroll lock hook

// Dynamically import the MDEditor to work with Next.js SSR
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const CreateNoticeButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    // Use the custom hook to lock body scroll when the dialog is open
    useLockBodyScroll(isOpen);

    const handleSubmit = () => {
        // Handle submission logic here
        console.log({ title, body });
        setIsOpen(false); // Close the dialog after submission
    };

    return (
        <div className='fixed bottom-5 right-5 bg-transparent'>
            <Button
                onClick={() => setIsOpen(true)}
                className="bg-blue hover:bg-blue text-white flex items-center"
            >
                <Plus className="mr-2" /> New
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild />
                <DialogContent className="w-full max-w-lg">
                    <DialogTitle>Create Notice</DialogTitle>
                    <DialogDescription>Fill in the details to create a new notice.</DialogDescription>

                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Markdown Body */}
                        <div>
                            <Label htmlFor="body">Body (Markdown)</Label>
                            <MDEditor
                                value={body}
                                onChange={(value) => setBody(value || '')}
                                height={300}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button onClick={handleSubmit} className="bg-green">
                            Release
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateNoticeButton;
