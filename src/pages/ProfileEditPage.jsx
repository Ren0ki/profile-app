import Wrapper from "../components/Wrapper";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileForm from "../components/ProfileForm";

const ProfileEditPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});

    useEffect(() => {

        fetch( `https://web.ics.purdue.edu/~glagman/profile-app/fetch-data-with-id.php?id=${id}`)

    
    .then((res) => res.json())
    .then((data) => {

        setProfile(data);

    });
    }, [id]);

    const handleDelete = () => {

        if (!window.confirm("Are you sure you want to delete your profile?")) {

            return;

        }

            fetch(
                `https://web.ics.purdue.edu/~glagman/profile-app/delete-profile.php?id=${id}`,
            {

                method: "DELETE",

            }
        ).then((data) => data.json())
        .then((data) => {

        if(data.error){
            alert(data.error);
        }else{

                alert("Profile Deleted");
                navigate("/");

            }
    });
};

    return(
        <Wrapper>
            <h1> Edit Profile </h1>
            <ProfileForm isEdit={true} currentProfile={profile} />
            <button onClick={handleDelete} style={{margin: "3rem auto 0", display: "block"}}> Delete Profile </button>

        </Wrapper>

    );

};

export default ProfileEditPage;