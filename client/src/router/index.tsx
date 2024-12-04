import DashboardLayout from "@/components/shared/DashboardLayout";
import ForgotPassword from "@/components/shared/dialogs/ForgotPassword";
import RootLayout from "@/components/shared/RootLayout";
import { paths } from "@/constants/paths";
import DashboardMainPage from "@/pages/(dashboard)/main";
import DashboardRentsPage from "@/pages/(dashboard)/rents/list";
import DashboardCreatePage from "@/pages/(dashboard)/rents/create";
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
                path: "/forgot-password",
                element: <ForgotPassword />
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
                        path: paths.DASHBOARD.RENT.LIST,
                        element: <DashboardRentsPage />
                    },
                    {
                        path: paths.DASHBOARD.RENT.CREATE,
                        element: <DashboardCreatePage />
                    }
                ]
            }

        ]
    },
]);