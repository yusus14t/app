import { Navigate } from "react-router-dom";
import Patients from "../components/user-component/doctor/Patients";
import Dashbaord from "../components/user-component/doctor/Dashboard";
import Doctors from "../components/user-component/Doctors";
import Notification from "../components/common-components/Notification/Notification";
import Support from "../components/common-components/Support/Support";
// import AppointmentList from "../components/common-components/Appointment/AppointmentList";
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
