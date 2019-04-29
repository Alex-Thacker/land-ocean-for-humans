export default {
    getUsers() {
        return fetch("http://localhost:5002/users").then(r => r.json())
    },
    getUserData(resource, id) {
        return fetch(`http://localhost:5002/${resource}?userId=${id}`).then(r => r.json())
    },
    getOnePoolAd(id) {
        return fetch(`http://localhost:5002/poolAds/${id}`).then(r => r.json())
    },
    postPoolAd(object) {
        return fetch("http://localhost:5002/poolAds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        }).then(e => e.json())
    },
    deletePoolAd(id) {
        return fetch(`http://localhost:5002/poolAds/${id}`, {
            method: "DELETE"
        })
    }
}