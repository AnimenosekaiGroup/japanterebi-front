/** COPYRIGHT © ANIME NO SEKAI, 2021
 * Author: Anime no Sekai
 * Author Github: https://github.com/Animenosekai
 * Repository: https://github.com/Animenosekai/japan_terebi (private)
 * Year: 2021
 * Last Update: 22nd February 2021
 * Version: v1.1.6
 * Experimental Version: v1.2 (α) (Upscale)
 * Project: Japan Terebi v3
 * External Credit:
 *  EventSource (polyfill):
 *      Author: Remy Sharp
 *      URL: https://github.com/remy/polyfills
 *      Filename: scripts/eventsource_polyfill.js
 *  Upscale:
 *      Author: bloc97 and NeuroWhAI
 *      URL: https://github.com/NeuroWhAI/Anime4K/tree/feat-web
 *      Filename: scripts/upscale.js
 *  requestAnimationFrame (polyfill):
 *      Author: Erik Möller (+ 6 others)
 *      URL: https://gist.github.com/jalbam/5fe05443270fa6d8136238ec72accbc0
 *      Filename: scripts/upscale.js
 */

/** TODO
 * Cleanup
 * 
 * 
 */


// DEFINING VARIABLES AND CONSTANTS

var listing = {}
var watchingEvent = null
var videoPlayer = null
var videoBinding = null
var mouseMovementIndex = 0
var currentPage = "home"
var currentChannel = ""
var switchConfirmation = ""
const pageElement = document.documentElement
var channelData = {}
var availableChannels = []

const bufferingOffset = 0.08
var lastPlayPos    = 0
var currentPlayPos = 0
var bufferingDetected = false
var lastAudioVolume = 1

const HOST = "https://animenosekai.herokuapp.com/japanterebi"
const FALLBACK = HOST + "/stream/hls/"
var currentTimeMargin = 0
var playlistErrors = 0

// ONLOAD: initializing the page
window.onload = function() {
    buffering()
    addAuth() // verify the authentification
    videoPlayer = document.getElementById("videoPlayer") // get the <video> element
    videoPlayer.addEventListener("timeupdate", function(e) {
        stopBuffering()
    })
    videoPlayer.addEventListener("error", function(e) {
        if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')){
            switch (e.target.error.code) {
                case e.target.error.MEDIA_ERR_ABORTED:
                    setTimeout(function() {
                        watchWithNative(videoPlayer.src)
                    }, 100) // preventing biig infinite loop
                    break
                case e.target.error.MEDIA_ERR_NETWORK:
                    setTimeout(function() {
                        fallback(true)
                    }, 100)
                    break
                case e.target.error.MEDIA_ERR_DECODE:
                case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    setTimeout(function(){
                        watchWithHLSJS(videoPlayer.src)
                    }, 100)
                    break
                default:
                    newInfo("An unknown error occured while loading the channel")
                    break
            }
        } else {
            console.warn("Error from <video> but source is hls.js")
        }
    })
    refreshCache(true) // run for the first time as setInterval sets it without running it
    fetch(HOST + "/channels/available?", {
        headers: {"Authorization": localStorage.getItem("__japanterebi_account_token")}
    }) // getting the available channels
    .then((resp => resp.json())) // convert to json
    .then(function(data) {
        if ("error" in data) { window.location.assign("/login") } // assuming that any error comes from an auth error because only two errors, coming from the JWT verification, can occur
        if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')){ // fallback for safari and browsers supporting HLS natively
            watchWithNative(data[0]["stream"])
        } else if (Hls.isSupported()) { // hls.js
            watchWithHLSJS(data[0]["stream"])
        } else { // if nothing is available
            newInfo("We are sorry but your browser is not compatible")
            return // skip actions below
        }
        currentChannel = data[0]["id"]
        playVideo()
        watching(data[0]["id"])
    })

    setInterval(refreshCache, 900000) // refresh the cache every 15 minutes

    // defining all of the events //
    window.addEventListener("online", function(){ newInfo("You are back online"); reloadVideo() })
    window.addEventListener("offline", function(){ newInfo("You seem to be disconnected") })
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
    document.addEventListener("fullscreenchange", fullscreenHandler)
    document.addEventListener("webkitfullscreenchange", fullscreenHandler)
    document.addEventListener("msfullscreenchange", fullscreenHandler)
    document.addEventListener("mousemove", mouseMoved)
    document.addEventListener("keydown", shortcutHandler)
}



