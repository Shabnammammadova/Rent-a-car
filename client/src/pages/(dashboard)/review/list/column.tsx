/* eslint-disable react-hooks/rules-of-hooks */
import { RenderIf } from "@/components/shared/RenderIf";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { QUERY_KEYS } from "@/constants/query-keys";
import reviewService from "@/services/review";
import { Review, ReviewStatus } from "@/types"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table"
import { CheckCircle2Icon, Edit2Icon, XCircleIcon } from "lucide-react";
import { toast } from "sonner";


export const columns: ColumnDef<Review>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: (data) => {
            switch (data.row.original.status) {
                case ReviewStatus.Approved:
                    return (
                        <div className="text-green-600 capitalize">
                            {data.row.original.status}
                        </div>
                    );
                case ReviewStatus.Pending:
                    return (
                        <div className="text-yellow-500 capitalize">
                            {data.row.original.status}
                        </div>
                    );
                case ReviewStatus.Rejected:
                    return (
                        <div className="text-red-500 capitalize">
                            {data.row.original.status}
                        </div>
                    );
            }
        }
    },
    {
        accessorKey: "rent.name",
        header: "Rent Name"
    },
    {
        accessorKey: "rent.id",
        header: "Rent Id"
    },
    {
        accessorKey: "author.id",
        header: "Author Id"
    },
    {
        accessorKey: "author.name",
        header: "Author"
    },
    {
        accessorKey: "content",
        header: "Content"
    },
    {
        accessorKey: "",
        header: "Actions",
        cell: (data) => {
            const queryClient = useQueryClient()
            const { mutate } = useMutation(
                {
                    mutationFn: reviewService.changeStatus,
                    onSuccess: () => {
                        toast.success("Status updated successfully");
                        queryClient.invalidateQueries({
                            queryKey: [QUERY_KEYS.ADMIN_REVIEWS]
                        })
                    }
                }
            )
            const status = data.row.original.status;
            // if (status !== ReviewStatus.Pending && status !== ReviewStatus.Approved) {
            //     return null
            // }
            function handleStatusChange(status: ReviewStatus.Approved | ReviewStatus.Rejected) {
                mutate({
                    id: data.row.original.id,
                    status
                })
            }
            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                            <Edit2Icon size={18} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <RenderIf condition={status === ReviewStatus.Pending || status === ReviewStatus.Approved}>
                                <DropdownMenuItem
                                    onClick={() => handleStatusChange(ReviewStatus.Approved)} className="cursor-pointer ">
                                    <CheckCircle2Icon className="text-green-500" />
                                    <p className="text-green-500">Approve</p>
                                </DropdownMenuItem>
                                <RenderIf condition={status === ReviewStatus.Pending || status === ReviewStatus.Approved}>
                                    <DropdownMenuItem onClick={() => handleStatusChange(ReviewStatus.Rejected)} className="cursor-pointer outline-none">
                                        <XCircleIcon className="text-red-500" />
                                        <p className="text-green-500">Reject</p>
                                    </DropdownMenuItem>
                                </RenderIf>

                            </RenderIf>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            )
        }
    },


];
