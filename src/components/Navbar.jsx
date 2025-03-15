import styles from "../styles/navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import ModeContext from "../contexts/ModeContext";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {

    const {mode, handleModeChange} = useContext(ModeContext);
    const {isLogin, logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick = () => {

        logout();
        navigate("/login");

    }

    return (

        <nav className={`${styles["navbar"]}`}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/add-profile">Collaborate</Link></li>
            </ul>
            {isLogin? 
                
                <button onClick={handleClick} style={{marginLeft: "10px"}}>Logout</button> : 
                <ul>
                    <li><Link to="/login">Login</Link></li>
                </ul>
           
            }
            <button onClick={handleModeChange}>
                {mode === "light" ? "Light Mode" : "Dark Mode"}
            </button>
        </nav>
    );
};

export default Navbar;