// UTILS //

function nextElement(array, value) {
    /**
     * Lets you find the next element in the array
     */
    let index = array.indexOf(value)
    if (index == array.length - 1|| index == -1) {
        return 0
    } else {
        return index + 1
    }
}

function previousElement(array, value) {
    /**
     * Lets you find the previous element in the array
     */
    let index = array.indexOf(value)
    if (index == 0 || index == -1) {
        return array.length - 1
    } else {
        return index - 1
    }
}


async function newInfo(message) {
    /**
     * Show a new info box
     */
    console.log("[Info] " + String(message))
    let newElement = document.createElement("info")
    newElement.setAttribute("class", "info-box")
    newElement.innerText = String(message)
    document.getElementById("tvplayer").appendChild(newElement)
    setTimeout(function() {
        newElement.classList.add("visibleInfo")
        setTimeout(function() {
            newElement.classList.remove("visibleInfo")
            setTimeout(function() {
                newElement.remove()
            }, 1000)
        }, 5000)
    }, 50)
}


function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function correctMinute(minute) {
    if (minute < 10) {
        return "0" + String(minute)
    } else {
        return String(minute)
    }
}

// BUFFERING EVENT //

setInterval(checkBuffering, 100) // do not use values lower than 50ms as the offset will not suffice
function checkBuffering() {
    currentPlayPos = videoPlayer.currentTime
    if ( !bufferingDetected && currentPlayPos < (lastPlayPos + bufferingOffset) && !videoPlayer.paused ) {
        buffering()
        bufferingDetected = true
    }
    if ( bufferingDetected && currentPlayPos > (lastPlayPos + bufferingOffset) && !videoPlayer.paused ) { // check if the player has advanced, meaning that it is not buffering
        stopBuffering()
        bufferingDetected = false
    }
    lastPlayPos = currentPlayPos
}

async function buffering() {
    document.getElementById("loadingContainer").classList.remove("unload")
}

async function stopBuffering() {
    document.getElementById("loadingContainer").classList.add("unload")
}


// WATCHING FUNCTIONS //

async function fallback(native=false) {
    if (playlistErrors < 3) {
        playlistErrors ++
        if (native) {
            watchWithNative(channelData[currentChannel]["stream"])
        } else {
            watchWithHLSJS(channelData[currentChannel]["stream"])
        }
    } else {
        newInfo("Watching " + channelData[currentChannel]["english"] + " from my server: Expect downtime and buffering")
        playlistErrors = 0
        if (native) {
            watchWithNative(FALLBACK + currentChannel + ".m3u8")
        } else {
            watchWithHLSJS(FALLBACK + currentChannel + ".m3u8")
        }
    }
}


async function watchWithNative(stream) {
    videoPlayer.src = stream
    buffering()
}

async function watchWithHLSJS(stream) {
    try {
        videoBinding.destroy();
    } catch { } // avoiding the if-else statement as the condition should only be met once
    videoBinding = new Hls({debug: true});
    videoBinding.attachMedia(videoPlayer);
    videoBinding.on(Hls.Events.MEDIA_ATTACHED, function() {
        // load the channel
        videoBinding.loadSource(stream)
        // errors handling
        videoBinding.on(window.Hls.Events.ERROR, function(event, data) {
            switch (data.details) {
                case Hls.ErrorDetails.BUFFER_STALLED_ERROR:
                    buffering()
                    break
                case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
                    setTimeout(function(){
                        fallback()
                    }, 100)
                    break
            }
            if (data.fatal) {
                if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) { // immediately fallback on native hls (for supported browsers) if fatal error
                    setTimeout(function() {
                        videoBinding.destroy()
                        watchWithNative(channelData[currentChannel]["stream"])
                    }, 100)
                }
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        setTimeout(function() {
                            videoBinding.startLoad();
                        }, 100)
                        break
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        setTimeout(function() {
                            videoBinding.recoverMediaError();
                        }, 100)
                        break
                    default:
                        newInfo("An error occured, please restart the webpage if something is wrong.")
                        break
                }
            }
        })
        // events
        videoBinding.on(window.Hls.Events.FRAG_BUFFERED, () => {
            stopBuffering()
        })
    })
}

