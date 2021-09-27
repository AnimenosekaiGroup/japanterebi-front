/**
 * Utils.js
 * Utilities functions for all of the scripts
 * 
 * © Anime no Sekai — 2021
 */

String.prototype.format = function () {
    /* C / Python like string formatter --> "Hello {name}".format("world") */
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

function isElementInViewport(el) {
    /* verifies if the given element is in viewport */
    var rect = el.getBoundingClientRect();
    return (
        rect.left >= 0 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function correctMinute(minute) {
    /* prepends a 0 to the given minute if needed */
    if (Number(minute) < 10) {
        return "0" + String(minute)
    } else {
        return String(minute)
    }
}

function nextElement(array, value) {
    /* Lets you find the next element in the array */
    let index = array.indexOf(value)
    if (index == array.length - 1 || index == -1) {
        return 0
    } else {
        return index + 1
    }
}

function previousElement(array, value) {
    /* Lets you find the previous element in the array */
    let index = array.indexOf(value)
    if (index == 0 || index == -1) {
        return array.length - 1
    } else {
        return index - 1
    }
}

async function newInfo(message) {
    /* shows an information to the user */
    console.log("[Info] " + String(message))
    let newElement = document.createElement("info")
    newElement.setAttribute("class", "info-box")
    newElement.innerText = String(message)
    document.getElementById("tvplayer").appendChild(newElement)
    setTimeout(function () {
        newElement.classList.add("visibleInfo")
        setTimeout(function () {
            newElement.classList.remove("visibleInfo")
            setTimeout(function () {
                newElement.remove()
            }, 1000)
        }, 5000)
    }, 50)
}

async function translate(text, destination) {
    /* translates the given text to the given destination */
    try {
        response = await fetch("https://anise-translate.vercel.app/translate?text={text}&destination={destination}".format({
            text: encodeURIComponent(text),
            destination: encodeURIComponent(destination)
        }))
        response = await response.json()
        if (response.success) {
            return response.data.result
        } else { return text }
    } catch { return text }
}

function isElementInView(element, fullyInView = true) {
    var pageTop = document.body.scrollTop;
    var pageBottom = pageTop + parseFloat(getComputedStyle(document.body, null).height.replace("px", ""));
    var elementTop = element.getBoundingClientRect().top + document.body.scrollTop;
    var elementBottom = elementTop + parseFloat(getComputedStyle(element, null).height.replace("px", ""));

    if (fullyInView === true) {
        return ((pageTop < elementTop) && (pageBottom > elementBottom));
    } else {
        return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createRandomID(length, checkingArray = null) {
    let result = [];
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    let resultString = result.join('');
    if (checkingArray) {
        if (checkingArray.includes(resultString)) {
            resultString = createRandomID(length, checkingArray)
        }
    }
    return resultString
}