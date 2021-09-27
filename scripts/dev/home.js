/**
 * Home.js
 * Creates and manages the Home page
 * 
 * © Anime no Sekai — 2021
 */


async function switchHomeProgram(tile) {
    /* goes to the given channel tile in the home page */

    // getting the channel ID
    let channel = tile
    if (typeof tile == "object") {
        try {
            channel = tile.getAttribute("channel")
        } catch {
            channel = tile["id"]
        }
    }

    const program = document.getElementById("program_" + channel)

    if (program) {
        // hiding every other information containers
        Array.prototype.forEach.call(document.getElementsByClassName("home-program-visible"), function (element) {
            if (element != program) {
                element.classList.remove("home-program-visible")
            }
        })

        // showing the right information container
        setTimeout(function () {
            Array.prototype.forEach.call(document.getElementsByClassName("home-program-load"), function (element) {
                if (element != program) {
                    element.classList.remove("home-program-load")
                }
            })
            program.classList.add("home-program-load")
            setTimeout(function () {
                program.classList.add("home-program-visible")
            }, 10)
        }, 50)
    }
}

async function createDummyProgram(channelsData, channel, addMargin = false, addBefore = false) {
    /* creates a dummy program to fill the home page even when there is no program in the db */
    // creating a home program element
    let newProgram = document.createElement("program")
    newProgram.setAttribute("id", "program_" + channel)
    newProgram.setAttribute("class", "home-program")

    // creating a home program tile element
    let newProgramTitle = document.createElement("program-title")
    newProgramTitle.setAttribute("class", "home-program-title home-program-title-size-large")
    newProgramTitle.innerText = localization[states.language].UI.dynamic.home.noprogram.title

    // creating a home program description element
    let newProgramDescription = document.createElement("program-description")
    newProgramDescription.setAttribute("class", "home-program-description")
    newProgramDescription.innerText = localization[states.language].UI.dynamic.home.noprogram.description

    // creating a home program channel name element
    let newProgramChannel = document.createElement("program-channel")
    newProgramChannel.setAttribute("class", "home-program-channel")
    newProgramChannel.innerText = localization[states.language].UI.dynamic.home.currentlyAiring.format({ channel: channelsData[channel].name[localization[states.language].channelNameLanguage] })

    // appending everything
    newProgram.appendChild(newProgramTitle)
    newProgram.appendChild(newProgramDescription)
    newProgram.appendChild(newProgramChannel)
    document.getElementById("programDetails").appendChild(newProgram)

    // creating a new program tile (bottom)
    let newTile = document.createElement("tile")
    newTile.setAttribute("class", "home-tile")

    // creating a new tile media element
    let newTileMedia = document.createElement("tile-media")
    newTileMedia.setAttribute("class", "home-tile-media")

    // creating a new thumbnail element
    let newImg = document.createElement("img")
    request("/channels/thumbnail/" + channel, newImg)
    //newImg.setAttribute("src", constants.MAIN_HOST + "/channels/thumbnail/" + channel)
    newImg.setAttribute("class", "home-tile-img")

    // creating a new logo element
    let newLogo = document.createElement("img")
    newLogo.setAttribute("src", constants.LOGO_HOST.format({ channel: channel }))
    newLogo.setAttribute("class", "home-tile-logo")
    newTileMedia.appendChild(newLogo)
    newTileMedia.appendChild(newImg)

    // creating a new tile footer element
    let newTileFooter = document.createElement("tile-footer")
    newTileFooter.setAttribute("class", "home-tile-details")

    // creating a new tile title element
    let newTileTitle = document.createElement("tile-title")
    newTileTitle.setAttribute("class", "home-tile-title")

    newTileTitle.innerText = localization[states.language].UI.dynamic.home.noprogram.tileTitle

    // appending everything
    newTileFooter.appendChild(newTileTitle)
    newTile.appendChild(newTileMedia)
    newTile.appendChild(newTileFooter)

    newTile.setAttribute("channel", channel)
    newTile.setAttribute("onmouseover", "switchHomeProgram(this)")
    newTile.setAttribute("ontouchstart", "switchHomeProgram(this)")
    newTile.setAttribute("onclick", "watch('" + channel + "'); goToWatch()")

    document.getElementById("tilesRowInner").appendChild(newTile)

    if (addMargin) {
        newTile.setAttribute("style", "margin-right: 100px;")
    }
    if (addBefore) {
        newTile.setAttribute("style", "margin-left: 50px;")
    }
}

