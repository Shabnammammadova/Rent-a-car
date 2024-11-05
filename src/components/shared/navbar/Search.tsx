import SearchIcon from "@/assets/icons/search.svg"
import FilterIcon from "@/assets/icons/filter.svg"

export const Search = () => {
    return (
        <div className="relative hidden md:block  lg:w-[320px] xl:w-[492px]">
            <img src={SearchIcon} alt="search" className="absolute left-5 top-2.5" />
            <input placeholder="Search something here" className="w-full border border-[#c3d4e966]  rounded-[70px] py-[11px] pl-12 lg:pl-16 pr-11 placeholder:text-secondary text-sm font-medium leading-[21px] tracking-tighter-[-0.28px]" />
            <img src={FilterIcon} alt="filter" className="absolute right-5 top-2.5" />
        </div>
    )
}

