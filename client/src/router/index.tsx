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
import ChatPage from "@/pages/(dashboard)/chat";
import { ForgotPassword } from "@/pages/forgot-password";
import { ResetPassword } from "@/pages/reset-password";
import DashboardLocationPage from "@/pages/(dashboard)/location/list";
import DashboardCreateLocationPage from "@/pages/(dashboard)/location/create";
import ProfilePage from "@/pages/profile";
import DashboardCategoryPage from "@/pages/(dashboard)/category/list";
import DashboardCreateCategoryPage from "@/pages/(dashboard)/category/create";




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
                path: paths.FORGOTPASSWORD,
                element: <ForgotPassword />
            },
            {
                path: paths.RESETPASSWORD(),
                element: <ResetPassword />
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
                path: paths.PROFILE,
                element: <ProfilePage />
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
                    },
                    {
                        path: paths.DASHBOARD.CHAT.VIEW,
                        element: <ChatPage />
                    },
                    {
                        path: paths.DASHBOARD.CHAT.USER(),
                        element: <ChatPage />
                    },
                    {
                        path: paths.DASHBOARD.LOCATION.LIST,
                        element: <DashboardLocationPage />
                    },
                    {
                        path: paths.DASHBOARD.LOCATION.CREATE,
                        element: <DashboardCreateLocationPage />
                    },
                    {
                        path: paths.DASHBOARD.CATEGORY.LIST,
                        element: <DashboardCategoryPage />
                    },
                    {
                        path: paths.DASHBOARD.CATEGORY.CREATE,
                        element: <DashboardCreateCategoryPage />
                    }
                ]
            }

        ]
    },
]);