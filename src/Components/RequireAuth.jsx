import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Unauthorized from "../Pages/Unauthorized";

const RequireAuth = ({ adminRole }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        !auth?.user
            ? <Navigate to="/login" state={{ from: location }} replace />
            : auth?.role == 'Admin' || !adminRole
                ? <Outlet />
                : <Unauthorized />
    );
}

export default RequireAuth;