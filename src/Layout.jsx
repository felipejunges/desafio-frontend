import { AppNavbar } from "./Components/AppNavbar"
import { Outlet } from "react-router-dom"

export function Layout() {
    return (
        <>
            <AppNavbar />
            <main className="App">
                <Outlet />
            </main>
        </>
    )
}