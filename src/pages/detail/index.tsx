import { ImagesSection } from "./components/Images"
import { InformationSection } from "./components/Information"


const RentDetailPage = () => {
    return (
        <div className="container max-w-[1144px]">
            <div className="grid lg:grid-cols-[1fr_492px] xl:grid-cols-2 py-6 lg:py-8 gap-x-8 ">
                <ImagesSection />
                <InformationSection />
            </div>
        </div>
    )
}

export default RentDetailPage