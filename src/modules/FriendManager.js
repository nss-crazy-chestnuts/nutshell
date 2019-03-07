import Settings from "./Settings"

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/friendships/${id}`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/friendships/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getAll() {
    return fetch(`${Settings.remoteURL}/friendships`).then(e => e.json())
  },
  put(editedFriend) {
    return fetch(`${Settings.remoteURL}/friendships/${editedFriend.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedFriend)
    }).then(data => data.json());
  },
  post(newFriend) {
    return fetch(`${Settings.remoteURL}/friendships`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newFriend)
    }).then(data => data.json())
  },
  removeAndList(id) {
    return fetch(`${Settings.remoteURL}/friendships/${id}`, {
      method: "DELETE"
    }).then(() => fetch(`${Settings.remoteURL}/friendships`).then(r => r.json()))
  },
  fetchWithExpandedUserInfo() {
    return fetch(`${Settings.remoteURL}/friendships?_expand=user`).then(e => e.json())
  }
}