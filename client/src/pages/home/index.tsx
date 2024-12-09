import { Availability } from "@/components/shared/availabilty-filter"
import { Hero } from "./components/Hero"
import List from "@/components/shared/RentList"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import rentService from "@/services/rent"
import { data } from "../(dashboard)/rents/list"




const HomePage = () => {
    const { data: recommendedData, isLoading: recommendedLoading } = useQuery({
        queryKey: [QUERY_KEYS.RECOMMENDATION_RENTS],
        queryFn: () => rentService.getAll({ type: "recommended" })
    })
    console.log("data", data);




    const recommendedrents = recommendedData?.data.items



    return (
        <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16 flex flex-col gap-y-6 lg:gap-y-8">
            <Hero />
            <Availability />
            <List heading="Popular Car" />
            <List heading="Recommendation Car" isLoading={recommendedLoading} rents={recommendedrents} />
        </div>
    )
}

export default HomePage