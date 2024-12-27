import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/constants/query-keys"
import Spinner from "@/components/shared/Spinner"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { paths } from "@/constants/paths"
import locationService from "@/services/location"
import { DataTable } from "../../location/list/data-table"
import { columns } from "./column"

const DashboardLocationPage = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [QUERY_KEYS.ADMIN_LOCATION],
        queryFn: () => locationService.getAll()
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
                    Locations
                </h2>
                <Button asChild>
                    <Link to={paths.DASHBOARD.LOCATION.CREATE}>Create Location</Link>
                </Button>
            </div>

            <DataTable columns={columns} data={items} />
        </div>
    )
}

export default DashboardLocationPage