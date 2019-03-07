import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import EventList from "./event/EventList"
import NewsList from "./news/NewsList"
import TasksList from "./task/TaskList"
import ChatList from "./chat/ChatList"
import FriendsList from "./Friends/FriendsLIst"
import Login from "./Auth/Login"
import API from "../modules/EventManager"
import EventForm from "./event/EventForm"
import EventEditForm from "./event/EventEditForm"


class ApplicationViews extends Component {
  state = {
    events: [],
    news: [],
    tasks: [],
    chat: [],
    friends: []
  }


  componentDidMount() {


    const newState = {}




    //use session storage to get id
    // currentUserId = document.querySelector("#userId").value
    let currentUserId = sessionStorage.getItem("credentials")
    //hard coded will use ${currentUserId} eventually
    API.GET(`friendships?userId=${currentUserId}`).then(parsedFriendIds => {



      const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId);
      idsNeededArray.push(parseInt(currentUserId))

      let eventsQuery = ""
      //create part of the query that will be used in the api
      idsNeededArray.forEach(id => {
        eventsQuery += `userId=${id}&_expand=user&`
      });
      return eventsQuery

    }).then(eventsQuery => {
      return API.GET(`events?${eventsQuery}`)
    }).then(parsedEvents => {

      newState.events = parsedEvents
      newState.news = {}
      newState.tasks = {}
      newState.chat = {}
      newState.friends = {}
      this.setState(newState)
    })
  }


  deleteEvent = id => {
    API.DELETE("events", id)
      .then(() => {
        API.GET(`friendships?userId=${sessionStorage.getItem("credentials")}`).then(parsedFriendIds => {



          const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId);
          idsNeededArray.push(parseInt(sessionStorage.getItem("credentials")))

          let eventsQuery = ""
          //create part of the query that will be used in the api
          idsNeededArray.forEach(id => {
            eventsQuery += `userId=${id}&_expand=user&`

            return eventsQuery
          })
        })
      }).then(eventsQuery => {
        return API.GET(`events?${eventsQuery}`)
      }).then(parsedEvents => {
        this.setState({
          events: parsedEvents
        })
      })

  }

  updateEvent = (editedEventObject) => {
    return API.EDIT(`events/${editedEventObject.id}`, editedEventObject)
    .then(() => {
      API.GET(`friendships?userId=${sessionStorage.getItem("credentials")}`).then(parsedFriendIds => {



        const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId);
        idsNeededArray.push(parseInt(sessionStorage.getItem("credentials")))

        let eventsQuery = ""
        //create part of the query that will be used in the api
        idsNeededArray.forEach(id => {
          eventsQuery += `userId=${id}&_expand=user&`

          return eventsQuery
        })
      })
    }).then(eventsQuery => {
      return API.GET(`events?${eventsQuery}`)
    }).then(parsedEvents => {
      this.setState({
        events: parsedEvents
      })
    })

};



  addEvent = event =>

    API.POST("events", event).then(() => {
      API.GET(`friendships?userId=${sessionStorage.getItem("credentials")}`).then(parsedFriendIds => {



        const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId);
        idsNeededArray.push(parseInt(sessionStorage.getItem("credentials")))

        let eventsQuery = ""
        //create part of the query that will be used in the api
        idsNeededArray.forEach(id => {
          eventsQuery += `userId=${id}&_expand=user&`

          return eventsQuery
        })
      })
    }).then(eventsQuery => {
      return API.GET(`events?${eventsQuery}`)
    }).then(parsedEvents => {
      this.setState({
        events: parsedEvents
      })
    })

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null
  render() {






    return <React.Fragment>

      <Route path="/login" component={Login} />
      <Route exact path="/events" render={props => {
        if (this.isAuthenticated()) {
          return <EventList {...props}
            deleteEvent={this.deleteEvent}
            events={this.state.events} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route exact path="/events/new" render={props => {
        if (this.isAuthenticated()) {
          return <EventForm {...props}
            events={this.state.events} addEvent={this.addEvent} />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route
        exact path="/events/:eventId(\d+)/edit" render={props => {
          return <EventEditForm {...props} events={this.state.events} updateEvent={this.updateEvent} />
        }}
      />



      <Route exact path="/news" render={props => {
        if (this.isAuthenticated()) {
          return <NewsList />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route exact path="/tasks" render={props => {
        if (this.isAuthenticated()) {
          return <TasksList />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route exact path="/chat" render={props => {
        if (this.isAuthenticated()) {
          return <ChatList />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route exact path="/friends" render={props => {
        if (this.isAuthenticated()) {
          return <FriendsList />
        } else {
          return <Redirect to="/login" />
        }
      }} />


    </React.Fragment>




  }
}

export default ApplicationViews
