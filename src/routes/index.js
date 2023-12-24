import { Navigate, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import SUPER_ADMIN from "./super-admin-routes";
import ADMIN from "./admin-routes";
import PATIENT from "./patient-routes";
import CLINIC from "./clinic-routes";
import DEPARTMENT from "./department-routes";
import HOSPITAL from "./hospital-routes";
import MR from "./mr-routes";

import COMMON_ROUTE from "./common-routes";
import Loader from "../layout/Loader";

// Layouts
import WebLayout from  "../layout/WebLayout";
import AppLayout from "../layout/AppLayout";

import { userInfo } from "../constants/utils";
import Expire from "../components/common-components/Expire";

const USER_ROUTES = {
  SA: { path: "/super-admin", id: SUPER_ADMIN },
  PT: { path: "/patient", id: PATIENT },
  CL: { path: "/clinic", id: CLINIC },
  DP: { path: "/department", id: DEPARTMENT },
  MR: { path: "/mr", id: MR },
  HL: { path: "/hospital", id: HOSPITAL },
  AD: { path: "/admin", id: ADMIN },
};

const userRoute = USER_ROUTES[userInfo?.userType]

const expireRoute = [
  ...(userRoute ? userRoute?.id?.filter( route => route.onExpire) : []),
  { path: `${userRoute?.path}`, element: <Expire /> },
  { path: `${userRoute?.path}/dashboard`, element: <Expire /> },
  { path: `${userRoute?.path}/*`, element: <Expire /> },
]


// Conditions for expire routes, without login routes and user routes 
const expireCondition = () => {
  if( !userInfo ) return []

  const hasExpire = new Date(userInfo?.organizationId?.billing?.expire) <= new Date()

  if( ['SA', 'AD', 'MR', 'PT'].includes(userInfo?.userType) ) return userRoute.id
  else if ( userInfo?.organizationId?.billing?.isPaid && !hasExpire ) return userRoute.id
  else return expireRoute
}


export const AllRoutes = () => {

  if( !userInfo ) localStorage.clear()
  if( !userInfo?.isActive ){
    localStorage.clear()
  }

  /********* All Common Routes **************/
  let allUseRoutes = [
    {
      path: "/",
      exact: true,
      element: <WebLayout />,
      children: COMMON_ROUTE,
    },
  ];
  /****************************************/

  /***************** All User based Routes *******************/
  if (userRoute?.path) {

    allUseRoutes.push({
      path: `/${userRoute?.path}`,
      exact: true,
      element: userInfo ? <AppLayout /> : <Navigate to={"/login"} />,
      children: expireCondition()
    });
  }
  /**************************************************** */

  let routes = useRoutes(allUseRoutes);
  return <Suspense fallback={<Loader />}>{routes}</Suspense>;
};
