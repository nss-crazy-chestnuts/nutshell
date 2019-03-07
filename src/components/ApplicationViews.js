import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import HomePage from "./home/HomePage"
import EventList from "./event/EventList"
import NewsList from "./news/NewsList"
import TaskList from "./task/TaskList"
import ChatList from "./chat/ChatList"
import ChatEditForm from "./chat/ChatEditForm"
import ChatAddForm from "./chat/ChatAddForm"
import FriendsList from "./Friends/FriendsLIst"
import Login from "./Auth/Login"
import NewsManager from "../modules/NewsManager"
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import FriendAddForm from "./Friends/FriendAddForm"
import ChatManager from "../modules/ChatManager";
import FriendManager from "../modules/FriendManager";
import UserManager from "../modules/UserManager";
import TaskManager from "../modules/TaskManager";
import TaskEditForm from "../components/task/TaskEditForm"
import API from "../modules/EventManager"
import EventForm from "./event/EventForm"
import EventEditForm from "./event/EventEditForm"


class ApplicationViews extends Component {
  state = {
    events: [],
    news: [],
    tasks: [],
    chat: [],
    expandedFriends: [],
    users: []
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

  updateNews = editedNewsObject =>
    NewsManager.updateNews(editedNewsObject)
      .then(() => NewsManager.getUserNews(parseInt(sessionStorage.getItem("credentials")))
        .then(parsedNews => {
          this.setState({ news: parsedNews })
        }))

  addNews = news =>
    NewsManager.addNews(news)
      .then(() => NewsManager.getUserNews(parseInt(sessionStorage.getItem("credentials")))
        .then(parsedNews => {
          this.setState({ news: parsedNews })
        }))

  deleteNews = id =>
    NewsManager.delete(id)
    .then(() => NewsManager.getUserNews(parseInt(sessionStorage.getItem("credentials")))
        .then(parsedNews => {
          this.setState({ news: parsedNews })
        }))

  addChat = chat =>
    ChatManager.post(chat)
      .then(() => ChatManager.getAll())
      .then(chats =>
        this.setState({
          chat: chats
        })
      )

  updateChat = (editedChatObject) => {
    return ChatManager.put(editedChatObject)
      .then(() => ChatManager.getAll())
      .then(chats => {
        this.setState({
          chat: chats
        })
      })
  }

  addFriend = friend => {
    const newState = {}
    return FriendManager.post(friend)
      .then(() => FriendManager.getAll())
      .then(friends =>
        newState.friends = friends.filter(currentFriend => currentFriend.userId === parseInt(sessionStorage.getItem("credentials")))
          .map(currentFriend => currentFriend.friendId)
      )
      .then(FriendManager.fetchWithExpandedUserInfo)
      .then(friends => newState.expandedFriends = friends)
      .then(() => this.setState(newState))
  }

  deleteFriend = (friendId) => {
    const newState = {}
    return FriendManager.removeAndList(friendId)
      .then(friends =>
        newState.friends = friends.filter(currentFriend => currentFriend.userId === parseInt(sessionStorage.getItem("credentials")))
          .map(currentFriend => currentFriend.friendId)
      )
      .then(FriendManager.fetchWithExpandedUserInfo)
      .then(friends => newState.expandedFriends = friends)
      .then(() => this.setState(newState))
  }

  completeTask = (obj, id) => {
    TaskManager.editTask(obj, id)
      .then(() => TaskManager.getAll())
      .then((tasks => this.setState({
        tasks: tasks
      }))
      )
  }

  addNewTask = (obj) => {
    TaskManager.addTask(obj)
      .then(() => TaskManager.getAll())
      .then((tasks => this.setState({
        tasks: tasks
      })))
  }

  updateTask = (task, id) => {
    return TaskManager.updateTask(task, id)
      .then(() => TaskManager.getAll())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  componentDidMount() {

    const newState = {
      events: [],
      news: [],
      tasks: [],
      chat: [],
      expandedFriends: [],
      users: []
    }

    let currentUserId = sessionStorage.getItem("credentials")

    ChatManager.getAll()
      .then(chats => newState.chat = chats)
      .then(UserManager.getAll)
      .then(users => newState.users = users)
      .then(FriendManager.fetchWithExpandedUserInfo)
      .then(friends => newState.expandedFriends = friends)
      .then(() => NewsManager.getUserNews(currentUserId))
      .then(parsedNews => { newState.news = parsedNews })
      .then(TaskManager.getAll)
      .then(allTasks => newState.tasks = allTasks)

      .then(() => API.GET(`friendships?userId=${currentUserId}`)).then(parsedFriendIds => {



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
      }).then(parsedEvents => {newState.events = parsedEvents})



      .then(() => this.setState(newState))
  }








  render() {
    return (
      <React.Fragment>

        <Route path="/login" component={Login} />

        <Route exact path="/" render={props => {
          if (this.isAuthenticated()) {
            return <HomePage />
          } else {
            return <Redirect to="/login" />
          }
        }} />


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
            return <NewsList {...props}
              news={this.state.news}
              deleteNews={this.deleteNews} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/news/new" render={(props) => {
          return <NewsForm {...props}
            addNews={this.addNews}
            activeUser={this.props.activeUser} />
        }} />
        <Route path="/news/:newsId(\d+)/edit" render={props => {
          return <NewsEditForm {...props}
            news={this.state.news}
            updateNews={this.updateNews}
            activeUser={this.props.activeUser} />
        }} />




        <Route exact path="/tasks" render={props => {
          if (this.isAuthenticated()) {
            return <TaskList {...props} tasks={this.state.tasks}
              activeUser={this.props.activeUser}
              completeTask={this.completeTask}
              addNewTask={this.addNewTask} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route
          path="/tasks/:taskId(\d+)/edit" render={props => {
            return <TaskEditForm {...props} tasks={this.state.tasks} updateTask={this.updateTask} />
          }}
        />
        <Route exact path="/chat" render={props => {
          if (this.isAuthenticated()) {
            return <ChatList {...props}
              chats={this.state.chat}
              users={this.state.users}
              activeUser={this.props.activeUser} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/chat/new" render={(props) => {
          return <ChatAddForm {...props}
            addChat={this.addChat}
            chats={this.state.chat}
            activeUser={this.props.activeUser} />
        }} />
        <Route
          path="/chat/:chatId(\d+)/edit" render={props => {
            return <ChatEditForm {...props}
              chats={this.state.chat}
              activeUser={this.props.activeUser}
              updateChat={this.updateChat} />
          }}
        />
        <Route exact path="/friends" render={props => {
          if (this.isAuthenticated()) {
            return <FriendsList {...props}
              activeUser={this.props.activeUser}
              users={this.state.users}
              friendIDs={this.state.friendIDs}
              addFriend={this.addFriend}
              deleteFriend={this.deleteFriend}
              expandedFriends={this.state.expandedFriends} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/friends/new" render={(props) => {
          return <FriendAddForm {...props}
            addFriend={this.addFriend}
            activeUser={this.props.activeUser} />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews
