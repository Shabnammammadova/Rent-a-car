import RentCard from "@/components/shared/rent-card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


type Props = {
    heading: string
}

const List = ({ heading }: Props) => {
    return (
        <div>
            <div className="flex items-center justify-between py-2.5">
                <h3 className="pl-3 lg:pl-5 text-secondary-300 font-semibold ">{heading}</h3>
                <Button variant={"link"} asChild><Link to="/">View All</Link></Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                <RentCard />
                <RentCard />
                <RentCard />
                <RentCard />
                <RentCard />
                <RentCard />
                <RentCard />
                <RentCard />
            </div>
        </div>
    )
}

export default List