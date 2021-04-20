/**
 * Caches.js
 * Manages the API calls caches to provide greater UX
 * 
 * © Anime no Sekai — 2021
 */


/* this variable contains the caches */
let caches = {
    "/channels": null,
    "/channels/available": null,
}

async function refreshCache() {
    /**
     * Refreshing the request cache &
     * Updating some information containers
     */
    request("/channels")
    .then((data) => {
        caches["/channels"] = data
    })
    request("/channels/available")
    .then((data) => {
        caches["/channels/available"] = data
        addHome()
        addEPG()
    })
    //request("/chan")
    // refreshEPG
}
