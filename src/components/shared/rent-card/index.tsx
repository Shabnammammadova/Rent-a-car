import HeartFilldeRed from "@/assets/icons/heart-filled-red.svg"
import HeartOutlined from "@/assets/icons/heart-outlined.svg"
import CarImg from "@/assets/images/car-3.png"
import Fuel from "@/assets/icons/fuel.svg"
import Tranmission from "@/assets/icons/transmission.svg"
import People from "@/assets/icons/people.svg"


import { useState } from "react"

const RentCard = () => {
    const [isliked, setisLiked] = useState(false)
    return (
        <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
            <div className="flex justify-between">
                <div>
                    <h4 className="font-bold text-secondary-500 text-base lg:text-sm leading-[150px] tracking-[-0.6px]">Koenigsegg</h4>
                    <p className="text-secondary-300 text-xs lg:text-sm leading-[150px] tracking-[-0.28px]">Sport</p>
                </div>
                <button className="h-fit" onClick={() => setisLiked(!isliked)}><img src={isliked ? HeartFilldeRed : HeartOutlined} alt="heart" /></button>
            </div>
            <div className="mt-8 lg:mt-12 relative">
                <img src={CarImg} alt="rent-car" className="w-full h-32 object-contain" />
                <div className="bg-[linear-gradient(180deg,rgba(255, 255, 255, 0.00) 0%,#FFF_100%)] w-full h-[68px] absolute bottom-0" />
            </div>
            <div className="flex items-center justify-between mt-5 lg:mt-9">
                <div className="flex items-center gap-1.5">
                    <img src={Fuel} alt="fuel" />
                    <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">70L</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <img src={Tranmission} alt="transmission" />
                    <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">Manual</p>
                </div>
                <div className="flex items-center gap-1.5">
                    <img src={People} alt="people" />
                    <p className="text-secondary-300 text-sm font-medium leading-[24px] tracking-[-0.28px]">2 people</p>
                </div>
            </div>
        </div>
    )
}

export default RentCard