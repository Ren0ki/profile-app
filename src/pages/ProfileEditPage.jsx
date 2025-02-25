import Wrapper from "../components/Wrapper";
import { useParams, useNavigate } from "react-router-dom";


const ProfileEditPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = () => {

        if (window.confirm("Are you sure you want to delete your profile?")) {

            return;

        }

            fetch(
                `https://web.ics.purdue.edu/~glagman/profile-app/delete-profile.php?id=${id}`,
            {

                method: "POST",
                credentials: "include",
            }
        ).then((rep) => rep.json())
        .then((data) => {

            if(data.message === "success"){

                alert("Profile Deleted");
                navigate("/");

            }else{


                alert("Failed to delete profile");

            }

        

    });

};


    return(

        <Wrapper>

            <button onClick={handleDelete}> Delete Profile </button>

        </Wrapper>

    );

};

export default ProfileEditPage;