import { Filters } from "./Components/Filter"
import { Availability } from "@/components/shared/availabilty-filter"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import InfiniteScroll from 'react-infinite-scroll-component';
import { RenderIf } from "@/components/shared/RenderIf"
import { RentCard } from "@/components/shared/rent-card"
// import { RentCard } from "@/components/shared/rent-card"
import { ScrollToTop } from "@/components/shared/ScrollToTop"
import { LIST_TAKE_COUNT } from "@/constants"
import { QUERY_KEYS } from "@/constants/query-keys"
import rentService from "@/services/rent"
import { Rent } from "@/types"
import Spinner from "@/components/shared/Spinner";
import { useSearchParams } from "react-router-dom";




export const RentListPage = () => {
    const [searchParams] = useSearchParams()
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [QUERY_KEYS.RENT_LIST, searchParams.toString()],
        queryFn: ({ pageParam }: { pageParam: number }) => rentService.getAll({ take: LIST_TAKE_COUNT, skip: pageParam }, searchParams.toString()),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const hasNextPage = lastPage.data.total > lastPage.data.skip + lastPage.data.take;
            if (!hasNextPage) return null;
            return lastPage.data.skip + lastPage.data.take
        }
    })

    const rents = useMemo(() => {
        if (!data) return [];
        return data.pages.reduce((prev: Rent[], page) => {
            return [...prev, ...page.data.items]
        }, [])
    }, [data])


    return (
        <div className="grid xl:grid-cols-[360px,1fr]">
            <ScrollToTop />
            <Filters />
            <div className="bg-white" />
            <div className="flex flex-col gap-y-6 lg:gap-y-8 pt-6  lg:pt-8 px-6 lg:px-8 pb-10">
                <Availability />
                <InfiniteScroll
                    dataLength={rents.length} //This is important field to render the next data
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={
                        <div className="flex items-center flex-col gap-x-3 text-muted-foreground mt-4">
                            <Spinner />
                            <div>Loading more items...</div>
                        </div>
                    }
                    endMessage={
                        <RenderIf condition={!isLoading}>
                            <p className="mt-4 text-center text-muted-foreground">
                                No more items  to show
                            </p>
                        </RenderIf>
                    }
                // below props only if you need pull down functionality

                >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                        <RenderIf condition={isLoading}>
                            {[
                                ...Array(LIST_TAKE_COUNT)].map((_, index) => (
                                    <RentCard.Skeleton key={index} />
                                ))
                            }
                        </RenderIf>
                        {
                            rents.map((rent) => (
                                <RentCard key={rent._id} rent={rent} />
                            ))
                        }
                    </div>
                </InfiniteScroll>

            </div>
        </div>
    )
}
