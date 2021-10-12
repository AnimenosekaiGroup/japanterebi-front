/** COPYRIGHT © ANIME NO SEKAI, 2021
 * Author: Anime no Sekai
 * Author Github: https://github.com/Animenosekai
 * Repository: https://github.com/AnimenosekaiGroup/japanterebi-front (private)
 * Year: 2021
 * Last Update: 20th April 2021
 * Version: v2.0
 * Experimental Version: v2.0 (α) (Upscale)
 * Project: Japan Terebi v4
 */

// ONLOAD: initializing the page
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const channel = urlParams.get("channel");
    const page = urlParams.get("page");
    buffering()
    addAuth() // verify the authentification
    checkOrientation(window.matchMedia("(orientation: portrait)"))
    //addHome()
    //addEPG()
    //defineEvents() // defining all of the events
    if (page == "watch") {
        goToWatch()
    } else if (page == "guide") {
        goToGuide()
    } else {
        goToHome() // defaults to home
    }
    request("/channels/available")
        .then((data) => {
            if (data && (data.length > 0)) {
                if (channel && (data.includes(channel))) {
                    watch(channel)
                } else {
                    watch(data[0]) // defaults to the first channel available
                }
            } else {
                newInfo(localization[states.language].Requests.errors.channels.available)
            }
        })
    request("/announcement")
        .then((data) => {
            if (data && data.message) {
                let hashValue = md5(String(data))
                if (localStorage.getItem("announcement") == hashValue && !data.persistent) {
                    console.info("Announcement already announced")
                } else {
                    if (states.language in data && data[states.language]) {
                        newInfo(data[states.language])
                    } else if (data.message) {
                        newInfo(data.message)
                    }
                }
                localStorage.setItem("announcement", hashValue)
            }
        })
    checkVersion()
    setInterval(refreshCache, 900000) // refresh the cache every 15 minutes
    setInterval(refreshActiveCache, 300000) // refresh the cache every 5 minutes
    setInterval(checkBuffering, 100) // do not use values lower than 50ms as the offset will not suffice
    setInterval(checkStatus, 30000) // check the api status
    setInterval(checkVersion, 900000) // checks for the front version every 15 minutes
}

async function checkVersion() {
    try {
        if (!constants.version.commit) {
            constants.version.commit = commit // created during compilation
        }

        if (constants.version.commit) { // can be null
            let text = "© {author} — {year} ".format({ "author": constants.credits.author, "year": constants.credits.year.toString() })
            text += constants.version.display.format({ "version": constants.version.version, "commit": '<a href="' + constants.credits.repo + '" target="_blank">' + constants.version.commit.substring(0, 7) + "</a>" })
            document.getElementById("credits").innerHTML = text
            request("/version")
                .then((data) => {
                    if (data && data.commit && (data.commit != constants.version.commit)) {
                        let message = localization[states.language].UI.announce.newVersionAvailable
                        newInfo(message)
                        text += " ({message})".format({ "message": message })
                        document.getElementById("credits").innerHTML = text
                    }
                })
        } else {

        }
    } catch { console.warn("Could not verify the current version") }
}

