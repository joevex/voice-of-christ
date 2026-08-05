import { db } from "./firebase-config.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const songId = params.get("id");

const title = document.getElementById("songTitle");
const language = document.getElementById("songLanguage");
const category = document.getElementById("songCategory");
const lyrics = document.getElementById("songLyrics");

const editBtn = document.getElementById("editBtn");
const presentBtn = document.getElementById("presentBtn");

async function loadSong() {

    if (!songId) {

        alert("Invalid Song");

        window.location.href = "christian-songs.html";
        return;

    }

    try {

        const snap = await getDoc(doc(db, "christianSongs", songId));

        if (!snap.exists()) {

            alert("Song not found");

            window.location.href = "christian-songs.html";
            return;

        }

        const song = snap.data();

        title.textContent = song.title;
        language.textContent = "🌐 " + song.language;
        category.textContent = "📖 " + song.category;
        lyrics.textContent = song.lyrics;

    }

    catch (error) {

        console.error(error);

        alert("Unable to load song");

    }

}

editBtn.addEventListener("click", () => {

    window.location.href = `edit-song.html?id=${songId}`;

});

presentBtn.addEventListener("click", () => {

    window.location.href = `presentation.html?id=${songId}`;

});

loadSong();