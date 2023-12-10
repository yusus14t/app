import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import phone from "../../assets.app/img/icons/icons8-phonecall-96.png";
import whatsapp from "../../assets.app/img/icons/icons8-whatsapp-96.png";
import email from "../../assets.app/img/icons/icons8-email-96.png";
import twitter from "../../assets.app/img/icons/icons8-twitter-100.png";
import location from "../../assets.app/img/icons/location.png";
import { axiosInstance, formatPhone, getAuthHeader } from "../../constants/utils";
import useToasty from "../../hooks/toasty";

const Contact = () => {
  const [ contact, setContact ] = useState({})
  const toasty = useToasty()
  const [ query, setQuery ] = useState({ name: null, mobile: null, topic: null, email: null, message: null })

  useEffect(() => { 
    getContact()
  }, [])

  const getContact = async () => {
    try{
      let {data} = await axiosInstance.get('/website/CONTACT_INFO')
      setContact(data?.contact?.data)
    } catch(error){ console.error(error) }
  }

  const saveContactQuery = async () => {
    try{
      await axiosInstance.post('/super-admin/website/CONTACT_QUERY', query, getAuthHeader())
      toasty.success('Message Sent.')
    } catch(error){ console.error(error) }
  }

  return (
    <div className="container ">
      <div className="box"></div>

      <h3 className="text-center">Get in Touch</h3>
      <div className="row ">
        <div className="col-sm-6 contact-box-right">
          <ul>
            <li className="mb-4">
              <div className="contact-list-item d-flex flex-row justify-content-around align-items-center">
                <div className="contact-icon-container contact-kk">
                  <img className="contact-icons" src={phone} alt="" />
                </div>
                <div className="contact-kk ">
                  <Link to={`tel:${contact.phone}`} className="href_location">
                    +91 {formatPhone(contact?.phone)} 
                  </Link>
                </div>
              </div>
            </li>
            <li className="mb-4">
              <div className="contact-list-item d-flex flex-row justify-content-around align-items-center">
                <div className="contact-icon-container contact-kk">
                  <img className="contact-icons" src={whatsapp} alt="" />
                </div>
                <div className="contact-kk">
                  <Link
                    target="_blank"
                    to={`https://wa.me/${contact.whatsapp}`}
                  >
                    +91 {formatPhone(contact.whatsapp)}
                  </Link>
                </div>
              </div>
            </li>
            <li className="mb-4">
              <div className="contact-list-item d-flex flex-row justify-content-around align-items-center">
                <div className="contact-icon-container contact-kk">
                  <img className="contact-icons " src={email} alt="" />
                </div>
                <div className="contact-kk">
                  <Link target="_blank" to={`mailto:${contact.email}`}>
                    {contact.email}
                  </Link>
                </div>
              </div>
            </li>
            <li className="mb-4">
              <div className="contact-list-item d-flex flex-row justify-content-around ml-5 align-items-center">
                <div className="contact-icon-container contact-kk">
                  <img src={twitter} className="contact-icons" alt="" />
                </div>
                <div className=" contact-kk">
                  <Link
                    target="_blank"
                    to={`https://twitter.com/${contact.twitter}`}
                  >
                    @{contact.twitter}
                  </Link>
                </div>
              </div>
            </li>
            <li className="mb-4">
              <div className="contact-list-item d-flex flex-row justify-content-around ml-5 align-items-center">
                <div className="contact-icon-container contact-kk">
                  <img src={location} className="contact-icons" alt="" />
                </div>
                <div className=" contact-kk">
                  <Link
                    target="_blank"
                    to={`https://twitter.com/${contact.twitter}`}
                  >
                    {/* {contact.twitter} */}
                    M/s Paai India 3/361, <br />
                    Aligarh-202002 (U.P), India
                    
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-sm-6 mt-4">
          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
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
          <div className="row mt-3">
            <div className="col-sm-6">
              <label htmlFor="">Topic</label>
              <input
                type="text"
                placeholder="Enter topic here"
                className="form-control"
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
          <div className="row p-3">
            <textarea
              name=""
              className="form-control"
              id=""
              cols="30"
              rows="10"
              placeholder="write your message here"
              onChange={(e) => setQuery({ ...query, message: e.target.value })}
            ></textarea>
          </div>
          <div className="row ">
            <div className="col-6">
              <button
                className=" btn-primary shadow-none btn mx-1"
                onClick={() => saveContactQuery()}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
