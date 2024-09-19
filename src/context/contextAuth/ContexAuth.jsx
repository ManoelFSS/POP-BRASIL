import React, { createContext, useContext, useEffect, useState } from 'react'; // importando  o react context
import { getDocs, getFirestore, collection, addDoc } from "firebase/firestore"
import {getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../../serices/FirebaseConfig';


const AuthContext = createContext(); // criando o context
const provider = new GoogleAuthProvider();


export const AuthProvider = ({ children }) => { // exportando a funçao que farar o provider , passando como paramentro children


const db_app = getFirestore(app)
const userCollectionRef = collection(db_app, "Users")

const [User, setUser] = useState([])
const [auths, setAuth] = useState(JSON.parse(localStorage.getItem("User")))

// const [toogle, setToogle] = useState("-310px")

const getUsers = async () => {
    const response = await getDocs(userCollectionRef)
    const  result = response.docs.map((doc) => ({...doc.data(), id: doc.id}))
    setUser(result)
}

const signInGoogle = () => {
    getUsers();
    const auth = getAuth(app);

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;

            let checkedUser = false;

            User.forEach((e) => {
                if (e.email === user.providerData[0].email && e.token === user.providerData[0].uid) {
                    setAuth(e.adm);
                    localStorage.setItem("User", JSON.stringify(e.adm));
                    localStorage.setItem("photo", JSON.stringify(user.providerData[0].photoURL));
                    localStorage.setItem("UserName", JSON.stringify(user.providerData[0].displayName));
                    checkedUser = true;
                }
            });

            if (!checkedUser) {
                createUser(user.providerData[0]);
                setAuth(false);
                localStorage.setItem("User", JSON.stringify(false));
                localStorage.setItem("photo", JSON.stringify(user.providerData[0].photoURL));
                localStorage.setItem("UserName", JSON.stringify(user.providerData[0].displayName));
            }

            getUsers();
        })
        .catch((error) => {
            // Trate erros aqui
        });
};

async function createUser(user){
    
    await addDoc(userCollectionRef, {
        displayName:user.displayName,
        email:user.email,
        photo:user.photoURL,
        token:user.uid,
        adm: User === null ? true : false,
    })
    setAuth(User === null ? true : false)
    localStorage.setItem("User", JSON.stringify(User === null ? true : false))
    getUsers()
}

useEffect(()=>{
    getUsers()
},[])

    return ( // usando e retornando o Appcontext.provider e passando o children, passando valores como props  pelo value 
        <AuthContext.Provider value={{ 
            signInGoogle,
            auths
        }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuthContext = () => {
    return useContext(AuthContext);
};

