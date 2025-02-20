import ProfileForm from "../components/ProfileForm";
import Wrapper from "../components/Wrapper";

const AddProfilePage = () => {
  return (

      <Wrapper>
            <br /> <br /> <br />
            <h1> Thank you for visiting my site! </h1>
            <p>  If you would like to work together, please create a profile below so we can collaborate!</p>
            <br />
        <ProfileForm /> 
      </Wrapper>
     
    );
};

export default AddProfilePage;