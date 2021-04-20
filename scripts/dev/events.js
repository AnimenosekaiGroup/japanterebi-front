/**
 * Events.js
 * Manages all of the events, wether they are shortcuts events, video errors, etc.
 * 
 * © Anime no Sekai — 2021
 */


async function defineEvents() {
    /* This function defines all of the events */
    document.getElementById("videoPlayer").addEventListener("timeupdate", function(e) {
        stopBuffering()
    })
    document.getElementById("videoPlayer").addEventListener("error", function(e) {
        if (document.getElementById("videoPlayer").canPlayType('application/vnd.apple.mpegurl')){
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    setTimeout(function() {
                        watchWithNative(document.getElementById("videoPlayer").src) // reloading
                    }, 100) // preventing biig infinite loop
                    break
                case e.target.error.MEDIA_ERR_NETWORK:
                    if (states.online) {
                        reloadVideo()
                    }
                    break
                case e.target.error.MEDIA_ERR_DECODE:
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    setTimeout(function(){
                        watchWithHLSJS(document.getElementById("videoPlayer").src)
                    }, 100)
                    break
                default:
                    newInfo(localization[states.language].UI.announce.channelLoadUnknownError)
                    break
            }
        } else {
            console.warn("Error from <video> but source is hls.js")
        }
    })
    window.addEventListener("online", function(){ newInfo(localization[states.language].UI.announce.online); states.online = true; reloadVideo(); })
    window.addEventListener("offline", function(){ newInfo(localization[states.language].UI.announce.offline); states.online = false; })
    document.getElementById("playBtn").addEventListener("click", playPause)
    document.getElementById("volumeBtn").addEventListener("click", volume)
    document.getElementById("reloadBtn").addEventListener("click", reloadVideo)
    document.getElementById("fullscreenBtn").addEventListener("click", fullscreen)
    document.getElementById("homeBtn").addEventListener("click", goToHome)
    document.getElementById("watchBtn").addEventListener("click", goToWatch)
    document.getElementById("guideBtn").addEventListener("click", goToGuide)
    document.getElementById("nextChannel").addEventListener("click", nextChannel)
    document.getElementById("previousChannel").addEventListener("click", previousChannel)
    document.getElementById("returnToCurrentTime").addEventListener("click", scrollToCurrentTime)
    document.getElementById("changePasswordRequest").addEventListener("click", showCurrentPasswordInput)
    document.getElementById("accountPictureContainer").addEventListener("click", addProfilePicture)
    document.getElementById("accountLanguage").addEventListener("change", changeLanguage, false)
    document.getElementById("tvplayer").addEventListener("mousemove", mouseMoved)
    document.getElementById("tvplayer").addEventListener("touchstart", mouseMoved)
    document.getElementById("responsiveEPGButton").addEventListener("click", goToGuide)
    document.getElementById("usernameSubmitButton").addEventListener("click", changeUsername)
    document.getElementById("currentPasswordSubmitButton").addEventListener("click", showNewPasswordInput)
    document.getElementById("newPasswordSubmitButton").addEventListener("click", changePassword)
    document.getElementById("returnBackButton").addEventListener("click", goToWatch)
    document.getElementById("epgProgramInformationCloseButton").addEventListener("click", hideInformation)
    document.addEventListener("fullscreenchange", fullscreenHandler)
    document.addEventListener("webkitfullscreenchange", fullscreenHandler)
    document.addEventListener("msfullscreenchange", fullscreenHandler)
    document.addEventListener("keydown", shortcutHandler)
    const orientationMedia = window.matchMedia("(orientation: portrait)");
    orientationMedia.addEventListener("change", (mediaQuery) => { checkOrientation(mediaQuery) });
    if (window.WebKitPlaybackTargetAvailabilityEvent) {
        document.getElementById("videoPlayer").addEventListener('webkitplaybacktargetavailabilitychanged', (event) => {
            switch (event.availability) {
                case "available":
                    document.getElementById("airPlayButton").style.display = "block"
                    break;
                case "not-available":
                    document.getElementById("airPlayButton").style.display = "none"
                    break;
            }
        })
        document.getElementById("airPlayButton").addEventListener("click", (event) => {
            document.getElementById("videoPlayer").webkitShowPlaybackTargetPicker();
        })
    }
}