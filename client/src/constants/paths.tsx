export const paths = {
    HOME: "/",
    LIST: "/list",
    DETAIL: (id = ":id") => `/detail/${id}`,
    PAYMENT: "/payment",
    DASHBOARD: {
        MAIN: "/dashboard",
        RENT: {
            LIST: "/dashboard/rents",
            CREATE: "/dashboard/rents/create",
            EDIT: (id = ":id") => `/dashboard/rents/edit/${id}`
        }
    }
}