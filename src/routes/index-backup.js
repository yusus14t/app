import { Navigate, useRoutes } from "react-router-dom";
import { Suspense } from "react";

import COMMON_ROUTE from "./common-routes";
import Loader from "../layout/Loader";

import WebLayout from  "../layout/weblayout/WebLayout";
import AppLayout from "../layout/Index";

import { userInfo as user }  from "../constants/utils";

const USER_ROUTES = {
  SA: { path: "/super-admin", route: 'super-admin-routes' },
  AD: { path: "/admin", route: 'admin-routes' },
  PT: { path: "/patient", route: 'patient-routes' },
  CL: { path: "/clinic", route: 'clinic-routes' },
  DP: { path: "/department", route: 'department-routes' },
  MR: { path: "/mr", route: 'mr-routes' },
  HL: { path: "/hospital", route: 'hospital-routes' },
};

let user_routes = user?.userType ? import(`./${ USER_ROUTES[user?.userType].route }`).then((d) => user_routes = d.default ) : []


export const AllRoutes = () => {
  try{
      if( !user ) localStorage.clear()
      if( !user?.isActive ){
        localStorage.clear()
      }
  } catch( error ){ console.log(error)}
  finally {

    let allUseRoutes = [
      {
        path: "/",
        exact: true,
        element: <WebLayout />,
        children: COMMON_ROUTE,
      },
    ];
  
    if( user?.userType ){
      allUseRoutes.push({
        path: USER_ROUTES[user?.userType].path,
        exact: true,
        element: user ? <AppLayout /> : <Navigate to={"/login"} />,
        children: user_routes,
      });
    }
    
    let routes = useRoutes(allUseRoutes);
    return <Suspense fallback={<Loader />}>{routes}</Suspense>;
  }
};
