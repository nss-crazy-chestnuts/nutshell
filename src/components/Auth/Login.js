import React, { Component } from "react"
import "./login.css"
import UserManager from "../../modules/UserManager"

export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    username: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRegister = e => {
    e.preventDefault()
    const newUser = {
      username: this.state.username,
      password: this.state.password
    }
    if (this.state.username && this.state.password) {
      UserManager.searchUsername(this.state.username).then(users => {
        if (users.length) {
          alert(`Username ${this.state.username} already exits!`)
        } else {
          UserManager.addUser(newUser).then(user => {
            sessionStorage.setItem("credentials", parseInt(user.id))
            this.props.setAuth()
          })
        }
      })
    } else {
      alert("Please Fill Out Form 😬!")
    }
  }

  handleLogin = e => {
    e.preventDefault()
    if (this.state.username && this.state.password) {
      UserManager.searchUP(this.state.username, this.state.password).then(
        user => {
          if (!user.length) {
            alert("Wrong username or password!")
          } else {
            sessionStorage.setItem("credentials", parseInt(user[0].id))
            this.props.setAuth()
          }
        }
      )
    } else {
      alert("Please Fill Out Form 😬!")
    }
  }

  render() {
    return (
      <form className="loginForm">
      <div className="imageContainer">
      <img src={"../img/tree.jpg"} className="image"  />
      </div>
        <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
        <div className="login-form">
          <div className="form-inline justify-content-center">
            <div className="form-group">
              <label htmlFor="inputUsername" className="sr-only">Username</label>
              <input
                className="form-control mr-1"
                onChange={this.handleFieldChange}
                type="username"
                id="username"
                placeholder={`Username`}
                required=""
                autoFocus=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input
                className="form-control mr-1"
                onChange={this.handleFieldChange}
                type="password"
                id="password"
                placeholder={`password`}
                required=""
              />
              <div className="my-2">
                <button className="btn btn-primary mr-1" type="submit" onClick={this.handleLogin}>
                  Sign in
        </button>
                <button className="btn btn-warning" type="submit" onClick={this.handleRegister}>
                  Register
        </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}
