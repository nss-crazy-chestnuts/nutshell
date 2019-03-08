const API = {


    GET: (dbArrayString) => {
        return fetch(`http://localhost:3003/${dbArrayString}`)
            .then(response => response.json())
    },

    getEventsQuery: (dbArrayString, currentUserId) => {
        return fetch(`http://localhost:3003/${dbArrayString}`)
            .then(response => response.json())
            .then(parsedFriendIds => {

                const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId);
                idsNeededArray.push(parseInt(currentUserId))
                let eventsQuery = ""
                //create part of the query that will be used in the api
                idsNeededArray.forEach(id => {
                  eventsQuery += `userId=${id}&_expand=user&`
                });
                return eventsQuery
              })
              .then(eventsQuery => {
                return API.GET(`events?${eventsQuery}`)
              })
    },
    POST: (dbArray, object) => {
        return fetch(`http://localhost:3003/${dbArray}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
            .then(response => response.json())
    },
    EDIT: (dbArray, object) => {
        return fetch(`http://127.0.0.1:3003/${dbArray}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
            .then(res => res.json())
    },
    DELETE: (dbArray, id) => {
        return fetch(`http://127.0.0.1:3003/${dbArray}/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    }
}
export default API