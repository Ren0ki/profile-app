import { useState } from "react";

function useProfileForm() {

    const [data, setData] = useState({ name: "", email: "", title: "", bio: "", image: null});
    const [errors, setErrors] = useState({ image: "", general: ""});
    const [setSubmitting] = useState(false);
    const [setSuccessMessage] = useState("");

    const handleChange = (e) => {

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
            
    return{
        data,
        errors,
        submitting, 
        successMessage, 
        handleChange,
        handleSubmit
        };
    }

}

export default useProfileForm;