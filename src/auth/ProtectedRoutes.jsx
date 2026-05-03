import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/AuthContext";

export default function ProtectedRoute (){

    const {isAuthenticated, loading } = useAuth();

    const location = useLocation();


    if(!isAuthenticated && !loading) {
        return <Navigate to="/login" state={{from: location}} replace />
    }
    return <Outlet />
}