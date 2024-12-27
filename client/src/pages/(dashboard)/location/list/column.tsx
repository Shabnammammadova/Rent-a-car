import { Location } from "@/types"
import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<Location>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },

]
