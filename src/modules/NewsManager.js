import Settings from "./Settings"

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/news/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${Settings.remoteURL}/news`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/news/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  }
}