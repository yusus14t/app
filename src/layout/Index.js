import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from '../components/App/Layout/Navbar'
import { APP_MENU_ITEM } from "../constants/constant";

const Layout = () => {
    return (
        <body className="ms-body ms-primary-theme ms-logged-out">
            <main className="body-content">
                <Header />
                <div className='main-content'>
                    <div id="main-content" className="ml255 mt80 " style={{ width: '100%',  }}>
                       <Outlet /> 
                       <Navbar items={APP_MENU_ITEM.DASHBOARD} popItems={APP_MENU_ITEM.DASHBOARD_POPUP} source={'dashboard'} />
                    </div> 
                </div>
            </main>
        </body>
    )
}

export default Layout;