async function refreshCache(firsttime=false) {
    // refreshes the cache and updates the different information containers
    fetch(HOST + "/channels", {
        headers: {"Authorization": localStorage.getItem("__japanterebi_account_token")}
    })
    .then((resp) => resp.json())
    .then(function(data) {
        if ("error" in data) { window.location.assign("/login") } // if error, go to login
        for (element in data) {
            channelData[data[element]["id"]] = data[element]
        }
    })
    fetch(HOST + "/channels/available", {
        headers: {"Authorization": localStorage.getItem("__japanterebi_account_token")}
    })
    .then((resp => resp.json()))
    .then(function(data) {
        if ("error" in data) { window.location.assign("/login") }
        listing = data // appending to the cache
        availableChannels = []
        for (channel in listing) {
            availableChannels.push(listing[channel]["id"])
        }
        addHome(channelData, firsttime)
    })
    addEPG(firsttime)
}

async function watching(channel) {
    if (watchingEvent != null) {
        watchingEvent.close()
    }
    watchingEvent = new EventSource(HOST + "/watching/" + String(channel));
    watchingEvent.onmessage = function(e) {
        document.getElementById("realtimeCounter").innerText = e.data
    }
}

// VIDEO PLAYER CONTROLS //
async function playVideo() {
    await videoPlayer.play()
    document.getElementById("icon-pause").classList.remove("hiddenButton")
    document.getElementById("icon-play").classList.add("hiddenButton")

    ////// not available on safari
    //video.muted = false
    //////
}

async function pauseVideo() {
    await videoPlayer.pause()
    document.getElementById("icon-play").classList.remove("hiddenButton")
    document.getElementById("icon-pause").classList.add("hiddenButton")
}

async function playPause() {
    if (videoPlayer.paused) {
        playVideo()
    } else {
        pauseVideo()
    }
}

async function reloadVideo() {
    await videoPlayer.load()
}

async function volume() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false
        document.getElementById("icon-volume-unmuted").classList.remove("hiddenButton")
        document.getElementById("icon-volume-muted").classList.add("hiddenButton")
    } else {
        videoPlayer.muted = true
        document.getElementById("icon-volume-muted").classList.remove("hiddenButton")
        document.getElementById("icon-volume-unmuted").classList.add("hiddenButton")
    }
}

async function watch(channel) {
    //videoPlayer.setAttribute("poster", HOST + "/channels/thumbnail/" + channel) // is it really needed? > I could save some bandwidth maybe
    goToWatch()
    if (channel != currentChannel) {
        buffering()
        try {
            switchHomeProgram(channel)
        } catch {
            console.warn("[non critical] Error while switching home")
        }
        _channel = null
        for (channel_ in listing) {
            if (listing[channel_]["id"] == channel) {
                _channel = channel
                break
            }
        }
        if (_channel == null) {
            newInfo("An error occured while loading the channel")
        } else {
            if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')){ // fallback for safari and browsers supporting HLS natively
                watchWithNative(channelData[_channel]["stream"])
            } else if (Hls.isSupported()) { // hls.js
                watchWithHLSJS(channelData[_channel]["stream"])
            } else { // if nothing is available
                newInfo("We are sorry but your browser is not compatible")
            }
            currentChannel = channelData[_channel]["id"]
            watching(currentChannel)
            document.getElementById("channelName").innerText = channelData[_channel]["stylized"]
        }
    }
}

async function nextChannel() {
    let channelIndex = nextElement(availableChannels, currentChannel)
    let channel = availableChannels[channelIndex]
    watch(channel)
}

