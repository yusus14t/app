import Clinics from "./Clinics";
import Hospitals from "./Hospital/Hospitals";
import Slider from "./Specializations/Slider";
import DoctorsList from "./doctor/Doctors";
import { getFullPath, getImages } from "../../constants/utils";
import { useEffect, useState } from "react";
import { WEBSITE_IMAGE } from "../../constants/constant";
import SpecializationSlider from "../sliders/SpecializationSlider";
import Container from "../App/Layout/Container";

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
    <Container>

  
      <div className="box"> <h1>hosptal</h1></div>
      {/* hero section */}
      {/* <div
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
      </div> */}
      {/* <div className="mobie">
        <Slider />
      </div> */}

      
        
          <SpecializationSlider/>
      <div className="">
        <div className="">
          <DoctorsList source={"homepage"} />
        </div>
      <section>
        <Clinics source={"homepage"} />
      </section>

        <Hospitals source={"homepage"} />
      </div>

      

      {/* <Services /> */}

      {/* testimonials */}
    </Container>
  );
}

export default Home;
