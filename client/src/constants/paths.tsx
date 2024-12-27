export const paths = {
    HOME: "/",
    LIST: "/list",
    FORGOTPASSWORD: "/forgot-password",
    RESETPASSWORD: (token = ":token") => `/reset-password/${token}`,
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
        },
        REVIEWS: {
            LIST: "/dashboard/reviews"
        },
        LOCATION: {
            LIST: "/dashboard/location",
            CREATE: "/dashboard/location/create"
        },
        CHAT: {
            VIEW: "/dashboard/chat",
            USER: (id = ":id") => `/dashboard/chat/${id}`
        },
    },

}