import { Outlet } from "react-router-dom";
import Navbar from './Navbar'
import { APP_MENU_ITEM } from "../constants/constant";
// import AppHeader from "./AppHeader";

const Layout = () => {
    return (
        <body className="ms-body ms-primary-theme ms-logged-out">
            <main className="body-content">
                <div className='main-content w-100'>
                    {/* <AppHeader /> */}
                        <Outlet /> 
                    <Navbar items={APP_MENU_ITEM.DASHBOARD} popItems={APP_MENU_ITEM.DASHBOARD_POPUP} source={'dashboard'} />
                </div>
            </main>
        </body>
    )
}

export default Layout;