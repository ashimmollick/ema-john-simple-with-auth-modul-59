import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app from '../firebase/firebase.config';

export const AuthContext = createContext();

const auth = getAuth(app);
const UserContext = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        setLoading(true)
        return signOut(auth);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('current useer', currentUser);
            setuser(currentUser);
            setLoading(false)
        });
        return () => unSubscribe()
    }, [])
    const authInfo = { user, loading, createUser, signIn, logout }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;