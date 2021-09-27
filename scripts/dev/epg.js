/**
 * EPG.js
 * Creates and manages the EPG (Electronic Program Guide)
 * It also handles the user interactions with the EPG
 * 
 * © Anime no Sekai — 2021
 */

let programRegistry = {}

async function hideInformation() {
    document.getElementById("epgProgramInformation").classList.remove("epg-program-information-container-shown")
}

async function showInformation(id) {
    request("/channels")
        .then((channelsData) => {
            if (channelsData) {
                if (id in programRegistry) {
                    document.getElementById("epgProgramInformationDescription").innerText = ""
                    document.getElementById("epgProgramInformationChannel").innerText = localization[states.language].UI.dynamic.more.information.channel.format({ channel: channelsData[programRegistry[id].channel].name[localization[states.language].channelNameLanguage] })
                    let startDate = new Date(programRegistry[id].startTime * 1000)
                    let startTime = String(startDate.getUTCHours()) + ":" + correctMinute(startDate.getUTCMinutes())
                    let endDate = new Date(programRegistry[id].endTime * 1000)
                    let endTime = String(endDate.getUTCHours()) + ":" + correctMinute(endDate.getUTCMinutes())
                    document.getElementById("epgProgramInformationTimestamp").innerText = localization[states.language].UI.dynamic.more.information.timestamp.format({ startTime: startTime, endTime: endTime })
                    document.getElementById("epgProgramInformationTitle").innerText = programRegistry[id].title
                    if (localization[states.language].translateDescription) {
                        translate(programRegistry[id].description, states.language)
                            .then((result) => {
                                document.getElementById("epgProgramInformationDescription").innerText = result
                            })
                    } else {
                        document.getElementById("epgProgramInformationDescription").innerText = programRegistry[id].description
                    }
                    if (typeof programRegistry[id].url === 'string' || programRegistry[id].url instanceof String) {
                        document.getElementById("epgProgramInformationURL").classList.remove("unload")
                        document.getElementById("epgProgramInformationURL").innerText = localization[states.language].UI.dynamic.more.information.url + "\n\n"
                        document.getElementById("epgProgramInformationURL").setAttribute("href", programRegistry[id].url)
                    } else {
                        document.getElementById("epgProgramInformationURL").classList.add("unload")
                    }
                    document.getElementById("epgProgramInformation").classList.add("epg-program-information-container-shown")
                } else {
                    newInfo(localization[states.language].UI.announce.noInformationForSelectedProgram)
                }
            }
        })
}

function createCurrenTime() {
    let newCurrentTime = document.createElement("epg-current-time")
    newCurrentTime.id = "epgCurrentTime"
    newCurrentTime.classList.add("epg-current-time")
    let newDateBar = document.createElement("date-bar")
    newDateBar.classList.add("epg-date-bar")
    let newTime = document.createElement("time")
    newTime.id = "epgCurrentTimeWrapper"
    newTime.classList.add("epg-time-wrapper")
    let newSpan = document.createElement("span")
    newSpan.id = "epgTimeSpan"
    newSpan.classList.add("epg-time-span")
    newTime.appendChild(newSpan)
    newDateBar.appendChild(newTime)
    newCurrentTime.appendChild(newDateBar)
    return newCurrentTime
}

