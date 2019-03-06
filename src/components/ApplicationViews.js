import React, { Component } from "react"
import { Route } from "react-router-dom"
import EventList from "./event/EventList"
import NewsList from "./news/NewsList"
import TasksList from "./task/TaskList"
import ChatList from "./chat/ChatList"
import FriendsList from "./Friends/FriendsLIst"

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
    newState.events = {}
    newState.news = {}
    newState.tasks = {}
    newState.chat = {}
    newState.friends = {}

    this.setState(newState)

  }
  render() {

    //isAuthenticated = () => sessionStorage.getItem("credentials") !== null
    console.log(this.props.activeUser)



    return <React.Fragment>


      <Route exact path="/events" render={props => {
        // if (this.isAuthenticated()) {
        return <EventList />
        // } else {
        //   return <Redirect to="/login" />
        // }
      }} />
      <Route exact path="/news" render={props => {
        // if (this.isAuthenticated()) {
        return <NewsList />
        // } else {
        //   return <Redirect to="/login" />
        // }
      }} />
      <Route exact path="/tasks" render={props => {
        // if (this.isAuthenticated()) {
        return <TasksList />
        // } else {
        //   return <Redirect to="/login" />
        // }
      }} />
      <Route exact path="/chat" render={props => {
        // if (this.isAuthenticated()) {
        return <ChatList />
        // } else {
        //   return <Redirect to="/login" />
        // }
      }} />
      <Route exact path="/friends" render={props => {
        // if (this.isAuthenticated()) {
        return <FriendsList />
        // } else {
        //   return <Redirect to="/login" />
        // }
      }} />


    </React.Fragment>




  }
}

export default ApplicationViews
