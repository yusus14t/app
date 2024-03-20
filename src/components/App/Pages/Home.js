import './Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import Homeimg1 from '../../../assets/images/1920x1280-1.jpg'
import Homeimg2 from '../../../assets/images/1920x1280-2.jpg'
import Homeimg3 from '../../../assets/images/1920x1280-3.jpg'
import Eraham from '../../../assets/images/Borcelle.png'
import FeaturesImg from '../../../assets/images/features.png'
import JNMC from '../../../assets/images/promo/JNMC Aligarh.png'
import SpecializationSlider from '../../sliders/SpecializationSlider';
import { Link, useNavigate } from 'react-router-dom';
import Slider from '../../sliders/Slider';
import DoctorCard from '../cards/DoctorCard';
import { axiosInstance, getAuthHeader, getFullPath } from '../../../constants/utils';
import { useEffect, useState } from 'react';
import ClinicCard from '../cards/ClinicCard';
import { HOSPITAL_DEFAUL_IMG } from '../../../constants/constant';
import HospitaCard from '../cards/HospitaCard';
import Container from '../../../layout/Container';

export default () => {
    const [doctors, setDoctors] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [promo, setPromo] = useState({});
    const navigate = useNavigate()
    const isTab = window.screen.availWidth > 600

    useEffect(() => {
        getAllDoctors();
        getAllClinics();
        getHospitals();
    }, []);

    const getAllDoctors = async () => {
        try {
            let { data } = await axiosInstance.get("/all-doctors", { params: { source: "doctor-page" }, ...getAuthHeader() });
            setDoctors(data?.doctors);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllClinics = async () => {
        try {
            let { data } = await axiosInstance.get("/all-clinics", { params: { isClinic: true } });
            setClinics(data?.clinics);
        } catch (error) {
            console.error(error);
        }
    };



    const getHospitals = async () => {
        try {
        let { data } = await axiosInstance.get("/hospitals");
        setHospitals(data?.organization);
        setPromo(data?.organization?.find( hos => hos._id === '654bc57f7879a9d12e8d990b' ) || {})
        } catch (error) {
        console.error(error);
        }
    };



    return (
        <Container>
            <section className='bg-light p-2 shadow sticky'>
                <div className=" shadow d-flex justify-content-between align-items-center my-1 bg-white curved " >
                    <div className="w-100" >
                        <input className=" curved border-0 search-input p-3 w-100 bg-white" type="text" placeholder="Search Doctors, Clinics & Hospitals" onClick={() => navigate('/search')}  />
                    </div>
                    <FontAwesomeIcon className="mx-3" icon={faSearch} />
                </div>
            </section>
            <section>
                <Slider slides={[
                    <div className='w-100 banner-height'>
                        <img src={Homeimg1} width={'100%'} height={'100%'} alt='home-slider' />
                    </div>,

                    <div className='w-100 banner-height'>
                        <img src={Homeimg2} width={'100%'} height={'100%'} alt='home-slider' />
                    </div>,

                    <div className='w-100 banner-height'>
                        <img src={Homeimg3} width={'100%'} height={'100%'} alt='home-slider' />
                    </div>

                ]}  />
            </section>

            <section className='my-4 mx-2'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>Specializations</h4>
                    <Link to={'/allspecialization'} >
                        <span>View All <FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link >
                </div>
                <SpecializationSlider />
            </section>

            <section className='px-2 my-4 py-3 doctor-gradient' >
                <div className='d-flex justify-content-between align-items-center'>
                    <h4> Doctors</h4>
                    <Link to={'/doctors'} >
                        <span>View All <FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link >
                </div>
                <Slider view={isTab ? 2 : 1}  slides={doctors.filter((d, i) => i <= 6).map(doctor => <DoctorCard className={'a'} doctor={doctor} />)} />
            </section>

            {/* <section className='my-4' >
                <img src={Eraham} width={'100%'} height={'100%'} alt='section-image' />
            </section> */}

            <section className='px-2 my-4 py-3 clinic-gradient' >
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>Clinics</h4>
                    <Link to={'/clinics'} >
                        <span>View All <FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link >
                </div>
                <Slider view={isTab ? 2 : 1}  slides={clinics.filter((d, i) => i <= 6).map(( clinic, key ) => <ClinicCard className={'a'} clinic={clinic} key={key}/> )} />
            </section>

            {/* JNMC ALIGARH */}
            {promo._id && <section>
                {/* <div className=''>
                    <img src={JNMC} width={'100%'} height={'100%'} alt='promo-image' />
                </div> */}
                <div className='promo-card p-3'>
                    <div className='d-flex justify-content-start py-3'>
                        <div className='promo-card-img me-3 '>
                            <img src={promo?.photo ? getFullPath(promo.photo) : HOSPITAL_DEFAUL_IMG} className='curved image-cover' width={'100%'} height={'100%'} alt='promo-img' />
                        </div>
                        <div>
                            <h5>{promo?.name}</h5>
                            <p className='text-light'>{ promo.address }</p>
                            <div className='my-2'>
                                <Link to={`/hospital-detail/${ promo._id }`} className='btn bg-warning curved px-3 py-1 shadow-none '>Book Appointment</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>}

            <section className='px-2 my-4 py-3 hospital-gradient' >
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>Hospitals</h4>
                    <Link to={'/private-hospitals'} >
                        <span>View All <FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link >
                </div>
                <Slider  view={isTab ? 2 : 1} slides={hospitals.filter((d, i) => i <= 6).map(( hospital, key ) => <HospitaCard className={'a'} hospital={hospital} key={key}/> )} />
            </section>

            <section className='my-4' >
                <img src={FeaturesImg} width={'100%'} height={'100%'} alt='features' />
            </section>

        </Container>
    )
}