async function addEPG() {
    /* This function creates the EPG */
    request("/channels/available")
        .then((availableChannels) => {
            if (availableChannels) {
                // clean up the epg
                while (document.getElementById("epgRows").firstChild) {
                    document.getElementById("epgRows").removeChild(document.getElementById("epgRows").firstChild);
                }
                while (document.getElementById("epgChannels").firstChild) {
                    document.getElementById("epgChannels").removeChild(document.getElementById("epgChannels").firstChild);
                }

                programRegistry = {}

                async function _createChannel(availableChannels, channelIndex) {
                    request("/guide/" + availableChannels[channelIndex] + "?epg=true")
                        .then((data) => {
                            try {
                                if (data) {
                                    channelName = availableChannels[channelIndex]
                                    // creating a channel row
                                    let newEPGChannel = document.createElement("epg-channel")
                                    newEPGChannel.setAttribute("class", "epg-channel")
                                    newEPGChannel.setAttribute("onclick", 'watch("' + channelName + '"); goToWatch()')
                                    let newEPGChannelImg = document.createElement("img")
                                    newEPGChannelImg.setAttribute("src", constants.LOGO_HOST.format({ channel: "bw/" + channelName }))
                                    newEPGChannelImg.setAttribute("alt", "{channel} logo".format({ channel: channelName }))
                                    newEPGChannelImg.setAttribute("class", "epg-channel-img")

                                    newEPGChannel.appendChild(newEPGChannelImg)
                                    document.getElementById("epgChannels").appendChild(newEPGChannel)

                                    let newRow = document.createElement("epg-row")
                                    newRow.setAttribute("class", "epg-row")
                                    for (program in data) {
                                        // adding each program
                                        newProgram = _createEPGProgram(data[program])
                                        if (newProgram) {
                                            newRow.appendChild(newProgram)
                                        }
                                    }
                                    document.getElementById("epgRows").appendChild(newRow)
                                    return
                                } else {
                                    return
                                }
                            } catch { return }
                        })
                        .catch((error) => {
                            return
                        })

                }

                for (channelIndex in availableChannels) {
                    _createChannel(availableChannels, channelIndex) // i need to do this because request() is async
                }
                async function wait() {
                    setTimeout(() => {
                        if (document.getElementById("epgRows").childElementCount < 1) {
                            wait()
                        } else {
                            document.getElementById("epgRows").firstElementChild.insertBefore(createCurrenTime(), document.getElementById("epgRows").firstElementChild.firstElementChild)
                            document.getElementById("epgRows").style.width = String(document.getElementById("epgTimes").firstElementChild.offsetWidth * 24) + "px"
                        }
                    }, 100)
                }
                wait()
                scrollToCurrentTime()
            }
        })
}



async function verifyEPGCurrentTime() {
    /**
     * This function manages the japan time synchronisation
     * this contains the current time display but also the "Return to current time" label display
     * 
     * Called in an interval of a short time (about 100ms)
     */
    //const totalWidth = 9600
    try {
        let currentDate = new Date()
        let japanDate = new Date((typeof currentDate === "string" ? new Date(currentDate) : currentDate).toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
        let japanSeconds = (japanDate.getSeconds() + (60 * japanDate.getMinutes()) + (3600 * japanDate.getHours()))
        let newLeft = (document.getElementById("epgTimes").firstElementChild.offsetWidth * 24 * japanSeconds) / 86400
        document.getElementById("epgTimeSpan").innerText = String(japanDate.getHours()) + ":" + correctMinute(japanDate.getMinutes())
        document.getElementById("epgCurrentTime").setAttribute("style", "left: " + String(newLeft) + "px;")
        if (isElementInViewport(document.getElementById("epgCurrentTimeWrapper"))) {
            document.getElementById("returnToCurrentTime").classList.add("hidden-epg-button")
        } else {
            document.getElementById("returnToCurrentTime").classList.remove("hidden-epg-button")
        }
    } catch { }
}

setInterval(verifyEPGCurrentTime, 100)

function _createEPGProgram(data) {
    /* Creates an EPG program element */
    if (data) {

        let programStartTime = new Date(data["startTime"] * 1000)
        let programEndTime = new Date(data["endTime"] * 1000)

        let duration = (Math.abs(programEndTime - programStartTime) / 1000) / 60 // returns the value in minutes
        duration = Math.round(duration / 5) * 5 // round to the nearest multiple of 5

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


        // adding to the registry
        let newID = createRandomID(16)
        async function checkID() {
            setTimeout(() => {
                if (newID in programRegistry) {
                    newID = createRandomID(16)
                    checkID()
                } else {
                    programRegistry[newID] = data
                    newEPGProgram.setAttribute("onclick", "showInformation('{id}')".format({ id: newID }))
                }
            }, 10);
        }
        checkID()

        // An hour is 400px
        let _width = ((duration * document.getElementById("epgTimes").firstElementChild.offsetWidth) / 60)

        newEPGProgram.setAttribute("style", "width: " + String(_width) + "px;")

        return newEPGProgram
    } else {
        return null
    }
}

async function scrollToCurrentTime() {
    /* result of clicking on the "Return to current time" label --> scrolls the EPG to the current japan time */
    let currentDate = new Date()
    let japanDate = new Date((typeof currentDate === "string" ? new Date(currentDate) : currentDate).toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
    let japanSeconds = (japanDate.getSeconds() + (60 * japanDate.getMinutes()) + (3600 * japanDate.getHours()))
    let newLeft = (9600 * japanSeconds) / 86400
    document.getElementById("epgContent").scrollTo({
        top: 0,
        left: newLeft,
        behavior: 'smooth'
    });
}
