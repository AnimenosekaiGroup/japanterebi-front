/**
 * Localization.js
 * Contains and manages all of the localization content
 * 
 * English Localization: © Anime no Sekai — 2021
 * Japanese Localization: © Anime no Sekai — 2021
 * French Localization: © Anime no Sekai — 2021
 * 
 * © Anime no Sekai — 2021
 */

function loadLanguage(language) {
    /* loads a language, defaults to "en" */
    if (!(language in localization)) {
        language = "en"
    }
    states.language = language
    window.localStorage.setItem("lang", language)

    let svg = document.getElementById("static-navbar-home").getElementsByTagName("svg")[0]
    document.getElementById("static-navbar-home").innerText = localization[language].UI.static.navbar.home + " "
    document.getElementById("static-navbar-home").appendChild(svg)
    svg = document.getElementById("static-navbar-watch").getElementsByTagName("svg")[0]
    document.getElementById("static-navbar-watch").innerText = localization[language].UI.static.navbar.watch + " "
    document.getElementById("static-navbar-watch").appendChild(svg)
    svg = document.getElementById("static-navbar-guide").getElementsByTagName("svg")[0]
    document.getElementById("static-navbar-guide").innerText = localization[language].UI.static.navbar.guide + " "
    document.getElementById("static-navbar-guide").appendChild(svg)
    let currentChannelName = document.getElementById("channelName").innerText
    document.getElementById("static-tvplayer-header-title").innerText = localization[language].UI.static.tvplayer.header.title
    let newChannelNameElement = document.createElement("channel-name")
    newChannelNameElement.id = "channelName"
    newChannelNameElement.innerText = currentChannelName
    newChannelNameElement.classList.add("channel-name")
    document.getElementById("static-tvplayer-header-title").appendChild(newChannelNameElement)
    document.getElementById("static-tvplayer-controls-watching-tooltip").innerText = localization[language].UI.static.tvplayer.controls.watching.tooltip
    document.getElementById("static-more-account-title").innerText = localization[language].UI.static.more.account.title
    Array.prototype.forEach.call(document.getElementsByClassName("submit-button"), (element) => {
        element.innerText = localization[language].UI.static.more.account.submit
    })
    document.getElementById("static-more-account-username-title").setAttribute("before-content", localization[language].UI.static.more.account.username.title)
    document.getElementById("accountName").setAttribute("placeholder", localization[language].UI.static.more.account.username.placeholder)
    document.getElementById("accountInvite").setAttribute("before-content", localization[language].UI.static.more.account.invite.title)
    document.getElementById("changePasswordRequest").innerText = localization[language].UI.static.more.account.passwordChange.button
    document.getElementById("currentPassword").setAttribute("placeholder", localization[language].UI.static.more.account.passwordChange.currentPasswordPlaceholder)
    document.getElementById("newPassword").setAttribute("placeholder", localization[language].UI.static.more.account.passwordChange.newPasswordPlaceholder)
    document.getElementById("static-more-account-picture-edit").innerText = localization[language].UI.static.more.account.picture.edit
    document.getElementById("static-more-guide-title").innerText = localization[language].UI.static.more.guide.title
    let newEpgButtonElement = document.createElement("epg-button")
    newEpgButtonElement.id = "returnToCurrentTime"
    newEpgButtonElement.innerText = localization[language].UI.static.more.guide.returnToCurrentTime
    document.getElementById("static-more-guide-title").appendChild(newEpgButtonElement)
    while (document.getElementById("epgTimes").firstChild) {
        document.getElementById("epgTimes").removeChild(document.getElementById("epgTimes").firstChild);
    }
    localization[language].UI.static.more.guide.timestamps.forEach((time) => {
        let newEpgTimeElement = document.createElement("epg-time")
        newEpgTimeElement.classList.add("epg-time")

        let newEpgTimeInnerElement = document.createElement("span")
        newEpgTimeInnerElement.classList.add("epg-time-inner")
        newEpgTimeInnerElement.innerHTML = time

        newEpgTimeElement.appendChild(newEpgTimeInnerElement)
        document.getElementById("epgTimes").appendChild(newEpgTimeElement)
    })
    //document.getElementById("epgTimeSpan").innerText = localization[language].UI.static.more.guide.currentTimeDefault
    document.getElementById("responsiveEPGButton").innerText = localization[language].UI.static.tvplayer.goToGuide
    document.getElementById("returnBackButton").innerText = localization[language].UI.static.more.returnButton
    
    document.getElementById("mainStatusTitle").innerText = localization[language].UI.dynamic.more.status.mainStatusTitle
    document.getElementById("channelsStatusTitle").innerText = localization[language].UI.dynamic.more.status.channelsStatusTitle
    
    // reload the home and the epg
    addHome()
    addEPG()
    checkStatus()
    // re hook all of the elements to the events handlers
    defineEvents()
    document.getElementById("pageLoad").classList.add("page-load-hidden")
    setTimeout(() => {
        document.getElementById("pageLoad").classList.add("unload")
    }, 500);
}

