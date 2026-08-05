import { auth, db } from "./firebase-config.js";

import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form = document.getElementById("forgotForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

   const email =
document.getElementById("email").value.trim();

    const churchName = document
        .getElementById("churchName")
        .value
        .trim()
        .toLowerCase();

    const pastorName = document
        .getElementById("pastorName")
        .value
        .trim()
        .toLowerCase();

    try {

        const q = query(
            collection(db, "churches"),
            where("email","==",email)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {

            alert("Username not found.");
            return;

        }

        const data = querySnapshot.docs[0].data();

        if (
            data.churchName.toLowerCase() !== churchName ||
            data.pastorName.toLowerCase() !== pastorName
        ) {

            alert("Church Name or Pastor Name does not match.");
            return;

        }

        await sendPasswordResetEmail(auth,email);

        alert("Password reset link has been sent successfully.");

        window.location.href = "index.html";

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

});