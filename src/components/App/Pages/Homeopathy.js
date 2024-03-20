import { useEffect, useState } from "react";
import { axiosInstance, getAuthHeader, getFullPath, getImages } from "../../../constants/utils";
import Container from "../../../layout/Container";
import Homeopathy from '../../../assets/img/logo/homeopathy.jpg';
import { WEBSITE_IMAGE } from "../../../constants/constant";
import DoctorCard from "../cards/DoctorCard";
import ClinicCard from "../cards/ClinicCard";


export default () => {
    const [clinics, setClinics] = useState([]);
    const [images, setImages] = useState([])
    const [doctors, setDoctors] = useState([]);


    useEffect(() => {
        initailizer()
        getClinics();
        getDoctors();
    }, []);



    const initailizer = async () => {
        let imagesData = await getImages()
        setImages(imagesData.data.images)
    }

    const findImage = (id) => {
        return getFullPath(images.find(image => image.id === id)?.image)
    }

    const getClinics = async () => {
        try {
            let { data } = await axiosInstance.get("/all-clinics", { params: { filter: { specialization: 'Homeopathy' } }, ...getAuthHeader() });
            setClinics(data?.clinics);
        } catch (error) {
            console.error(error);
        }
    };

    const getDoctors = async () => {
        try {
          let { data } = await axiosInstance.get("/all-doctors", {  params: { filter: { specialization: 'Homeopathy' }, source: "doctor-page" }, ...getAuthHeader() });
          setDoctors(data?.doctors?.slice(0, 6));

        } catch (error) {  console.error(error) }
      };


    return (
        <Container>
            <section className="banner-height">
                <img src={ Homeopathy } className="w-100 h-100" />
            </section>

            <section className="my-3">
                <h4 className="bg-light p-2 text-muted mx-2">Doctors</h4>
                <div className="my-3">
                    {
                        doctors?.length > 0 
                            ? doctors.map(( doctor, key ) => <DoctorCard doctor={doctor} key={key} /> )
                            : <div><h6 className="text-muted text-center">No Doctors</h6></div>
                    }
                </div>
            </section>

            <section className="my-3">
                <h4 className="bg-light p-2 text-muted mx-2 mm">Clinics</h4>
                <div className="my-3">
                    {
                        clinics?.length > 0 
                            ? clinics.map(( clinic, key ) => <ClinicCard clinic={clinic} key={key} /> )
                            : <div><h6 className="text-muted text-center">No Clinics</h6></div>
                    }
                </div>
            </section>
        </Container>
    )
}