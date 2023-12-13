import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { SEO, userRoutes as userRouteConstant } from "../constants/constant";

import Hospitals from "../components/webcomponents/Hospital/Hospitals";
import { userInfo } from "../constants/utils";
import Privacy from "../components/webcomponents/Privacy";
import Terms from "../components/webcomponents/Terms";
import NotFound from "../components/webcomponents/NotFound";
import Payment_Success from "../components/common-components/Payment_Success";
import Payment_Failed from "../components/common-components/Payment_Failed";
import PricingTable from '../components/common-components/PricingTable'
import Pricing from "../components/webcomponents/Pricing";
import AddHead from "../components/seo/AddHead";
import AllSpecialization from '../components/App/Pages/AllSpecialization.js'

// const ClinicDetail = lazy(() => import( '../components/webcomponents/Clinic_Details'))
// const ClinicDetail = lazy(() => import( '../components/App/Pages/ClinicDetails'))
import ClinicDetail from'../components/App/Pages/ClinicDetails'

const Doctors = lazy(() => import( '../components/webcomponents/doctor/Doctors'))
const Clinics = lazy(() => import( "../components/webcomponents/Clinics"))
const Home = lazy(() => import( "../components/webcomponents/Home.js"))
const About = lazy(() => import("../components/webcomponents/About.js"))
const Contact = lazy(() => import('../components/webcomponents/Contact'))
const DepartmentSignUp = lazy(() => import('../components/authentication/DepartmentSignUp'))
const AfterSignup = lazy(() => import('../components/process/AfterSignup'))
const Gynae = lazy(() => import("../components/App/Pages/Gynaeclogist"))
const HospitalDetails = lazy(() => import("../components/App/Pages/HospitalDetails.js"))

const LogIn = lazy(() => import("../components/authentication/LogIn"));
const Radiologist = lazy(() => import("../components/webcomponents/Radiologist"));
const SpecializationDetails = lazy(() => import('../components/App/Pages/SpecializationDeatils'))
const Homeopathy =lazy(()=> import('../components/webcomponents/Homeopathy'));

const getUserType = () => userInfo?.userType;

const COMMON_ROUTE = [
  { path: "/", element: <AddHead seoContent={SEO.HOMEPAGE} > <Home /></AddHead> },
  { path: "/department-login", element: <DepartmentSignUp /> },
  { path: "/doctors", element: <AddHead seoContent={SEO.DOCTORS}><Doctors /></AddHead> },
  { path: "/about", element: <About /> },
  { path: "/clinic-detail/:id", element: <ClinicDetail /> },
  { path: "/clinics", element: <AddHead seoContent={SEO.CLINICS}><Clinics /></AddHead> },
  { path: "/contact", element: <AddHead seoContent={SEO.CONTACT}><Contact /></AddHead> },
  { path: "/hospitals", element: <AddHead seoContent={SEO.HOSPITALS}><Hospitals /></AddHead> },
  { path: "/after", element: <AfterSignup /> },
  { path: "/gynae", element: <AddHead seoContent={SEO.GYNAECLOGIST}><Gynae /></AddHead> },
  { path: "/hospital-detail/:id", element: <HospitalDetails /> },
  { path: "/department-detail/:id", element: <ClinicDetail /> },
  { path: "/radiologist", element: <AddHead seoContent={SEO.RADIOLOGIST}><Radiologist /></AddHead> },
  { path: "/homeopathy", element: <AddHead seoContent={SEO.HOMEOPATHY}><Homeopathy /></AddHead> },
  { path: "/specialization/:id", element: <SpecializationDetails /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
  { path:"/pricing-refund-policy", element:<Pricing/>},
  { path:"/payment-success", element:<Payment_Success />},
  { path:"/payment-failed", element:<Payment_Failed />},
  { path:"/pricing", element:<PricingTable/>},
  { path:"allspecialization", element:<AllSpecialization/>},

  {
    path: "/login",
    element: getUserType() ? (
      <Navigate to={userRouteConstant[getUserType()]?.path || "/login"} />
    ) : (
      <LogIn />
    ),
  },
  { path: "/*", element: <NotFound /> },
];

export default COMMON_ROUTE;
