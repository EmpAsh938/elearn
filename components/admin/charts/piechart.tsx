"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart, Cell, Tooltip } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
} from "@/components/ui/chart";

// Updated data for Student Metrics
const chartData = [
    { category: "Active", students: 1200, fill: "#34D399" }, // green
    { category: "Subscribed", students: 800, fill: "#3B82F6" }, // blue
    { category: "Inactive", students: 500, fill: "#F87171" }, // red
    { category: "Guest", students: 300, fill: "#FBBF24" }, // yellow
    { category: "Other", students: 100, fill: "#A78BFA" }, // purple
];

// Chart config for Student Metrics
const chartConfig: ChartConfig = {
    students: {
        label: "Students",
    },
    active: {
        label: "Active Students",
        color: "hsl(var(--chart-1))",
    },
    subscribed: {
        label: "Subscribed Students",
        color: "hsl(var(--chart-2))",
    },
    inactive: {
        label: "Inactive Students",
        color: "hsl(var(--chart-3))",
    },
    guest: {
        label: "Guest Students",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
};

export default function AdminPieChart() {
    return (
        <Card className="flex flex-col shadow-lg">
            <CardHeader className="items-center pb-2">
                <CardTitle className="text-xl font-semibold">Student Metrics</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                    Segregation of Students (Active, Subscribed, etc.)
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
                    <PieChart>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const { category, students } = payload[0].payload; // Get data from payload
                                    return (
                                        <div className="bg-white border p-2 rounded shadow">
                                            <p className="font-semibold">{category}</p>
                                            <p>{students} Students</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Pie
                            data={chartData}
                            dataKey="students"
                            innerRadius={10}
                            outerRadius={90} // Increased outer radius for better label visibility
                            paddingAngle={1} // Adjust padding angle
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList
                                dataKey="category"
                                position="outside" // Position labels outside
                                className="fill-foreground"
                                fontSize={12}
                                stroke="none"
                                formatter={(value: string) => value}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium text-green-600">
                    Trending up by 3.4% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-gray-500">
                    Showing total student categories for the last 6 months.
                </div>
            </CardFooter>
        </Card>
    );
}
