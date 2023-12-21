import { Link } from "react-router-dom"
import { DOCTOR_DEFAUL_IMG, LOGO, userRoutes } from "../constants/constant"
import { Logout, getFullPath, userInfo } from "../constants/utils"
import { Dropdown, Item } from "../components/common-components/Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faGear, faHeadset, faHomeAlt, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons"

export default () => {
    return(
        <header className="bg-primary p-2 sticky">
            <div className="d-flex justify-content-between align-items-center mx-3">
                <Link to={'/'} className="d-flex align-items-center" >
                    <div style={{ width: '30px', height: '30px' }}>
                        <img src={LOGO} width={'100%'} height={'100%'} alt="logo"/>
                    </div>
                    <h4 className="mx-2 text-light" >Doctor Time</h4>
                </Link>

                <Dropdown toggle={
                    <div className=" border rounded-circle "  style={{ width: '50px', height: '50px' }}>
                        <img className="rounded-circle" src={ userInfo?.photo ? getFullPath( userInfo.photo ) : DOCTOR_DEFAUL_IMG } alt="user-icon" width={'100%'} height={'100%'} />
                    </div>
                }>
                    <Item>
                        <Link to={`${userRoutes[userInfo?.userType]?.path}/setting` } state={{ settingTab: 'PROFILE' }}> 
                            <FontAwesomeIcon className="mx-2" icon={faUser} /> Profile
                        </Link>
                    </Item>
                    <Item>
                        <Link to={`${userRoutes[userInfo?.userType]?.path}/setting` }>
                            <FontAwesomeIcon className="mx-2" icon={faGear} /> Settings 
                        </Link>
                    </Item>
                    <Item>
                        <Link to={`${userRoutes[userInfo?.userType]?.path}/notification`}>
                            <FontAwesomeIcon className="mx-2" icon={faBell} /> Notifications
                        </Link>
                    </Item>
                    <Item>
                        <Link to={`${userRoutes[userInfo?.userType]?.path}/support`} >
                            <FontAwesomeIcon className="mx-2" icon={faHeadset} /> Support 
                        </Link>
                    </Item>
                    <Item onClick={() => Logout() }><FontAwesomeIcon className="mx-2" icon={faRightFromBracket} /> Logout </Item>
                </Dropdown>
            </div>
        </header>
    )
}