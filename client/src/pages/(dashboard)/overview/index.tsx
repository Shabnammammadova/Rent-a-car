import { BarCarChart } from "./chart-bar"
import { DonutChart } from "./chart-donut"
import { InteractiveChart } from "./chart-interactive"
import { AreaVisitorChart } from "./chart-visitors"



const DashboardOverviewPage = () => {
    return (
        <>
            <div className="flex justify-between gap-2">
                <AreaVisitorChart />
                <BarCarChart />
                <DonutChart />
            </div>
            <InteractiveChart />

        </>
    )
}

export default DashboardOverviewPage