async function watch(channel) {
    if (channel != states.currentChannel) {
        buffering()
        try {
            switchHomeProgram(channel)
        } catch { console.warn("[non critical] Error while switching home") }
        request("/channels")
            .then((channelsData) => {
                if (channelsData) {
                    if (channel in channelsData) {
                        states.currentStream = constants.STREAM_HOST.format({ channel: channel, token: window.localStorage.getItem("__japanterebi_auth") })
                        if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) { // fallback for safari and browsers supporting HLS natively
                            watchWithNative(states.currentStream)
                        } else if (Hls.isSupported()) { // hls.js
                            watchWithHLSJS(states.currentStream)
                        } else { // if nothing is available
                            newInfo(localization[states.language].UI.announce.browserNotCompatible)
                            return
                        }
                        states.currentChannel = channel
                        watching(channel)
                        playVideo()
                        try {
                            var queryParams = new URLSearchParams(window.location.search);
                            queryParams.set("channel", channel);
                            history.replaceState(null, null, "?" + queryParams.toString());
                            document.getElementById("siteTitle").innerText = "{channel} — Japan Terebi".format({
                                channel: channelsData[channel].name[localization[states.language].channelNameLanguage]
                            })
                            /*
                            request("/channels")
                                .then((channelsData) => {
                                    if (channelsData) {
                                    }
                                })
                            */
                        } catch { }
                        document.getElementById("channelName").innerText = channelsData[channel].name.stylized
                        document.getElementById("responsiveChannel").innerText = channelsData[channel].name.stylized
                        document.getElementById("responsiveLogo").src = constants.LOGO_HOST.format({ channel: channel })
                        document.getElementById("repsonsiveProgram").innerText = localization[states.language].UI.dynamic.home.currentlyAiring.format({ channel: channelsData[channel].name[localization[states.language].channelNameLanguage] })
                        request("/guide/now")
                            .then((data) => {
                                if (data) {
                                    let found = false
                                    for (programIndex in data) {
                                        if (data[programIndex].channel == channel) {
                                            found = true
                                            let titleLength = data[programIndex].title.length
                                            let titleFontSize = "x-large"
                                            if (titleLength > 30) {
                                                titleFontSize = "medium"
                                            } else if (titleLength > 20) {
                                                titleFontSize = "large"
                                            } else if (titleLength > 10) {
                                                titleFontSize = "larger"
                                            }
                                            document.getElementById("responsiveChannel").innerText = data[programIndex].title
                                            document.getElementById("responsiveChannel").setAttribute("style", "font-size: {size}".format({ size: titleFontSize }))
                                            let description = data[programIndex].description
                                            if (localization[states.language].translateDescription) {
                                                translate(description, localization[states.language].language)
                                                    .then((result) => {
                                                        document.getElementById("responsiveDescription").innerText = result
                                                    })
                                            } else {
                                                document.getElementById("responsiveDescription").innerText = description
                                            }
                                            break
                                        }
                                    }
                                    if (!found) {
                                        document.getElementById("responsiveDescription").innerText = localization[states.language].UI.dynamic.home.noprogram.description
                                    }
                                } else {
                                    document.getElementById("responsiveDescription").innerText = localization[states.language].UI.dynamic.home.noprogram.description
                                }
                            })
                    } else {
                        newInfo(localization[states.language].UI.announce.unknownChannel)
                    }
                }
            })
    }
}


async function mouseMoved() {
    if (states.currentPage != "watch") {
        // document.getElementById("tvplayer").classList.add("hidden-cursor");
        document.getElementById("controls").classList.add("hidden-controls");
        document.getElementById("previousChannel").classList.add("hidden-channel-arrows");
        document.getElementById("nextChannel").classList.add("hidden-channel-arrows");
        document.getElementById("information").classList.add("hidden-information");
        document.getElementById("header").classList.remove("hidden-header");
        return
    }
    states.mouseMovementIndex += 1;
    let movement = states.mouseMovementIndex;
    document.getElementById("tvplayer").classList.remove("hidden-cursor");
    document.getElementById("controls").classList.remove("hidden-controls");
    document.getElementById("previousChannel").classList.remove("hidden-channel-arrows");
    document.getElementById("nextChannel").classList.remove("hidden-channel-arrows");
    document.getElementById("information").classList.remove("hidden-information");
    document.getElementById("header").classList.remove("hidden-header");
    setTimeout(() => {
        if (movement == states.mouseMovementIndex) {
            document.getElementById("tvplayer").classList.add("hidden-cursor");
            document.getElementById("controls").classList.add("hidden-controls");
            document.getElementById("previousChannel").classList.add("hidden-channel-arrows");
            document.getElementById("nextChannel").classList.add("hidden-channel-arrows");
            document.getElementById("information").classList.add("hidden-information");
            if (states.currentPage == "watch") {
                document.getElementById("header").classList.add("hidden-header");
            }
        }
    }, 3000);
}


async function shortcutHandler(event) {
    /**
     * handling all of the shortcuts
     */
    if (["currentPassword", "newPassword", "accountName"].includes(document.activeElement.id)) {  // check if the user is typing in one of the inputs
        setTimeout(() => {
            if (document.activeElement.value != "") {
                if (event.key == "Enter") {
                    document.activeElement.nextElementSibling.click()
                }
                document.activeElement.nextElementSibling.classList.add("show-submit-button")
                document.activeElement.nextElementSibling.classList.add("submit-button-pointerevent")
            } else {
                document.activeElement.nextElementSibling.classList.remove("show-submit-button")
                document.activeElement.nextElementSibling.classList.remove("submit-button-pointerevent")
            }
        }, 50);
        return
    }
    switch (event.key) {
        case "f":
            fullscreen()
            break;
        case "ArrowRight":
            if (states.switchConfirmation != "next") {
                states.switchConfirmation = "next"
                newInfo(localization[states.language].UI.announce.nextChannelSwitch)
                setTimeout(() => { states.switchConfirmation = "" }, 5000)
            } else { nextChannel() }
            break;
        case "ArrowLeft":
            if (states.switchConfirmation != "previous") {
                states.switchConfirmation = "previous"
                newInfo(localization[states.language].UI.announce.previousChannelSwitch)
                setTimeout(() => { states.switchConfirmation = "" }, 5000)
            } else { previousChannel() }
            break;
        case "m":
            volume()
            break;
        case "w":
            if (states.currentPage != "watch") { goToWatch() }
            break;
        case "h":
            if (states.currentPage != "home") { goToHome() }
            break;
        case "g":
            if (states.currentPage != "guide") { goToGuide() }
            break;
        case " ":
            if (states.currentPage == "watch") { playPause() }
            break;
        case "r":
            if (states.currentPage == "watch") { reloadVideo() }
            break;

        default:
            break;
    }
}




