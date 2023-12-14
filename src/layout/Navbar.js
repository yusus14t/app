import React, { useState } from 'react'
import './Navbar.css'
import { NavLink, } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons'
import { userInfo } from '../constants/utils'
import OutsideWrapper from '../components/common-components/OutsideWrapper'
import { userRoutes } from '../constants/constant'

const Navbar = ({ items = [], popItems= [] , source }) => {
    const [isMenuActive, setIsMenuActive] = useState(false)
<<<<<<< HEAD
    const userPath = userRoutes[userInfo?.userType]?.path
=======
    const userPath = userRoutes[userInfo?.userType]?.path 
>>>>>>> 9c1f4862f71cafe084109c7575a5c045dea6db11

  return (
    <OutsideWrapper
      style={{ zIndex: "2", position: "relative" }}
      callback={() => setIsMenuActive(false)}
    >
      <div className="tabNav d-flex flex-column">
        {isMenuActive && (
          <div className="tab-popup ">
            {
                popItems.map( item => 
                    <NavLink className="pop-items " to={ userPath && source === 'dashboard' ? `${userPath}${item.path}` : item.path } onClick={() => setIsMenuActive(false)} >
                        <div className="menu-items">
                            <img className="imgh text-center" src={item.icon} />
                        </div>
                        <p className="mb-0 fs-12 text-center ">{ item.title }</p>
                    </NavLink>
                )
            }
          </div>
        )}
        <div className="d-flex ">


            { 
                items.map((item) => 
                    <NavLink to={userPath && source === 'dashboard' ? `${userPath}${item.path}` :  item.path} className={({ isActive }) => isActive ? "menu-active tab" : "tab" }  onClick={() => setIsMenuActive(false)} >
                        <div className="fs-5 text-center  ">{item.icon}  </div>
                        <p className="text-center mb-0 fs-12">{item.title}</p>
                        
                    </NavLink>
                )
            }

            <div onClick={() => setIsMenuActive(!isMenuActive)} className="tab">
                <div className="fs-5 text-center">
                <FontAwesomeIcon icon={isMenuActive ? faXmark : faBars} />
                </div>
                <p className="text-center mb-0 fs-12">Menu</p>
            </div>
        </div>
      </div>
    </OutsideWrapper>
  );
}



export default Navbar