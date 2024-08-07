import { ReactNode } from "react";

import { Navigate } from "react-router-dom";

import { useUserSelector } from "../store/hooks";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const userIsLoggedIn = useUserSelector((state) => state.user.isLoggedIn);

  if (!userIsLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
