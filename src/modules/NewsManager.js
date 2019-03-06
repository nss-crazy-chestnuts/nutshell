import Settings from "./Settings"

export default {
  getOne(id) {
    return fetch(`${Settings.remoteURL}/news/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${Settings.remoteURL}/news`).then(e => e.json())
  },
  get(searchString) {
    return fetch(`${Settings.remoteURL}/${searchString}`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/news/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getFriends(userId) {
    return fetch(`${Settings.remoteURL}/friendships?userId=${userId}`).then(e => e.json())
  },
  addNews(news) {
    return fetch(`${Settings.remoteURL}/news`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(news)
        }).then(data => data.json())
  }
//   getNewsToShow(idsToFind) {
//     return fetch(`${Settings.remoteURL}/news?_expand=user&userId=${idsToFind.join("&userId=")}`).then(e => e.json())
//   }
}