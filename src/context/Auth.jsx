import React, { useContext, useState, useEffect } from "react"
import axios from 'axios';




const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
  }

  const Authprovider=({children})=>{
    const [user, Setuser]=useState()
    const [token, setToken]=useState(null)



    const Login=(user, token)=>{
        Setuser(user)
        setToken(token)
        localStorage.setItem('token',token)
    }
    const Logout=()=>{
        Setuser(null)
        setToken(null)
    }
    
    return (
        <AuthContext.Provider
          value={{
            user,
            updateUser: e => Setuser(e),
            Login,
            token,
            Logout,

          }}
        >
          {children}
        </AuthContext.Provider>
      )

  }


  export default Authprovider