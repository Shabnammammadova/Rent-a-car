export const paths = {
    HOME: "/",
    LIST: "/list",
    DETAIL: (id = ":id") => `/detail/${id}`,
    PAYMENT: (id = ":id") => `/payment/${id}`,
    RESERVATIONS: "/reservation",
    DASHBOARD: {
        MAIN: "/dashboard",
        OVERVIEW: "/overview",
        RENT: {
            LIST: "/dashboard/rents",
            CREATE: "/dashboard/rents/create",
            EDIT: (id = ":id") => `/dashboard/rents/edit/${id}`
        },
        RESERVATIONS: {
            LIST: "/dashboard/reservation"
        }
    },

}