async function previousChannel() {
    let channelIndex = previousElement(availableChannels, currentChannel)
    let channel = availableChannels[channelIndex]
    watch(channel)
}

async function fullscreenHandler() {
    if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        document.getElementById("icon-fullscreen-close").classList.remove("hiddenButton")
        document.getElementById("icon-fullscreen-open").classList.add("hiddenButton")
    } else {
        document.getElementById("icon-fullscreen-open").classList.remove("hiddenButton")
        document.getElementById("icon-fullscreen-close").classList.add("hiddenButton")
    }
}

/* View in fullscreen */
async function fullscreen() {
    if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        } else if (videoPlayer.webkitExitFullscreen) {
            videoPlayer.webkitExitFullscreen()
        } else {
            return
        }
    } else {
        if (pageElement.requestFullscreen) {
            pageElement.requestFullscreen();
        } else if (pageElement.webkitRequestFullscreen) { /* Safari */
            pageElement.webkitRequestFullscreen();
        } else if (pageElement.msRequestFullscreen) { /* IE11 */
            pageElement.msRequestFullscreen();
        } else if (videoPlayer.webkitEnterFullscreen) { /* iPhone and iPod */
            videoPlayer.webkitEnterFullscreen()
        } else {
            return
        }
    }
}


async function mouseMoved() {
    if (currentPage == "home" || currentPage == "guide") {
        document.getElementById("tvplayer").classList.add("hidden-cursor")
        document.getElementById("controls").classList.add("hidden-controls")
        document.getElementById("previousChannel").classList.add("hidden-channel-arrows")
        document.getElementById("nextChannel").classList.add("hidden-channel-arrows")
        document.getElementById("information").classList.add("hidden-information")
        document.getElementById("header").classList.remove("hidden-header")
        return
    }
    mouseMovementIndex += 1
    let movement = mouseMovementIndex
    document.getElementById("tvplayer").classList.remove("hidden-cursor")
    document.getElementById("controls").classList.remove("hidden-controls")
    document.getElementById("previousChannel").classList.remove("hidden-channel-arrows")
    document.getElementById("nextChannel").classList.remove("hidden-channel-arrows")
    document.getElementById("information").classList.remove("hidden-information")
    document.getElementById("header").classList.remove("hidden-header")
    setTimeout(function() {
        if (movement == mouseMovementIndex) {
            document.getElementById("tvplayer").classList.add("hidden-cursor")
            document.getElementById("controls").classList.add("hidden-controls")
            document.getElementById("previousChannel").classList.add("hidden-channel-arrows")
            document.getElementById("nextChannel").classList.add("hidden-channel-arrows")
            document.getElementById("information").classList.add("hidden-information")
            if (currentPage != "home") {
                document.getElementById("header").classList.add("hidden-header")
            }
        }
    }, 3000)
}


async function shortcutHandler(event) {
    if (event.key == "f") {
        fullscreen()
    } else if (event.key == "ArrowRight") {
        if (switchConfirmation != "next") {
            switchConfirmation = "next"
            newInfo("Press one more time to switch to the next channel")
            setTimeout(function() {
                switchConfirmation = ""
            }, 5000)
        } else {
            nextChannel()
        }
    } else if (event.key == "ArrowLeft") {
        if (switchConfirmation != "previous") {
            switchConfirmation = "previous"
            newInfo("Press one more time to switch to the previous channel")
            setTimeout(function() {
                switchConfirmation = ""
            }, 5000)
        } else {
            nextChannel()
        }
    } else if (event.key == "m") {
        volume()
    } else if (currentPage == "home") {
        if (event.key == "w") {
            goToWatch()
        }
    } else if (currentPage == "watch") {
        if (event.key == " ") {
            playPause()
        } else if (event.key == "r") {
            reloadVideo()
        } else if (event.key == "h") {
            goToHome()
        }
    }
}




// PAGES //

