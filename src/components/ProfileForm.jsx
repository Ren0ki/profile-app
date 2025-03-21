import {useState} from "react";
import style from "../styles/ProfileForm.module.css";

const ProfileForm = ({displayedProfile = {}}) => {

    const [data, setData] = useState({ name: "", email: "", title: "", bio: "", image: null});
    const [errors, setErrors] = useState({ image: "", general: ""});
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    /*const handleChange = (e) => {

        if(e.target.name === "image"){
            const file = e.target.files[0];
            if(file.size > 200000) {
                setErrors({...errors, image: "Image must be less than 2MB"});
            }else{
                setData({...data, image: file});
            }
            console.log(file);
            console.log(data.image);
            }else{
                setData({ ...data, [e.target.name]: e.target.value});
            }
        };

        const handleSubmit = async (e) => {

            e.preventDefault();
            setSubmitting(true);
            
            const formData = new FormData();
            formData.append("name", data.name.trim());
            formData.append("email", data.email.trim());
            formData.append("title", data.title.trim());
            formData.append("bio", data.bio.trim());
            //formData.append("id", displayedProfile.id || "") //update id and
            
            if(data.image) formData.append("image", data.image);
            console.log(data.image+"test");
            try{

                const response = await fetch("https://web.ics.purdue.edu/~glagman/profile-app/send-data.php",{
                    method: "POST",
                    body: formData,
                });
                const result = await response.json();

                if(result.success){
                   
                    setData({ name: "", title: "", email: "", bio: "", image: null});
                    setErrors({ image: "", general: ""});
                    setSuccessMessage("Data submitted successfully.");
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 1000);
               
                }else{
                    setErrors({image: "", general: result.message});
                    setSuccessMessage("");
                }


            }catch(error){
                setErrors({image: "", general: error.message});
            }finally{
                setSubmitting(false);
            }
        };*/

        return (
            
            <form onSubmit={handleSubmit} className={style["profile-form"]}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                    value={data.name}
                    onChange={handleChange}
                />

                 <input
                    type="text"
                    name="email"
                    placeholder= "Email"
                    required
                    value={data.email}
                    onChange={handleChange}
                />

                <input 
                    type="text"
                    name="title"
                    placeholder="Field of Work"
                    required
                    value={data.title}
                    onChange={handleChange}
                />

                <textarea 
                    name="bio"
                    placeholder="Share anything you would like us to know about your work!"
                    maxLength={200}
                    required
                    value={data.bio}
                    onChange={handleChange}
                ></textarea>

                <p className = "limit">{data.bio.length}/200</p>
                    <label htmlFor="image"> <p className="limit"> Choose a profile picture : </p></label>
                    <input type="file" id="image" name="image" accept="image/png, image/jpeg, image/jpg, image/gif " onChange={handleChange}/>
                    {errors.image && <p className={style[`error`]}>{errors.image}</p>}
                
                <button type="submit" disabled={
                    submitting || 
                    errors.image !== "" || 
                    data.name.trim() === "" || 
                    data.email.trim() === "" || 
                    data.title.trim() === "" || 
                    data.bio.trim() === null || 
                    data.image === ""
                }>Submit</button>
                
                {errors.general && <p className={style['error']}>{errors.general}</p>}
                {successMessage && <p className={style['success']}>{successMessage}</p>}
            </form>
        );
    };

export default ProfileForm;