import { Navigate } from "react-router-dom";
import Patients from "../components/user-component/Clinic/Patients";
import Dashbaord from "../components/user-component/Hospital/Dashboard";
import Notification from "../components/common-components/Notification/Notification";
import Support from "../components/common-components/Support/Support";
import Settings from "../components/common-components/Settings/Settings";
import Departments from "../components/user-component/Hospital/Departments";
import Doctors from "../components/common-components/DoctorsList";


const HOSPITAL = [
  { path: "/hospital", element: <Navigate to={"/hospital/dashboard"} /> },
  { path: "/hospital/dashboard", element: <Dashbaord /> },
  { path: "/hospital/patients", element: <Patients /> },
  { path: "/hospital/doctors", element: <Doctors /> },
  { path: "/hospital/departments", element: <Departments /> },
  { path: "/hospital/notification", element: <Notification />, onExpire: true },
  { path: "/hospital/support", element: <Support />, onExpire: true },
  { path: "/hospital/setting", element: <Settings />, onExpire: true },
  { path: "/hospital/*", element: <Navigate to={"/hospital/dashboard"} /> },
];

export default HOSPITAL;
