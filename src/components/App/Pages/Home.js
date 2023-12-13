import './Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import Homeimg1 from '../../../assets/images/1920x1280-1.jpg'
import Homeimg2 from '../../../assets/images/1920x1280-2.jpg'
import Homeimg3 from '../../../assets/images/1920x1280-3.jpg'
import Eraham from '../../../assets/images/Borcelle.png'
import SpecializationSlider from '../../sliders/SpecializationSlider';
import Container from '../Layout/Container';
import { Link } from 'react-router-dom';
import Slider from '../../sliders/Slider';
import DoctorCard from '../cards/DoctorCard';
import { axiosInstance, getAuthHeader } from '../../../constants/utils';
import { useEffect, useState } from 'react';

export default () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getAllDoctors();
    }, []);

    const getAllDoctors = async () => {
        try {
            let { data } = await axiosInstance.get("/all-doctors", { params: { source: "doctor-page" }, ...getAuthHeader() });
            setDoctors(data?.doctors);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Container>
            <section className='bg-light p-3 shadow sticky'>
                <div className=" shadow d-flex justify-content-between align-items-center my-1 bg-white curved " >
                    <div className="w-100" >
                        <input className=" curved border-0 search-input p-3 w-100 bg-white" type="text" placeholder="Search Doctors, Clinics & Hospitals" />
                    </div>
                    <FontAwesomeIcon className="mx-3" icon={faSearch} />
                </div>
            </section>
            <section>
                <Slider slides={[
                    <div className='w-100' style={{ height: '30vh' }}>
                        <img src={Homeimg1} width={'100%'} height={'100%'} />
                    </div>,

                    <div className='w-100' style={{ height: '30vh' }}>
                        <img src={Homeimg2} width={'100%'} height={'100%'} />
                    </div>,

                    <div className='w-100' style={{ height: '30vh' }}>
                        <img src={Homeimg3} width={'100%'} height={'100%'} />
                    </div>

                ]} />
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
                    <h4>Top Doctors</h4>
                    <Link to={'/doctors'} >
                        <span>View All <FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link >
                </div>
                <Slider slides={doctors.filter((d, i) => i <= 6).map(doctor => <DoctorCard doctor={doctor} />)} />
            </section>

            <section >
                <img src={Eraham} width={'100%'} height={'100%'} />
            </section>
        </Container>
    )
}