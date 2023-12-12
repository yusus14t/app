import Clinics from "./Clinics";
import Hospitals from "./Hospital/Hospitals";
import Slider from "./Specializations/Slider";
import DoctorsList from "./doctor/Doctors";
import { getFullPath, getImages } from "../../constants/utils";
import { useEffect, useState } from "react";
import { WEBSITE_IMAGE } from "../../constants/constant";
import SpecializationSlider from "../sliders/SpecializationSlider";

function Home() {
  const [ images, setImages ] = useState([])

  useEffect(() => {
    initailizer()
  }, [])

  const initailizer = async () => {
    let imagesData = await getImages()
    setImages(imagesData.data.images)
  }

  const findImage = ( id ) => {
    return getFullPath(images.find( image => image.id === id )?.image)
  }

  return (
    <>
      <div className="box"></div>
      {/* hero section */}
      <div
        className=" hero-container"
        style={{
          background: `url(${findImage(WEBSITE_IMAGE.HOME_BANNER)})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container hero-content ">
          <div className="">
            <h1 style={{ fontWeight: "bolder" }}>
              Get Expert <span> </span>
              <span className="text-success">
                Medical <br /> Consultation
              </span>
            </h1>
            <h4 className="hjj">
              Our Partners provide best Medical Treament and advice
            </h4>
          </div>
        </div>
      </div>
      <div className="mobie">
        <Slider />
      </div>
        <div>
          <h1>new slider</h1>
          <SpecializationSlider/>
        </div>
      {/* <Clinics style={{ margin: "0" }} /> */}
      <div className="">
        <div className="">
          <DoctorsList source={"homepage"} />
        </div>

        <Clinics source={"homepage"} />

        <Hospitals source={"homepage"} />
      </div>

      <div className="container">
        <h3 className="text-center underline">
          <span className="under">Why Choose Us</span>
        </h3>
        <div className="row mt-2">
          <div className="col-sm-6">
            <div className="col-5 advantages d-flex align-items-center px-3">
              <h5 className=" mobi-txt align-middle">
                Doctortime is a patient's time saving platform .this is India’s
                first platform where the patient himself can see the live number
                at the doctor visit.
              </h5>
            </div>
            <div className="col-5 advantages d-flex align-items-center px-3">
              <h5 className="mobi-txt">
                Patient can avoid both crowd and infection at the doctor‘s place
              </h5>
            </div>
            <div className="col-5 advantages d-flex align-items-center px-3">
              <h5 className="mobi-txt">
                You can book your and your known one's Appointment from any
                where .
              </h5>
            </div>
            <div className="col-5 advantages d-flex align-items-center px-3">
              <h5 className="mobi-txt">
                You can get best doctor of your area’s in your budget.
              </h5>
            </div>
          </div>
          <div className="col-sm-6 advantages-side-img">
            <img
              src={findImage(WEBSITE_IMAGE.HOME_BOTTOM_BANNER)}
              alt=""
              className="rounded"
              style={{ height: "460px", width: "100%" }}
            />
          </div>
        </div>
      </div>

      {/* <Services /> */}

      {/* testimonials */}
    </>
  );
}

export default Home;
