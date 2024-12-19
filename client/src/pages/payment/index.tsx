import { Link, useParams } from "react-router-dom";
import { Info } from "./components/Info"
import { PaymentSummary } from "./components/Summary"
import { useQuery } from "@tanstack/react-query";
import rentService from "@/services/rent";
import { QUERY_KEYS } from "@/constants/query-keys";
import Spinner from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { paths } from "@/constants/paths";


const PaymentPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useQuery({
        queryKey: [QUERY_KEYS.RENT_DETAIL],
        queryFn: () => rentService.getById(id!)
    })


    if (isLoading) {
        return (
            <div className="flex flex-col  justify-center items-center mt-28">
                <Spinner />
                <p>Loading...</p>
            </div>
        )
    }
    const rent = data?.data?.item


    if (isError || !rent) {
        return (
            <div className="flex flex-col justify-center items-center mt-28">
                <p className="text-2xl font-bold mb-3 text-primary">Something went wrong!</p>
                <Button className="mt-4">
                    <Link to={paths.HOME}>
                        Go back to home
                    </Link></Button>
            </div>
        )
    }

    const possibleDropOffLocations = rent.dropOffLocation

    return (
        <div className="container py-6  lg:py-8 grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_492px] lg:gap-x-8 gap-y-8">
            <Info possibleDropOffLocations={possibleDropOffLocations} pickUpLocation={rent.pickUpLocation} />
            <PaymentSummary rent={rent} />
        </div>
    )
}

export default PaymentPage