async function goToHome() {
    lastAudioVolume = videoPlayer.volume
    currentPage = "home"
    const currentPageElem = document.getElementById("currentPage")
    currentPageElem.classList.remove("current-page-watch")
    currentPageElem.classList.remove("current-page-guide")
    currentPageElem.classList.add("current-page-home")
    videoPlayer.volume = 0.4
    document.getElementById("more").classList.add("hidden-more")
    document.getElementById("header").classList.remove("hidden-header")
    document.getElementById("homeContainer").classList.remove("home-hidden")
}

async function goToWatch() {
    currentPage = "watch"
    videoPlayer.volume = lastAudioVolume
    const currentPageElem = document.getElementById("currentPage")
    currentPageElem.classList.remove("current-page-home")
    currentPageElem.classList.remove("current-page-guide")
    currentPageElem.classList.add("current-page-watch")
    document.getElementById("homeContainer").classList.add("home-hidden")
    document.getElementById("more").classList.add("hidden-more")
    mouseMoved()
}

async function goToGuide() {
    lastAudioVolume = videoPlayer.volume
    currentPage = "guide"
    const currentPageElem = document.getElementById("currentPage")
    currentPageElem.classList.remove("current-page-home")
    currentPageElem.classList.remove("current-page-watch")
    currentPageElem.classList.add("current-page-guide")
    videoPlayer.volume = 0.4
    document.getElementById("homeContainer").classList.add("home-hidden")
    document.getElementById("header").classList.remove("hidden-header")
    document.getElementById("more").classList.remove("hidden-more")
}


async function switchHomeProgram(tile) {
    let channel = tile
    if (typeof tile == "object") {
        try {
            channel = tile.getAttribute("channel")
        } catch {
            channel = tile["id"]
        }
    }
    const program = document.getElementById("program_" + channel)
    Array.prototype.forEach.call(document.getElementsByClassName("home-program-visible"), function(element) {
        if (element != program) {
            element.classList.remove("home-program-visible")
        }
    })
    setTimeout(function() {
        Array.prototype.forEach.call(document.getElementsByClassName("home-program-load"), function(element) {
            if (element != program) {
                element.classList.remove("home-program-load")
            }
        })
        program.classList.add("home-program-load")
        setTimeout(function() {
            program.classList.add("home-program-visible")
        }, 10)
    }, 50)
}

async function addHome(_channelData=null, firsttime=false) {
    if (_channelData != null) {
        channelData = _channelData
    }
    fetch(HOST + "/guide/now?available=true", {
        headers: {"Authorization": localStorage.getItem("__japanterebi_account_token")}
    })
    .then((resp) => resp.json())
    .then(function(data) {
        if ("error" in data) {
            window.location.assign("/login")
        }
        const rowInner = document.getElementById("tilesRowInner")
        while (rowInner.firstChild) {
            rowInner.removeChild(rowInner.firstChild);
        }
        for (program in data) {
            let _index = program
            program = data[program]
            let channel = program["channel"]

            let newProgram = document.createElement("program")
            newProgram.setAttribute("id", "program_" + String(channel))
            newProgram.setAttribute("class", "home-program")

            let newProgramTitle = document.createElement("program-title")
            newProgramTitle.setAttribute("class", "home-program-title")
            newProgramTitle.innerText = program["title"]

            let newProgramDescription = document.createElement("program-description")
            newProgramDescription.setAttribute("class", "home-program-description")
            let description = String(program["description"])
            if (description.length > 160) {
                description = description.substring(0, 160) + "..."
            }
            newProgramDescription.innerText = description

            let newProgramChannel = document.createElement("program-channel")
            newProgramChannel.setAttribute("class", "home-program-channel")
            newProgramChannel.innerText = "Currently airing on: " + channelData[channel]["stylized"]
            
            newProgram.appendChild(newProgramTitle)
            newProgram.appendChild(newProgramDescription)
            newProgram.appendChild(newProgramChannel)

            document.getElementById("programDetails").appendChild(newProgram)


            let newTile = document.createElement("tile")
            newTile.setAttribute("class", "home-tile")

            let newTileMedia = document.createElement("tile-media")
            newTileMedia.setAttribute("class", "home-tile-media")
            
            let newImg = document.createElement("img")
            newImg.setAttribute("src", HOST + "/channels/thumbnail/" + channel)
            newImg.setAttribute("class", "home-tile-img")

            let newLogo = document.createElement("img")
            //newLogo.setAttribute("src", HOST + "/channels/logo/" + channel) this consumes bandwidth for a static file
            newLogo.setAttribute("src", "/images/logos/" + channel + ".png")
            newLogo.setAttribute("class", "home-tile-logo")
            newTileMedia.appendChild(newLogo)
            newTileMedia.appendChild(newImg)
            
            let newTileFooter = document.createElement("tile-footer")
            newTileFooter.setAttribute("class", "home-tile-details")
            
            let newTileTitle = document.createElement("tile-title")
            newTileTitle.setAttribute("class", "home-tile-title")
            
            let title = String(program["title"])
            if (title.length > 23) {
                title = title.substring(0, 23) + "..."
            }
            newTileTitle.innerText = title
            newTileFooter.appendChild(newTileTitle)
            newTile.appendChild(newTileMedia)
            newTile.appendChild(newTileFooter)

            newTile.setAttribute("channel", channel)
            newTile.setAttribute("onmouseover", "switchHomeProgram(this)")
            newTile.setAttribute("onclick", "watch('" + channel + "')")

            rowInner.appendChild(newTile)

            if (_index == 0 && firsttime == true) {
                switchHomeProgram(Object.keys(channelData)[0])
            } else if (_index == data.length - 1) {
                newTile.setAttribute("style", "margin-right: 130px;")
            }
        }
    })
    
}

