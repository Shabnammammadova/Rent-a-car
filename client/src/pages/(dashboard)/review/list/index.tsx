import { useQuery } from "@tanstack/react-query"
import { columns } from "./column"
import { DataTable } from "./data-table"
import { QUERY_KEYS } from "@/constants/query-keys"
import Spinner from "@/components/shared/Spinner"
import reviewService from "@/services/review"



const DashboardReviewListPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [QUERY_KEYS.ADMIN_RESERVATIONS],
        queryFn: () => reviewService.getAll()
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
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-primary font-bold text-2xl ">
                    Reviews
                </h2>
            </div>

            <DataTable columns={columns} data={items} />
        </div>
    )
}

export default DashboardReviewListPage