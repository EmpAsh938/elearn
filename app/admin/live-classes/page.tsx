"use client";

import { useEffect, useState } from "react";
import { CreateDialog } from "@/components/admin/live-classes/create";
import LiveClassCard from "@/components/admin/live-classes/card";
// import { toast } from "@/hooks/use-toast";

interface LiveClass {
    id: string;
    title: string;
    streamlink: string;
    startingTime: string;
}





export default function LiveClasses() {
    const [liveClass, setLiveClass] = useState<LiveClass[]>([]);

    const handleEdit = (index: number, updatedClass: LiveClass) => {
        setLiveClass((prevClass) =>
            prevClass.map((Class, i) => (i === index ? updatedClass : Class))
        );
    };

    const handleDelete = (index: number) => {
        setLiveClass((prevClass) => prevClass.filter((_, i) => i !== index));
    };

    // const handleCreate = async (newClass: LiveClass) => {
    //     try {
    //         const req = await fetch('/api/live', {
    //             method: 'POST',
    //             body: JSON.stringify(newClass)
    //         })
    //         const res = await req.json();
    //         if (res.status !== 201) throw new Error(res.error);
    //         toast({ title: "Live Class", description: "Live class created successfully" })
    //         setLiveClass((prevClass) => [...prevClass, res]);
    //     } catch (error) {
    //         toast({ variant: "destructive", title: "Live Class", description: "Live class creation failed" })

    //     }
    // };


    useEffect(() => {
        const fetchLiveClass = async () => {
            try {
                const req = await fetch('/api/live');
                const res = await req.json();
                setLiveClass(res.body);
            } catch (error) {
                console.log(error);
            }

        }

        fetchLiveClass();
    }, [])

    console.log(liveClass)
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-darkNavy mb-4">Live Class</h2>
            <section>
                <CreateDialog />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {!liveClass ? <p>Nothing to show</p> : liveClass.map((item, index) => (
                        <LiveClassCard
                            key={index}
                            title={item.title}
                            startTime={new Date(item.startingTime).toLocaleString()}
                            streamlink={item.streamlink}
                            onEdit={(title, startTime) =>
                                handleEdit(index, item)
                            }
                            onDelete={() => handleDelete(index)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
