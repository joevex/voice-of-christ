import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const worshipContainer = document.getElementById("worshipContainer");
const clearBtn = document.getElementById("clearBtn");
const startPresentation = document.getElementById("startPresentation");

let worshipSongs = [];

// ==========================
// LOAD SONGS
// ==========================

async function loadSongs() {

    worshipContainer.innerHTML = `
        <h2 style="text-align:center;">
            Loading...
        </h2>
    `;

    try {

        const snapshot = await getDocs(collection(db, "worshipSongs"));

        worshipSongs = [];

        snapshot.forEach((document) => {

            worshipSongs.push({
                id: document.id,
                ...document.data()
            });

        });

        displaySongs();

    } catch (error) {

        console.log(error);

    }

}

// ==========================
// DISPLAY
// ==========================

function displaySongs() {

    worshipContainer.innerHTML = "";

    if (worshipSongs.length === 0) {

        worshipContainer.innerHTML = `
        <div class="empty-state">
            <h2>No Worship Songs</h2>
        </div>
        `;

        return;

    }

    worshipSongs.forEach((song, index) => {

        worshipContainer.innerHTML += `

        <div class="song-card">

            <div class="song-info">

                <h2 class="song-title"
                    data-id="${song.id}"
                    style="cursor:pointer;">

                    ${index + 1}. ${song.title}

                </h2>

                <p>${song.language}</p>

            </div>

            <div class="actions">

                <button class="up"
                data-index="${index}">
                ⬆
                </button>

                <button class="down"
                data-index="${index}">
                ⬇
                </button>

                <button class="present"
                data-id="${song.id}">
                🎥
                </button>

                <button class="remove"
                data-id="${song.id}">
                🗑
                </button>

            </div>

        </div>

        `;

    });

}

// ==========================
// CLICK EVENTS
// ==========================

document.addEventListener("click", async (e) => {

    // SONG TITLE CLICK

    if (e.target.classList.contains("song-title")) {

        const id = e.target.dataset.id;

        window.location.href = `presentation.html?id=${id}`;

        return;

    }

    const btn = e.target.closest("button");

    if (!btn) return;

    // PRESENT SINGLE SONG

    if (btn.classList.contains("present")) {

        const id = btn.dataset.id;

        window.location.href = `presentation.html?id=${id}`;

        return;

    }

    // REMOVE SONG

    if (btn.classList.contains("remove")) {

        const id = btn.dataset.id;

        await deleteDoc(doc(db, "worshipSongs", id));

        loadSongs();

        return;

    }

});

// ==========================
// CLEAR ALL
// ==========================

clearBtn.addEventListener("click", async () => {

    if (!confirm("Clear all worship songs?")) return;

    for (const song of worshipSongs) {

        await deleteDoc(doc(db, "worshipSongs", song.id));

    }

    loadSongs();

});

// ==========================
// START PRESENTATION
// ==========================

startPresentation.addEventListener("click", () => {

    if (worshipSongs.length === 0) {

        alert("No Worship Songs");

        return;

    }

    window.location.href =
        `presentation.html?id=${worshipSongs[0].id}`;

});

// ==========================

loadSongs();