import React, { useState } from 'react'
import './tabs.css'
import { NavLink, Link } from 'react-router-dom'
import { APP_MENU_ITEM } from '../../constants/constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faXmark } from '@fortawesome/free-solid-svg-icons'

import doctors from "../../assets.app/menuIcons/doctor.png"
import hospital from "../../assets.app/menuIcons/hospital.png"
import clinic from "../../assets.app/menuIcons/clinic.png"
import radiologist from "../../assets.app/menuIcons/ultrasound.jpg"
import gynae from "../../assets.app/menuIcons/gynae.png"
import homeo from "../../assets.app/menuIcons/homeo.jpeg"
import contact from "../../assets.app/menuIcons/contact.png"
import OutsideWrapper from '../common-components/OutsideWrapper'




const App_menu_item = ({ item = {}, ...props }) =>
        <NavLink to={item.path} className={({ isActive }) =>  isActive ? "menu-active tab" : 'tab'} {...props}>
            <div className='fs-5 text-center'>
                { item.icon }
            </div>
            <p className='text-center mb-0 fs-12'>{ item.title }</p>
        </NavLink>
 
const Tabs = () => {
    const [isMenuActive, setIsMenuActive] = useState(false)

  return (
    <OutsideWrapper callback={() => setIsMenuActive(false)}>
        <div className='tabNav d-flex flex-column'>
        {isMenuActive &&<div className='tab-popup '>
            {/* doctors */} 
                    <NavLink className='pop-items ' to={'/doctors'} onClick={()=> setIsMenuActive(false)}>
                {/* <div className='pop-items'> */}
                        <div className='menu-items  '>
                        <img className='imgh text-center' src={doctors}/>
                        </div>
                        <p className='mb-0 fs-12 text-center '>Doctors</p>

                {/* </div> */}
                    </NavLink>
            {/* Pvt. Hospitals */}
                <NavLink className='pop-items' to={'/govt-hospitals'} onClick={()=> setIsMenuActive(false)}>
                        <div className='menu-items  '>
                        <img className='imgh text-center' src={hospital}/>
                        </div>
                        <p className='mb-0 fs-12 text-center '>Pvt. Hospitals</p>

                </NavLink>
            {/* Govt. Hospitals */}
                <NavLink  to={'/pvt-hospitals'} className='pop-items' onClick={()=> setIsMenuActive(false)}>
                        <div className='menu-items  '>
                        <img className='imgh text-center' src={hospital}/>
                        </div>
                        <p className='mb-0 fs-12 text-center '>Govt. Hospitals</p>

                </NavLink>
            {/* Clinics */}
                <NavLink to={'/clinics'} className='pop-items' onClick={()=> setIsMenuActive(false)}>
                        <div className='menu-items  '>
                        <img className='imgh text-center' src={clinic
                        }/>
                        </div>
                        <p className='mb-0 fs-12 text-center '>Clinics</p>

                </NavLink>
            {/* Gynaeclogist */}
                <NavLink to={'/gynae'} className='pop-items' onClick={()=> setIsMenuActive(false)}>
                        <div className='menu-items  '>
                        <img className='imgh text-center' src={gynae}/>
                        </div>
                        <p className='mb-0 fs-12 text-center '>Gynaeclogist</p>

                </NavLink>
            {/* Radiologist */}
                <NavLink to={'/radiologist'} className='pop-items' onClick={()=> setIsMenuActive(false)}>
                        <div className='menu-items  '>
                        <img className='imgh text-center' src={radiologist}/>
                        </div>
                        <p className='mb-0 fs-12 text-center '>Radiologist</p>

                </NavLink>
            {/* Homeopathy */}
                <NavLink to={'/homeopathy'} className='pop-items' onClick={()=> setIsMenuActive(false)}>
                        <div className='menu-items  '>
                        <img className='imgh text-center' src={homeo}/>
                        </div>
                        <p className='mb-0 fs-12 text-center '>Homeopathy</p>

                </NavLink>
            {/* contact us */}
                <NavLink to={'/contact'} className='pop-items' onClick={()=> setIsMenuActive(false)}>
                        <div className='menu-items  '>
                        <img className='imgh text-center' src={contact}/>
                        </div>
                        <p className='mb-0 fs-12 text-center '>Contact</p>

                </NavLink>

            {/* </div> */}
            {/* hclinic */}
            
        </div>}
        <div className='d-flex '>
            { 
                APP_MENU_ITEM.APP.map( item => <App_menu_item item={item} onClick={() => setIsMenuActive(false)} /> )
            }
            <div onClick={()=>setIsMenuActive(!isMenuActive)} className='tab'>
                <div className='fs-5 text-center'>
                <FontAwesomeIcon icon={isMenuActive ? faXmark : faBars} />
                </div>
                <p className='text-center mb-0 fs-12' >Menu</p>
            </div>
        </div>
        </div>
    </OutsideWrapper>
  )
}



export default Tabs