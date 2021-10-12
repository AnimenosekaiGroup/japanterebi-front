/**
 * States.js
 * Manages the current state
 * 
 * © Anime no Sekai — 2021
 */


/* here is the variable with all of the current states, watching this staticly gives the defaults */
let states = {
    "currentChannel": "",
    "currentStream": "",
    "currentPage": "",
    "mouseMovementIndex": 0,
    "switchConfirmation": "",
    "counterInterval": null,
    "watchingID": null,
    "buffering": {
        "lastPlayPosition": 0,
        "currentPlayPosition": 0,
        "bufferingDetected": false,
    },
    "online": true,
    "language": "ja",
    "orientation": "landscape",
    "video": {
        "fps": 0,
        "droppedFrames": 0,
        "totalFrames": 0,
        "videoBinding": null,
        "lastAudioVolume": 1,
        "playlistErrors": 0
    }
}