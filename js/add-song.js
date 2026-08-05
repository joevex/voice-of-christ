import { db, auth } from "./firebase-config.js";

import {
addDoc,
collection,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const form=document.getElementById("songForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const title=document.getElementById("title").value.trim();

const language=document.getElementById("language").value;

const category=document.getElementById("category").value;

const lyrics=document.getElementById("lyrics").value.trim();

if(title===""||lyrics===""){

alert("Please fill all fields");

return;

}

try{

await addDoc(

collection(db,"christianSongs"),

{

title,

language,

category,

lyrics,

createdAt:serverTimestamp(),

createdBy:auth.currentUser.uid

}

);

alert("Song Added Successfully");

window.location.href="christian-songs.html";

}

catch(error){

console.log(error);

alert(error.message);

}

});