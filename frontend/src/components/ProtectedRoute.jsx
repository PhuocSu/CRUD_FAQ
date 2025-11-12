import { Navigate, Outlet } from "react-router-dom";
import UseAuthStore from "../stores/UseAuthStore";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const { accessToken, user, loading, refresh, fetchMe } = UseAuthStore();
    const [starting, setStarting] = useState(true)

    const init = async () => {
        if (!accessToken) {
            await refresh()
        }

        if (accessToken && !user) {
            await fetchMe()
        }

        setStarting(false)
    }

    useEffect(() => {
        init()
    }, [])

    if (starting || loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    if (!accessToken) {
        return (
            <Navigate to="/signin" replace />
        )
    }
    return <Outlet />;
};

export default ProtectedRoute;
