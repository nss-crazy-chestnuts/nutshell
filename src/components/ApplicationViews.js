import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import HomePage from "./home/HomePage"
import EventList from "./event/EventList"
import NewsList from "./news/NewsList"
import TasksList from "./task/TaskList"
import ChatList from "./chat/ChatList"
import ChatEditForm from "./chat/ChatEditForm"
import ChatAddForm from "./chat/ChatAddForm"
import FriendsList from "./Friends/FriendsLIst"
import FriendAddForm from "./Friends/FriendAddForm"
import Login from "./Auth/Login"
import ChatManager from "../modules/ChatManager";
import FriendManager from "../modules/FriendManager";
import UserManager from "../modules/UserManager";

class ApplicationViews extends Component {
  state = {
    events: [],
    news: [],
    tasks: [],
    chat: [],
    friendIDs: [],
    expandedFriends: [],
    users: []
  }

  componentDidMount() {

    const newState = {
      events: [],
      news: [],
      tasks: [],
      chat: [],
      friendIDs: [],
      expandedFriends: [],
      users: []
    }

    ChatManager.getAll()
      .then(chats => newState.chat = chats)
      .then(UserManager.getAll)
      .then(users => newState.users = users)
      .then(FriendManager.getAll)
      .then(friends => {
        newState.friendIDs = friends.filter(currentFriend => currentFriend.userId === parseInt(sessionStorage.getItem("credentials")))
          .map(currentFriend => currentFriend.friendedId)
      })
      .then(FriendManager.fetchWithExpandedUserInfo)
      .then(friends => newState.expandedFriends = friends)
      .then(() => this.setState(newState))
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  addChat = chat =>
    ChatManager.post(chat)
      .then(() => ChatManager.getAll())
      .then(chats =>
        this.setState({
          chat: chats
        })
      )

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

  updateChat = (editedChatObject) => {
    return ChatManager.put(editedChatObject)
      .then(() => ChatManager.getAll())
      .then(chats => {
        this.setState({
          chat: chats
        })
      })
  }

  render() {

    console.log(this.props.activeUser)

    return <React.Fragment>

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
          return <EventList />
        } else {
          return <Redirect to="/login" />
        }
      }} />
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
          return <ChatEditForm {...props} chats={this.state.chat} activeUser={this.props.activeUser} updateChat={this.updateChat} />
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
  }
}

export default ApplicationViews
