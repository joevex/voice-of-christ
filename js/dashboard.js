import { auth, db } from "./firebase-config.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    try {
console.log("Logged UID:", user.uid);
        const snap = await getDoc(doc(db, "churches", user.uid));

        if (snap.exists()) {

            const data = snap.data();

            document.getElementById("churchName").textContent = data.churchName || "Church";
            document.getElementById("pastorName").textContent = "Pastor : " + (data.pastorName || "Unknown");

        } else {

            document.getElementById("churchName").textContent = "Church Not Found";
            document.getElementById("pastorName").textContent = "";

            console.log("Firestore document not found");

        }

    } catch (err) {

        console.error(err);

        document.getElementById("churchName").textContent = "Error Loading Data";
        document.getElementById("pastorName").textContent = "";

    }

});