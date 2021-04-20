let language = "en"
const HOST = "https://japanterebi.vercel.app/japanterebi"
const localization = {
    "en": {
        "UI": {
            "title": "Japan Terebi — Login",
            "static": {
                "login": {
                    "title": "Login to Japan Terebi",
                    "placeholders": {
                        "username": "Username",
                        "password": "Password",
                    },
                    "buttons": {
                        "login": "Login",
                        "create": "Create Account"
                    }
                },
                "create": {
                    "title": "Create your account for Japan Terebi",
                    "placeholders": {
                        "invite": "Invite",
                        "username": "Username",
                        "password": "New Password",
                    },
                    "buttons": {
                        "submit": "Submit",
                        "login": "Go to Login"
                    }
                }
            },
            "announce": {
                "sessionExpired": "Your session expired.\nLog in once again to continue watching Japan Terebi!"
            }
        },
        "Requests": {
            "errors": {
                "SECTOR_NOT_FOUND": "An error occured while trying to request some information",
                "AUTH_ERROR": "We are sorry but to ensure your security, this session expired",
                "SERVER_ERROR": "We are sorry but an error occured on the server while processing a request",
                "UNKNOWN_ERROR": "We are sorry but an unknown error occured on the server",
                "NO_TOKEN": "We are sorry but we couldn't verify your request",
                "ACCOUNT_NOT_FOUND": "We couldn't find your account",
                "MISSING_ARG": "We are sorry but an error occured while sending a request",
                "WRONG_TOKEN": "We are sorry but your seem to have a wrong token",
                "NOT_FOUND": "We are sorry but something couldn't be found while requesting it",
                "WRONG_PASSWORD": "This seems to be the wrong password",
                "USERNAME_ALREADY_IN_USE": "This username is already taken",
                "INVITE_ALREADY_IN_USE": "This invite is already used by another account",
                "INVITE_NOT_FOUND": "We don't know this invite",
                "other": "An unknown error occured while processing your request",
            },
            "success": {
                "loggedIn": "Successfully logged in!"
            }
        }
    },
    "fr": {
        "language": "french",
        "version": "v2.0",
        "UI": {
            "title": "Japan Terebi — Se connecter",
            "static": {
                "login": {
                    "title": "Se connecter à Japan Terebi",
                    "placeholders": {
                        "username": "Nom d'utilisateur",
                        "password": "Mot de passe"
                    },
                    "buttons": {
                        "login": "Se connecter",
                        "create": "Créer un compte"
                    }
                },
                "create": {
                    "title": "Créez votre compte pour Japan Terebi",
                    "placeholders": {
                        "invite": "Invitation",
                        "username": "Nom d'utilisateur",
                        "password": "Mot de passe"
                    },
                    "buttons": {
                        "submit": "Soumettre",
                        "login": "Aller à la page de connexion"
                    }
                }
            },
            "announce": {
                "sessionExpired": "Votre session a expiré pour garantir la sécurité de votre compte.\nReconnectez vous pour continuer à regarder Japan Terebi!"
            }
        },
        "Requests": {
            "errors": {
                "SECTOR_NOT_FOUND": "Une erreur est survenue lors de la demande d'une information",
                "AUTH_ERROR": "Nous sommes désolé mais pour garantir la sécurité de votre compte, votre session a expiré",
                "SERVER_ERROR": "Nous sommes désolé mais une erreur est survenue au niveau du serveur",
                "UNKNOWN_ERROR": "Nous sommes désolé mais une erreur inconnue est survenue",
                "NO_TOKEN": "Nous sommes désolé mais nous n'avons pas pu vérifier votre clé de session",
                "ACCOUNT_NOT_FOUND": "Nous n'avons pas pu trouver votre compte",
                "MISSING_ARG": "Nous sommes désolé mais une erreur est survenue lors de la requête",
                "WRONG_TOKEN": "Nous sommes désolé mais vous semblez avoir la mauvaise clé de session",
                "NOT_FOUND": "Nous sommes désolé mais nous n'avons pu trouver ce qui a été demandé sur le serveur",
                "WRONG_PASSWORD": "Mot de passe incorrect",
                "USERNAME_ALREADY_IN_USE": "Ce nom d'utilisateur est déjà enregistré",
                "INVITE_ALREADY_IN_USE": "Cette clé d'invitation est déjà utilisée sur un autre compte",
                "INVITE_NOT_FOUND": "Nous ne connaissons pas cette clé d'invitation",
                "other": "Une erreur inconnue est survenue lors de la requête"
            },
            "success": {
                "loggedIn": "Connecté avec succès!"
            }
        }
    },
    "ja": {
        "language": "japanese",
        "version": "v2.0",
        "UI": {
            "title": "Japan Terebi — ログイン",
            "static": {
                "login": {
                    "title": "Japan Terebiにログインする",
                    "placeholders": {
                        "username": "ユーザー名",
                        "password": "パスワード"
                    },
                    "buttons": {
                        "login": "ログインする",
                        "create": "アカウント構成へ行く"
                    }
                },
                "create": {
                    "title": "Japan Terebiでアカウントを作る",
                    "placeholders": {
                        "invite": "招待キー",
                        "username": "ユーザー名",
                        "password": "新しいパスワード"
                    },
                    "buttons": {
                        "submit": "アカウントを作る",
                        "login": "ログインする"
                    }
                }
            },
            "announce": {
                "sessionExpired": "アカウントの安全を守るため、お客様のセッション有効期限が切れました。\nもう一度Japan Terebiにログインして番組の続きを観よう!"
            }
        },
        "Requests": {
            "errors": {
                "SECTOR_NOT_FOUND": "リクエスト中に何かの問題が起こりました",
                "AUTH_ERROR": "申し訳ございませんが、お客様のアカウントの安全を守るため、もう一度ログインしてください。",
                "SERVER_ERROR": "申し訳ございませんが、サーバー上で何かしらの問題が起こりました",
                "UNKNOWN_ERROR": "申し訳ございませんが、サーバー上で不明の問題が起こりました",
                "NO_TOKEN": "申し訳ございませんが、お客様のアカウント情報の確認が出来ませんでした",
                "ACCOUNT_NOT_FOUND": "アカウントが見つかりません",
                "MISSING_ARG": "申し訳ございませんが、リクエストの送信中に何かしらの問題が起こりました",
                "WRONG_TOKEN": "申し訳ございませんが、セッションキーが間違えてます",
                "NOT_FOUND": "申し訳ございませんが、何かがサーバー上で見つかりませんでした",
                "WRONG_PASSWORD": "パスワードが間違えているようです",
                "USERNAME_ALREADY_IN_USE": "このユーザー名は現在別のアカウントで使われています",
                "INVITE_ALREADY_IN_USE": "この招待キーは既に別のアカウントで使われています",
                "INVITE_NOT_FOUND": "この招待キーが見つかりません",
                "other": "リクエストの処理中に何かしらの問題が起こりました"
            },
            "success": {
                "loggedIn": "ログインに成功しました!"
            }
        }
    }
}

