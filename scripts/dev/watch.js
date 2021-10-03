/**
 * Watch.js
 * Handles the watching user interactions
 * Handles the watch experience
 * 
 * © Anime no Sekai — 2021
 */

async function watchWithNative(stream) {
    /* loads the stream with the native player */
    document.getElementById("videoPlayer").src = stream
    buffering()
}

async function watchWithHLSJS(stream) {
    /* loads the stream with the Hls.js */
    try {
        states.videoBinding.destroy();
    } catch { } // avoiding the if-else statement as the condition should only be met once
    states.videoBinding = new Hls({ debug: false });
    states.videoBinding.attachMedia(document.getElementById("videoPlayer"));
    states.videoBinding.on(Hls.Events.MEDIA_ATTACHED, () => {
        // load the channel
        states.videoBinding.loadSource(stream)
        // errors handling
        states.videoBinding.on(window.Hls.Events.ERROR, function (event, data) {
            if (states.currentStream == stream) {
                switch (data.details) {
                    case Hls.ErrorDetails.BUFFER_STALLED_ERROR:
                        buffering()
                        break
                    case Hls.ErrorDetails.MANIFEST_LOAD_ERROR:
                        if (document.getElementById("videoPlayer").canPlayType('application/vnd.apple.mpegurl')) {
                            setTimeout(function () {
                                states.videoBinding.destroy()
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
                            states.videoBinding.destroy()
                            watchWithNative(stream)
                        }, 100)
                    }
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            setTimeout(function () {
                                states.videoBinding.startLoad();
                            }, 100)
                            break
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            setTimeout(function () {
                                states.videoBinding.recoverMediaError();
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
        states.videoBinding.on(window.Hls.Events.FRAG_BUFFERED, () => {
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

