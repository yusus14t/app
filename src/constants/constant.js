
import { faHouse ,faUser, faCalendarDays, faGear, faTableCellsLarge} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import doctorimg from '../assets/images/no_images/no_doctor.png'
import clinicimg from '../assets/images/no_images/no_clinic.jpg'
import hospitalimg from '../assets/images/no_images/no_hospital.jpg'
import noimg from '../assets/images/no-photo.png'
import logo from '../assets/img/logo/logo.jpg'

// Icon Image
import doctors from "../assets/menuIcons/doctor.png"
import hospital from "../assets/menuIcons/hospital.png"
import clinic from "../assets/menuIcons/clinic.png"
import radiologist from "../assets/menuIcons/ultrasound.jpg"
import gynae from "../assets/menuIcons/gynae.png"
import homeo from "../assets/menuIcons/homeo.jpeg"
import contact from "../assets/menuIcons/contact.png"
import notification from '../assets/menuIcons/bell.png'
import mr from '../assets/menuIcons/mr.png'
import department from '../assets/menuIcons/department.png'
import patients from '../assets/menuIcons/patients.png'


export const DOCTOR_DEFAUL_IMG = doctorimg
export const CLINIC_DEFAUL_IMG = clinicimg
export const HOSPITAL_DEFAUL_IMG = hospitalimg
export const NO_PHOTO = noimg
export const LOGO = logo

  

export const APP_MENU_ITEM = {
  APP: [
    { title: 'Home', path: '/', icon: <FontAwesomeIcon icon={faHouse} /> },
    { title: 'Appointments', path: '/test', icon: <FontAwesomeIcon icon={faCalendarDays} /> },
    { title: 'Account', path: '/login', icon: <FontAwesomeIcon icon={faUser} /> },
  ],

  APP_POPUP: [
    { title: 'Doctors', path: '/doctors', icon: doctors },
    { title: 'Pvt. Hospitals', path: '/hospitals', icon: hospital },
    { title: 'Govt. Hospitals', path: '/hospitals', icon: hospital },
    { title: 'Clinics', path: '/clinics', icon: clinic },
    { title: 'Gynaeclogist', path: '/gynae', icon: gynae },
    { title: 'Radiologist', path: '/radiologist', icon: radiologist },
    { title: 'Homeopathy', path: '/homeopathy', icon: homeo },
    { title: 'Contact', path: '/contact', icon: contact },
  ],

  DASHBOARD : [
    { title: 'Home', path: '/', icon: <FontAwesomeIcon icon={faTableCellsLarge}/>},
    { title: 'Appintments', path: '/appointment', icon: <FontAwesomeIcon icon={faCalendarDays} /> },
    { title: 'Setting', path: '/setting', icon: <FontAwesomeIcon icon={faGear} /> },
  ],

  DASHBOARD_POPUP : [
    { title: 'Clinics', path: '/clinics', icon: clinic , access:['AD', 'SA', 'MR'] },
    { title: 'Hospitals', path: '/hospitals', icon: hospital, access:['AD', 'SA', 'MR']  },
    { title: 'Depatments', path: '/departments', icon: department ,access:['AD', 'SA', 'MR' , 'HL'] },
    { title: 'Doctors', path: '/doctors', icon: doctors, access:['AD', 'SA', 'MR', "CL"] },
    { title: 'Patients', path: '/patients', icon: patients ,access:['AD', 'SA', 'HL', "DP", "CL"] },
    { title: 'MR', path: '/mr', icon: mr , access:['SA', 'AD']},
    { title: 'Contacts', path: '/contacts', icon: contact, access:['PT','SA',"AD","MR","HL", "CL"] },
    { title: 'Notification', path: '/notification', icon: notification, access:['PT','SA',"AD","MR","HL", "CL"] },
    { title: 'Support', path: '/support', icon: doctors,access:['PT','SA',"AD","MR","HL", "CL"] },




  ]
}


