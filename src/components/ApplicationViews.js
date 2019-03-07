import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import EventList from "./event/EventList"
import NewsList from "./news/NewsList"
import TaskList from "./task/TaskList"
import ChatList from "./chat/ChatList"
import FriendsList from "./Friends/FriendsLIst"
import Login from "./Auth/Login"
import TaskManager from "../modules/TaskManager";
import TaskEditForm from "../components/task/TaskEditForm"

class ApplicationViews extends Component {
  state = {
    events: [],
    news: [],
    tasks: [],
    chat: [],
    friends: []
  }
  componentDidMount() {


    const newState = {
      events: [],
      news: [],
      tasks: [],
      chat: [],
      friends: []
    }

    TaskManager.getAll()
      .then(allTasks => newState.tasks = allTasks)
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
          return <NewsList />
        } else {
          return <Redirect to="/login" />
        }
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
