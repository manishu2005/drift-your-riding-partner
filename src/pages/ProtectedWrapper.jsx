import React,{useContext} from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const ProtectedWrapper = (children)=>{
    const token  = localStorage.getItem('token');
    const navigate = useNavigate();
    if(!token){
        navigate("/login");
    }
    return(
     <>
     {children}
     </>
    )
}

export default ProtectedWrapper;