import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import EventList from "./event/EventList"
import NewsList from "./news/NewsList"
import TasksList from "./task/TaskList"
import ChatList from "./chat/ChatList"
import FriendsList from "./Friends/FriendsLIst"
import Login from "./Auth/Login"
import NewsManager from "../modules/NewsManager"
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";

class ApplicationViews extends Component {
  state = {
    events: [],
    news: [],
    tasks: [],
    chat: [],
    friends: []
  }

  updateNews = editedNewsObject =>
      NewsManager.updateNews(editedNewsObject)
      .then(() => NewsManager.getUserNews(parseInt(sessionStorage.getItem("credentials")))
            .then(parsedNews => {
              this.setState({news: parsedNews})
            }))

  addNews = news =>
      NewsManager.addNews(news)
          .then(() => NewsManager.getUserNews(parseInt(sessionStorage.getItem("credentials")))
          .then(parsedNews => {
            this.setState({news: parsedNews})
          }))




  componentDidMount() {


    const newState = {}

    // newState.events = {}
    // newState.tasks = {}
    // newState.chat = {}
    // newState.friends = {}



    let currentUserId = sessionStorage.getItem("credentials")
    //hard coded will use ${currentUserId} eventually





    NewsManager.getUserNews(currentUserId)
      .then(parsedNews => {
        newState.news = parsedNews
      })

      .then(() => this.setState(newState))





  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  render() {





    return <React.Fragment>

      <Route path="/login" component={Login} />
      <Route exact path="/events" render={props => {
        if (this.isAuthenticated()) {
        return <EventList />
        } else {
          return <Redirect to="/login" />
        }
      }} />


{/* NEWS ROUTES */}
      <Route exact path="/news" render={props => {
        if (this.isAuthenticated()) {
        return <NewsList {...props}
                  news={this.state.news} />
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
{/* *** *** *** */}



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
