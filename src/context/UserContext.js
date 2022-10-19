import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,} from 'firebase/auth'
import app from '../firebase/firebase.config';




export const AuthContext = createContext()

const auth = getAuth(app)

const UserContext = ({children}) => {

    const [user , setUser] = useState(null)
    
   

    const createUser = (email,password) =>{        
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut =()=>{
        setUser(null)
        return signOut(auth)
    }

    useEffect(()=>{
        const unsSubscribe = onAuthStateChanged(auth, currentUser =>{
            if(currentUser){
                setUser(currentUser)
            }
            else{
                return
            }
            return ()=> unsSubscribe()
        })
    },[])


    const authInfo = {user,createUser,signIn,logOut}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};



export default UserContext;