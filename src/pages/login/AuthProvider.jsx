import { Navigate } from "react-router-dom";

function AuthProvider({ children }) {
  const accessToken = localStorage.getItem("accessToken");
  const user = accessToken ? JSON.stringify(accessToken) : null;

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default AuthProvider;
