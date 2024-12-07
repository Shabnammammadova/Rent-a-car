import HeartFilldeRed from "@/assets/icons/heart-filled-red.svg"
import HeartOutlined from "@/assets/icons/heart-outlined.svg"
import Fuel from "@/assets/icons/fuel.svg"
import Tranmission from "@/assets/icons/transmission.svg"
import People from "@/assets/icons/people.svg"


import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { paths } from "@/constants/paths"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Rent } from "@/types"



type Props = {
    rent: Rent;
}

const RentCard = ({ rent }: Props) => {
    const [isliked, setisLiked] = useState(false)
    const navigate = useNavigate()
    const id = "asdc-12d1w-12d1w"
    const { name, category, fuel, gearBox, images, capacity, price } = rent
    const mainImage = images[0]
    function navigateDetail() {
        navigate(paths.DETAIL(id))
    }
    return (
        <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
            <div className="flex justify-between">
                <div >
                    <h4 onClick={navigateDetail} className="font-bold text-secondary-500 text-base lg:text-sm  tracking-[-0.6px] hover:underline cursor-pointer">{name}</h4>
                    <p className="text-secondary-300 text-xs lg:text-sm tracking-[-0.28px]">{category.name}</p>
                </div>
                <button className="h-fit" onClick={() => setisLiked(!isliked)}><img src={isliked ? HeartFilldeRed : HeartOutlined} alt="heart" /></button>
            </div>
            <div onClick={navigateDetail} className="mt-8 lg:mt-12 relative cursor-pointer">
                <img src={mainImage} alt="rent-car" className="w-full h-32 object-contain" />
                <div className="bg-[linear-gradient(180deg,rgba(255, 255, 255, 0.00) 0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
            </div>
            <div className="flex items-center justify-between mt-5 lg:mt-9">
                <div className="flex items-center gap-1.5">
                    <img src={Fuel} alt="fuel" />
                    <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">{fuel}L</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <img src={Tranmission} alt="transmission" />
                    <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">{gearBox}</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <img src={People} alt="people" />
                    <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">{capacity} people</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-3 lg:mt-6">
                <p className="text-secondary-500 text-xl font-bold">${price}/ <span className="text-sm text-secondary-300"></span>day</p>
                <Button>Rent Now</Button>
            </div>
        </div>
    )
}
export default RentCard



RentCard.Skeleton = function () {
    return (
        <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
            {/* Header */}
            <div className="flex justify-between">
                <div>
                    <Skeleton className="h-4 w-32 mb-2" /> {/* Title Skeleton */}
                    <Skeleton className="h-3 w-20" /> {/* Subtitle Skeleton */}
                </div>
                <Skeleton className="h-6 w-6 rounded-full" /> {/* Heart icon Skeleton */}
            </div>

            {/* Image Section */}
            <div className="mt-8 lg:mt-12 relative">
                <Skeleton className="h-32 w-full" /> {/* Image Skeleton */}
                <div className="bg-[linear-gradient(180deg,rgba(255, 255, 255, 0.00) 0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
            </div>

            {/* Info Section */}
            <div className="flex items-center justify-between mt-5 lg:mt-9">
                <Skeleton className="h-4 w-12" /> {/* Fuel Icon & Text */}
                <Skeleton className="h-4 w-12" /> {/* Transmission Icon & Text */}
                <Skeleton className="h-4 w-12" /> {/* People Icon & Text */}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-3 lg:mt-6">
                <Skeleton className="h-6 w-24" /> {/* Price Skeleton */}
                <Skeleton className="h-8 w-20 rounded-md" /> {/* Button Skeleton */}
            </div>
        </div>
    );
}