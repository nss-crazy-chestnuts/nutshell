import React, { Component } from "react"
export default class TaskCard extends Component {
    render() {
        return (
            //Build Task Cards
            <div key={this.props.task.id} className="card">
                    <h5 className="card-title">{`To do: ${this.props.task.taskName}`}</h5>
                       <div>{`Complete by: ${this.props.task.completionDate}`}</div>
                       <button className="complete_task_button"
                       onClick={
                           () => {
                               // Change the status to true and PUT to API TaskManager
                               this.props.task.completionStatus = true
                               this.props.completeTask(this.props.task, this.props.task.id)
                          }
                       }
                       >Complete Task</button>
            </div>
        )
    }
}