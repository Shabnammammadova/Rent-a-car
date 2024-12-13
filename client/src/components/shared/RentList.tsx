import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import { Rent } from "@/types";
import { RenderIf } from "./RenderIf";
import { RentCard } from "./rent-card";
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay, Navigation } from "swiper/modules"




type Props = {
    heading: string;
    maxCols: number;
    isLoading: boolean;
    rents: Rent[]
}

const List = ({ heading, maxCols = 4, isLoading = false, rents }: Props) => {
    console.log("Rents prop:", rents);
    return (
        <div>
            <div className="flex items-center justify-between py-2.5">
                <h3 className="pl-3 lg:pl-5 text-secondary-300 font-semibold ">{heading}</h3>
                <Button variant={"link"} asChild><Link to="/list">View All</Link></Button>
            </div>
            <div className={`hidden md:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${maxCols} gap-4 md:gap-6 lg:gap-8`}>
                <RenderIf condition={isLoading}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                            <RentCard.Skeleton key={index} />
                        ))
                    }
                </RenderIf>
                <RenderIf condition={!isLoading}>
                    {rents?.map((rent) => (
                        <RentCard key={rent._id} rent={rent} />


                    ))}
                </RenderIf>
            </div>
            <div>
                <Swiper
                    autoplay={{ delay: 2000 }}
                    spaceBetween={10}
                    slidesPerView={2}
                    className="w-full mt-5"
                    modules={[Navigation, Autoplay]}
                >
                    {/* <RenderIf condition={isLoading}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                            <SwiperSlide key={index}>
                                <RentCard.Skeleton key={index} />
                            </SwiperSlide>

                        ))
                    }
                </RenderIf> */}

                    <RenderIf condition={!isLoading}>
                        {rents?.map((rent) => (

                            <SwiperSlide key={rent._id}>
                                <RentCard key={rent._id} rent={rent} />
                            </SwiperSlide>
                        ))}
                    </RenderIf></Swiper>
            </div>

        </div>
    )
}

export default List