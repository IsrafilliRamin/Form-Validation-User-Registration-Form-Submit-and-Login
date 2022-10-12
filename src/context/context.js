import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [auth , setAuth] = useState({}); 
    const [show,setShow] = useState(false)
    return(
        <AuthContext.Provider value={{auth,setAuth,show,setShow}}>
            {children}
        </AuthContext.Provider>
    )


}

export default AuthContext;

