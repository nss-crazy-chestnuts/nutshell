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
      editTask(obj, id) {
        return fetch(`${Settings.remoteURL}/tasks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj)
        }).then(data => data.json())
      }
}