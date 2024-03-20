import { Navigate } from "react-router-dom";
import Patients from "../components/user-component/Clinic/Patients";
import Dashbaord from "../components/user-component/Clinic/Dashboard";
import Doctors from "../components/common-components/DoctorsList";
import Notification from "../components/common-components/Notification/Notification";
import Support from "../components/common-components/Support/Support";
import Appointments from "../components/App//Dashboard/Appointments";
import Settings from "../components/common-components/Settings/Settings";

const CLINIC = [
  { path: "/clinic", element: <Navigate to={"/clinic/dashboard"} />, },
  { path: "/clinic/dashboard", element: <Dashbaord /> },
  { path: "/clinic/patients", element: <Patients /> },
  { path: "/clinic/appointment", element: <Appointments /> },
  { path: "/clinic/doctors", element: <Doctors /> },
  { path: "/clinic/notification", element: <Notification />, onExpire: true },
  { path: "/clinic/support", element: <Support />, onExpire: true },
  { path: "/clinic/setting", element: <Settings />, onExpire: true },
  { path: "/clinic/*", element: <Navigate to={"/clinic/dashboard"} /> },
];

export default CLINIC;
