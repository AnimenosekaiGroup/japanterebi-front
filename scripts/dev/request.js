/**
 * Request.js
 * Manages and handles the API requests
 * 
 * © Anime no Sekai — 2021
 */

async function request(endpoint, image = null, method = "GET", nocache = false) {
    /* makes a request to the api and returns its result */
    if (!nocache && endpoint in caches && caches[endpoint]) {
        return JSON.parse(JSON.stringify(caches[endpoint]))
    }
    let paramsIndex = endpoint.lastIndexOf("?")
    let params = ""
    if (paramsIndex >= 0) {
        params = endpoint.substring(paramsIndex + 1)
        endpoint = endpoint.substring(0, paramsIndex)
    }
    let response = await fetch("{host}{endpoint}?token={token}&{params}".format({
        host: constants.MAIN_HOST,
        endpoint: endpoint,
        token: window.localStorage.getItem("__japanterebi_auth"),
        params: params
    }), { method: method })
    try {
        if (image) {
            let contentType = response.headers.get("Content-Type")
            response = await response.arrayBuffer()
            let newBlob = URL.createObjectURL(new Blob([response], { type: contentType }))
            image.src = newBlob
        } else {
            response = await response.json()
            if (response.success) {
                response = response.data
            } else {
                if (response.error == "AUTH_ERROR") {
                    newInfo(localization[states.language].Requests.errors.AUTH_ERROR)
                    window.location.href = "/login.html?session_expired=true"
                } else {
                    if (response.error in localization[states.language].Requests.errors) {
                        newInfo(localization[states.language].Requests.errors[response.error])
                    } else {
                        newInfo(localization[states.language].Requests.errors.other)
                    }
                }
                response = null
            }
        }
    } catch { response = null }
    if (endpoint in caches) {
        caches[endpoint] = JSON.parse(JSON.stringify(response))
    }
    return response
}