async function loadLanguage() {
    if (!(language in localization)) {
        language = "en"
    }

    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set("lang", language);
    history.replaceState(null, null, "?" + queryParams.toString());

    // loading the language
    document.getElementsByTagName("title")[0].innerText = localization[language].UI.title
    document.getElementById("localization-loginTitle").innerText = localization[language].UI.static.login.title
    document.getElementById("usernameInput").setAttribute("placeholder", localization[language].UI.static.login.placeholders.username)
    document.getElementById("passwordInput").setAttribute("placeholder", localization[language].UI.static.login.placeholders.password)
    document.getElementById("localization-LoginButton").innerText = localization[language].UI.static.login.buttons.login
    document.getElementById("goToSet").innerText = localization[language].UI.static.login.buttons.create
    document.getElementById("localization-createTitle").innerText = localization[language].UI.static.create.title
    document.getElementById("inviteInput").setAttribute("placeholder", localization[language].UI.static.create.placeholders.invite)
    document.getElementById("createUsernameInput").setAttribute("placeholder", localization[language].UI.static.create.placeholders.username)
    document.getElementById("newPasswordInput").setAttribute("placeholder", localization[language].UI.static.create.placeholders.password)
    document.getElementById("localization-CreateSubmitButton").innerText = localization[language].UI.static.create.buttons.submit
    document.getElementById("goToLogin").innerText = localization[language].UI.static.create.buttons.login
    
    
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("lang")) {
        language = urlParams.get("lang")
    } else {
        language = window.localStorage.getItem("lang")
    }

    document.getElementById("language").value = language
    document.getElementById("language").addEventListener("change", () => {loadLanguage(document.getElementById("language").value)}, false)
    loadLanguage(language)
    
    const invite = urlParams.get("invite");
    const session_expired = urlParams.get("session_expired");
    if (invite) {
        document.getElementById("inviteInput").value = invite
        setPage()
    } else if (session_expired) {
        newInfo(localization[language].UI.announce.sessionExpired)
        loginPage()
    } else {
        loginPage()
    }
}

