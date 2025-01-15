import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

interface PrivateRouteProps {
    children: React.ReactNode;
    role?: 'Admin' | 'User';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
    const { isUserLoggedIn, userRole } = useAuth();

    if (!isUserLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;