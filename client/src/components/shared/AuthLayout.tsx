import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "@/hooks/redux"
import { selectUserData } from "@/store/features/userSlice"
import { paths } from "@/constants/paths"


const AuthLayout = () => {

    const { user, loading } = useAppSelector(selectUserData);

    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        <Navigate to={paths.HOME} />
    }
    return (
        <Outlet />
    )
}

export default AuthLayout