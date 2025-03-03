import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>; // Prevents redirect before user state is loaded

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