async function loginInputCallback(event) {
    if (event.key == "Enter" && String(document.getElementById("passwordInput").value).replace(" ", "") != "") {
        login()
    }
}

async function setPasswordInputCallback(event) {
    if (event.key == "Enter" && String(document.getElementById("newPasswordInput").value).replace(" ", "") != "") {
        if (String(document.getElementById("inviteInput").value).replace(" ", "") != "") {
            setPassword()
        } else {
            document.getElementById("inviteInput").focus()
        }
    }
}

async function setPage() {
    document.getElementById("loginPage").classList.add("hidden")
    document.getElementById("setPage").classList.remove("hidden")
}

async function loginPage() {
    document.getElementById("setPage").classList.add("hidden")
    document.getElementById("loginPage").classList.remove("hidden")
}


async function login() {
    try {
        document.getElementById("usernameInput").blur()
        document.getElementById("passwordInput").blur()
        var formData = new FormData();
        formData.append("username", document.getElementById("usernameInput").value)
        formData.append("password", document.getElementById("passwordInput").value)
        loading()
        fetch(HOST + "/account/login", {
            body: formData,
            method: "POST"
        })
        .then((resp) => resp.json())
        .then((response) => {
            notLoading()
            if (response.success) {
                newSuccess(localization[language].Requests.success.loggedIn)
                window.localStorage.setItem("__japanterebi_auth", response.data.token)
                window.location.assign("/")
            } else {
                if (response.error == "WRONG_PASSWORD") {
                    document.getElementById("passwordInput").value = ""
                    document.getElementById("passwordInput").focus()
                } else if (response.error == "ACCOUNT_NOT_FOUND") {
                    document.getElementById("usernameInput").value = ""
                    document.getElementById("usernameInput").focus()
                } else {
                    document.getElementById("passwordInput").focus()
                }
    
                if (response.error in localization[language].Requests.errors) {
                    newError(localization[language].Requests.errors[response.error])
                } else {
                    newError(localization[language].Requests.errors.other)
                }
    
            }
        })
    } catch {
        notLoading()
        newError(localization[language].Requests.errors.other)
    }
}

async function setPassword() {
    try {
        document.getElementById("inviteInput").blur()
        document.getElementById("createUsernameInput").blur()
        document.getElementById("newPasswordInput").blur()

        var formData = new FormData();
        formData.append("username", document.getElementById("createUsernameInput").value)
        formData.append("password", document.getElementById("newPasswordInput").value)
        formData.append("invite", document.getElementById("inviteInput").value)
        loading()
        fetch(HOST + "/account/new", {
            body: formData,
            method: "POST"
        })
        .then((resp) => resp.json())
        .then((response) => {
            notLoading()
            if (response.success) {
                newSuccess(localization[language].Requests.success.loggedIn)
                window.localStorage.setItem("__japanterebi_auth", response.data.token)
                window.location.assign("/")
            } else {
                if (response.error == "INVITE_NOT_FOUND" || response.error == "INVITE_ALREADY_IN_USE") {
                    document.getElementById("inviteInput").value = ""
                    document.getElementById("inviteInput").focus()
                } else if (response.error == "USERNAME_ALREADY_IN_USE") {
                    document.getElementById("createUsernameInput").value = ""
                    document.getElementById("createUsernameInput").focus()
                }
    
                if (response.error in localization[language].Requests.errors) {
                    newError(localization[language].Requests.errors[response.error])
                } else {
                    newError(localization[language].Requests.errors.other)
                }
    
            }
        })
    } catch {
        notLoading()
        newError(localization[language].Requests.errors.other)
    }
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
