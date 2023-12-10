import React from "react";


const NoData = () => {
  return (
    <>
      <div style={{ height: "50px" }}></div>
      vh
      <div
        style={{ height: "59.6vh" }}
        className="ms-content-wrapper text-center"
      >
        <i className="flaticon-computer"></i>
        <h1 className="text-center">Data Not Found</h1>

        <a href="/" className="btn btn-white text-center">
          Back Home
        </a>
        
      </div>
    </>
  );
};

export default NoData;
