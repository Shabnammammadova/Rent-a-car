"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const chartData = [
    { date: "2024-04-01", bmv: 222, nissan: 150 },
    { date: "2024-04-02", bmv: 97, nissan: 180 },
    { date: "2024-04-03", bmv: 167, nissan: 120 },
    { date: "2024-04-04", bmv: 242, nissan: 260 },
    { date: "2024-04-05", bmv: 373, nissan: 290 },
    { date: "2024-04-06", bmv: 301, nissan: 340 },
    { date: "2024-04-07", bmv: 245, nissan: 180 },
    { date: "2024-04-08", bmv: 409, nissan: 320 },
    { date: "2024-04-09", bmv: 59, nissan: 110 },
    { date: "2024-04-10", bmv: 261, nissan: 190 },
    { date: "2024-04-11", bmv: 327, nissan: 350 },
    { date: "2024-04-12", bmv: 292, nissan: 210 },
    { date: "2024-04-13", bmv: 342, nissan: 380 },
    { date: "2024-04-14", bmv: 137, nissan: 220 },
    { date: "2024-04-15", bmv: 120, nissan: 170 },
    { date: "2024-04-16", bmv: 138, nissan: 190 },
    { date: "2024-04-17", bmv: 446, nissan: 360 },
    { date: "2024-04-18", bmv: 364, nissan: 410 },
    { date: "2024-04-19", bmv: 243, nissan: 180 },
    { date: "2024-04-20", bmv: 89, nissan: 150 },
    { date: "2024-04-21", bmv: 137, nissan: 200 },
    { date: "2024-04-22", bmv: 224, nissan: 170 },
    { date: "2024-04-23", bmv: 138, nissan: 230 },
    { date: "2024-04-24", bmv: 387, nissan: 290 },
    { date: "2024-04-25", bmv: 215, nissan: 250 },
    { date: "2024-04-26", bmv: 75, nissan: 130 },
    { date: "2024-04-27", bmv: 383, nissan: 420 },
    { date: "2024-04-28", bmv: 122, nissan: 180 },
    { date: "2024-04-29", bmv: 315, nissan: 240 },
    { date: "2024-04-30", bmv: 454, nissan: 380 },
    { date: "2024-05-01", bmv: 165, nissan: 220 },
    { date: "2024-05-02", bmv: 293, nissan: 310 },
    { date: "2024-05-03", bmv: 247, nissan: 190 },
    { date: "2024-05-04", bmv: 385, nissan: 420 },
    { date: "2024-05-05", bmv: 481, nissan: 390 },
    { date: "2024-05-06", bmv: 498, nissan: 520 },
    { date: "2024-05-07", bmv: 388, nissan: 300 },
    { date: "2024-05-08", bmv: 149, nissan: 210 },
    { date: "2024-05-09", bmv: 227, nissan: 180 },
    { date: "2024-05-10", bmv: 293, nissan: 330 },
    { date: "2024-05-11", bmv: 335, nissan: 270 },
    { date: "2024-05-12", bmv: 197, nissan: 240 },
    { date: "2024-05-13", bmv: 197, nissan: 160 },
    { date: "2024-05-14", bmv: 448, nissan: 490 },
    { date: "2024-05-15", bmv: 473, nissan: 380 },
    { date: "2024-05-16", bmv: 338, nissan: 400 },
    { date: "2024-05-17", bmv: 499, nissan: 420 },
    { date: "2024-05-18", bmv: 315, nissan: 350 },
    { date: "2024-05-19", bmv: 235, nissan: 180 },
    { date: "2024-05-20", bmv: 177, nissan: 230 },
    { date: "2024-05-21", bmv: 82, nissan: 140 },
    { date: "2024-05-22", bmv: 81, nissan: 120 },
    { date: "2024-05-23", bmv: 252, nissan: 290 },
    { date: "2024-05-24", bmv: 294, nissan: 220 },
    { date: "2024-05-25", bmv: 201, nissan: 250 },
    { date: "2024-05-26", bmv: 213, nissan: 170 },
    { date: "2024-05-27", bmv: 420, nissan: 460 },
    { date: "2024-05-28", bmv: 233, nissan: 190 },
    { date: "2024-05-29", bmv: 78, nissan: 130 },
    { date: "2024-05-30", bmv: 340, nissan: 280 },
    { date: "2024-05-31", bmv: 178, nissan: 230 },
    { date: "2024-06-01", bmv: 178, nissan: 200 },
    { date: "2024-06-02", bmv: 470, nissan: 410 },
    { date: "2024-06-03", bmv: 103, nissan: 160 },
    { date: "2024-06-04", bmv: 439, nissan: 380 },
    { date: "2024-06-05", bmv: 88, nissan: 140 },
    { date: "2024-06-06", bmv: 294, nissan: 250 },
    { date: "2024-06-07", bmv: 323, nissan: 370 },
    { date: "2024-06-08", bmv: 385, nissan: 320 },
    { date: "2024-06-09", bmv: 438, nissan: 480 },
    { date: "2024-06-10", bmv: 155, nissan: 200 },
    { date: "2024-06-11", bmv: 92, nissan: 150 },
    { date: "2024-06-12", bmv: 492, nissan: 420 },
    { date: "2024-06-13", bmv: 81, nissan: 130 },
    { date: "2024-06-14", bmv: 426, nissan: 380 },
    { date: "2024-06-15", bmv: 307, nissan: 350 },
    { date: "2024-06-16", bmv: 371, nissan: 310 },
    { date: "2024-06-17", bmv: 475, nissan: 520 },
    { date: "2024-06-18", bmv: 107, nissan: 170 },
    { date: "2024-06-19", bmv: 341, nissan: 290 },
    { date: "2024-06-20", bmv: 408, nissan: 450 },
    { date: "2024-06-21", bmv: 169, nissan: 210 },
    { date: "2024-06-22", bmv: 317, nissan: 270 },
    { date: "2024-06-23", bmv: 480, nissan: 530 },
    { date: "2024-06-24", bmv: 132, nissan: 180 },
    { date: "2024-06-25", bmv: 141, nissan: 190 },
    { date: "2024-06-26", bmv: 434, nissan: 380 },
    { date: "2024-06-27", bmv: 448, nissan: 490 },
    { date: "2024-06-28", bmv: 149, nissan: 200 },
    { date: "2024-06-29", bmv: 103, nissan: 160 },
    { date: "2024-06-30", bmv: 446, nissan: 400 },
]

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    bmv: {
        label: "BMV",
        color: "hsl(var(--chart-1))",
    },
    nissan: {
        label: "NISSAN",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function InteractiveChart() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="mt-5">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-bmv)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-bmv)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-nissan)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-nissan)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="nissan"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="var(--color-nissan)"
                            stackId="a"
                        />
                        <Area
                            dataKey="bmv"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="var(--color-bmv)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
