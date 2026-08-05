import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc,
    updateDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const songContainer = document.getElementById("songContainer");
const searchInput = document.getElementById("searchInput");

let allSongs = [];

// ===============================
// LOAD SONGS
// ===============================

async function loadSongs() {

    songContainer.innerHTML = `
        <div class="loading">
            <h2>Loading Songs...</h2>
        </div>
    `;

    try {

        const q = query(
            collection(db, "christianSongs"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        allSongs = [];

        snapshot.forEach((document) => {

            allSongs.push({
                id: document.id,
                ...document.data()
            });

        });

        displaySongs(allSongs);

    } catch (error) {

        console.error(error);

        songContainer.innerHTML = `
            <div class="empty-state">
                <h2>No Songs Found</h2>
                <p>Please add your first song.</p>
            </div>
        `;

    }

}

// ===============================
// DISPLAY SONGS
// ===============================

function displaySongs(songs) {

    songContainer.innerHTML = "";

    if (songs.length === 0) {

        songContainer.innerHTML = `
            <div class="empty-state">

                <h2>No Songs Available</h2>

                <p>Add your first Christian song.</p>

            </div>
        `;

        return;

    }

    songs.forEach(song => {

        songContainer.innerHTML += `

        <div class="song-card">

            <div class="song-top">

                <h2>${song.title}</h2>

                <span class="category">

                    ${song.category || "General"}

                </span>

            </div>

            <p class="language">

                🌐 ${song.language || "Tamil"}

            </p>

            <div class="actions">

                <button class="view" data-id="${song.id}">
                    👁 View
                </button>

                <button class="edit" data-id="${song.id}">
                    ✏ Edit
                </button>

                <button class="delete" data-id="${song.id}">
                    🗑 Delete
                </button>

                <button class="worship" data-id="${song.id}">
                    🙏 Worship
                </button>

            </div>

        </div>

        `;

    });

}
// ===============================
// SEARCH SONGS
// ===============================

searchInput.addEventListener("input", () => {

    const text = searchInput.value.toLowerCase().trim();

    const filtered = allSongs.filter(song => {

        const title = (song.title || "").toLowerCase();
        const language = (song.language || "").toLowerCase();
        const category = (song.category || "").toLowerCase();

        return (
            title.includes(text) ||
            language.includes(text) ||
            category.includes(text)
        );

    });

    displaySongs(filtered);

});


// ===============================
// BUTTON EVENTS
// ===============================

document.addEventListener("click", async (e) => {

    const btn = e.target.closest("button");

    if (!btn) return;

    const id = btn.dataset.id;

    if (!id) return;


    // ===========================
    // VIEW
    // ===========================

    if (btn.classList.contains("view")) {

        window.location.href = `view-song.html?id=${id}`;

        return;

    }


    // ===========================
    // EDIT
    // ===========================

    if (btn.classList.contains("edit")) {

        window.location.href = `edit-song.html?id=${id}`;

        return;

    }


    // ===========================
    // DELETE
    // ===========================

    if (btn.classList.contains("delete")) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this song?"
        );

        if (!confirmDelete) return;

        try {

            await deleteDoc(
                doc(db, "christianSongs", id)
            );

            alert("Song Deleted Successfully");

            loadSongs();

        }

        catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

        return;

    }


    // ===========================
    // WORSHIP
    // ===========================

    if (btn.classList.contains("worship")) {

        const song = allSongs.find(s => s.id === id);

        if (!song) {

            alert("Song Not Found");

            return;

        }

        try {

            await addDoc(
                collection(db, "worshipSongs"),
                {
                    title: song.title,
                    language: song.language,
                    category: song.category,
                    lyrics: song.lyrics,
                    youtube: song.youtube || "",
                    createdAt: new Date()
                }
            );

            alert("Song Added to Today's Worship");

        }

        catch (error) {

            console.error(error);

            alert("Unable to Add Song");

        }

        return;

    }

});
// ===============================
// HELPER FUNCTIONS
// ===============================

function showLoading(message = "Loading...") {

    songContainer.innerHTML = `
        <div class="loading">
            <h2>${message}</h2>
        </div>
    `;

}

function showEmpty(message = "No Songs Available") {

    songContainer.innerHTML = `
        <div class="empty-state">
            <h2>${message}</h2>
        </div>
    `;

}

// ===============================
// OPTIONAL - SORT SONGS
// ===============================

function sortSongsAZ() {

    allSongs.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
    );

    displaySongs(allSongs);

}

function sortSongsNewest() {

    loadSongs();

}

// ===============================
// PAGE LOAD
// ===============================

window.addEventListener("DOMContentLoaded", () => {

    loadSongs();

});

// ===============================
// DEBUG (REMOVE LATER)
// ===============================

console.log("Voice of Christ - Christian Songs Loaded");