const HOST = "https://animenosekai.herokuapp.com/japanterebi"

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const invite = urlParams.get("invite");
    if (invite) {
        document.getElementById("inviteInput").value = invite
        setPage()
    } else {
        loginPage()
    }
}

function loginInputCallback(event) {
    if (event.key == "Enter" && String(document.getElementById("passwordInput").value).replace(" ", "") != "") {
        login()
    }
}

function setPasswordInputCallback(event) {
    if (event.key == "Enter" && String(document.getElementById("newPasswordInput").value).replace(" ", "") != "") {
        if (String(document.getElementById("inviteInput").value).replace(" ", "") != "") {
            setPassword()
        } else {
            document.getElementById("inviteInput").focus()
        }
    }
}

function setPage() {
    document.getElementById("loginPage").classList.add("hidden")
    document.getElementById("setPage").classList.remove("hidden")
}

function loginPage() {
    document.getElementById("setPage").classList.add("hidden")
    document.getElementById("loginPage").classList.remove("hidden")
}


function login() {
    document.getElementById("passwordInput").blur()
    var formData = new FormData();
    formData.append("username", document.getElementById("usernameInput").value)
    formData.append("password", document.getElementById("passwordInput").value)
    loading()
    fetch(HOST + "/login", {
        body: formData,
        method: "POST"
    })
    .then((resp) => resp.json())
    .then(function(data){
        notLoading()
        if ("token" in data) {
            window.localStorage.setItem("__japanterebi_account_token", data.token)
            newSuccess("Successfully logged in!")
            window.location.assign("/")
        } else if (data.error == "WRONG_PASSWORD") {
            document.getElementById("passwordInput").value = ""
            newError("Wrong Password")
        } else if (data.error == "ACCOUNT_NOT_FOUND") {
            document.getElementById("passwordInput").focus()
            newError("Account not found")
        } else {
            document.getElementById("passwordInput").focus()
            newError("An error occured while logging you in")
        }
    })
}

function setPassword() {
    document.getElementById("inviteInput").blur()
    document.getElementById("newPasswordInput").blur()
    var formData = new FormData();
    formData.append("username", document.getElementById("createUsernameInput").value)
    formData.append("password", document.getElementById("newPasswordInput").value)
    formData.append("invite", document.getElementById("inviteInput").value)
    loading()
    fetch(HOST + "/newAccount", {
        body: formData,
        method: "POST"
    })
    .then((resp) => resp.json())
    .then(function(data){
        notLoading()
        if ("token" in data) {
            window.localStorage.setItem("__japanterebi_account_token", data.token)
            newSuccess("Successfully logged in!")
            window.location.assign("/")
        } else if (data.error == "INVITE_NOT_FOUND") {
            document.getElementById("inviteInput").value = ""
            document.getElementById("inviteInput").focus()
            newError("This is the wrong invite")
        } else if (data.error == "INVITE_ALREADY_IN_USE"){
            document.getElementById("inviteInput").value = ""
            document.getElementById("inviteInput").focus()
            newError("The invite is already used by another account")
        } else {
            newError("An error occured while setting the password")
        }
    })
}

async function loading() {
    document.getElementById("loadingWrapper").classList.add("loading-wrapper-visible")
}

async function notLoading() {
    document.getElementById("loadingWrapper").classList.remove("loading-wrapper-visible")
}


/*********** INFO BOX */


var messagesQueue = []
var currentIndex = 1

/** **/

function newInfo(message) {
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

function newSuccess(message) {
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

function newError(message) {
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
