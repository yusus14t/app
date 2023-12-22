import { Navigate } from "react-router-dom";
import Patients from "../components/user-component/Clinic/Patients";
import Dashbaord from "../components/user-component/Clinic/Dashboard";
import Doctors from "../components/common-components/DoctorsList";
import Notification from "../components/common-components/Notification/Notification";
import Support from "../components/common-components/Support/Support";
import Settings from "../components/common-components/Settings/Settings";

const DEPARTMENT = [
  { path: "/department", element: <Navigate to={"/department/dashboard"} /> },
  { path: "/department/dashboard", element: <Dashbaord /> },
  { path: "/department/profile", element: <h1>Profile</h1> },
  { path: "/department/patients", element: <Patients /> },
  { path: "/department/notification", element: <Notification /> },
  { path: "/department/doctors", element: <Doctors /> },
  { path: "/department/support", element: <Support /> },
  { path: "/department/setting", element: <Settings /> },
  { path: "/department/*", element: <Navigate to={"/department/dashboard"} /> },
];

export default DEPARTMENT;
