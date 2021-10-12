/**
 * Player.js
 * Manages the video player and the video controls
 * 
 * © Anime no Sekai — 2021
 */

async function openDebugPanel() {
    document.getElementById("debugPanel").classList.remove("unload")
    goToWatch()
}

async function closeDebugPanel() {
    document.getElementById("debugPanel").classList.add("unload")
}

function debugHeaderDrag(e) {
    /*
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = () => {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        };
        // call a function whenever the cursor moves:
        document.onmousemove = (e) => {
            let panel = document.getElementById("debugPanel")
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            //console.log({"x": e.clientX, "pos1": pos1, "offset": document.getElementById("debugPanel").offsetLeft,  "diff": document.getElementById("debugPanel").offsetLeft - pos1})
            // set the element's new position:
            let xInset = (e.clientX - panel.offsetLeft)
            let yInset = (e.clientY - panel.offsetTop)
            console.log({"inset": xInset, "re": e.clientX - (xInset > 0 ? xInset : 0)})
            panel.style.left = e.clientX - (xInset > 0 ? xInset : 0) + "px";
            panel.style.top = e.clientY - (yInset > 0 ? yInset : 0) + "px";
        };
    */
};

async function playVideo() {
    /* the play event */
    await document.getElementById("videoPlayer").play()
    document.getElementById("icon-pause").classList.remove("hiddenButton")
    document.getElementById("icon-play").classList.add("hiddenButton")

    ////// not available on safari
    //video.muted = false
    //////
}

async function pauseVideo() {
    /* the pause event */
    await document.getElementById("videoPlayer").pause()
    document.getElementById("icon-play").classList.remove("hiddenButton")
    document.getElementById("icon-pause").classList.add("hiddenButton")
}

async function playPause() {
    /* toggle the play of the <video> */
    if (document.getElementById("videoPlayer").paused) {
        playVideo()
    } else {
        pauseVideo()
    }
}

async function reloadVideo() {
    /* reloads the video */
    await document.getElementById("videoPlayer").load()
}

async function volume() {
    /* toggles the mute of the <video> */
    if (document.getElementById("videoPlayer").muted) {
        document.getElementById("videoPlayer").muted = false
        document.getElementById("icon-volume-unmuted").classList.remove("hiddenButton")
        document.getElementById("icon-volume-muted").classList.add("hiddenButton")
    } else {
        document.getElementById("videoPlayer").muted = true
        document.getElementById("icon-volume-muted").classList.remove("hiddenButton")
        document.getElementById("icon-volume-unmuted").classList.add("hiddenButton")
    }
}

async function fullscreenHandler() {
    /* handles a fullscreen event */
    if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        document.getElementById("icon-fullscreen-close").classList.remove("hiddenButton")
        document.getElementById("icon-fullscreen-open").classList.add("hiddenButton")
    } else {
        document.getElementById("icon-fullscreen-open").classList.remove("hiddenButton")
        document.getElementById("icon-fullscreen-close").classList.add("hiddenButton")
    }
}

async function fullscreen() {
    /* toggles fullscreen */
    if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        } else if (document.getElementById("videoPlayer").webkitExitFullscreen) {
            document.getElementById("videoPlayer").webkitExitFullscreen()
        } else {
            return
        }
    } else {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen();
        } else if (document.getElementById("videoPlayer").webkitEnterFullscreen) { /* iOS WebKit */
            document.getElementById("videoPlayer").webkitEnterFullscreen()
        } else {
            return
        }
    }
}
