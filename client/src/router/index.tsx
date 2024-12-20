import DashboardLayout from "@/components/shared/DashboardLayout";
import RootLayout from "@/components/shared/RootLayout";
import { paths } from "@/constants/paths";
import DashboardMainPage from "@/pages/(dashboard)/main";
import DashboardRentsPage from "@/pages/(dashboard)/rents/list";
import DashboardCreatePage from "@/pages/(dashboard)/rents/create";
import DashboardEditPage from "@/pages/(dashboard)/rents/update";
import RentDetailPage from "@/pages/detail";
import HomePage from "@/pages/home";
import { RentListPage } from "@/pages/list";
import PaymentPage from "@/pages/payment";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/components/shared/AuthLayout";
import ReservationPage from "@/pages/reservations";
import DashboardReservationPage from "@/pages/(dashboard)/reservations/list";
import DashboardOverviewPage from "@/pages/(dashboard)/overview";
import DashboardReviewListPage from "@/pages/(dashboard)/review/list";



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
                path: "",
                element: <AuthLayout />,
                children: [
                    {
                        path: paths.PAYMENT(),
                        element: <PaymentPage />
                    },
                    {
                        path: paths.RESERVATIONS,
                        element: <ReservationPage />
                    }
                ],
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
                        path: paths.DASHBOARD.OVERVIEW,
                        element: <DashboardOverviewPage />
                    },
                    {
                        path: paths.DASHBOARD.RENT.LIST,
                        element: <DashboardRentsPage />
                    },
                    {
                        path: paths.DASHBOARD.RENT.CREATE,
                        element: <DashboardCreatePage />
                    },
                    {
                        path: paths.DASHBOARD.RENT.EDIT(),
                        element: <DashboardEditPage />
                    },
                    {
                        path: paths.DASHBOARD.RESERVATIONS.LIST,
                        element: <DashboardReservationPage />
                    },
                    {
                        path: paths.DASHBOARD.REVIEWS.LIST,
                        element: <DashboardReviewListPage />
                    }
                ]
            }

        ]
    },
]);