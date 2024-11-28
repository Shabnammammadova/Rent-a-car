
import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"
import { Dialogs } from "./dialogs"
import { useAppDispatch } from "@/hooks/redux"
import { useEffect } from "react"
import { getCurrentUserAsync } from "@/store/features/userSlice"



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
        </div>
    )
}

export default RootLayout