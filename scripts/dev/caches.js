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

async function refreshActiveCache() {
    /**
     * Refreshing the request cache for active requests (which change regularly) &
     * Updating some information containers
     * Refreshed every 5 minutes
     */
    request("/channels/available")
        .then((data) => {
            caches["/channels/available"] = data
            addHome()
            addEPG()
        })
}

async function refreshCache() {
    /**
     * Refreshing the request cache
     * Refreshed every 15 minutes
     */
    request("/channels")
        .then((data) => {
            caches["/channels"] = data
        })
}
