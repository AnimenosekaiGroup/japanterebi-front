let language="en";
const HOST="https://japanterebi.vercel.app/japanterebi",localization={en:{language:"english",version:"2.0",UI:{title:"Japan Terebi \u2014\u00a0Login","static":{login:{title:"Login to Japan Terebi",placeholders:{username:"Username",password:"Password"},buttons:{login:"Login",create:"Create Account"}},create:{title:"Create your account for Japan Terebi",placeholders:{invite:"Invite",username:"Username",password:"New Password",confirmation:"Confirm Password"},buttons:{submit:"Submit",login:"Go to Login"}}},
announce:{sessionExpired:"Your session expired.\nLog in once again to continue watching Japan Terebi!",passwordMismatch:"The passwords don't match!"}},Requests:{errors:{SECTOR_NOT_FOUND:"An error occured while trying to request some information",AUTH_ERROR:"We are sorry but to ensure your security, this session expired",SERVER_ERROR:"We are sorry but an error occured on the server while processing a request",UNKNOWN_ERROR:"We are sorry but an unknown error occured on the server",NO_TOKEN:"We are sorry but we couldn't verify your request",
ACCOUNT_NOT_FOUND:"We couldn't find your account",MISSING_ARG:"We are sorry but an error occured while sending a request",WRONG_TOKEN:"We are sorry but your seem to have a wrong token",NOT_FOUND:"We are sorry but something couldn't be found while requesting it",WRONG_PASSWORD:"This seems to be the wrong password",USERNAME_ALREADY_IN_USE:"This username is already taken",INVITE_ALREADY_IN_USE:"This invite is already used by another account",INVITE_NOT_FOUND:"We don't know this invite",other:"An unknown error occured while processing your request"},
success:{loggedIn:"Successfully logged in!"}}},fr:{language:"french",version:"v2.0",UI:{title:"Japan Terebi \u2014 Se connecter","static":{login:{title:"Se connecter \u00e0 Japan Terebi",placeholders:{username:"Nom d'utilisateur",password:"Mot de passe"},buttons:{login:"Se connecter",create:"Cr\u00e9er un compte"}},create:{title:"Cr\u00e9ez votre compte pour Japan Terebi",placeholders:{invite:"Invitation",username:"Nom d'utilisateur",password:"Mot de passe",confirmation:"Confirmer le mot de passe"},
buttons:{submit:"Soumettre",login:"Aller \u00e0 la page de connexion"}}},announce:{sessionExpired:"Votre session a expir\u00e9 pour garantir la s\u00e9curit\u00e9 de votre compte.\nReconnectez vous pour continuer \u00e0 regarder Japan Terebi!",passwordMismatch:"Les mots de passe ne correspondent pas"}},Requests:{errors:{SECTOR_NOT_FOUND:"Une erreur est survenue lors de la recherche d'information",AUTH_ERROR:"Nous sommes d\u00e9sol\u00e9s mais pour garantir la s\u00e9curit\u00e9 de votre compte, votre session a expir\u00e9",
SERVER_ERROR:"Nous sommes d\u00e9sol\u00e9s mais une erreur est survenue au niveau du serveur",UNKNOWN_ERROR:"Nous sommes d\u00e9sol\u00e9s mais une erreur inconnue est survenue",NO_TOKEN:"Nous sommes d\u00e9sol\u00e9s mais nous n'avons pas r\u00e9ussi \u00e0 v\u00e9rifier votre cl\u00e9 de session",ACCOUNT_NOT_FOUND:"Nous n'avons pas r\u00e9ussi \u00e0 trouver votre compte",MISSING_ARG:"Nous sommes d\u00e9sol\u00e9s mais une erreur est survenue lors de la requ\u00eate",WRONG_TOKEN:"Nous sommes d\u00e9sol\u00e9s mais vous semblez avoir la mauvaise cl\u00e9 de session",
NOT_FOUND:"Nous sommes d\u00e9sol\u00e9s mais nous n'avons pas r\u00e9ussi \u00e0 trouver ce qui a \u00e9t\u00e9 demand\u00e9 sur le serveur",WRONG_PASSWORD:"Mot de passe incorrect",USERNAME_ALREADY_IN_USE:"Ce nom d'utilisateur est d\u00e9j\u00e0 enregistr\u00e9",INVITE_ALREADY_IN_USE:"Cette cl\u00e9 d'invitation est d\u00e9j\u00e0 utilis\u00e9e sur un autre compte",INVITE_NOT_FOUND:"Nous ne reconnaissons pas cette cl\u00e9 d'invitation",other:"Une erreur inconnue est survenue lors de la requ\u00eate"},
success:{loggedIn:"Connect\u00e9 avec succ\u00e8s!"}}},ja:{language:"japanese",version:"v2.0",UI:{title:"Japan Terebi \u2014\u00a0\u30ed\u30b0\u30a4\u30f3","static":{login:{title:"Japan Terebi\u306b\u30ed\u30b0\u30a4\u30f3\u3059\u308b",placeholders:{username:"\u30e6\u30fc\u30b6\u30fc\u540d",password:"\u30d1\u30b9\u30ef\u30fc\u30c9"},buttons:{login:"\u30ed\u30b0\u30a4\u30f3",create:"\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u4f5c\u6210"}},create:{title:"Japan Terebi\u3067\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210\u3059\u308b",
placeholders:{invite:"\u62db\u5f85\u30ad\u30fc",username:"\u30e6\u30fc\u30b6\u30fc\u540d",password:"\u65b0\u3057\u3044\u30d1\u30b9\u30ef\u30fc\u30c9",confirmation:"\u30d1\u30b9\u30ef\u30fc\u30c9\u306e\u78ba\u8a8d"},buttons:{submit:"\u30a2\u30ab\u30a6\u30f3\u30c8\u3092\u4f5c\u6210",login:"\u30ed\u30b0\u30a4\u30f3"}}},announce:{sessionExpired:"\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u5b89\u5168\u3092\u5b88\u308b\u305f\u3081\u3001\u304a\u5ba2\u69d8\u306e\u30bb\u30c3\u30b7\u30e7\u30f3\u6709\u52b9\u671f\u9650\u304c\u5207\u308c\u307e\u3057\u305f\u3002\n\u3082\u3046\u4e00\u5ea6Japan Terebi\u306b\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u756a\u7d44\u306e\u7d9a\u304d\u3092\u89b3\u3066\u304f\u3060\u3055\u3044",
passwordMismatch:"\u30d1\u30b9\u30ef\u30fc\u30c9\u304c\u4e00\u81f4\u3057\u307e\u305b\u3093"}},Requests:{errors:{SECTOR_NOT_FOUND:"\u30ea\u30af\u30a8\u30b9\u30c8\u4e2d\u306b\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f",AUTH_ERROR:"\u7533\u3057\u8a33\u3054\u3056\u3044\u307e\u305b\u3093\u304c\u3001\u304a\u5ba2\u69d8\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u5b89\u5168\u3092\u5b88\u308b\u305f\u3081\u3001\u3082\u3046\u4e00\u5ea6\u30ed\u30b0\u30a4\u30f3\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
SERVER_ERROR:"\u7533\u3057\u8a33\u3054\u3056\u3044\u307e\u305b\u3093\u304c\u3001\u30b5\u30fc\u30d0\u30fc\u4e0a\u3067\u4f55\u3089\u304b\u306e\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f",UNKNOWN_ERROR:"\u7533\u3057\u8a33\u3054\u3056\u3044\u307e\u305b\u3093\u304c\u3001\u30b5\u30fc\u30d0\u30fc\u4e0a\u3067\u4e0d\u660e\u306a\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f",NO_TOKEN:"\u7533\u3057\u8a33\u3054\u3056\u3044\u307e\u305b\u3093\u304c\u3001\u304a\u5ba2\u69d8\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u60c5\u5831\u306e\u78ba\u8a8d\u304c\u51fa\u6765\u307e\u305b\u3093\u3067\u3057\u305f",
ACCOUNT_NOT_FOUND:"\u30a2\u30ab\u30a6\u30f3\u30c8\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093",MISSING_ARG:"\u7533\u3057\u8a33\u3054\u3056\u3044\u307e\u305b\u3093\u304c\u3001\u30ea\u30af\u30a8\u30b9\u30c8\u306e\u9001\u4fe1\u4e2d\u306b\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f",WRONG_TOKEN:"\u7533\u3057\u8a33\u3054\u3056\u3044\u307e\u305b\u3093\u304c\u3001\u30bb\u30c3\u30b7\u30e7\u30f3\u30ad\u30fc\u304c\u9593\u9055\u3063\u3066\u3044\u307e\u3059",NOT_FOUND:"\u7533\u3057\u8a33\u3054\u3056\u3044\u307e\u305b\u3093\u304c\u3001\u4f55\u304b\u304c\u30b5\u30fc\u30d0\u30fc\u4e0a\u3067\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f",
WRONG_PASSWORD:"\u30d1\u30b9\u30ef\u30fc\u30c9\u306b\u9593\u9055\u3048\u304c\u3042\u308b\u3088\u3046\u3067\u3059",USERNAME_ALREADY_IN_USE:"\u3053\u306e\u30e6\u30fc\u30b6\u30fc\u540d\u306f\u73fe\u5728\u5225\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u3067\u4f7f\u308f\u308c\u3066\u3044\u307e\u3059",INVITE_ALREADY_IN_USE:"\u3053\u306e\u62db\u5f85\u30ad\u30fc\u306f\u65e2\u306b\u5225\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u3067\u4f7f\u308f\u308c\u3066\u3044\u307e\u3059",INVITE_NOT_FOUND:"\u3053\u306e\u62db\u5f85\u30ad\u30fc\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f",
other:"\u30ea\u30af\u30a8\u30b9\u30c8\u306e\u51e6\u7406\u4e2d\u306b\u4e0d\u660e\u306a\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f"},success:{loggedIn:"\u30ed\u30b0\u30a4\u30f3\u306b\u6210\u529f\u3057\u307e\u3057\u305f!"}}}};
async function loadLanguage(){language in localization||(language="en");var a=new URLSearchParams(window.location.search);a.set("lang",language);history.replaceState(null,null,"?"+a.toString());document.getElementsByTagName("title")[0].innerText=localization[language].UI.title;document.getElementById("localization-loginTitle").innerText=localization[language].UI.static.login.title;document.getElementById("usernameInput").setAttribute("placeholder",localization[language].UI.static.login.placeholders.username);
document.getElementById("passwordInput").setAttribute("placeholder",localization[language].UI.static.login.placeholders.password);document.getElementById("localization-LoginButton").innerText=localization[language].UI.static.login.buttons.login;document.getElementById("goToSet").innerText=localization[language].UI.static.login.buttons.create;document.getElementById("localization-createTitle").innerText=localization[language].UI.static.create.title;document.getElementById("inviteInput").setAttribute("placeholder",
localization[language].UI.static.create.placeholders.invite);document.getElementById("createUsernameInput").setAttribute("placeholder",localization[language].UI.static.create.placeholders.username);document.getElementById("newPasswordInput").setAttribute("placeholder",localization[language].UI.static.create.placeholders.password);document.getElementById("passwordConfirmation").setAttribute("placeholder",localization[language].UI.static.create.placeholders.confirmation);document.getElementById("localization-CreateSubmitButton").innerText=
localization[language].UI.static.create.buttons.submit;document.getElementById("goToLogin").innerText=localization[language].UI.static.create.buttons.login}
window.onload=function(){var a=new URLSearchParams(window.location.search);language=a.get("lang")?a.get("lang"):window.localStorage.getItem("lang");document.getElementById("language").value=language;document.getElementById("language").addEventListener("change",()=>{language=document.getElementById("language").value;loadLanguage()},!1);loadLanguage();const b=a.get("invite");a=a.get("session_expired");b?(document.getElementById("inviteInput").value=b,setPage()):(a&&newInfo(localization[language].UI.announce.sessionExpired),
loginPage())};async function loginInputCallback(a){"Enter"==a.key&&login()}async function setPasswordInputCallback(a){"Enter"==a.key&&setPassword()}async function setPage(){document.getElementById("loginPage").classList.add("hidden");document.getElementById("setPage").classList.remove("hidden")}async function loginPage(){document.getElementById("setPage").classList.add("hidden");document.getElementById("loginPage").classList.remove("hidden")}
async function login(){try{if(""==String(document.getElementById("passwordInput").value).replace(" ",""))document.getElementById("passwordInput").focus();else{document.getElementById("usernameInput").blur();document.getElementById("passwordInput").blur();var a=new FormData;a.append("username",document.getElementById("usernameInput").value);a.append("password",document.getElementById("passwordInput").value);loading();fetch(HOST+"/account/login",{body:a,method:"POST"}).then(b=>b.json()).then(b=>{notLoading();
b.success?(newSuccess(localization[language].Requests.success.loggedIn),window.localStorage.setItem("__japanterebi_auth",b.data.token),window.location.assign("/")):("WRONG_PASSWORD"==b.error?(document.getElementById("passwordInput").value="",document.getElementById("passwordInput").focus()):"ACCOUNT_NOT_FOUND"==b.error?(document.getElementById("usernameInput").value="",document.getElementById("usernameInput").focus()):document.getElementById("passwordInput").focus(),b.error in localization[language].Requests.errors?
newError(localization[language].Requests.errors[b.error]):newError(localization[language].Requests.errors.other))})}}catch{notLoading(),newError(localization[language].Requests.errors.other)}}
async function setPassword(){try{if(""==String(document.getElementById("inviteInput").value).replace(" ",""))document.getElementById("inviteInput").focus();else if(""==String(document.getElementById("passwordConfirmation").value).replace(" ",""))document.getElementById("passwordConfirmation").focus();else if(""==String(document.getElementById("createUsernameInput").value).replace(" ",""))document.getElementById("createUsernameInput").focus();else if(""==String(document.getElementById("newPasswordInput").value).replace(" ",
""))document.getElementById("newPasswordInput").focus();else if(String(document.getElementById("newPasswordInput").value)!=String(document.getElementById("passwordConfirmation").value))document.getElementById("passwordConfirmation").focus(),newInfo(localization[language].UI.announce.passwordMismatch);else{document.getElementById("inviteInput").blur();document.getElementById("createUsernameInput").blur();document.getElementById("newPasswordInput").blur();document.getElementById("passwordConfirmation").blur();
var a=new FormData;a.append("username",document.getElementById("createUsernameInput").value);a.append("password",document.getElementById("newPasswordInput").value);a.append("invite",document.getElementById("inviteInput").value);loading();fetch(HOST+"/account/new",{body:a,method:"POST"}).then(b=>b.json()).then(b=>{notLoading();b.success?(newSuccess(localization[language].Requests.success.loggedIn),window.localStorage.setItem("__japanterebi_auth",b.data.token),window.location.assign("/")):("INVITE_NOT_FOUND"==
b.error||"INVITE_ALREADY_IN_USE"==b.error?(document.getElementById("inviteInput").value="",document.getElementById("inviteInput").focus()):"USERNAME_ALREADY_IN_USE"==b.error&&(document.getElementById("createUsernameInput").value="",document.getElementById("createUsernameInput").focus()),b.error in localization[language].Requests.errors?newError(localization[language].Requests.errors[b.error]):newError(localization[language].Requests.errors.other))})}}catch{notLoading(),newError(localization[language].Requests.errors.other)}}
async function loading(){document.getElementById("loadingWrapper").classList.add("loading-wrapper-visible")}async function notLoading(){document.getElementById("loadingWrapper").classList.remove("loading-wrapper-visible")}var messagesQueue=[],currentIndex=1;
async function newInfo(a){console.log(a);messagesQueue.push(a);let b=messagesQueue.length,d=setInterval(function(){if(currentIndex==b){var c=document.createElement("p");c.setAttribute("class","info");c.innerText=String(a);document.getElementsByTagName("body")[0].appendChild(c);setTimeout(function(){c.classList.add("show")},100);setTimeout(function(){c.classList.remove("show");currentIndex+=1},5100);clearInterval(d)}},100)}
async function newSuccess(a){console.log(a);messagesQueue.push(a);let b=messagesQueue.length,d=setInterval(function(){if(currentIndex==b){var c=document.createElement("p");c.setAttribute("class","success");c.innerText=String(a);document.getElementsByTagName("body")[0].appendChild(c);setTimeout(function(){c.classList.add("show")},100);setTimeout(function(){c.classList.remove("show");currentIndex+=1},5100);clearInterval(d)}},100)}
async function newError(a){console.error(a);messagesQueue.push(a);let b=messagesQueue.length,d=setInterval(function(){if(currentIndex==b){var c=document.createElement("p");c.setAttribute("class","error");c.innerText=String(a);document.getElementsByTagName("body")[0].appendChild(c);setTimeout(function(){c.classList.add("show")},100);setTimeout(function(){c.classList.remove("show");currentIndex+=1},5100);clearInterval(d)}},100)};
