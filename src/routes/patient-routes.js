import { Navigate } from "react-router-dom";
import Dashboard from '../components/user-component/patient/Dashboard';
import Notification from '../components/common-components/Notification/Notification';
import Support from '../components/common-components/Support/Support';

const PATIENT = [
    { path: "/patient", element: <Dashboard /> },
    { path: "/patient/setting", element: <h1>Profile</h1> },
    { path: "/patient/notification", element: <Notification /> },
    { path: "/patient/support", element: <Support /> },
    { path: "/patient/*", element: <Navigate to={'/patient'} /> },
  ]

export default PATIENT;