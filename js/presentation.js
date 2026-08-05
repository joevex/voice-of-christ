import { db } from "./firebase-config.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const songId = params.get("id");

const songTitle = document.getElementById("songTitle");
const slide = document.getElementById("slide");
const slideCount = document.getElementById("slideCount");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let slides = [];
let currentSlide = 0;

async function loadSong() {

    if (!songId) {

        alert("Invalid Song");
        window.location.href = "christian-songs.html";
        return;

    }

    try {

        // First search in christianSongs
        let snap = await getDoc(doc(db, "christianSongs", songId));

        // If not found, search in worshipSongs
        if (!snap.exists()) {

            snap = await getDoc(doc(db, "worshipSongs", songId));

        }

        // Still not found
        if (!snap.exists()) {

            alert("Song Not Found");
            history.back();
            return;

        }

        const song = snap.data();

        songTitle.textContent = song.title;

        createSlides(song.lyrics);

    }
    catch (error) {

        console.error(error);
        alert("Unable to Load Song");

    }

}

function createSlides(lyrics) {

    slides = lyrics
        .split(/\n\s*\n/)          // blank line based split
        .map(slide => slide.trim())
        .filter(slide => slide !== "");

    currentSlide = 0;

    showSlide();

}
function showSlide() {

    slide.style.opacity = 0;

    setTimeout(() => {

        slide.innerHTML = slides[currentSlide];

        slideCount.textContent =
            `${currentSlide + 1} / ${slides.length}`;

        slide.style.opacity = 1;

    }, 150);

}

nextBtn.addEventListener("click", () => {

    if (currentSlide < slides.length - 1) {

        currentSlide++;

        showSlide();

    }

});

prevBtn.addEventListener("click", () => {

    if (currentSlide > 0) {

        currentSlide--;

        showSlide();

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

});

const fullscreenBtn = document.getElementById("fullscreenBtn");
const increaseFont = document.getElementById("increaseFont");
const decreaseFont = document.getElementById("decreaseFont");
const backBtn = document.getElementById("backBtn");

let fontSize = 48;

slide.style.fontSize = fontSize + "px";

loadSong();

// ===========================
// FONT SIZE
// ===========================

increaseFont.addEventListener("click", () => {

    fontSize += 4;

    slide.style.fontSize = fontSize + "px";

});

decreaseFont.addEventListener("click", () => {

    if(fontSize > 20){

        fontSize -= 4;

        slide.style.fontSize = fontSize + "px";

    }

});

// ===========================
// FULL SCREEN
// ===========================

fullscreenBtn.addEventListener("click", () => {

    if(!document.fullscreenElement){

        document.documentElement.requestFullscreen();

    }else{

        document.exitFullscreen();

    }

});

// ===========================
// EXIT
// ===========================

backBtn.addEventListener("click", () => {

    history.back();

});

// ===========================
// KEYBOARD SHORTCUTS
// ===========================

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowRight":
            nextBtn.click();
            break;

        case "ArrowLeft":
            prevBtn.click();
            break;

        case "+":
        case "=":
            increaseFont.click();
            break;

        case "-":
            decreaseFont.click();
            break;

        case "f":
        case "F":
            fullscreenBtn.click();
            break;

        case "Escape":

            if(document.fullscreenElement){

                document.exitFullscreen();

            }

            break;

    }

});