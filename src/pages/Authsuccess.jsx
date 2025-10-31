import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function AuthSuccess(){
    const nav = useNavigate();
    const {search} = useLocation();

    useEffect(()=>{
        const params = new URLSearchParams(search);
        const token = params.get("token");
        const name = params.get("name");
        const email = params.get("email");

        if(token){
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({name, email}));
            nav("/");
        }else{
            nav("/login");
        }
    },[search,nav]);

    return <p className="text-white text-center mt-20">Signing you in...</p>
}

export default AuthSuccess;