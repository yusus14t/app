import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
    localStorage.clear();
    return(
        <Navigate to={'/login'} />
    )
}

export default Logout;