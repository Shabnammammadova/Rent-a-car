import { useQuery } from "@tanstack/react-query"
import { columns } from "./column"
import { DataTable } from "./data-table"
import { QUERY_KEYS } from "@/constants/query-keys"
import Spinner from "@/components/shared/Spinner"
import reservationService from "@/services/reservation"



const DashboardReservationPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [QUERY_KEYS.ADMIN_RESERVATIONS],
        queryFn: () => reservationService.getAll()
    })

    if (isLoading) {
        return <div className="flex justify-center ">
            <Spinner />
        </div>
    }


    if (isError) {
        return <div>Something went wrong</div>
    }

    const items = data?.data?.items || []
    return (
        <div className="pt-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-primary font-bold text-2xl ">
                    Reservations
                </h2>
            </div>

            <DataTable columns={columns} data={items} />
        </div>
    )
}

export default DashboardReservationPage