async function verifyEPGCurrentTime() {
    const epgCurrentTimeWrapper = document.getElementById("epgCurrentTimeWrapper")
    const epgTimeSpan = document.getElementById("epgTimeSpan")
    //const totalWidth = 9600
    let currentDate = new Date()
    let japanDate = new Date((typeof currentDate === "string" ? new Date(currentDate) : currentDate).toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
    let japanSeconds = (japanDate.getSeconds() + (60 * japanDate.getMinutes()) + (3600 * japanDate.getHours()))
    let newLeft = (9600 * japanSeconds) / 86400
    epgTimeSpan.innerText = String(japanDate.getHours()) + ":" + correctMinute(japanDate.getMinutes())
    epgCurrentTimeWrapper.setAttribute("style", "left: " + String(newLeft) + "px; margin-top: -" + String(currentTimeMargin) + "px;")
    if (isElementInViewport(epgCurrentTimeWrapper) == false){
        document.getElementById("returnToCurrentTime").classList.remove("hidden-epg-button")
    } else {
        document.getElementById("returnToCurrentTime").classList.add("hidden-epg-button")
    }
    //epgCurrentTimeWrapper.scrollIntoView({inline: "center"})
}

setInterval(verifyEPGCurrentTime, 100)

function _createEPGProgram(data) {
    // creates a new program for the epg
    let currentDate = new Date()
    let startDate = new Date((typeof currentDate === "string" ? new Date(currentDate) : currentDate).toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
    startDate.setHours(0, 0, 0, 0)
    let endDate = new Date((typeof currentDate === "string" ? new Date(currentDate) : currentDate).toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
    endDate.setHours(23, 59, 59, 999)
    
    let _startTime = new Date(data["startTime"] * 1000)
    let _endTime = new Date(data["endTime"] * 1000)
    
    if (_startTime < startDate) {
        _startTime = startDate
    } else if (_startTime > endDate) {
        return null
    }

    if (_endTime > endDate) {
        _endTime = endDate
    }
    //console.log(_startTime)
    
    
    let duration = (Math.abs(_endTime - _startTime)  / 1000 ) / 60 // returns the value in minutes
    duration = Math.round(duration / 5) * 5 // round to the nearest multiple of 5
    //console.log(duration)
    if (duration > 1440) {
        return null
    }

    let newEPGProgram = document.createElement("epg-program")
    newEPGProgram.setAttribute("class", "epg-program")

    let newEPGProgramTitleWrapper = document.createElement("epg-program-title-wrapper")
    newEPGProgramTitleWrapper.setAttribute("class", "epg-program-title-wrapper")

    let newEPGProgramDuration = document.createElement("epg-program-duration")
    newEPGProgramDuration.setAttribute("class", "epg-program-duration")
    newEPGProgramDuration.innerText = Math.round(duration)

    let newEPGProgramTitle = document.createElement("epg-program-title")
    newEPGProgramTitle.setAttribute("class", "epg-program-title")
    newEPGProgramTitle.innerText = data["title"]
    
    newEPGProgramTitleWrapper.appendChild(newEPGProgramDuration)
    newEPGProgramTitleWrapper.appendChild(newEPGProgramTitle)

    let newEPGProgramDescription = document.createElement("epg-program-description")
    newEPGProgramDescription.setAttribute("class", "epg-program-description")
    newEPGProgramDescription.innerText = data["description"]

    newEPGProgram.appendChild(newEPGProgramTitleWrapper)
    newEPGProgram.appendChild(newEPGProgramDescription)

    //console.log(duration)
    let _width = (duration * (400/60))

    newEPGProgram.setAttribute("style", "width: " + String(_width) + "px;")

    return newEPGProgram
}

async function scrollToCurrentTime() {
    let currentDate = new Date()
    let japanDate = new Date((typeof currentDate === "string" ? new Date(currentDate) : currentDate).toLocaleString("en-US", {timeZone: "Asia/Tokyo"}));
    let japanSeconds = (japanDate.getSeconds() + (60 * japanDate.getMinutes()) + (3600 * japanDate.getHours()))
    let newLeft = (9600 * japanSeconds) / 86400
    document.getElementById("epgContent").scrollTo({
        top: 0,
        left: newLeft,
        behavior: 'smooth'
    });
}

async function addAuth() {
    fetch(HOST + "/auth", {
        headers: {"Authorization": localStorage.getItem("__japanterebi_account_token")}
    })
    .then((resp => resp.json()))
    .then(function(data) {
        if ("error" in data) {
            window.location.assign("/login")
        }
        document.getElementById("accountName").innerText = data.username
        document.getElementById("accountInvite").innerText = data.invite
    })
}

async function addEPG(firsttime=false) {
    fetch(HOST + "/guide?epg=true", {
        headers: {"Authorization": localStorage.getItem("__japanterebi_account_token")}
    })
    .then((resp => resp.json()))
    .then(function(data) {
        if ("error" in data) {
            window.location.assign("/login")
        }
        let rowInner = document.getElementById("epgRows")
        while (rowInner.firstChild) {
            rowInner.removeChild(rowInner.firstChild);
        }
        rowInner = document.getElementById("epgChannels")
        while (rowInner.firstChild) {
            rowInner.removeChild(rowInner.firstChild);
        }
        let iteration = 0
        for (channel in data) {
            iteration ++
            let newEPGChannel = document.createElement("epg-channel")
            newEPGChannel.setAttribute("class", "epg-channel")
            newEPGChannel.setAttribute("onclick", 'watch("' + channel + '")')
            let newEPGChannelImg = document.createElement("img")
            newEPGChannelImg.setAttribute("src", HOST + "/channels/logo/" + channel)
            newEPGChannelImg.setAttribute("alt", channel + " logo")
            newEPGChannelImg.setAttribute("class", "epg-channel-img")
            
            newEPGChannel.appendChild(newEPGChannelImg)
            document.getElementById("epgChannels").appendChild(newEPGChannel)

            let newRow = document.createElement("epg-row")
            newRow.setAttribute("class", "epg-row")
            for (program in data[channel]) {
                newProgram = _createEPGProgram(data[channel][program])
                if (newProgram != null) {
                    newRow.appendChild(newProgram)
                }
            }
            document.getElementById("epgRows").appendChild(newRow)
        }
        currentTimeMargin = iteration * 120 + 65
        if (firsttime) {
            scrollToCurrentTime()
        }
    })
}
