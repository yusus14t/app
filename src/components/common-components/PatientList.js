import React from 'react';
// import PropTypes from 'prop-types';
import Profile from '../../assets.web/img/doctor-details/100x100.png'

PatientList.propTypes = {
    
};

function PatientList({ patients }) {
    return (
                patients?.map( (patient, key) => 
                    <div key={key} >
                        <div className="sigma_testimonial style-14">
                            <div className="sigma_testimonial-thumb">
                                <img src={Profile} alt="testimonial" />
                            </div>
                            <div className="sigma_testimonial-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-block d-sm-flex align-items-center">
                                        <div className="sigma_author-block">
                                            <h5>
                                                Carol Gray
                                            </h5>
                                        </div>
                                        {/* <div className="sigma_rating ms-sm-4 ms-0 mt-2 mt-sm-0">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="far fa-star"></i>
                                        <span className="ms-3">(4/5)</span>
                                        </div> */}
                                    </div>
                                    <span className="sigma_testimonial-date">07 March</span>
                                </div>
                                <p>"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."</p>
                            </div>
                        </div>
                    </div>
                )
    );
}

export default PatientList;