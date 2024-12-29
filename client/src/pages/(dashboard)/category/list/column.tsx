import { Category } from "@/types"
import { ColumnDef } from "@tanstack/react-table"



export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },

]