export const userRoutes = {
    PT: {path: '/patient', title: 'Patient'},
    SA: {path: '/super-admin', title: 'Super Admin'},
    MR: {path: '/mr', title: 'MR'},
    DP: {path: '/department', title: 'Department'},
    HL: {path: '/hospital', title: 'Hospital'},
    CL: {path: '/clinic', title: 'Clinic'},
    AD: {path: '/admin', title: 'Admin'},
} 

export const MODULES = [
    {id: 'dashboard', title: 'Dashboard', pathname: '/', access: ['CL', 'DP', 'HL', 'PT', 'SA', 'MR', 'AD']},
    {id: 'patients', title: 'patient', pathname: '/patients', access: ['CL', 'DP', 'HL', 'SA' ]},
    {id: 'appointment', title: 'Appointment', pathname: '/appointment', access: [ ]},
    {id: 'departments', title: 'Departments', pathname: '/departments', access: ['HL', 'SA', 'AD']},
    {id: 'clinic-registration', title: 'Clinics Registration', pathname: '/clinic-registration', access: [ 'MR']},
    {id: 'hospital-registration', title: 'Hospital Registration', pathname: '/hospital-registration', access: [ 'MR']},
    {id: 'clinics', title: 'Clinics', pathname: '/clinics', access: ['SA', 'MR','AD']},
    {id: 'hospitals', title: 'Hospitals', pathname: '/hospitals', access: ['MR']},
    {id: 'doctors', title: 'Doctors', pathname: '/doctors', access: ['SA', 'HL', 'CL', 'DP', 'MR', 'AD']},
    {id: 'mr', title: 'MR', pathname: '/mr', access: ['SA', 'AD']},
    {id: 'contacts', title: 'Contacts', pathname: '/contacts', access: ['SA', 'AD']},
    {id: 'setting', title: 'Setting', pathname: '/setting', access: ['CL', 'DP', 'HL', 'SA', 'MR', 'AD' ]},
    {id: 'notification', title: 'Notification', pathname: '/notification', access: ['CL', 'DP', 'HL', 'SA', 'MR', 'PT', 'AD']},
    {id: 'support', title: 'Support', pathname: '/support', access: ['CL', 'DP', 'HL', 'SA', 'MR', 'PT', 'AD']},
]

export const PRIORITY = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
]

export const DAYS = [
    { id:0, value: 'MON', day: 'Monday' },
    { id:1, value: 'TUE', day: 'Tuesday' },
    { id:2, value: 'WED', day: 'Wednesday' },
    { id:3, value: 'THU', day: 'Thursday' },
    { id:4, value: 'FRI', day: 'Friday' },
    { id:5, value: 'SAT', day: 'Saturday' },
    { id:6, value: 'SUN', day: 'Sunday' },
]

export const WEB_MENU_ITEMS = [
         { id: "home", name: "Home", path: "/" },
         { id: "gynae", name: "Gynecologist", path: "/gynae" },
         { id: "hospitals", name: "Hospitals", path: "/hospitals" },
         { id: "clinics", name: "Clinics", path: "/clinics" },
         { id: "doctors", name: "Doctors", path: "/doctors" },
         { id: "radiologist", name: "Radiologist", path: "/radiologist" },
         { id: "homeopathy", name: "Homeopathy", path: "/homeopathy" },
         { id: "about", name: "About Us", path: "/about" },
         { id: "contact", name: "Contact Us", path: "/contact" },
       ];

