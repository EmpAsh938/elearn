"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { formatDistanceToNow, isFuture, isPast } from 'date-fns';

export default function Dashboard() {
    const [userName, setUserName] = useState("John Doe");
    const [renewalDate] = useState(new Date("2024-08-25"));
    const [hasPlan, setHasPlan] = useState(true); // Change to false if no plan is purchased


    let planMessage = "";
    if (!hasPlan) {
        planMessage = "You have not purchased a plan.";
    } else if (isFuture(renewalDate)) {
        const remainingDays = formatDistanceToNow(renewalDate, { addSuffix: true });
        planMessage = `Your current plan expires ${remainingDays}.`;
    } else if (isPast(renewalDate)) {
        planMessage = "Your plan has expired.";
    }

    return (
        <div className="p-2">
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
                        {hasPlan ? (
                            <>
                                <p className="text-lg text-darkNavy">Plan Type: Grade 10 (Basic)</p>
                                <p className="text-lg text-darkNavy">{planMessage}</p>
                            </>
                        ) : (
                            <p className="text-lg text-red-600">{planMessage}</p>
                        )}
                    </CardContent>
                </Card>
            </section>

            <section className="mb-8">
                <Card className="bg-white shadow-lg">
                    <CardHeader className="py-2 border-b-2 border-gray-300 mb-1">
                        <CardTitle className="text-2xl font-bold text-darkNavy">
                            Announcements
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li className="text-lg text-darkNavy">New course on Advanced Chemistry is available!</li>
                            <li className="text-lg text-darkNavy">Holiday on Sep 30 for National Day.</li>
                        </ul>
                    </CardContent>
                </Card>
            </section>

        </div>
    );
}
