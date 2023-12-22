import Header from "../component/Header";
import ProfileData from "../component/pers_data";
import Footer from "../component/footer";
import {useEffect} from "react"
import { useNavigate } from "react-router-dom";
const Profile = ()=>{
    const navigate = useNavigate()
    useEffect(()=> {
        if (!localStorage.getItem("token")) {
            navigate('/login')
        }
    })
    return(
        <div>
            <Header/>
            <ProfileData/>
           <Footer/>
        </div>
    );
};
export default Profile;