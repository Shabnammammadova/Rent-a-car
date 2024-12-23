
import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"
import { Dialogs } from "./dialogs"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect } from "react"
import { getCurrentUserAsync } from "@/store/features/userSlice"
import { HelpPopover } from "./help-popover"



const RootLayout = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentUserAsync())
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
            <Dialogs />
            <HelpPopover />
        </div>
    )
}

export default RootLayout