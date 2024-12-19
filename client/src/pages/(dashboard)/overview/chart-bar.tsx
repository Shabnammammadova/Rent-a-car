"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
    { month: "January", bmv: 70, nissan: 152 },
    { month: "February", bmv: 109, nissan: 136 },
    { month: "March", bmv: 112, nissan: 65 },
    { month: "April", bmv: 73, nissan: 120 },
    { month: "May", bmv: 25, nissan: 130 },
    { month: "June", bmv: 89, nissan: 140 },
]

const chartConfig = {
    bmv: {
        label: "BMV",
        color: "hsl(var(--chart-1))",
    },
    nissan: {
        label: "Nissan",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function BarCarChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bar Chart - Multiple</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="bmv" fill="var(--color-bmv)" radius={4} />
                        <Bar dataKey="nissan" fill="var(--color-nissan)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
