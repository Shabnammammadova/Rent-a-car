import { ReviewStar } from "@/components/shared/ReviewStar"
import { User2Icon } from "lucide-react"


export const Review = () => {
    return (
        <div className="flex gap-x-4">
            <div className="bg-primary rounded-full h-14 w-14 p-3"><User2Icon className="w-full h-full text-white" /></div>
            <div className="w-full">
                <div className="flex justify-between w-full">
                    <div>
                        <h6 className="text-secondary-500 text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px]">Alex Stanton</h6>
                        <p className="text-secondary-300 text-sm font-medium leading-[150%] trackung-[-0.28px]">CEO at Bukalapak</p>
                    </div>
                    <div>
                        <p className="text-secondary-300 text-sm font-medium leading-[150%] trackung-[-0.28px] text-end mb-2">21 July 2022</p>
                        <ReviewStar rating={3} />
                    </div>
                </div>
                <p>We are very happy with the service from the MORENT App. Morent has a low price and also a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.</p>
            </div>
        </div>
    )
}

