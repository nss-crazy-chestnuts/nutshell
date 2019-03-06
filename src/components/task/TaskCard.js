import React, { Component } from "react"



export default class TaskCard extends Component {
    render() {
        return (
            <div key={this.props.task.id} className="card">
                    <h5 className="card-title">{this.props.task.taskName}</h5>
                       <div>{this.props.task.completionDate}</div>
                       <button className="complete_task_button"
                       onClick={
                           () => {
                               this.props.task.completionStatus = true
                               this.props.completeTask(this.props.task, this.props.task.id)
                          }
                       }
                       >Complete Task</button>
            </div>
        )
    }
}