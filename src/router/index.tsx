import RootLayout from "@/components/shared/RootLayout";
import { paths } from "@/constants/paths";
import RentDetailPage from "@/pages/detail";
import HomePage from "@/pages/home";
import { RentListPage } from "@/pages/list";
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
            }
        ]
    },
]);