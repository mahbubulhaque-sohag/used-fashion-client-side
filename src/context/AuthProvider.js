import React, { useState } from 'react';
import { createContext } from 'react';
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect } from 'react';

export const authContext = createContext();

const AuthProvider = ({children}) => {

    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();

    const googleLogin = () =>{
        // setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }


    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    const logout = () =>{
        return signOut(auth)
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
        login,
        googleLogin,
        logout,
        user,
        loading,
        setLoading
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