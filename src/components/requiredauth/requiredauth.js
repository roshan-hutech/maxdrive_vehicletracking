import React from "react";
import { useAuth } from "../../context/Auth";
import { Navigate } from "react-router-dom";

const RequiredAUth=({children})=>{
const auth= useAuth()
console.log(auth?.token)
// const navigate= useNavigate()

if(!localStorage.getItem('token')){
  return  <Navigate to='/' />
}
return children
}

export default RequiredAUth