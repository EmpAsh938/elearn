"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

// Updated data for Sales (Monthly Revenue)
const chartData = [
    { month: "January", revenue: 12000 },
    { month: "February", revenue: 15000 },
    { month: "March", revenue: 17000 },
    { month: "April", revenue: 19000 },
    { month: "May", revenue: 13000 },
    { month: "June", revenue: 18000 },
];

// Updated chart config for sales report
const chartConfig = {
    revenue: {
        label: "Revenue (₹)",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function AdminBarChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sales Report - Monthly Revenue</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value: string) => value.slice(0, 3)} // Format month
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="revenue" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 7.5% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total revenue for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
