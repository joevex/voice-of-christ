    import { auth, db } from "./firebase-config.js";

    import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signOut

    } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

    import {

    doc,

    setDoc,

    getDoc

    } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


    // REGISTER

    export async function registerChurch(
churchName,
pastorName,
email,
password
){

    

    const userCredential=

    await createUserWithEmailAndPassword(

    auth,

    email,

    password

    );

    await setDoc(

    doc(db,"churches",userCredential.user.uid),

    {

    churchName,

    pastorName,

    email

    }

    );

    }



    // LOGIN

   export async function loginChurch(
email,
password
){

return await signInWithEmailAndPassword(
auth,
email,
password
);

}
    // GET DATA

    export async function getChurch(uid){

    const snap=

    await getDoc(doc(db,"churches",uid));

    if(snap.exists()){

    return snap.data();

    }

    return null;

    }



    // LOGOUT

    export async function logoutChurch(){

    await signOut(auth);

    }