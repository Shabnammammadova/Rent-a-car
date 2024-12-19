import HeartFilldeRed from "@/assets/icons/heart-filled-red.svg"
import HeartOutlined from "@/assets/icons/heart-outlined.svg"
import Fuel from "@/assets/icons/fuel.svg"
import Tranmission from "@/assets/icons/transmission.svg"
import People from "@/assets/icons/people.svg"


import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { paths } from "@/constants/paths"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Rent } from "@/types"
import { formatPrice } from "@/lib/utils"
import { useSelector } from "react-redux"
import { selectUserData } from "@/store/features/userSlice"
import { toast } from "sonner"
import { ModalEnum, useDialog } from "@/hooks/useDialog"



type Props = {
    rent: Rent;
}

export const RentCard = ({ rent }: Props) => {
    const { user } = useSelector(selectUserData)
    const { openDialog } = useDialog()
    const [isliked, setisLiked] = useState(false)
    const navigate = useNavigate()

    // const id = "asdc-12d1w-121w-12d1w-12d1w"
    // console.log("rent", rent);

    const { _id, name, category, fuel, gearBox, images, capacity, price } = rent
    console.log(rent);

    const mainImage = images[0]
    function navigateDetail() {
        navigate(paths.DETAIL(_id))
    }
    return (
        <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
            <div className="flex justify-between">
                <div >
                    <Link to={paths.DETAIL(_id)} className="font-bold text-secondary-500 text-base lg:text-sm  tracking-[-0.6px] hover:underline cursor-pointer">{name}</Link>
                    <p className="text-secondary-300 text-xs lg:text-sm tracking-[-0.28px]">{category.name}</p>
                </div>
                <button className="h-fit" onClick={() => setisLiked(!isliked)}><img src={isliked ? HeartFilldeRed : HeartOutlined} alt="heart" /></button>
            </div>
            <Link to={paths.DETAIL(_id)}
                onClick={navigateDetail} className="mt-8 lg:mt-12 relative cursor-pointer">
                <img src={mainImage} alt="rent-car" className="w-full h-32 object-contain" />
                <div className="bg-[linear-gradient(180deg,rgba(255, 255, 255, 0.00) 0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
            </Link>
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
                <p className="text-secondary-500 text-xl font-bold">{formatPrice(price)}/ <span className="text-sm text-secondary-300"></span>day</p>
                <Button asChild>
                    <Link to={paths.PAYMENT(_id)} onClick={
                        () => {
                            if (!user) {
                                toast.warning("Please login to rent a car")
                                openDialog(ModalEnum.LOGIN)
                            }
                        }}>
                        Rent Now
                    </Link>
                </Button>
            </div>
        </div>
    )
}




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