export const SERVICES = [
    { id: 'PARKING', name: 'Parking' },
    { id: 'AMBULANCE', name: 'Ambulance' },
    { id: 'WAITING', name: 'Waiting' },
    { id: 'FOOD_FOR_PATIENT', name: 'Fooding for Patients' },
    { id: 'ECHO', name: 'ECHO' },
    { id: 'CARE_TAKER', name: 'Care Taker' },
    { id: 'ENDOSCOPY', name: 'ENDOSCOPY' },
    { id: 'NICU', name: 'NICU' },
    { id: 'CATHLAB', name: 'CATHLAB' },
    { id: 'OPERATION_THEATRE', name: 'Operation Theatre' },
    { id: 'VENTILATOR', name: 'Ventilator' },
    { id: 'ULTRASOUND', name: 'Ultrasound' },
    { id: 'ECG', name: 'ECG Services' },
    { id: 'PHARMACY', name: 'Pharmacy' },
    { id: 'ROOM_FACILITY', name: 'Room Facility' },
    { id: 'MRI', name: 'MRI' },
    { id: 'CT_SCAN', name: 'CT Scan' },
    { id: 'BLOOD_BANK', name: 'Blood Bank' },
    { id: 'ICU', name: 'ICU' },
    { id: 'OXYGEN', name: 'Oxygen' },
]

export const RADIOLOGIST_DEPARTMENT = [
    { id: "CTSCAN", name: "CTScan" },
    { id: "ECHO", name: "ECHO" },
    { id: "ENDOSCOPY", name: "Endoscopy" },
    { id: "MRI", name: "MRI" },
    { id: "NICU", name: "NICU" },
    { id: "ULTRASOUND", name: "Ultrasound" },
    { id: "XRAY", name: "XRay" },
    { id: "ECG", name:"ECG"}
       ];

export const ORGANIZATION_TYPE = [
    { id: 'HOSPITAL', name: 'Hospital' },
    { id: 'CLINIC', name: 'Clinic' },
    { id: 'DOCTOR', name: 'Doctor' },
]

export const WEBSITE_IMAGE = {
    HOME_BANNER: 'HOME_BANNER',
    HOME_BOTTOM_BANNER: 'HOME_BOTTOM_BANNER',
    GYNAE_SLIDER_1: 'GYNAE_SLIDER_1',
    GYNAE_SLIDER_2: 'GYNAE_SLIDER_2',
    GYNAE_SLIDER_3: 'GYNAE_SLIDER_3',
    GYNAE_SLIDER_4: 'GYNAE_SLIDER_4',
    GYNAE_BANNER: 'GYNAE_BANNER',
    GYNAE_BOTTOM_BANNER: 'GYNAE_BOTTOM_BANNER',
    ULTRASOUND_BANNER: 'ULTRASOUND_BANNER',
    HOMEOPATHY_BANNER: 'HOMEOPATHY_BANNER',
    LOGIN_BANNER: 'LOGIN_BANNER',
    ABOUT_BANNER: 'ABOUT_BANNER',
    ABOUT_POSTER_1: 'ABOUT_POSTER_1',
    ABOUT_POSTER_2: 'ABOUT_POSTER_2'
} 

export const FULLDAY = {
    "MON": 'Monday',
    "TUE": 'Tuesday',
    "WED": 'Wednesday',
    "THU": 'Thursday',
    "FRI": 'Friday',
    "SAT": 'Saturday',
    "SUN": 'Sunday',
}

export const NUMBER_TO_DAY = {
    0: 'SUN',
    1: "MON",
    2: "TUE",
    3: "WED",
    4: 'THU',
    5: 'FRI',
    6: 'SAT',
}

export const PLAN = {
    month: 'month',
    quater: 'quater',
    halfYear: 'halfYear',
    year: 'year',
}

export const SETTING_TABS = [
    { name: 'Website', id: 'WEBSITE', access: ['SA', 'AD']},
    { name: 'Specialization', id: 'SPECIALIZATION', access: ['HL', 'CL' ]},
    { name: 'Specialization', id: 'CUSTOM_SPECIALIZATION', access: ['SA', 'AD' ]},
    { name: 'Services', id: 'SERVICES', access: ['HL', 'CL']},
    { name: 'Services', id: 'CUSTOM_SERVICES', access: ['SA', 'AD' ]},
    { name: 'QR Code', id: 'QRCODE', access: ['HL', 'CL', 'DP']},
    { name: 'Contact', id: 'CONTACT', access: ['SA', 'AD']},
    { name: 'Payment', id: 'PAYMENT', access: ['SA', 'AD']},
    { name: 'Profile', id: 'PROFILE', access: ['HL', 'CL', 'SA', 'AD', 'DP', 'MR', 'PT']},
]


