import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { setUser } from "../redux/features/Auth/authSlice";

// eslint-disable-next-line react/prop-types
const AdminRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
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
  //  const admin = JSON.parse(localStorage.getItem('user-update'));
  const admin = "ahad.aiman@gmail.com";
  //  console.log(admin);

  //  if(admin?.isAdmin){
  //       return children;
  //  }
  if (admin) {
    return children;
  }
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default AdminRoutes;
