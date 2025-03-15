import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import {Link} from "react-router-dom";
import '../styles/profileForm.module.css';

const RegisterPage = () =>
{
        return(
            <Wrapper>
                <br /><br /> <br />
                <h1> Register </h1>
                <br /> <br />
                <AuthForm isRegister = {true} />
                <Link to="/login" className = "already"> Already have an account? Log in here! </Link>
            </Wrapper>
        );
}

export default RegisterPage;