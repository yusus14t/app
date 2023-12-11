import React from 'react';
import PropTypes from 'prop-types';


Banner.propTypes = {
    title: PropTypes.string.isRequired,
};

function Banner({ title }) {
    return (
        <div className="sigma_subheader style-5 bg-gray">
                <div className="container">
                <div className="sigma_subheader-inner">
                    <h1>{title}</h1>
                </div>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                    <a className="btn-link" href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">Doctor Details</li>
                </ol>
                </div>

                {/* <img src={SubHeader1} className="br" alt="subheader" />
                <img src={SubHeader2} className="bl" alt="subheader" />
                <img src={SubHeader3} className="tr" alt="subheader" /> */}

            </div>
    );
}

export default Banner;