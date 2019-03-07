import React, { Component } from "react"
export default class TaskCard extends Component {
    render() {
        return (
            //Build Task Cards
            <div className="container mb-4">
            <div key={this.props.task.id} className="card card-body">
                <h5 className="card-title">{`To do: ${this.props.task.taskName}`}</h5>
                <div className="card-subtitle mb-3">{`Complete by: ${this.props.task.completionDate}`}</div>
                <div>
                <button type="button"
                                className="btn btn-primary mr-1"
                                onClick={() => {
                                    this.props.history.push(`/tasks/${this.props.task.id}/edit`);
                                }}
                >Edit</button>
                <button className="complete_task_button btn btn-success"
                    onClick={
                        () => {
                            // Change the status to true and PUT to API TaskManager
                            this.props.task.completionStatus = true
                            this.props.completeTask(this.props.task, this.props.task.id)
                        }
                    }
                >Complete Task</button>
                </div>
            </div>
            </div>
        )
    }
}