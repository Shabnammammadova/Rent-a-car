import { useEffect } from "react"


export const ScrollToTop = () => {
    return (
        useEffect(() => {
            window.scrollTo(0, 0)
        }, [])
    )
}

