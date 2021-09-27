/**
 * Responsive.js
 * Makes the website responsive
 * Manages the changes made to adapt to all screens
 * 
 * © Anime no Sekai — 2021
 */

async function checkOrientation(mediaQuery) {
    if (mediaQuery.matches) { loadPortrait() } else { loadLandscape() }
}

async function loadPortrait() {
    if (states.orientation != "portrait") {
        states.orientation = "portrait"
        if (states.currentPage == "home") {
            goToWatch()
        }
        window.scrollTo(0, 0); // preventing a bug on iOS which scrolls down a bit on load but get stuck
        document.getElementById("responsiveProgramsList").appendChild(document.getElementById("homeTiles"))
        document.getElementById("homeTiles").style.position = "relative"
    }
}

async function loadLandscape() {
    if (states.orientation != "landscape") {
        states.orientation = "landscape"
        document.getElementById("home").appendChild(document.getElementById("homeTiles"))
        document.getElementById("homeTiles").style.position = "absolute"
    }
}