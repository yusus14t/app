import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import img from "../../assets.app/img/doctors-list/182x280-2.jpg";
const Testamonilas = () => {
  return (
    <>
      <Carousel
        dynamicHeight={true}
        autoPlay={true}
        showThumbs={false}
        infiniteLoop={true}
        showStatus={false}
        onChange={true}
        interval={50}
      >
        <div className="slide">
          <div className="testamonial row">
            <div className="col-sm-4">
              <img className="testamonial-img" src={img} alt="" />
            </div>
            <div className="col-sm-8">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
              nostrum eius quibusdam illo assumenda veniam ullam facere, laborum
              perferendis at fugiat aut! Excepturi porro nostrum, provident
              repudiandae corrupti quidem harum reprehenderit corporis fugiat et
              saepe? Suscipit atque saepe eius omnis numquam. Labore optio
              necessitatibus provident, omnis autem quam neque eius praesentium
              rerum. Ipsa obcaecati adipisci illum illo? Dolores, nisi velit
              illum odio fugiat minus saepe tempora minima, voluptatibus ab
              voluptates nulla alias quidem error hic expedita dolor dicta
              obcaecati et perspiciatis eius, optio delectus? Neque ut fuga
              laborum non dolore iste! Eius nihil dolorem maiores ipsam unde,
              illo vero iure blanditiis tempora magnam exercitationem odio
              eligendi harum doloremque cum sit ea iste dicta. Omnis veniam
              eveniet delectus perspiciatis minima culpa consectetur alias!
              Eveniet modi aliquam qui deserunt soluta ullam in ipsum culpa
              tempore suscipit atque voluptas deleniti quas, repellat at?
              Numquam, facere consectetur! At, nostrum distinctio, voluptatibus
              vero sapiente expedita deserunt aut nobis quisquam autem quos,
              assumenda minus fugiat necessitatibus a esse voluptates voluptate
              adipisci laudantium consectetur dignissimos praesentium in.
              Aliquid nulla ullam ad velit assumenda obcaecati minus dolores
              sequi asperiores soluta laudantium culpa doloremque quo nobis
              cumque reprehenderit, ratione sit. Vel blanditiis nisi quidem unde
              harum, eligendi minima itaque.
            </div>
          </div>
        </div>
        {/* <div className="slide"></div>
        <div className="slide"></div>
        <div className="slide"></div> */}
      </Carousel>
    </>
  );
};

export default Testamonilas;
