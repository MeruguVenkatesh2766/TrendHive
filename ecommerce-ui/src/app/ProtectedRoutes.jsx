import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authAdmin } = useSelector((state) => state.user.loginUser);

  return (
    <Route
      {...rest}
      element={
        authAdmin ? <Component /> : <Navigate to="/" replace />
      }
    />
  );
};

export default ProtectedRoute;
