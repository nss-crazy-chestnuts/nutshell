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
  getUserNews(userId) {
    return fetch(`${Settings.remoteURL}/friendships?userId=${userId}`)
    .then(e => e.json())
    .then(parsedFriendIds => {
        const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId)
        idsNeededArray.push(parseInt(userId))

        let newsQuery = ""
        idsNeededArray.forEach(id => {
          newsQuery += `userId=${id}&_expand=user&`
        })
        return newsQuery
      }).then(newsQuery => {
        return this.get(`news?${newsQuery}`)
      })
  },
  addNews(news) {
    return fetch(`${Settings.remoteURL}/news`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(news)
        }).then(data => data.json())
  },
  updateNews (editedNews) {
    return fetch(`${Settings.remoteURL}/news/${editedNews.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedNews)
    }).then(data => data.json());
  }
}