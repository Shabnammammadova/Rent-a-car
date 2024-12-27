import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { paths } from "@/constants/paths"

import { Calendar1Icon, CarIcon, ChartNoAxesCombined, Home, LocateIcon, MessageCircle, MessageSquareMoreIcon } from "lucide-react"


const items = [
    {
        title: "Dashboard",
        url: paths.DASHBOARD.MAIN,
        icon: Home,
    },
    {
        title: "Overview",
        url: paths.DASHBOARD.OVERVIEW,
        icon: ChartNoAxesCombined,
    },
    {
        title: "Car Rent",
        url: paths.DASHBOARD.RENT.LIST,
        icon: CarIcon,
    },
    {
        title: "Location",
        url: paths.DASHBOARD.LOCATION.LIST,
        icon: LocateIcon
    },
    {
        title: "Reservations",
        url: paths.DASHBOARD.RESERVATIONS.LIST,
        icon: Calendar1Icon,
    },
    {
        title: "Review",
        url: paths.DASHBOARD.REVIEWS.LIST,
        icon: MessageSquareMoreIcon,
    },
    {
        title: "Chat",
        url: paths.DASHBOARD.CHAT.VIEW,
        icon: MessageCircle
    }


]
export const DashboardSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
