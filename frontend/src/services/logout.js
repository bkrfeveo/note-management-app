import { useNavigate } from "react-router-dom";


const logoutService = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export default logoutService;