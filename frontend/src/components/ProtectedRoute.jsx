// 

import { Navigate, Outlet } from "react-router-dom";
import UseAuthStore from "../stores/UseAuthStore";

const ProtectedRoute = () => {
    const user = UseAuthStore((state) => state.user);

    if (!user) return <Navigate to="/signin" replace />;
    return <Outlet />;
};

export default ProtectedRoute;
