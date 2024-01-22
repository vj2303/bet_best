import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from "react";


export const UserContext = createContext(null)


const UserState = (props) => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        // console.log({user});
        // if (user.user) {
          
          if(!localStorage.getItem("token")){
            // navigate("/")
          }else {
            try {
              const getUser = async() => {
                const res = await axios({
                    method : "get",
                    url : "http://localhost:5000/api/user/getUser",
                    headers : {
                        authToken : localStorage.getItem("token")
                    }
                })
                setUser(res.data.User)
                console.log(res.data);
            }
            getUser()
            } catch (error) {
              alert(error.message)
            }
            
          
          }
      }, [])

  return (
    <UserContext.Provider value={{user}}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState