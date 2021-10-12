/**
 * Watch.js
 * Handles the watching user interactions
 * Handles the watch experience
 * 
 * © Anime no Sekai — 2021
 */

/* fps counter */
setInterval(() => {
    let videoPlayer = document.getElementById("videoPlayer")
    let videoPlaybackQuality = videoPlayer.getVideoPlaybackQuality()
    states.video.droppedFrames = videoPlaybackQuality.droppedVideoFrames
    states.video.fps = (videoPlaybackQuality.totalVideoFrames - states.video.totalFrames)
    states.video.totalFrames = videoPlaybackQuality.totalVideoFrames
    if (states.video.fps <= 0) {
        buffering()
    } else {
        stopBuffering()
    }
    document.getElementById("debug-fps").innerText = states.video.fps
    document.getElementById("debug-dropped-frames").innerText = states.video.droppedFrames
    document.getElementById("debug-total-frames").innerText = states.video.totalFrames

    document.getElementById("debug-dimensions").innerText = videoPlayer.videoWidth.toString() + "x" + videoPlayer.videoHeight.toString()
    document.getElementById("debug-source").innerText = videoPlayer.currentSrc
    document.getElementById("debug-current-time").innerText = videoPlayer.currentTime
    document.getElementById("debug-paused").innerText = videoPlayer.paused
    document.getElementById("debug-seeking").innerText = videoPlayer.seeking
    document.getElementById("debug-autoplay").innerText = videoPlayer.autoplay
    document.getElementById("debug-volume").innerText = videoPlayer.volume
    document.getElementById("debug-controls").innerText = videoPlayer.controls

    document.getElementById("debug-hls-js").innerText = states.video.videoBinding !== null
    document.getElementById("debug-online").innerText = states.online
    document.getElementById("debug-language").innerText = states.language
    document.getElementById("debug-language-edit").innerText = window.localStorage.getItem("lang-edit")
    document.getElementById("debug-announcement").innerText = window.localStorage.getItem("announcement")
    document.getElementById("debug-orientation").innerText = states.orientation
    document.getElementById("debug-current-page").innerText = states.currentPage
    document.getElementById("debug-current-channel").innerText = states.currentChannel
    document.getElementById("debug-buffering").innerText = states.buffering.bufferingDetected
    document.getElementById("debug-watching-id").innerText = states.watchingID
    document.getElementById("debug-mouse-movement-index").innerText = states.mouseMovementIndex
    document.getElementById("debug-switch-confirmation").innerText = states.switchConfirmation
    document.getElementById("debug-current-stream").innerText = states.currentStream

    request("/channels/available")
    .then((data) => {
        if (data) {
            document.getElementById("debug-available-channels").innerText = data.join(", ")
        }
    })
    document.getElementById("debug-available-channels").innerText = ""
    document.getElementById("debug-version").innerText = constants.version.version
    document.getElementById("debug-commit").innerText = constants.version.commit
    document.getElementById("debug-credits").innerText = constants.credits.author
}, 1000)

async function watchWithNative(stream) {
    try {
        states.video.videoBinding.destroy();
    } catch { } // avoiding the if-else statement as the condition should only be met once
    states.video.videoBinding = null
    /* loads the stream with the native player */
    document.getElementById("videoPlayer").src = stream
    buffering()
}

async function watchWithHLSJS(stream) {
    /* loads the stream with the Hls.js */
    try {
        states.video.videoBinding.destroy();
    } catch { } // avoiding the if-else statement as the condition should only be met once
    states.video.videoBinding = new Hls({ debug: false });
    states.video.videoBinding.attachMedia(document.getElementById("videoPlayer"));
    states.video.videoBinding.on(Hls.Events.MEDIA_ATTACHED, () => {
        // load the channel
        states.video.videoBinding.loadSource(stream)
        // errors handling
        states.video.videoBinding.on(window.Hls.Events.ERROR, function (event, data) {
            if (states.currentStream == stream) {
                switch (data.details) {
                    case Hls.ErrorDetails.BUFFER_STALLED_ERROR:
                        buffering()
                        break
                    case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
                        if (document.getElementById("videoPlayer").canPlayType('application/vnd.apple.mpegurl')) {
                            setTimeout(function () {
                                states.video.videoBinding.destroy()
                                watchWithNative(stream)
                            }, 100)
                        } else {
                            setTimeout(function () {
                                watchWithHLSJS(stream)
                            }, 100)
                        }
                        break
                }
                if (data.fatal) {
                    if (document.getElementById("videoPlayer").canPlayType('application/vnd.apple.mpegurl')) { // immediately fallback on native hls (for supported browsers) if fatal error
                        setTimeout(function () {
                            states.video.videoBinding.destroy()
                            watchWithNative(stream)
                        }, 100)
                    }
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            setTimeout(function () {
                                states.video.videoBinding.startLoad();
                            }, 100)
                            break
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            setTimeout(function () {
                                states.video.videoBinding.recoverMediaError();
                            }, 100)
                            break
                        default:
                            newInfo(localization[states.language].UI.announce.unknownPlayerError)
                            break
                    }
                }
            }
        })
        // events
        states.video.videoBinding.on(window.Hls.Events.FRAG_BUFFERED, () => {
            stopBuffering()
        })
    })
}

async function watching(channel) {
    /* sends the watching heartbeat event and refreshes the watching count */
    if (states.counterInterval) {
        window.clearInterval(states.counterInterval)
    }
    states.counterInterval = setInterval(() => {
        request("/watching/" + channel + "?id=" + String(states.watchingID))
            .then((data) => {
                if (data) {
                    states.watchingID = data.id
                    document.getElementById("realtimeCounter").innerText = data.count
                }
            })
    }, 3000)
}


async function nextChannel() {
    /* goes to the next channel */
    request("/channels/available")
        .then((availableChannels) => {
            if (availableChannels) {
                let channelIndex = nextElement(availableChannels, states.currentChannel)
                let channel = availableChannels[channelIndex]
                watch(channel)
                goToWatch()
            } else {
                newInfo(localization[states.language].UI.announce.noAvailableChannels)
            }
        })
}

async function previousChannel() {
    /* goes to the previous channel */
    request("/channels/available")
        .then((availableChannels) => {
            if (availableChannels) {
                let channelIndex = previousElement(availableChannels, states.currentChannel)
                let channel = availableChannels[channelIndex]
                watch(channel)
                goToWatch()
            } else {
                newInfo(localization[states.language].UI.announce.noAvailableChannels)
            }
        })
}

