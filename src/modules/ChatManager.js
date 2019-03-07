import Settings from "./Settings"

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/chat/${id}`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/chat/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getAll() {
    return fetch(`${Settings.remoteURL}/chat`).then(e => e.json())
  },
  put(editedChat) {
    return fetch(`${Settings.remoteURL}/chat/${editedChat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedChat)
    }).then(data => data.json());
  },
  post(newChat) {
    return fetch(`${Settings.remoteURL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newChat)
    }).then(data => data.json())
  }
}