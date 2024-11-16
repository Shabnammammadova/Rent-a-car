import List from "@/components/shared/RentList"
import { ImagesSection } from "./components/Images"
import { InformationSection } from "./components/Information"
import ReviewsSection from "./components/Reviews"


const RentDetailPage = () => {
    return (
        <div className="container max-w-[1144px]  py-6 lg:py-8 ">
            <div className="grid lg:grid-cols-[1fr_492px] xl:grid-cols-2 gap-x-8 ">
                <ImagesSection />
                <InformationSection />
            </div>
            <ReviewsSection />
            <List maxCols={3} heading="Recent Cars" />
            <List maxCols={3} heading="Recomendation Cars" />
        </div>
    )
}

export default RentDetailPage