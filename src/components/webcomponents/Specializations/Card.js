import { Link } from "react-router-dom";
import React from "react";

const Card = ({source, specializations}) => {
  
  
  return (
    <>
      {specializations
        .filter(
          (card, index) =>
            (source === "slider1" && index <= 3) ||
            (source === "slider2" && index >= 4 && index <= 7) ||
            (source === "slider3" && index >= 8 && index <= 11) ||
            (source === "slider4" && index >= 12 && index <=15) ||
            (source === "slider5" && index >= 16 && index <=19)
        )
        .map((specialisation) => {
          return (
            <Link to={`/specialization/${specialisation?.id}`}>
              <div className="specialization-card">
                <div className="">
                  <div className="spe-circle mx-auto ">
                    {/* <FontAwesomeIcon
                      style={{ fontSize: "50px", marginTop: "20%" }}
                      icon={faHeart}
                    /> */}
                    <img
                    className="specialZation-icon"
                      // style={{ width: "85px", height: "85px", borderRadius:"50%" }}
                      src={specialisation?.icon}
                      alt=""
                    />
                  </div>
                  <h2 className="sixe m-0">{specialisation?.name}</h2>
                  <p className="m-0">{specialisation?.nickname}</p>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default Card;
