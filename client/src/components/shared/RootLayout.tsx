
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./navbar"
import { Dialogs } from "./dialogs"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect } from "react"
import { getCurrentUserAsync } from "@/store/features/userSlice"
import { HelpPopover } from "./help-popover"



const RootLayout = () => {

    const dispatch = useAppDispatch();
    const location = useLocation()

    const isDashboardPage = location.pathname.includes("dashboard")

    useEffect(() => {
        dispatch(getCurrentUserAsync())
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
            <Dialogs />
            {!isDashboardPage && <HelpPopover />}
        </div>
    )
}

export default RootLayout