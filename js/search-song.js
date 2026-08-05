import { db } from "./firebase-config.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

searchBtn.addEventListener("click", searchSongs);

searchInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        searchSongs();

    }

});

async function searchSongs() {

    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword === "") {

        results.innerHTML = `
            <div class="online-card">
                <h2>⚠ Enter a song name</h2>
            </div>
        `;

        return;

    }

    results.innerHTML = `
        <div class="online-card">
            <h2>Searching...</h2>
        </div>
    `;

    try {

        const snapshot = await getDocs(collection(db, "christianSongs"));

        let found = [];

        snapshot.forEach(doc => {

            const song = doc.data();

            if (song.title.toLowerCase().includes(keyword)) {

                found.push({
                    id: doc.id,
                    ...song
                });

            }

        });

        displayResults(found, keyword);

    }

    catch (error) {

        console.log(error);

        results.innerHTML = `
            <div class="online-card">

                <h2>Something went wrong</h2>

            </div>
        `;

    }

}

function displayResults(songs, keyword) {

    results.innerHTML = "";

    if (songs.length > 0) {

        songs.forEach(song => {

            results.innerHTML += `

            <div class="song-card">

                <h2>${song.title}</h2>

                <p>

                    ${song.language} • ${song.category}

                </p>

                <button onclick="window.location.href='view-song.html?id=${song.id}'">

                    📖 View Lyrics

                </button>

            </div>

            `;

        });

    }

    else {

        results.innerHTML = `

        <div class="online-card">

            <h2>😔 Song Not Found</h2>

            <p>

                We couldn't find this song in your church library.

            </p>

            <br>

            <button onclick="searchOnline('${keyword}')">

                🌍 Search Online

            </button>

        </div>

        `;

    }

}

window.searchOnline = function(keyword) {

    const query = encodeURIComponent(keyword + " tamil christian lyrics");

    window.open(

        `https://www.google.com/search?q=${query}`,

        "_blank"

    );

}