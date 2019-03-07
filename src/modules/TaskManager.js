import Settings from "./Settings"

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/tasks/${id}`).then(e => e.json())
  },
  getAll() {
    return fetch(`${Settings.remoteURL}/tasks`).then(e => e.json())
  },
  addTask(obj) {
    return fetch(`${Settings.remoteURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  updateTask(obj, id) {
    return fetch(`${Settings.remoteURL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  patchTask(obj, id) {
    return fetch(`${Settings.remoteURL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  deleteTask(id) {
    return fetch(`${Settings.remoteURL}/users/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  }
}