import React, { useState } from 'react';
import { createContext } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect } from 'react';

export const authContext = createContext();

const AuthProvider = ({children}) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }
    
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('auth state changed', currentUser)
            setLoading(false);
        })
        return () =>{
            unSubscribe()
        }
    },[])
   
    const authInfo = {
        createUser,
        updateUserProfile,
        user
    };
    
    return (
        <div>
            <authContext.Provider value={authInfo}>
                {children}
            </authContext.Provider>
        </div>
    );
};

export default AuthProvider;