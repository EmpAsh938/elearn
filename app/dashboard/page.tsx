"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
    const [userName, setUserName] = useState("John Doe");
    const [renewalDate] = useState(new Date("2024-08-25"));

    const remainingDays = formatDistanceToNow(renewalDate, { addSuffix: true });

    return (
        <div className="p-6">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Welcome, {userName}!</h1>
            </section>

            <section className="mb-8">
                <Card className="bg-white shadow-lg">
                    <CardHeader className="py-2 border-b-2 border-gray-300 mb-1">
                        <CardTitle className="text-2xl font-bold text-darkNavy flex items-center">
                            <Calendar className="mr-2 text-blue" /> Active Plan
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <p className="text-lg text-darkNavy">Plan Type: Grade 10 (Basic)</p>
                        <p className="text-lg text-darkNavy">Your current plan expires {remainingDays}.</p>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
