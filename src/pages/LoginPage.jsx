import Wrapper from "../components/Wrapper";
import AuthForm from "../components/AuthForm";
import {Link} from "react-router-dom";
import '../styles/profileForm.module.css';

const LoginPage = () =>
{
        return(
            <Wrapper>
                <br /> <br/><br/>
                <h1> Log In </h1>
                <p> Please log in to collaborate! </p>
                <AuthForm isRegister = {false} />
                <Link to="/register" className="already"> Don't have an account? Register here! </Link>
            </Wrapper>
        );
}

export default LoginPage;