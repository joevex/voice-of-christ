import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

    apiKey: "AIzaSyB5956KuK4iERAwfCvEAgD6CpdpPHcyN-s",

    authDomain: "voice-of-christ-83299.firebaseapp.com",

    projectId: "voice-of-christ-83299",

    storageBucket: "voice-of-christ-83299.firebasestorage.app",

    messagingSenderId: "471933787511",

    appId: "1:471933787511:web:01f6519fc2483886a91572"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };