import { Navigate, Outlet } from "react-router-dom"
import { DashboardSidebar } from "./DashboardSidebar"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"
import { useAppSelector } from "@/hooks/redux"
import { selectUserData } from "@/store/features/userSlice"
import { UserRole } from "@/types"
import { paths } from "@/constants/paths"


const DashboardLayout = () => {

  const { user, loading } = useAppSelector(selectUserData);

  if (loading) {
    return <div>Loading...</div>
  }
  if (!user || user.role !== UserRole.Admin) {
    <Navigate to={paths.HOME} />
  }
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full px-6">
          <SidebarTrigger className="my-4" />
          <div className="p-6 rounded-[10px] bg-white w-full">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  )
}

export default DashboardLayout