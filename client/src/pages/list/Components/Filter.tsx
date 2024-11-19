import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { FilterIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOnClickOutside } from "usehooks-ts"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

const filters = [
    {
        label: "Type",
        options: [
            {
                value: "sport",
                label: "Sport",
                count: 5
            },
            {
                value: "suv",
                label: "SUV",
                count: 10
            },
            {
                value: "mpv",
                label: "MPV",
                count: 3
            },
            {
                value: "sedan",
                label: "Sedan",
                count: 7
            },
            {
                value: "coupe",
                label: "Coupe",
                count: 2
            },
            {
                value: "hatchback",
                label: "Hatchback",
                count: 4
            }
        ]
    },
    {
        label: "Capacity",
        options: [
            {
                value: "2",
                label: "2 Person",
                count: 5
            },
            {
                value: "4",
                label: "4 Person",
                count: 10
            },
            {
                value: "6",
                label: "6 Person",
                count: 3
            },
            {
                value: "8",
                label: "8 Person",
                count: 2
            },
        ]
    }
]

export const Filters = () => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    function toggle() {
        setIsOpen(!isOpen)
    }
    function handleClose() {
        setIsOpen(false)
    }
    useOnClickOutside(ref, handleClose)
    return (
        <>
            <div ref={ref} className={cn("p-8 bg-white w-[360px] h-[calc(100vh-94px)] overflow-auto pb-20  md:h-[calc(100vh-128px)] fixed top-[94px] md:top-[128px] z-20 duration-200", isOpen ? "left-0" : "-left-[360px] xl:left-0")}>
                <div className="flex flex-col gap-y-8 lg:gap-y-14">
                    {
                        filters.map((filter) => (
                            <div key={filter.label}>
                                <h4 className="text-xs font-semibold tracking-[-0.24px] text-secondary mb-7 uppercase ">{filter.label}</h4>
                                <div className="flex flex-col gap-y-4 lg:gap-y-8">
                                    {
                                        filter.options.map((option) => (
                                            <div key={option.value} className="flex gap-x-2 items-center">
                                                <Checkbox id={`${filter.label}-${option.value}`} className="h-5 w-5" />
                                                <label htmlFor={`${filter.label}-${option.value}`} className="text-secondary text-lg lg:text-xl font-semibold leading-[150%] tracking-[0.4px]">{option.label} <span className="text-secondary-300 cursor-pointer">{option.count}</span></label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        ))}
                    <div>
                        <h4 className="text-xs font-semibold  tracking-[-0.24px] text-secondary mb-7 uppercase ">Price</h4>
                        <div><Slider /><p className="text-secondary font-semibold text-lg lg:text-xl tracking-[-0.4px] leading-[150%] mt-4">Max. $100.00</p></div>
                    </div>

                </div>
            </div>
            <Button onClick={toggle} variant={"outline"} className="xl:hidden w-fit ml-6 lg:ml-8 mt-4 mb-4">
                <FilterIcon className="text-primary" />
            </Button>
        </>
    )
}

