import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'

const NotFound = () => {
  return (
    <>
    <div style={{height:"50px"}}></div>
    <main className="body-content ms-error-404">
         <div className="ms-content-wrapper">
            <i className="flaticon-computer"></i>
            <h1>Oops! Page Not Found!</h1>
            <h3>Error 404</h3>
            <p>The link you followed may be broken, or the page has been removed</p>
            <a href="/" className="btn btn-white"> 
            {/* <i className="material-icons">arrow_back</i>  */}
           <FontAwesomeIcon icon={faArrowCircleLeft}/>
            Back Home</a>
         </div>
      </main>
    </>
  )
}

export default NotFound