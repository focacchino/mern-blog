import { Outlet } from "react-router-dom";
import NavBar from "./nav";

function Layout() {
    return (
        <>
        <NavBar />
        <Outlet />
        </>
    )
}

export default Layout;