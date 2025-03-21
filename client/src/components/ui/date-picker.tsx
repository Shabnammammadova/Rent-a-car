
import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { RenderIf } from "../shared/RenderIf"



type Props = {
    onChange: (date?: Date) => void;
    hidePastDates?: boolean;
    defaultDate?: string | null;
    variant?: "primary" | "secondary"
}

export function DatePicker({ onChange, hidePastDates = false, defaultDate, variant = "primary" }: Props) {
    const [date, setDate] = useState<Date | undefined>(defaultDate ? new Date(defaultDate) : undefined)




    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={cn(
                        "w-full justify-start text-left  p-0 hover:bg-transparent text-xs !text-secondary-300 tracking-[-0.24px]",
                        !date && "text-muted-foreground",
                        variant === "secondary" && "p-6 bg-[#F6F7F9] hover:bg-[#F6F7F9] text-sm font-normal rounded-md shadow-sm"
                    )}
                >
                    <RenderIf condition={variant === "primary"}>
                        <CalendarIcon className="mr-2 h-6 w-4" />
                    </RenderIf>

                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={
                        (date) => {
                            onChange(date)
                            setDate(date)
                        }
                    }

                    initialFocus
                    className="!text-black"
                    disabled={hidePastDates ? { before: new Date() } : undefined}
                />
            </PopoverContent>
        </Popover>
    )
}