// PAGES //

async function goToHome() {
    if (states.currentPage == "watch") {
        states.video.lastAudioVolume = document.getElementById("videoPlayer").volume
    }
    states.currentPage = "home"

    const currentPageElem = document.getElementById("currentPage")
    currentPageElem.classList.remove("current-page-watch")
    currentPageElem.classList.remove("current-page-guide")
    currentPageElem.classList.add("current-page-home")

    document.getElementById("videoPlayer").volume = constants.NON_FOCUS_VOLUME

    document.getElementById("more").classList.add("hidden-more")
    document.getElementById("header").classList.remove("hidden-header")
    document.getElementById("homeContainer").classList.remove("home-hidden")
    document.getElementById("nextChannel").classList.add("hidden-channel-arrows")
    document.getElementById("previousChannel").classList.add("hidden-channel-arrows")

    document.getElementById("tvplayer").style.pointerEvents = "none"

    document.getElementById("returnBackButton").style.transform = "scale(1)"

    document.getElementById("epgProgramInformation").style.display = "none"

    try {
        var queryParams = new URLSearchParams(window.location.search);
        queryParams.set("page", "home");
        history.replaceState(null, null, "?" + queryParams.toString());
    } catch { }

    if (window.matchMedia("(orientation: portrait)").matches) {
        goToWatch()
    }
}

async function goToWatch() {
    states.currentPage = "watch"
    document.getElementById("videoPlayer").volume = states.video.lastAudioVolume

    const currentPageElem = document.getElementById("currentPage")
    currentPageElem.classList.remove("current-page-home")
    currentPageElem.classList.remove("current-page-guide")
    currentPageElem.classList.add("current-page-watch")
    document.getElementById("nextChannel").classList.remove("hidden-channel-arrows")
    document.getElementById("previousChannel").classList.remove("hidden-channel-arrows")


    document.getElementById("homeContainer").classList.add("home-hidden")
    document.getElementById("more").classList.add("hidden-more")
    mouseMoved()
    document.getElementById("tvplayer").style.pointerEvents = "all"

    document.getElementById("returnBackButton").style.transform = "scale(1)"

    document.getElementById("epgProgramInformation").style.display = "none"

    try {
        var queryParams = new URLSearchParams(window.location.search);
        queryParams.set("page", "watch");
        history.replaceState(null, null, "?" + queryParams.toString());
    } catch { }
}

async function goToGuide() {
    if (states.currentPage == "watch") {
        states.video.lastAudioVolume = document.getElementById("videoPlayer").volume
    }
    states.currentPage = "guide"

    const currentPageElem = document.getElementById("currentPage")
    currentPageElem.classList.remove("current-page-home")
    currentPageElem.classList.remove("current-page-watch")
    currentPageElem.classList.add("current-page-guide")

    document.getElementById("videoPlayer").volume = constants.NON_FOCUS_VOLUME

    document.getElementById("homeContainer").classList.add("home-hidden")
    document.getElementById("header").classList.remove("hidden-header")
    document.getElementById("more").classList.remove("hidden-more")
    document.getElementById("nextChannel").classList.add("hidden-channel-arrows")
    document.getElementById("previousChannel").classList.add("hidden-channel-arrows")

    document.getElementById("tvplayer").style.pointerEvents = "none"

    document.getElementById("returnBackButton").style.transform = "scale(1.05)"

    document.getElementById("epgProgramInformation").style.display = "flex"

    try {
        var queryParams = new URLSearchParams(window.location.search);
        queryParams.set("page", "guide");
        history.replaceState(null, null, "?" + queryParams.toString());
    } catch { }
}