export const SEO = {
         HOMEPAGE: {
           description: `At Doctortime, we are dedicated to simplifying the complex world of hospital management. Our software is designed to empower healthcare professionals and administrators by providing powerful tools to streamline operations, enhance patient care, and optimize administrative tasks.
                         With years of experience in the healthcare industry, we understand the unique challenges faced by hospitals, clinics and medical facilities. Our team of experts has worked diligently to create a comprehensive solution that addresses these challenges head-on.`,
           keyword: "doctortime, docotr time, timedoctor, time doctor",
         },
         GYNAECLOGIST: {
           description: `A medical specialty called gynecology focuses on issues related to women&amp;#39;s
                            health, such as the development, diagnosis, prevention, and treatment of
                            illnesses that are specific to the female reproductive system. Obstetrics is the
                            medical specialty that deals with caring for pregnant women and their unborn
                            children before, during, and after the birth (Cunningham et al., 2010).
                            Obstetrics and gynecology both focus on the health of the female
                            reproductive system. Over the course of their lives, women go through a
                            variety of reproductive development-related events, including menarche,
                            menstruation, pregnancy, maternity, and menopause.`,
           keyword: "gynaeclogist , doctortime, docotr time, timedoctor",
         },
         HOSPITALS: {
           description: `A hospital is a place of healthcare where patients can receive specialist
                        medical and nursing treatment as well as medicinal supplies. The most
                        popular type of hospital is a general hospital, which typically has an
                        emergency room to deal with urgent health issues including victims of fires
                        and accidents as well as medical emergencies. Hospitals have had to pay
                        more attention to this issue since the standard of Doctortime healthcare has
                        come under increased scrutiny globally.`,
           keyword: "hospitals , doctortime, docotr time, timedoctor",
         },
         CLINICS: {
           description: `a clinic is a formalized medical facility that provides outpatient diagnostic,
                            therapeutic, or preventive services. Frequently, the phrase refers to a whole
                            medical teaching facility, which includes the hospital and any outpatient
                            services. A clinic&amp;#39;s medical services might or might not be associated with a
                            hospital. The word &amp;quot;clinic&amp;quot; can refer to all of a general clinic&amp;#39;s operations or
                            just one specific area of expertise, such as the psychiatric, neurological, or
                            surgical clinics. When associated with a hospital, the total activity is often
                            referred to as the outpatient department, and the various subdivisions may be
                            called clinics.`,
           keyword: "clinics , doctortime, docotr time, timedoctor",
         },
         DOCTORS: {
           description: `In order to identify, manage, and treat illnesses and injuries, doctors consult
                        with patients and others who are caring for them. Of course, certain
                        responsibilities will differ based on the branch of medicine you plan to
                        practice, but many of the fundamental responsibilities are common to all
                        doctors.`,
           keyword: "doctors , doctortime, docotr time, timedoctor",
         },
         HOMEOPATHY: {
           description: `Homeopathy is generally based on two main principles: that a substance that causes symptoms in a healthy person can be used in diluted form to treat symptoms and illnesses, a principle known as “like-cures-like”`,
           keyword: "homeopathy, doctortime, docotr time, timedoctor",
         },
         RADIOLOGIST: {
           description: `Elevate your radiology services with top-notch expertise. Our board-certified radiologists deliver accurate diagnoses, using cutting-edge technology. We prioritize patient care, offering convenient appointments and rapid report turnaround times. Trust us for your medical imaging needs. Your health is our priority. Contact us today for comprehensive radiology solutions.`,
           keyword: "radiologist, xray, ct scan , doctortime, docotr time",
         },
         CONTACT: {
           description: `Fell free to contact us`,
           keyword: "contact, constacts us,doctortime, docotr time",
         },
       };