import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <body className="ms-body ms-primary-theme ms-logged-out">
            <main className="body-content">
                <Header />
                <div className='main-content'>
                    <div id="main-content" className="ml255 mt80 " style={{ width: '100%',  }}>
                       <Outlet /> 
                    </div> 
                </div>
            </main>
        </body>
    )
}

export default Layout;