import { Outlet } from "react-router-dom"
import { DashboardSidebar } from "./DashboardSidebar"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"


const DashboardLayout = () => {
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