import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import phone from "../../assets/img/icons/icons8-phonecall-96.png";
import whatsapp from "../../assets/img/icons/icons8-whatsapp-96.png";
import email from "../../assets/img/icons/icons8-email-96.png";
import twitter from "../../assets/img/icons/icons8-twitter-100.png";
import location from "../../assets/img/icons/location.png";
import {
  axiosInstance,
  formatPhone,
  getAuthHeader,
} from "../../constants/utils";
import useToasty from "../../hooks/toasty";
import Container from "../../layout/Container";

const Contact = () => {
  const [contact, setContact] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const toasty = useToasty();
  const [query, setQuery] = useState({
    name: null,
    mobile: null,
    topic: null,
    email: null,
    message: null,
  });

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    try {
      let { data } = await axiosInstance.get("/website/CONTACT_INFO");
      setContact(data?.contact?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveContactQuery = async () => {
    try {
      await axiosInstance.post(
        "/super-admin/website/CONTACT_QUERY",
        query,
        getAuthHeader()
      );
      toasty.success("Message Sent.");
    } catch (error) {
      console.error(error);
    }
  };
  const handleTabClick = (index) => {
    setActiveTab(index);
  };


  return (
    <Container className="bg-dark text-light ">
     
      <div className="w-100 d-flex justify-content-center ">
        <div className="w-75 bg-light shadow-light rounded my-4">
          {" "}
          <h3 className="text-center  text-dark py-1 ">Get in Touch</h3>
        </div>
      </div>
      <section className="waiting-section  mt-1 pt-0 py-3">
              <div style={{backgroundColor:"rgb(173 172 183)"}} className="d-flex mt-3  p-2 rounded text-light">
                <h6
                  onClick={() => handleTabClick(0)}
                  className={
                    "w-50 text-center py-2 mb-0 curved text-dark " +
                    (activeTab === 0 && "waiting-list-active text-dark")
                  }
                >
                  Contact
                </h6>
                <h6
                  onClick={() => handleTabClick(1)}
                  className={
                    "w-50 text-center text-dark py-2 mb-0 curved " +
                    (activeTab === 1 && "waiting-list-active text-dark")
                  }
                >
                  Social Media
                </h6>
              </div>
      </section>
      {activeTab === 0 && (
        <>
        <div className="row mx-0   ">
        <div className="row mx-0">
          <div className="col">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control mb-2"
              onChange={(e) => setQuery({ ...query, name: e.target.value })}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="">Mobile Number</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              className="form-control"
              maxLength={10}
              onChange={(e) => setQuery({ ...query, mobile: e.target.value })}
            />
          </div>
        </div>
        <div className="row mt-3 mx-0">
          <div className="col-sm-6">
            <label htmlFor="">Subject</label>
            <input
              type="text"
              placeholder="Enter topic here"
              className="form-control mb-2"
              onChange={(e) => setQuery({ ...query, topic: e.target.value })}
            />
          </div>
          <div className="col-sm-6">
            <label htmlFor="">Email Address (optional)</label>
            <input
              type="text"
              placeholder="Enter Email address "
              className="form-control"
              onChange={(e) => setQuery({ ...query, email: e.target.value })}
            />
          </div>
        </div>
        <div className="row p-4 mx-0">
          <textarea
            name=""
            className="form-control  w-100"
            id=""
            placeholder="write your message here"
            onChange={(e) => setQuery({ ...query, message: e.target.value })}
          ></textarea>
        </div>
        <div className="row justify-content-center mb-4 mx-0 ">
          <div className="col-6 w-100">
            <button
              className=" w-100 btn-light shadow-none btn mx-1"
              onClick={() => saveContactQuery()}
            >
              Send Message
            </button>
          </div>
          <div className="row justify-content-center text-center">
            <strong>or</strong>
            <div style={{maxWidth:"300px", minWidth:"280px"}} className="my-2">
                  <div className="contact-list-item d-flex flex-row justify-content-around align-items-center">
                    <div className="contact-icon-container contact-kk">
                      <img className="contact-icons" src={phone} alt="" />
                    </div>
                    <div className="contact-kk ">
                      <a className="href_location" href="tel:9528820782">
                        +91 952 - 882 - 0782&nbsp;
                      </a>
                    </div>
                  </div>
                
            </div>
          </div>
        </div>
      </div>
        </>
      )}

      {activeTab === 1 && (
        <>
       <div className="d-flex justify-content-center">
       <>
       <ul style={{height:"70dvh", minWidth:"280px", maxWidth:"300px"}}>
        <li  className="mb-4">
                  <div   className="contact-list-item d-flex flex-row justify-content-around align-items-center">
                    <div style={{maxWidth:"300px"}} className="contact-icon-container contact-kk">
                      <img className="contact-icons" src={whatsapp} alt="" />
                    </div>
                    <div className="contact-kk">
                      <a href="https://wa.me/9528820782" target="_blank">
                        +91 {contact?.phone}
                      </a>
                    </div>
                  </div>
                </li>
                <li className="mb-4">
                  <div className="contact-list-item d-flex flex-row justify-content-around align-items-center">
                    <div className="contact-icon-container contact-kk">
                      <img className="contact-icons " src={email} alt="" />
                    </div>
                    <div className="contact-kk">
                      <a href="mailto:contact@doctortime.in" target="_blank">
                        {contact?.email}
                      </a>
                    </div>
                  </div>
                </li>
                <li className="mb-4">
                  <div className="contact-list-item w d-flex flex-row justify-content-around ml-5 align-items-center">
                    <div className="contact-icon-container contact-kk">
                      <img className="contact-icons" src={twitter} alt="" />
                    </div>
                    <div className=" contact-kk">
                      <a href="https://twitter.com/Doctortime_" target="_blank">
                        @{contact?.twitter}
                      </a>
                    </div>
                  </div>
                </li>
                <li className="mb-4">
                  <div className="contact-list-item d-flex flex-row justify-content-around ml-5 align-items-center">
                    <div className="contact-icon-container contact-kk">
                      <img
                        src={location}
                        className="contact-icons"
                        alt=""
                      />
                    </div>
                    <div className=" contact-kk text-dark">
                        M/s Paai India 3/361, <br />
                        Aligarh-202002 (U.P), India
                    </div>
                  </div>
                </li>
        </ul></>
       </div>
        </>
      ) }
      
    </Container>
  );
};

export default Contact;
