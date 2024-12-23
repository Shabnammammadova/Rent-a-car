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
        <main className="w-full px-6 relative pt-4">
          <SidebarTrigger className=" absolute left-8 top-6" />
          <div className="p-6 rounded-[10px] bg-white w-full">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </>
  )
}

export default DashboardLayout