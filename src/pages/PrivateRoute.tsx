import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const PrivateRoute = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.AuthReducer.isLoggedIn
  );
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
