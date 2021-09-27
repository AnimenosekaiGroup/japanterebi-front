const HOST = "https://japanterebi.vercel.app/japanterebi"

async function appendInvite(invite) {
    let newInvite = document.createElement("invite")
    newInvite.innerText = invite
    document.getElementById("invitesList").appendChild(newInvite)
}

window.onload = () => {
    reload()
    reloadAnnouncement()
}

async function reload() {
    fetch(HOST + "/invites?token=" + localStorage.getItem("__japanterebi_auth"))
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                while (document.getElementById("invitesList").firstChild) {
                    document.getElementById("invitesList").removeChild(document.getElementById("invitesList").firstChild);
                }
                for (index in response.data) {
                    appendInvite(response.data[index])
                }
            } else if (response.error == "AUTH_ERROR") {
                newError("You don't seem to be correctly logged in")
            } else {
                newError("An error occured")
            }
        })
}

async function add() {
    fetch(HOST + "/invites?token=" + localStorage.getItem("__japanterebi_auth") + "&new=true")
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                newSuccess("Successfully created an invite")
                while (document.getElementById("invitesList").firstChild) {
                    document.getElementById("invitesList").removeChild(document.getElementById("invitesList").firstChild);
                }
                for (index in response.data) {
                    appendInvite(response.data[index])
                }
            } else if (response.error == "AUTH_ERROR") {
                newError("You don't seem to be correctly logged in")
            } else {
                newError("An error occured")
            }
        })
}

async function submitAnnouncement() {
    let params = ""
    if (document.getElementById("currentAnnouncement").value != "") {
        params += "&message=" + encodeURIComponent(document.getElementById("currentAnnouncement").value)
    }
    if (document.getElementById("enAnnouncement").value != "") {
        params += "&en=" + encodeURIComponent(document.getElementById("enAnnouncement").value)
    }
    if (document.getElementById("frAnnouncement").value != "") {
        params += "&fr=" + encodeURIComponent(document.getElementById("frAnnouncement").value)
    }
    if (document.getElementById("jaAnnouncement").value != "") {
        params += "&ja=" + encodeURIComponent(document.getElementById("jaAnnouncement").value)
    }
    if (document.getElementById("persistentAnnouncement").value != "") {
        params += "&persistent=" + encodeURIComponent(document.getElementById("persistentAnnouncement").value)
    }
    fetch(HOST + "/announcement/new?token=" + localStorage.getItem("__japanterebi_auth") + params)
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                newSuccess("Successfully added a new announcement")
            } else if (response.error == "AUTH_ERROR") {
                newError("You don't seem to be correctly logged in")
            } else {
                newError("An error occured")
            }
        })
}

async function resetAnnouncement() {
    fetch(HOST + "/announcement/reset?token=" + localStorage.getItem("__japanterebi_auth"))
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                newSuccess("Successfully reset the announcement")
                document.getElementById("currentAnnouncement").value = ""
                document.getElementById("enAnnouncement").value = ""
                document.getElementById("frAnnouncement").value = ""
                document.getElementById("jaAnnouncement").value = ""
                document.getElementById("persistentAnnouncement").value = ""
            } else if (response.error == "AUTH_ERROR") {
                newError("You don't seem to be correctly logged in")
            } else {
                newError("An error occured")
            }
        })
}

async function reloadAnnouncement() {
    fetch(HOST + "/announcement?token=" + localStorage.getItem("__japanterebi_auth"))
        .then((response) => response.json())
        .then((response) => {
            if (response.success) {
                if (response.data.message) {
                    document.getElementById("currentAnnouncement").value = response.data.message
                }
                if (response.data.en) {
                    document.getElementById("enAnnouncement").value = response.data.en
                }
                if (response.data.ja) {
                    document.getElementById("jaAnnouncement").value = response.data.ja
                }
                if (response.data.fr) {
                    document.getElementById("frAnnouncement").value = response.data.fr
                }
                if (response.data.persistent) {
                    document.getElementById("persistentAnnouncement").value = "true"
                } else {
                    document.getElementById("persistentAnnouncement").value = "false"
                }
            } else if (response.error == "AUTH_ERROR") {
                newError("You don't seem to be correctly logged in")
            } else {
                newError("An error occured")
            }
        })
}


/*********** INFO BOX */


var messagesQueue = []
var currentIndex = 1

/** **/

async function newInfo(message) {
    console.log(message)
    messagesQueue.push(message)
    let currentLength = messagesQueue.length
    let intervalID = setInterval(function () {
        if (currentIndex == currentLength) {
            var newElement = document.createElement("p")
            newElement.setAttribute("class", "info")
            newElement.innerText = String(message)
            document.getElementsByTagName("body")[0].appendChild(newElement)
            setTimeout(function () {
                newElement.classList.add("show")
            }, 100)
            setTimeout(function () {
                newElement.classList.remove("show")
                currentIndex += 1
            }, 5100)
            clearInterval(intervalID)
        }
    }, 100)
}

async function newSuccess(message) {
    console.log(message)
    messagesQueue.push(message)
    let currentLength = messagesQueue.length
    let intervalID = setInterval(function () {
        if (currentIndex == currentLength) {
            var newElement = document.createElement("p")
            newElement.setAttribute("class", "success")
            newElement.innerText = String(message)
            document.getElementsByTagName("body")[0].appendChild(newElement)
            setTimeout(function () {
                newElement.classList.add("show")
            }, 100)
            setTimeout(function () {
                newElement.classList.remove("show")
                currentIndex += 1
            }, 5100)
            clearInterval(intervalID)
        }
    }, 100)
}

async function newError(message) {
    console.error(message)
    messagesQueue.push(message)
    let currentLength = messagesQueue.length
    let intervalID = setInterval(function () {
        if (currentIndex == currentLength) {
            var newElement = document.createElement("p")
            newElement.setAttribute("class", "error")
            newElement.innerText = String(message)
            document.getElementsByTagName("body")[0].appendChild(newElement)
            setTimeout(function () {
                newElement.classList.add("show")
            }, 100)
            setTimeout(function () {
                newElement.classList.remove("show")
                currentIndex += 1
            }, 5100)
            clearInterval(intervalID)
        }
    }, 100)
}
