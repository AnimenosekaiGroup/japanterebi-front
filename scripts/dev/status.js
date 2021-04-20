/**
 * Status.js
 * Checks for the APIs status
 * 
 * © Anime no Sekai — 2021
 */

function getStatusFromCode(code) {
    switch (code) {
        case 0:
            return "paused"
        case 1:
            return "notCheckedYet"
        case 2:
            return "up"
        case 8:
            return "seemsDown"
        case 9:
            return "down"
        default:
            return "unknown"
    }
}

function getColorFromStatus(status) {
    switch (status) {
        case "up":
            return null
        case "seemsDown":
        case "down":
            return "is-error"
        default:
            return "is-grey"
    }
}

async function checkStatus() {
    fetch("https://api.uptimerobot.com/v2/getMonitors?api_key=m787817878-b8981da3cd50ccafba042058", {
        method: "POST"
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.stat == "ok") {
            const status = getStatusFromCode(data.monitors[0].status)
            const color = getColorFromStatus(status)
            document.getElementById("mainStatusDot").classList.remove("is-error")
            document.getElementById("mainStatusDot").classList.remove("is-grey")
            if (color) {
                document.getElementById("mainStatusDot").classList.add(color)
            }
            document.getElementById("mainStatusText").innerText = localization[states.language].UI.dynamic.more.status[status]
        } else {
            document.getElementById("mainStatusDot").classList.remove("is-error")
            document.getElementById("mainStatusDot").classList.remove("is-grey")
            document.getElementById("mainStatusDot").classList.add("is-grey")
            document.getElementById("mainStatusText").innerText = localization[states.language].UI.dynamic.more.status.unknown
        }
    })
    fetch("https://api.uptimerobot.com/v2/getMonitors?api_key=m787903761-eee8bc3c1af299a23226af9f", {
        method: "POST"
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.stat == "ok") {
            const status = getStatusFromCode(data.monitors[0].status)
            const color = getColorFromStatus(status)
            document.getElementById("channelsStatusDot").classList.remove("is-error")
            document.getElementById("channelsStatusDot").classList.remove("is-grey")
            if (color) {
                document.getElementById("channelsStatusDot").classList.add(color)
            }
            document.getElementById("channelsStatusText").innerText = localization[states.language].UI.dynamic.more.status[status]
        } else {
            document.getElementById("channelsStatusDot").classList.remove("is-error")
            document.getElementById("channelsStatusDot").classList.remove("is-grey")
            document.getElementById("channelsStatusDot").classList.add("is-grey")
            document.getElementById("channelsStatusText").innerText = localization[states.language].UI.dynamic.more.status.unknown
        }
    })
}