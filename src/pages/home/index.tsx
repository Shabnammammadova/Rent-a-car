import { Availability } from "@/components/shared/availabilty-filter"
import { Hero } from "./components/Hero"


const HomePage = () => {
    return (
        <div className="container pt-4 lg:pt-8 pb-8 lg:pb-16">
            <Hero />
            <Availability />
        </div>
    )
}

export default HomePage