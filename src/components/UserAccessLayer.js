import React, { Component } from "react"
import Nav from "./Nav/Nav"
import ApplicationViews from "./ApplicationViews"
import UserManager from "../modules/UserManager"

export default class UserAccessLayer extends Component {
  state = {
    activeUser: {}
  }

  componentDidMount() {
    document.getElementById("coolButton").addEventListener("click", event => {
      new Audio('https://dl.dropbox.com/s/bjys9xln30r5kn1/motley.mp3?dl=0').play()
      document.body.classList.toggle("fire")
      document.getElementById("spinPhoto").classList.toggle("sunglasses")
      document.getElementById("title").classList.toggle("spin")
      document.getElementById("fall").classList.toggle("fallingLeaves")
      document.querySelectorAll(".card").forEach(currentCard => currentCard.classList.toggle("transparent"))
    })
    document.getElementById("steveButton").addEventListener("click", event => {
      new Audio('https://dl.dropbox.com/s/9vvg4jgpjlbexa6/Raining%20Steve.mp3?dl=0').play()
      document.body.classList.toggle("goldenrod")
      document.getElementById("spinPhoto").classList.toggle("steveSpin")
      document.getElementById("title").classList.toggle("spin")
      document.getElementById("fall").classList.toggle("fallingSteves")
      document.querySelectorAll(".card").forEach(currentCard => currentCard.classList.toggle("transparent"))
    })

    UserManager.get(this.activeUserId()).then(activeUser =>
      this.setState({ activeUser: activeUser })

    )
  }
  activeUserId = () => parseInt(sessionStorage.getItem("credentials"))

  render() {
    return (
      <React.Fragment>
        <Nav setAuth={this.props.setAuth} activeUser={this.state.activeUser} />
        <button id="coolButton">Kool Mode</button>
        <button id="steveButton">Steve Mode</button>
        <ApplicationViews
          activeUserId={this.activeUserId}
          activeUser={this.state.activeUser}
        />
      </React.Fragment>
    )
  }
}
