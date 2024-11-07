import { Button } from "@/components/ui/button"
import { useRef, useState } from "react"
import { FilterIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useOnClickOutside } from "usehooks-ts"

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
            <div ref={ref} className={cn(" bg-white w-[360px] h-[calc(100vh-94px)]  md:h-[calc(100vh-128px)] fixed top-[94px] md:top-[128px] z-20 duration-200", isOpen ? "left-0" : "-left-[360px] xl:left-0")}>Filters</div>
            <Button onClick={toggle} variant={"outline"} className="xl:hidden w-fit ml-6 lg:ml-8 mt-4 mb-4">
                <FilterIcon className="text-primary" />
            </Button>
        </>
    )
}

