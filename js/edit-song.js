import { db } from "./firebase-config.js";

import {
doc,
getDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const songId = params.get("id");

const form = document.getElementById("editSongForm");

const title = document.getElementById("title");
const language = document.getElementById("language");
const category = document.getElementById("category");
const lyrics = document.getElementById("lyrics");

async function loadSong(){

    if(!songId){

        alert("Invalid Song");

        window.location.href="christian-songs.html";

        return;

    }

    try{

        const snap = await getDoc(doc(db,"christianSongs",songId));

        if(!snap.exists()){

            alert("Song Not Found");

            window.location.href="christian-songs.html";

            return;

        }

        const song = snap.data();

        title.value = song.title;
        language.value = song.language;
        category.value = song.category;
        lyrics.value = song.lyrics;

    }

    catch(error){

        console.log(error);

        alert("Unable to Load Song");

    }

}

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    try{

        await updateDoc(doc(db,"christianSongs",songId),{

            title:title.value.trim(),
            language:language.value,
            category:category.value,
            lyrics:lyrics.value.trim()

        });

        alert("Song Updated Successfully");

        window.location.href="christian-songs.html";

    }

    catch(error){

        console.log(error);

        alert("Update Failed");

    }

});

loadSong();