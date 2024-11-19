import DashboardLayout from "@/components/shared/DashboardLayout";
import RootLayout from "@/components/shared/RootLayout";
import { paths } from "@/constants/paths";
import DashboardMainPage from "@/pages/(dashboard)/main";
import DashboardRentsPage from "@/pages/(dashboard)/rents";
import RentDetailPage from "@/pages/detail";
import HomePage from "@/pages/home";
import { RentListPage } from "@/pages/list";
import PaymentPage from "@/pages/payment";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "",
        element: <RootLayout />,
        children: [
            {
                path: paths.HOME,
                element: <HomePage />
            },
            {
                path: paths.LIST,
                element: <RentListPage />
            },
            {
                path: paths.DETAIL(),
                element: <RentDetailPage />
            },
            {
                path: paths.PAYMENT,
                element: <PaymentPage />
            },
            {
                path: "",
                element: <DashboardLayout />,
                children: [
                    {
                        path: paths.DASHBOARD.MAIN,
                        element: <DashboardMainPage />
                    },
                    {
                        path: paths.DASHBOARD.RENT,
                        element: <DashboardRentsPage />
                    }
                ]
            }

        ]
    },
]);