async function addHome() {
    /* creates the home page */
    request("/channels")
        .then((channelsData) => {
            if (channelsData) {
                request("/channels/available")
                    .then((availableChannels) => {
                        if (availableChannels) {
                            request("/guide/now")
                                .then((data) => {
                                    const channelsToDo = JSON.parse(JSON.stringify(availableChannels))
                                    const channelsLength = channelsToDo.length
                                    // cleaning up
                                    while (document.getElementById("programDetails").firstChild) {
                                        document.getElementById("programDetails").removeChild(document.getElementById("programDetails").firstChild);
                                    }
                                    while (document.getElementById("tilesRowInner").firstChild) {
                                        document.getElementById("tilesRowInner").removeChild(document.getElementById("tilesRowInner").firstChild);
                                    }
                                    let firstDone = false
                                    if (data) {
                                        for (programIndex in data) {
                                            let program = data[programIndex]
                                            if (availableChannels.includes(program.channel)) {
                                                // creating a home program element
                                                let newProgram = document.createElement("program")
                                                newProgram.setAttribute("id", "program_" + program.channel)
                                                newProgram.setAttribute("class", "home-program")

                                                // creating a home program tile element
                                                let newProgramTitle = document.createElement("program-title")
                                                newProgramTitle.setAttribute("class", "home-program-title")
                                                newProgramTitle.innerText = program.title.split("\n").join(" ")
                                                let titleLength = program.title.length
                                                let titleFontSize = "home-program-title-size-large"
                                                if (titleLength > 30) {
                                                    titleFontSize = "home-program-title-size-small"
                                                } else if (titleLength > 20) {
                                                    titleFontSize = "home-program-title-size-medium"
                                                } else if (titleLength > 10) {
                                                    titleFontSize = "home-program-title-size-normal"
                                                }

                                                newProgramTitle.classList.add(titleFontSize)

                                                // creating a home program description element
                                                let newProgramDescription = document.createElement("program-description")
                                                newProgramDescription.setAttribute("class", "home-program-description")
                                                let description = program.description.split("\n").join(" ")
                                                if (localization[states.language].translateDescription) {
                                                    translate(description, localization[states.language].language)
                                                        .then((result) => {
                                                            description = result
                                                            if (description.length > 160) {
                                                                description = description.substring(0, 160) + "..."
                                                            }
                                                            newProgramDescription.innerText = description
                                                        })
                                                } else {
                                                    if (description.length > 160) {
                                                        description = description.substring(0, 160) + "..."
                                                    }
                                                    newProgramDescription.innerText = description
                                                }


                                                // creating a home program channel name element
                                                let newProgramChannel = document.createElement("program-channel")
                                                newProgramChannel.setAttribute("class", "home-program-channel")
                                                newProgramChannel.innerText = localization[states.language].UI.dynamic.home.currentlyAiring.format({ channel: channelsData[program.channel].name[localization[states.language].channelNameLanguage] })

                                                // appending everything
                                                newProgram.appendChild(newProgramTitle)
                                                newProgram.appendChild(newProgramDescription)
                                                newProgram.appendChild(newProgramChannel)
                                                document.getElementById("programDetails").appendChild(newProgram)

                                                // creating a new program tile (bottom)
                                                let newTile = document.createElement("tile")
                                                newTile.setAttribute("class", "home-tile")

                                                // creating a new tile media element
                                                let newTileMedia = document.createElement("tile-media")
                                                newTileMedia.setAttribute("class", "home-tile-media")

                                                // creating a new thumbnail element
                                                let newImg = document.createElement("img")
                                                request("/channels/thumbnail/" + program.channel, newImg)
                                                //newImg.setAttribute("src", constants.MAIN_HOST + "/channels/thumbnail/" + program.channel)
                                                newImg.setAttribute("class", "home-tile-img")

                                                // creating a new logo element
                                                let newLogo = document.createElement("img")
                                                newLogo.setAttribute("src", constants.LOGO_HOST.format({ channel: program.channel }))
                                                newLogo.setAttribute("class", "home-tile-logo")
                                                newTileMedia.appendChild(newLogo)
                                                newTileMedia.appendChild(newImg)

                                                // creating a new tile footer element
                                                let newTileFooter = document.createElement("tile-footer")
                                                newTileFooter.setAttribute("class", "home-tile-details")

                                                // creating a new tile title element
                                                let newTileTitle = document.createElement("tile-title")
                                                newTileTitle.setAttribute("class", "home-tile-title")

                                                let title = program.title
                                                if (title.length > 23) {
                                                    title = title.substring(0, 23) + "..."
                                                }
                                                newTileTitle.innerText = title

                                                // appending everything
                                                newTileFooter.appendChild(newTileTitle)
                                                newTile.appendChild(newTileMedia)
                                                newTile.appendChild(newTileFooter)

                                                newTile.setAttribute("channel", program.channel)
                                                newTile.setAttribute("onmouseover", "switchHomeProgram(this)")
                                                newTile.setAttribute("ontouchstart", "switchHomeProgram(this)")
                                                newTile.setAttribute("onclick", "watch('" + program.channel + "'); goToWatch()")

                                                document.getElementById("tilesRowInner").appendChild(newTile)

                                                let removingIndex = channelsToDo.indexOf(program.channel);
                                                if (removingIndex > -1) {
                                                    channelsToDo.splice(removingIndex, 1);
                                                }

                                                if (!firstDone) {
                                                    firstDone = true
                                                    switchHomeProgram(program.channel)
                                                    newTile.setAttribute("style", "margin-left: 50px;")
                                                } else if (programIndex == data.length - 1 && channelsToDo.length <= 0) {
                                                    newTile.setAttribute("style", "margin-right: 100px;")
                                                }
                                            }
                                        }
                                    }
                                    if (channelsLength == channelsToDo.length || !firstDone) {
                                        createDummyProgram(channelsData, channelsToDo[0], false, true)
                                        let removingIndex = channelsToDo.indexOf(program.channel);
                                        if (removingIndex > -1) {
                                            channelsToDo.splice(removingIndex, 1);
                                        }
                                    }
                                    for (channelIndex in channelsToDo) {
                                        if (channelIndex == channelsToDo.length - 1) {
                                            createDummyProgram(channelsData, channelsToDo[channelIndex], true)
                                        } else {
                                            createDummyProgram(channelsData, channelsToDo[channelIndex])
                                        }
                                    }
                                })
                        }
                    })
            }
        })
}