"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { formatDistanceToNow, isFuture, isPast } from 'date-fns';
import { useGlobalContext } from "@/hooks/use-globalContext";
import SpinWheel from "@/components/spinwheel";

export default function Dashboard() {
    const { user } = useGlobalContext();

    if (!user || !user.roles) {
        return <div className="w-full h-screen grid place-items-center">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    }


    const roles = user.roles[0];
    const discount = user.discount;

    let planMessage = "";
    if (roles.id === 502) {
        planMessage = "You have not purchased a plan or the plan has expired.";
    } else if (roles.id === 503) {

        planMessage = `Your plan is active.`;
    }

    return (
        <div className="p-2">
            <section className="mb-8">
                <h1 className="text-3xl font-bold text-darkNavy text-left mb-2">Welcome, {user.name}!</h1>
            </section>

            <section className="mb-8">
                <Card className="bg-white shadow-lg">
                    <CardHeader className="py-2 border-b-2 border-gray-300 mb-1">
                        <CardTitle className="text-2xl font-bold text-darkNavy flex items-center">
                            <Calendar className="mr-2 text-blue" /> Active Plan
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        {user ? (
                            <>
                                <p className="text-lg text-darkNavy capitalize font-medium">Plan Type: {user.faculty}</p>
                                <p className="text-base text-gray-600">{planMessage}</p>
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

            {(discount || roles.id == 503) ? null : <SpinWheel />}
            {/* <SpinWheel /> */}
        </div>
    );
}
