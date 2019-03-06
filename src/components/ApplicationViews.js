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

class ApplicationViews extends Component {
  state = {
    events: [],
    news: [],
    tasks: [],
    chat: [],
    friends: []
  }

  // updateNews(editedNewsObject) {
  //     return NewsManager.updateNews(editedNewsObject)
  //     .then(() => NewsManager.getAll())
  //     .then(news => {
  //       this.setState({
  //         news: news
  //       })
  //     });
  //   };
  // }


  addNews = news =>
        NewsManager.addNews(news)
            .then(() => NewsManager.getAll()) // NOT CORRECT - need to get friends again etc
            .then(news =>
            this.setState({
                news: news
            })
    )




  componentDidMount() {


    const newState = {}

    // newState.events = {}
    // newState.tasks = {}
    // newState.chat = {}
    // newState.friends = {}



    let currentUserId = sessionStorage.getItem("credentials")
    //hard coded will use ${currentUserId} eventually


// ****** NEWS ******


    NewsManager.getFriends(currentUserId)
      .then(parsedFriendIds => {
        const idsNeededArray = parsedFriendIds.map(friendObject => friendObject.friendId);
        idsNeededArray.push(parseInt(currentUserId))

        let newsQuery = ""
        //create part of the query that will be used in the api
        idsNeededArray.forEach(id => {
          newsQuery += `userId=${id}&_expand=user&`
        })
        return newsQuery
      }).then(newsQuery => {
        return NewsManager.get(`news?${newsQuery}`)
      })
      .then(parsedNews => {
        newState.news = parsedNews
      }).then(() => this.setState(newState))


// ******************



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
        return <NewsList {...props}
                  news={this.state.news}
                  /*activeUser={this.state.activeUser}*/ />
        } else {
          return <Redirect to="/login" />
        }
      }} />
      <Route path="/news/new" render={(props) => {
          return <NewsForm {...props}
                      addNews={this.addNews}
                      activeUser={this.props.activeUser} />
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



      {/* <Route path="/news/:newsId(\d+)/edit" render={props => {
                    return <NewsEditForm {...props}
                              news={this.state.news}
                              updateNews={this.updateNews}/>
                }}
                /> */}


    </React.Fragment>




  }
}

export default ApplicationViews
