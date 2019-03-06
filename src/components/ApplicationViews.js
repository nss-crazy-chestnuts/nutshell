import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import EventList from "./event/EventList"
import NewsList from "./news/NewsList"
import TasksList from "./task/TaskList"
import ChatList from "./chat/ChatList"
import FriendsList from "./Friends/FriendsLIst"
import Login from "./Auth/Login"
import NewsManager from "../modules/NewsManager"

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

    // newState.events = {}
    NewsManager.getAll()
            .then(news => newState.news = news)
    // newState.tasks = {}
    // newState.chat = {}
    // newState.friends = {}

    .then(() => this.setState(newState))

  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  render() {

    console.log(this.props.activeUser)



    return <React.Fragment>

      <Route path="/login" component={Login} />
      <Route exact path="/events" render={props => {
        if (this.isAuthenticated()) {
        return <EventList />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route exact path="/news" render={props => {
        if (this.isAuthenticated()) {
        return <NewsList news={this.state.news} />
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
