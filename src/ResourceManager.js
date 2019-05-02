export default {
    //fetch call used to get user data so you can compare the username and password for login. 
    getUsers() {
        return fetch("http://localhost:5002/users").then(r => r.json())
    },
    postUsers(object) {
        return fetch("http://localhost:5002/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(e => e.json())
    },
    //fetch call used to populate state in application views. gets called to get starting data
    getUserData(resource, id) {
        return fetch(`http://localhost:5002/${resource}?userId=${id}`).then(r => r.json())
    },
    //fetch call used in PoolAdEditForm component. used to pre populate edit form with current data
    getOnePoolAd(id) {
        return fetch(`http://localhost:5002/poolAds/${id}`).then(r => r.json())
    },
    //fetch call used to post new ad.
    postPoolAd(object) {
        return fetch("http://localhost:5002/poolAds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(e => e.json())
    },
    //used to delete poolAds
    deletePoolAd(id) {
        return fetch(`http://localhost:5002/poolAds/${id}`, {
            method: "DELETE"
        })
    },
    //used to update and edit already made pool Ads
    putPoolAd(object) {
        return fetch(`http://localhost:5002/poolAds/${object.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(e => e.json())
    },
    //used to get data to list all pools for a user, but doesn't include pools that the user created and posted
    findPoolAd(id) {
        return fetch(`http://localhost:5002/poolAds?userId_ne=${id}`).then(r => r.json())
    },
    //used to get data of pools that the user saved or is following. id will be user's id and expand is for the poolAd that the user saved
    getSavedPools(id) {
        return fetch(`http://localhost:5002/savedPools?userId=${id}&_expand=poolAd`).then(r => r.json()) 
    },
    //post saved pools so user can see what pools he/she are following
    postSavedPool(object) {
        return fetch("http://localhost:5002/savedPools", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(e => e.json())
    },
    deleteSavedPool(id) {
        return fetch(`http://localhost:5002/savedPools/${id}`, {
            method: "DELETE"
        })
    }
}