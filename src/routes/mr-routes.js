import { Navigate } from "react-router-dom"
import ClinicRegistration from '../components/common-components/registration/ClinicRegistartion';
import HospitalRegistration from '../components/common-components/registration/HospitalRegistration';
import Dashboard from '../components/user-component/mr/Dashboard';
import Clinics from '../components/user-component/mr/Clinics';
import Doctors from '../components/common-components/DoctorsList';
import Support from '../components/common-components/Support/Support';
import Notification from '../components/common-components/Notification/Notification';
import Settings from '../components/common-components/Settings/Settings';


const MR = [
    { path: "/mr", element: <Navigate to={'/mr/dashboard'} /> },
    { path: "/mr/dashboard", element: <Dashboard /> },
    { path: "/mr/profile", element: <div> Profile </div> },
    { path: "/mr/user", element: <h1>user</h1> },
    { path: "/mr/clinic-registration", element: <ClinicRegistration /> },
    { path: "/mr/hospital-registration", element: <HospitalRegistration /> },
    { path: "/mr/doctors", element: <Doctors /> },
    { path: "/mr/clinics", element:  <Clinics source={'clinics'} />},
    { path: "/mr/hospitals", element:  <Clinics source={'hospitals'} />},
    { path: "/mr/setting", element:  <Settings />},
    { path: "/mr/notification", element:  <Notification />},
    { path: "/mr/support", element:  <Support />},
    { path: "/mr/*", element: <Navigate to={'/mr'} /> },
]

export default MR