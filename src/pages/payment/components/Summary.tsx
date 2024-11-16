import PaymentImg from "@/assets/images/PaymentCar.png"
import { ReviewStar } from "@/components/shared/ReviewStar"

export const PaymentSummary = () => {
    return (
        <div className="rounded-[10px] bg-white p-4 lg:p-6 h-fit">
            <h2 className="text-lg lg:text-xl font-bold leading-[150%] tracking-[-0.6px] text-secondary-500 ">Rental Summary</h2>
            <p className="text-secondary-300 text-sm font-medium leading-[150%] tracking-[-0.28px] mt-1 lg:mb-8 mb-6 ">Prices may change depending on the length of the rental and the price of your rental car.</p>
            <div className="flex items-center gap-x-4">
                <img src={PaymentImg} alt="" className="w-[132px] h-[108px] object-contain" />
                <div>
                    <h2 className="text-2xl lg:text-[32px] font-bold text-secondary-500 leading-[150%] tracking-[-0.96px]">
                        Nissan GT-R
                    </h2>
                    <div className="mt-2  flex items-center gap-x-2">
                        <ReviewStar rating={3} />
                        <p className="text-secondary text-sm font-medium tracking-[-0.28px]">440+ Reviewer</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-[1px] bg-[#c3d4e966] lg:my-8 my-6" />
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="text-secondary-500 text-lg lg:text-xl font-bold !leading-[-150%] tracking-[-0.6px]">Total Rental Price</h4>
                    <p className="text-sm font-medium leading-[150%] tracking-[-0.28px] text-secondary-300">Overall price and includes rental discount</p>
                </div>
                <p className="text-secondary-500 text-2xl lg:text-[32px] !leading-normal font-bold">$80.00</p>
            </div>
        </div>
    )
}
