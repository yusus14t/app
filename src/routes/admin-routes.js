import { Navigate } from "react-router-dom"
import Dashboard from '../components/user-component/superAdmin/Dashboard';
import Notification from '../components/common-components/Notification/Notification';
import Support from '../components/common-components/Support/Support';
import Settings from '../components/common-components/Settings/Settings';
import MR from "../components/user-component/superAdmin/MR";
import Contacts from "../components/user-component/superAdmin/Contacts";
import Doctors from "../components/common-components/DoctorsList";
import Departments from "../components/user-component/Hospital/Departments";
import Clinics from "../components/user-component/superAdmin/Clinics";


const ADMIN = [
  { path: "/admin", element: <Dashboard /> },
  { path: "/admin/notification", element: <Notification /> },
  { path: "/admin/support", element: <Support /> },
  { path: "/admin/setting", element: <Settings /> },
  { path: "/admin/mr", element: <MR /> },
  { path: "/admin/contacts", element: <Contacts /> },
  { path: "/admin/doctors", element: <Doctors /> },
  { path: "/admin/departments", element: <Departments /> },
  { path: "/admin/clinics", element: <Clinics /> },
  { path: "/admin/*", element: <Navigate to={"/admin"} /> },
];

export default ADMIN