export const paths = {
    HOME: "/",
    LIST: "/list",
    DETAIL: (id = ":id") => `/detail/${id}`,
    PAYMENT: "/payment",
    DASHBOARD: {
        MAIN: "/dashboard",
        RENT: "/dashboard/rents"
    }
}