import Image1 from "@/assets/images/Image-1.png"
import Image2 from "@/assets/images/Image-2.png"
import Image3 from "@/assets/images/Image-3.png"
import Image4 from "@/assets/images/Image-4.png"

export const ImagesSection = () => {
    return (
        <div className="grid grid-cols-3  gap-6 ">
            <img src={Image1} alt="main" className="col-span-3" />
            <img src={Image2} alt="other" />
            <img src={Image3} alt="other" />
            <img src={Image4} alt="other" />
        </div>
    )
}
/*
        <div className="grid grid-cols-3 grid-rows-[1fr_24px] gap-6 ">
            <img src={Image1} alt="main" className="col-span-3 w-full h-full object-cover" />
            <img src={Image2} alt="other" />
            <img src={Image3} alt="other" />
            <img src={Image4} alt="other" />
        </div>
*/
