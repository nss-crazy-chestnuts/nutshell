import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import Nutshell from "./Nutshell"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <Router>
    <Nutshell />
  </Router>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

document.getElementById("coolButton").addEventListener("click", event => {
  new Audio('https://dl.dropbox.com/s/bjys9xln30r5kn1/motley.mp3?dl=0').play()
  document.body.classList.toggle("fire")
  document.getElementById("sunglasses").classList.toggle("sunglasses")
  document.getElementById("title").classList.toggle("spin")
  document.getElementById("fall").classList.toggle("fallingLeaves")
})