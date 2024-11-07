import { Availability } from "@/components/shared/availabilty-filter"
import { Hero } from "./components/Hero"
import List from "./components/List"



const HomePage = () => {
    return (
        <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16">
            <Hero />
            <Availability />
            <List heading="Popular Car" />
            <List heading="Recomdation Car" />
        </div>
    )
}

export default HomePage