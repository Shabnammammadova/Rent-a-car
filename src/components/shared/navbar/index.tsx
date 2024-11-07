import { Actions } from "./Actions"
import { Search } from "./Search"

export const Navbar = () => {
    return (
        <div className="bg-white py-6 md:py-10 sticky top-0 z-20">
            <div className="container flex items-center justify-between">
                <div className="flex items-center  gap-x-4 md:gap-x-8 lg:gap-x-16">
                    <h1 className="text-[24px] md:text-[32px] font-bold text-primary leading-[36px] md:leading-[48px]">MORENT</h1>
                    <Search />
                </div>
                <Actions />
            </div>
        </div>
    )
}

export default Navbar