/**
 * Buffering.js
 * Controls the buffering events
 * Checks if the current livestream is buffering or not
 * 
 * © Anime no Sekai — 2021
 */


function checkBuffering() {
    let videoPlayer = document.getElementById("videoPlayer")
    /* This function is called in an interval of a short duration to determine if the current livestream is buffering or not */
    states.buffering.currentPlayPosition = videoPlayer.currentTime
    if ( !states.buffering.bufferingDetected && states.buffering.currentPlayPosition < (states.buffering.lastPlayPosition + constants.BUFFERING_OFFSET) && !videoPlayer.paused ) {
        buffering()
        states.buffering.bufferingDetected = true
    }
    if ( states.buffering.bufferingDetected && states.buffering.currentPlayPosition > (states.buffering.lastPlayPosition + constants.BUFFERING_OFFSET) && !videoPlayer.paused ) { // check if the player has advanced, meaning that it is not buffering
        stopBuffering()
        states.buffering.bufferingDetected = false
    }
    states.buffering.lastPlayPosition = states.buffering.currentPlayPosition
}

async function buffering() {
    /* This shows to the user that we are currently buffering (spinner animation) */
    document.getElementById("loadingContainer").classList.remove("unload");
}

async function stopBuffering() {
    /* This removes the spinner animation */
    document.getElementById("loadingContainer").classList.add("unload");
}