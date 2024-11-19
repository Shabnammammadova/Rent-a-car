import SwapIcon from "@/assets/icons/swap.svg";
import { Button } from "@/components/ui/button";
import React from "react";
import { CustomSelect } from "../Select";

export const Availability = () => {
    return (
        <div className="grid lg:grid-cols-[1fr_60px_1fr] gap-x-5 lg:gap-x-7 xl:gap-x-[44px] items-center mt-8">
            <Card
                heading={
                    <div className="flex items-center gap-x-2">
                        <span className="inline-block w-4 h-4 border-4 border-[rgba(53,99,233,0.30)] rounded-full">
                            <span className="block w-2 h-2 bg-primary rounded-full" />
                        </span>
                        <p className="text-secondary-500 font-semibold text-base leading-[20px] tracking-[-0.32px]">
                            Pick - Up
                        </p>
                    </div>
                }
            />
            <Button className="w-fit h-fit p-[18px] mx-auto -my-4 lg:my-0 z-10">
                <img src={SwapIcon} alt="Swap" className="w-6 h-6" />
            </Button>
            <Card
                heading={
                    <div className="flex items-center gap-x-2">
                        <span className="inline-block w-4 h-4 border-4 border-[rgba(53,99,233,0.30)] rounded-full">
                            <span className="block w-2 h-2 bg-information rounded-full" />
                        </span>
                        <p className="text-secondary-500 font-semibold text-base leading-[20px] tracking-[-0.32px]">
                            Drop - Off
                        </p>
                    </div>
                }
            />
        </div>
    );
};

const Card = ({ heading }: { heading: React.ReactNode }) => {
    return (
        <div className="bg-white rounded-[10px] h-[136px] w-full pt-4 lg:pt-6 pb-5 lg:pb-7 px-6 xl:px-12">
            {heading}
            <div className="mt-3 lg:mt-4 grid grid-cols-[1fr_1px_1fr_1px_1fr] gap-x-2 md:gap-x-3  xl:gap-x-6">
                <CustomSelect
                    label="Locations"
                    options={[
                        { label: "Jakarta", value: "jakarta" },
                        { label: "Bandung", value: "bandung" },
                        { label: "Bali", value: "bali" },
                        { label: "Surabaya", value: "surabaya" },
                    ]}
                    placeholder="Select your city"
                />
                <div className="w-full h-full bg-[#c3d4e966]" />
                <CustomSelect
                    label="Date"
                    options={[
                        { label: "Jakarta", value: "jakarta" },
                        { label: "Bandung", value: "bandung" },
                        { label: "Bali", value: "bali" },
                        { label: "Surabaya", value: "surabaya" },
                    ]}
                    placeholder="Select your date"
                />
                <div className="w-full h-full bg-[#c3d4e966]" />
                <CustomSelect
                    label="Time"
                    options={[
                        { label: "Jakarta", value: "jakarta" },
                        { label: "Bandung", value: "bandung" },
                        { label: "Bali", value: "bali" },
                        { label: "Surabaya", value: "surabaya" },
                    ]}
                    placeholder="Select your time"
                />
            </div>
        </div>
    );
};