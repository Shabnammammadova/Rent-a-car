import HeartFilldeRed from "@/assets/icons/heart-filled-red.svg"
import HeartOutlined from "@/assets/icons/heart-outlined.svg"
import CarImg from "@/assets/images/car-3.png"
import Fuel from "@/assets/icons/fuel.svg"
import Tranmission from "@/assets/icons/transmission.svg"
import People from "@/assets/icons/people.svg"


import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { paths } from "@/constants/paths"
import { Button } from "@/components/ui/button"

const RentCard = () => {
    const [isliked, setisLiked] = useState(false)
    const navigate = useNavigate()
    const id = "asdc-12d1w-12d1w"
    function navigateDetail() {
        navigate(paths.DETAIL(id))
    }
    return (
        <div className="w-full bg-white rounded-[10px] p-4 lg:p-6">
            <div className="flex justify-between">
                <div >
                    <h4 onClick={navigateDetail} className="font-bold text-secondary-500 text-base lg:text-sm  tracking-[-0.6px] hover:underline cursor-pointer">Koenigsegg</h4>
                    <p className="text-secondary-300 text-xs lg:text-sm tracking-[-0.28px]">Sport</p>
                </div>
                <button className="h-fit" onClick={() => setisLiked(!isliked)}><img src={isliked ? HeartFilldeRed : HeartOutlined} alt="heart" /></button>
            </div>
            <div onClick={navigateDetail} className="mt-8 lg:mt-12 relative cursor-pointer">
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
            <div className="flex items-center justify-between mt-3 lg:mt-6">
                <p className="text-secondary-500 text-xl font-bold">$99.00/ <span className="text-sm text-secondary-300"></span>day</p>
                <Button>Rent Now</Button>
            </div>
        </div>
    )
}

export default RentCard