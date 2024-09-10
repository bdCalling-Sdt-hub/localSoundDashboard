import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser } from "../redux/features/Auth/authSlice";
import { CustomSpinner } from "../Components/Spinners/Spinner";

// eslint-disable-next-line react/prop-types
const AdminRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user-update"));
    const token = localStorage.getItem("token");
    dispatch(
      setUser({
        user,
        token,
      })
    );
  }, []);
  if (isLoading && !user) {
    return <CustomSpinner />;
  }
  if (user?.type === "ADMIN") {
    return children;
  }
  //   return <Navigate to="/auth" state={{ from: location }} replace />;
  // };
  return <Navigate state={location.pathname} to="/auth" />;
};

export default AdminRoutes;
