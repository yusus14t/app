import React from 'react';

import PropTypes from 'prop-types';


Banner2.propTypes = {
    title: PropTypes.string.isRequired,
};

function Banner2({ title }) {
    return (
        <div className="sigma_subheader2 style-5 bg-gray">
                <div className="container">
                <div className="sigma_subheader-inner">
                    <h1 className='b2Heading'>{title}</h1>
                </div>
                
                </div>

                {/* <img src={Banner_ing} className="br" alt="subheader" /> */}
                

            </div>
    );
}

export default Banner2;