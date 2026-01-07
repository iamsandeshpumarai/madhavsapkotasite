import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../Context/CreateContext";

const ProtectedRoute = () => {
  const { user, isLoading } = useContext(DataContext);

  if (isLoading) return <div>Checking authentication...</div>;

  return user ? <Outlet /> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
