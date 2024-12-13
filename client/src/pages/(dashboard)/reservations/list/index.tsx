import { useQuery } from "@tanstack/react-query"
import { columns } from "./column"
import { DataTable } from "./data-table"
import { QUERY_KEYS } from "@/constants/query-keys"
import rentService from "@/services/rent"
import Spinner from "@/components/shared/Spinner"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { paths } from "@/constants/paths"

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const data: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    // ...
]

const DashboardReservationPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [QUERY_KEYS.ADMIN_RENTS],
        queryFn: () => rentService.getAll()
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
                    Rents
                </h2>
                <Button asChild>
                    <Link to={paths.DASHBOARD.RENT.CREATE}>Create Rent</Link>
                </Button>
            </div>

            <DataTable columns={columns} data={items} />
        </div>
    )
}

export default DashboardReservationPage