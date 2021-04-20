const HOST = "https://japanterebi.vercel.app/japanterebi"

async function appendInvite(invite) {
    let newInvite = document.createElement("invite")
    newInvite.innerText = invite
    document.getElementById("invitesList").appendChild(newInvite)
}

window.onload = () => {
    reload()
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
        } else if (response.error == "AUTH_ERROR") {
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
        } else if (response.error == "AUTH_ERROR") {
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
    let intervalID = setInterval(function(){
        if (currentIndex == currentLength) {
            var newElement = document.createElement("p")
            newElement.setAttribute("class", "info")
            newElement.innerText = String(message)
            document.getElementsByTagName("body")[0].appendChild(newElement)
            setTimeout(function() {
                newElement.classList.add("show")
            }, 100)
            setTimeout(function (){
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
    let intervalID = setInterval(function(){
        if (currentIndex == currentLength) {
            var newElement = document.createElement("p")
            newElement.setAttribute("class", "success")
            newElement.innerText = String(message)
            document.getElementsByTagName("body")[0].appendChild(newElement)
            setTimeout(function() {
                newElement.classList.add("show")
            }, 100)
            setTimeout(function (){
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
    let intervalID = setInterval(function(){
        if (currentIndex == currentLength) {
            var newElement = document.createElement("p")
            newElement.setAttribute("class", "error")
            newElement.innerText = String(message)
            document.getElementsByTagName("body")[0].appendChild(newElement)
            setTimeout(function() {
                newElement.classList.add("show")
            }, 100)
            setTimeout(function (){
                newElement.classList.remove("show")
                currentIndex += 1
            }, 5100)
            clearInterval(intervalID)
        }
    }, 100)
}
