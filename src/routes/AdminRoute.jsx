import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const AdminRoutes = ({children}) => {
     const location = useLocation();
    //  const admin = JSON.parse(localStorage.getItem('user-update'));
    const admin = "ahad.aiman@gmail.com"
    //  console.log(admin);

    //  if(admin?.isAdmin){
    //       return children;
    //  }
    if(admin){return children}
     return <Navigate to="/auth" state={{from:location}} replace/>
}

export default AdminRoutes;