const localization = {
    "en": {
        "language": "english",
        "channelNameLanguage": "english",
        "translateDescription": true,
        "version": "v2.0",
        "UI": {
            "static": {
                "navbar": {
                    "home": "Home",
                    "watch": "Watch",
                    "guide": "TV Guide"
                },
                "tvplayer": {
                    "goToGuide": "Go to the TV Guide",
                    "header": {
                        "title": "You are currently watching"
                    },
                    "controls": {
                        "watching": {
                            "tooltip": "The number of people currently watching the channel"
                        }
                    }
                },
                "more": {
                    "returnButton": "Go back to TV",
                    "account": {
                        "title": "Account",
                        "submit": "Submit",
                        "username": {
                            "title": "Username: ",
                            "placeholder": "Username"
                        },
                        "invite": {
                            "title": "Invite: "
                        },
                        "passwordChange": {
                            "button": "Change password",
                            "currentPasswordPlaceholder": "Current Password",
                            "newPasswordPlaceholder": "New Password"
                        },
                        "picture": {
                            "edit": "Edit"
                        }
                    },
                    "guide": {
                        "title": "TV Guide",
                        "returnToCurrentTime": "Return to current time",
                        "timestamps": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                        "currentTimeDefault": "No time"
                    }
                }
            },
            "dynamic": {
                "home": {
                    "noprogram": {
                        "title": "No program information",
                        "description": "We are sorry but I couldn't find any program information for this channel",
                        "tileTitle": "No program information"
                    },
                    "currentlyAiring": "Currently airing on: {channel}"
                },
                "more": {
                    "information": {
                        "channel": "Airing on {channel}",
                        "timestamp": "From {startTime} to {endTime}",
                        "url": "Link to the program site"
                    },
                    "status": {
                        "mainStatusTitle": "Main API Status:",
                        "channelsStatusTitle": "Channels Status:",
                        "paused": "Monitoring Paused",
                        "notCheckedYet": "Not checking",
                        "up": "Operational",
                        "seemsDown": "Seems Down",
                        "down": "Down",
                        "unknown": "Unknown",
                    }
                }
            },
            "announce": {
                "browserNotCompatible": "We are sorry but your browser is not compatible",
                "unknownChannel": "We don't know this channel",
                "nextChannelSwitch": "Press one more time to switch to the next channel",
                "previousChannelSwitch": "Press one more time to switch to the previous channel",
                "noInformationForSelectedProgram": "I couldn't get the information for the selected program",
                "channelLoadUnknownError": "An unknown error occured while loading the channel",
                "online": "You are back online!",
                "offline": "You seem to be disconnected",
                "unknownPlayerError": "An unknown error occured with the player, please restart the webpage if it doesn't work",
                "noAvailableChannels": "I couldn't get the available channels"
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
                "NO_IMAGE": "There is no image",
                "INVITE_ALREADY_IN_USE": "This invite is already used by another account",
                "INVITE_NOT_FOUND": "We don't know this invite",
                "CHANNEL_NOT_FOUND": "We couldn't find the requested channel",
                "other": "An unknown error occured while processing a request",
                "account": {
                    "picture": {
                        "new": "An error occured while setting your profile picture"
                    }
                },
                "channels": {
                    "available": "No channel is available for now"
                }
            },
            "success": {
                "account": {
                    "change": {
                        "password": "We successfully changed your password!",
                        "username": "We successfully changed your username!"
                    },
                    "picture": {
                        "new": "New profile picture set successfully!"
                    }
                }
            }
        }
    },
    "ja": {
        "language": "japanese",
        "channelNameLanguage": "japanese",
        "translateDescription": false,
        "version": "v2.0",
        "UI": {
            "static": {
                "navbar": {
                    "home": "ホーム",
                    "watch": "見る",
                    "guide": "番組表"
                },
                "tvplayer": {
                    "goToGuide": "番組表を表示する",
                    "header": {
                        "title": "ご視聴中のチャンネル"
                    },
                    "controls": {
                        "watching": {
                            "tooltip": "現在この番組を観ている視聴者数"
                        }
                    }
                },
                "more": {
                    "returnButton": "テレビに戻る",
                    "account": {
                        "title": "アカウント",
                        "submit": "Ok",
                        "username": {
                            "title": "名前: ",
                            "placeholder": "名"
                        },
                        "invite": {
                            "title": "招待キー: "
                        },
                        "passwordChange": {
                            "button": "パスワードを変更する",
                            "currentPasswordPlaceholder": "現在お使いのパスーワード",
                            "newPasswordPlaceholder": "新しいパスワード"
                        },
                        "picture": {
                            "edit": "編集"
                        }
                    },
                    "guide": {
                        "title": "番組表",
                        "returnToCurrentTime": "今観れる番組に戻る",
                        "timestamps": ["00<span style=\"font-size: 15px;\">時</span>00", "01<span style=\"font-size: 15px;\">時</span>00", "02<span style=\"font-size: 15px;\">時</span>00", "03<span style=\"font-size: 15px;\">時</span>00", "04<span style=\"font-size: 15px;\">時</span>00", "05<span style=\"font-size: 15px;\">時</span>00", "06<span style=\"font-size: 15px;\">時</span>00", "07<span style=\"font-size: 15px;\">時</span>00", "08<span style=\"font-size: 15px;\">時</span>00", "09<span style=\"font-size: 15px;\">時</span>00", "10<span style=\"font-size: 15px;\">時</span>00", "11<span style=\"font-size: 15px;\">時</span>00", "12<span style=\"font-size: 15px;\">時</span>00", "13<span style=\"font-size: 15px;\">時</span>00", "14<span style=\"font-size: 15px;\">時</span>00", "15<span style=\"font-size: 15px;\">時</span>00", "16<span style=\"font-size: 15px;\">時</span>00", "17<span style=\"font-size: 15px;\">時</span>00", "18<span style=\"font-size: 15px;\">時</span>00", "19<span style=\"font-size: 15px;\">時</span>00", "20<span style=\"font-size: 15px;\">時</span>00", "21<span style=\"font-size: 15px;\">時</span>00", "22<span style=\"font-size: 15px;\">時</span>00", "23<span style=\"font-size: 15px;\">時</span>00"],
                        "currentTimeDefault": "時間なし"
                    }
                }
            },
            "dynamic": {
                "home": {
                    "noprogram": {
                        "title": "番組情報がありません",
                        "description": "申し訳ございませんが、現在このチャンネルの番組情報が見つかりませんでした",
                        "tileTitle": "番組情報なし"
                    },
                    "currentlyAiring": "ただいま {channel} で放送中"
                },
                "more": {
                    "information": {
                        "channel": "{channel} で放送",
                        "timestamp": "{startTime}から{endTime}まで",
                        "url": "番組の詳細"
                    },
                    "status": {
                        "mainStatusTitle": "メインサーバーの状態:",
                        "channelsStatusTitle": "チャンネルサーバーの状態:",
                        "paused": "モニタリングオフ",
                        "notCheckedYet": "まだデータがありません",
                        "up": "問題なし",
                        "seemsDown": "問題が発生しているよう",
                        "down": "停止",
                        "unknown": "不明"
                    }
                }
            },
            "announce": {
                "browserNotCompatible": "申し訳ございませんが、お使いのブラウザではご利用いただけません",
                "unknownChannel": "お探しのチャンネルは見つかりませんでした",
                "nextChannelSwitch": "次のチャンネルをご覧になるには、もう一度押してください",
                "previousChannelSwitch": "前のチャンネルをご覧になるには、もう一度押してください",
                "noInformationForSelectedProgram": "ご選択の番組の情報が見つかりませんでした",
                "channelLoadUnknownError": "チャンネルの読み込み中にエラーが発生しました",
                "online": "インターネット接続が戻りました!",
                "offline": "インターネット接続が切られています",
                "unknownPlayerError": "プレイヤーに不明なエラーが発生しました。更新してみてください。",
                "noAvailableChannels": "観れるチャンネルは現在ありません"
            }
        },
        "Requests": {
            "errors": {
                "SECTOR_NOT_FOUND": "リクエスト中に問題が発生しました",
                "AUTH_ERROR": "申し訳ございませんが、お客様のアカウントの安全を守るため、もう一度ログインしてください。",
                "SERVER_ERROR": "申し訳ございませんが、サーバー上で何らかの問題が発生しました",
                "UNKNOWN_ERROR": "申し訳ございませんが、サーバー上で不明な問題が発生しました",
                "NO_TOKEN": "申し訳ございませんが、お客様のアカウント情報の確認が出来ませんでした",
                "ACCOUNT_NOT_FOUND": "アカウントが見つかりません",
                "MISSING_ARG": "申し訳ございませんが、リクエストの送信中に問題が発生しました",
                "WRONG_TOKEN": "申し訳ございませんが、セッションキーが間違っています",
                "NOT_FOUND": "申し訳ございませんが、何かがサーバー上で見つかりませんでした",
                "WRONG_PASSWORD": "パスワードに間違えがあるようです",
                "USERNAME_ALREADY_IN_USE": "このユーザー名は現在別のアカウントで使われています",
                "NO_IMAGE": "画像がありません",
                "INVITE_ALREADY_IN_USE": "この招待キーは既に別のアカウントで使われています",
                "INVITE_NOT_FOUND": "この招待キーが見つかりませんでした",
                "CHANNEL_NOT_FOUND": "お探しのチャンネルは見つかりません",
                "other": "リクエストの処理中に不明な問題が発生しました",
                "account": {
                    "picture": {
                        "new": "プロファイル画像の変更に何か問題が発生しました"
                    }
                },
                "channels": {
                    "available": "現在視聴できるチャンネルはありません"
                }
            },
            "success": {
                "account": {
                    "change": {
                        "password": "パスワードを変更しました！",
                        "username": "アカウント名を変更しました!"
                    },
                    "picture": {
                        "new": "新しいプロファイル画像を追加しました!"
                    }
                }
            }
        }
    },
    "fr": {
        "language": "french",
        "channelNameLanguage": "english",
        "translateDescription": true,
        "version": "v2.0",
        "UI": {
            "static": {
                "navbar": {
                    "home": "Home",
                    "watch": "Regarder",
                    "guide": "Autre"
                },
                "tvplayer": {
                    "goToGuide": "Voir le programme TV",
                    "header": {
                        "title": "Vous êtes actuellement entrain de regarder"
                    },
                    "controls": {
                        "watching": {
                            "tooltip": "Nombre de personnes regardant actuellement cette chaîne"
                        }
                    }
                },
                "more": {
                    "returnButton": "Revenir à la chaîne",
                    "account": {
                        "title": "Compte",
                        "submit": "Soumettre",
                        "username": {
                            "title": "Nom: ",
                            "placeholder": "Nom d'utilisateur"
                        },
                        "invite": {
                            "title": "Invitation: "
                        },
                        "passwordChange": {
                            "button": "Changer le mot de passe",
                            "currentPasswordPlaceholder": "Mot de passe actuel",
                            "newPasswordPlaceholder": "Nouveau mot de passe"
                        },
                        "picture": {
                            "edit": "Changer"
                        }
                    },
                    "guide": {
                        "title": "Programme TV",
                        "returnToCurrentTime": "Voir les programmes en ce moment",
                        "timestamps": ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
                        "currentTimeDefault": "Pas de temps"
                    }
                }
            },
            "dynamic": {
                "home": {
                    "noprogram": {
                        "title": "Sans information",
                        "description": "Nous sommes désoléss mais nous n'avons pas réussi à trouver d'information sur le programme actuellement en diffusion sur cette chaîne",
                        "tileTitle": "Sans information"
                    },
                    "currentlyAiring": "Actuellement sur: {channel}"
                },
                "more": {
                    "information": {
                        "channel": "Diffusé sur {channel}",
                        "timestamp": "De {startTime} à {endTime}",
                        "url": "Lien vers le site de l'émission"
                    },
                    "status": {
                        "mainStatusTitle": "Statut de l'API Principale:",
                        "channelsStatusTitle": "Statut des chaînes:",
                        "paused": "Monitoring en pause",
                        "notCheckedYet": "Pas encore vérifié",
                        "up": "Operationnel",
                        "seemsDown": "Semble rencontrer des problèmes",
                        "down": "Hors Service",
                        "unknown": "Inconnu"
                    }
                }
            },
            "announce": {
                "browserNotCompatible": "Votre navigateur ne semble pas compatible",
                "unknownChannel": "Nous ne connaissons pas cette chaîne",
                "nextChannelSwitch": "Apréussiyez encore une fois pour aller à la chaîne suivante",
                "previousChannelSwitch": "Apréussiyez encore une fois pour revenir à la chaîne précédente",
                "noInformationForSelectedProgram": "Nous n'avons pas réussi trouver d'informations sur le programme sélectionné",
                "channelLoadUnknownError": "Un erreur est survenue lors du chargement de la chaîne",
                "online": "Vous êtes de nouveau en ligne!",
                "offline": "Vous semblez être déconnecté",
                "unknownPlayerError": "Une erreur est survenue avec le player, merci de rafraîchir la page si vous rencontrez un problème",
                "noAvailableChannels": "Une erreur est survenue lors de l'obtention des chaînes disponibles"
            }
        },
        "Requests": {
            "errors": {
                "SECTOR_NOT_FOUND": "Une erreur est survenue lors de la recherche d'information",
                "AUTH_ERROR": "Nous sommes désolés mais pour garantir la sécurité de votre compte, votre session a expiré",
                "SERVER_ERROR": "Nous sommes désolés mais une erreur est survenue au niveau du serveur",
                "UNKNOWN_ERROR": "Nous sommes désolés mais une erreur inconnue est survenue",
                "NO_TOKEN": "Nous sommes désolés mais nous n'avons pas réussi à vérifier votre clé de session",
                "ACCOUNT_NOT_FOUND": "Nous n'avons pas réussi à trouver votre compte",
                "MISSING_ARG": "Nous sommes désolés mais une erreur est survenue lors de la requête",
                "WRONG_TOKEN": "Nous sommes désolés mais vous semblez avoir la mauvaise clé de session",
                "NOT_FOUND": "Nous sommes désolés mais nous n'avons pas réussi à trouver ce qui a été demandé sur le serveur",
                "WRONG_PASSWORD": "Mot de passe incorrect",
                "USERNAME_ALREADY_IN_USE": "Ce nom d'utilisateur est déjà enregistré",
                "NO_IMAGE": "Il n'y a pas d'image",
                "INVITE_ALREADY_IN_USE": "Cette clé d'invitation est déjà utilisée sur un autre compte",
                "INVITE_NOT_FOUND": "Nous ne reconnaissons pas cette clé d'invitation",
                "CHANNEL_NOT_FOUND": "Nous n'avons pas réussi à trouver la chaîne que vous avez demandée",
                "other": "Une erreur inconnue est survenue lors de la requête",
                "account": {
                    "picture": {
                        "new": "Une erreur est survenue lors du changement de votre photo de profile"
                    }
                },
                "channels": {
                    "available": "Aucune chaîne n'est disponible pour le moment"
                }
            },
            "success": {
                "account": {
                    "change": {
                        "password": "Mot de passe modifié avec succès!",
                        "username": "Nom d'utilisateur modifié avec succès!"
                    },
                    "picture": {
                        "new": "Photo de profile changé avec succès!"
                    }
                }
            }
        }
    }
}