async function addAuth() {
    request("/account")
        .then((data) => {
            if (data) {
                document.getElementById("accountName").value = data.username
                document.getElementById("accountInvite").innerText = data.invite
                if (window.localStorage.getItem("lang") && window.localStorage.getItem("lang-edit") && Date.now() - parseInt(window.localStorage.getItem("lang-edit")) < 3600000) {
                    loadLanguage(localStorage.getItem("lang"))
                    document.getElementById("accountLanguage").value = localStorage.getItem("lang")
                    try {
                        document.getElementById("accountLanguage").querySelector("option[value=\"{value}\"]".format({ value: localStorage.getItem("lang") })).setAttribute("selected", "")
                    } catch { console.warn("No such language option") }
                } else {
                    loadLanguage(data.language)
                    document.getElementById("accountLanguage").value = data.language
                    try {
                        document.getElementById("accountLanguage").querySelector("option[value=\"{value}\"]".format({ value: data.language })).setAttribute("selected", "")
                    } catch { console.warn("No such language option") }
                }
            }
        })
    request("/account/picture", document.getElementById("accountPicture"))
}

async function showCurrentPasswordInput() {
    document.getElementById("changePasswordRequest").classList.add("hidden-password-request")
    setTimeout(() => {
        document.getElementById("changePasswordRequest").classList.add("unload")
        document.getElementById("currentPassword").classList.remove("unload")
        document.getElementById("currentPasswordSubmitButton").classList.add("submit-button-load")
        setTimeout(() => {
            document.getElementById("currentPassword").classList.add("input-container-shown")
        }, 50)
    }, 100)
}

async function showNewPasswordInput() {
    document.getElementById("currentPassword").classList.add("password-input-hidden")
    document.getElementById("currentPasswordSubmitButton").classList.remove("show-submit-button")
    document.getElementById("currentPasswordSubmitButton").classList.remove("submit-button-pointerevent")
    setTimeout(() => {
        document.getElementById("currentPasswordSubmitButton").classList.remove("submit-button-load")
        document.getElementById("currentPassword").classList.add("unload")
        document.getElementById("newPassword").classList.remove("unload")
        document.getElementById("newPasswordSubmitButton").classList.add("submit-button-load")
        setTimeout(() => {
            document.getElementById("newPassword").classList.add("input-container-shown")
        }, 50)
    }, 250);
}

async function changePassword() {
    document.getElementById("newPassword").classList.add("password-input-hidden")
    document.getElementById("newPasswordSubmitButton").classList.remove("show-submit-button")
    document.getElementById("newPasswordSubmitButton").classList.remove("submit-button-pointerevent")
    setTimeout(() => {
        document.getElementById("newPasswordSubmitButton").classList.remove("submit-button-load")
        document.getElementById("newPassword").classList.add("unload")
        document.getElementById("changePasswordRequest").classList.remove("unload")
        setTimeout(() => {
            document.getElementById("changePasswordRequest").classList.remove("hidden-password-request")
            document.getElementById("currentPassword").classList.remove("input-container-shown")
            document.getElementById("currentPassword").classList.remove("password-input-hidden")
            document.getElementById("newPassword").classList.remove("input-container-shown")
            document.getElementById("newPassword").classList.remove("password-input-hidden")
        }, 50);
    }, 250);
    request("/account/change/password?password={currentPassword}&newPassword={newPassword}".format({
        currentPassword: document.getElementById("currentPassword").value,
        newPassword: document.getElementById("newPassword").value
    }), null, "POST")
        .then((data) => {
            document.getElementById("currentPassword").value = ""
            document.getElementById("newPassword").value = ""
            if (data) {
                newInfo(localization[states.language].Requests.success.account.change.password)
            }
        })
}

async function changeUsername() {
    request("/account/change/username?username={username}".format({
        username: document.getElementById("accountName").value
    }), null, "POST")
        .then((data) => {
            if (data) {
                newInfo(localization[states.language].Requests.success.account.change.username)
                window.localStorage.setItem("__japanterebi_auth", data.token)
            } else {
                addAuth()
            }
        })
}

async function changeLanguage() {
    loadLanguage(this.value)
    request("/account/change/language?language={lang}".format({ lang: this.value }), null, "POST")
}

async function addProfilePicture() {
    let newFileInput = document.createElement("input")
    newFileInput.type = "file"
    newFileInput.accept = "image/*"
    document.getElementsByTagName("body")[0].appendChild(newFileInput)
    newFileInput.addEventListener("change", () => {
        let requestBody = new FormData()
        requestBody.set("image", newFileInput.files[0])
        fetch(constants.MAIN_HOST + "/account/picture/new?token=" + localStorage.getItem("__japanterebi_auth"), {
            method: "POST",
            body: requestBody
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    newInfo(localization[states.language].Requests.success.account.picture.new)
                    request("/account/picture", document.getElementById("accountPicture"))
                } else {
                    newInfo(localization[states.language].Requests.errors.account.picture.new)
                }
                newFileInput.remove()
            })
            .catch((error) => {
                newFileInput.remove()
            })
    }, false)
    newFileInput.click()
}