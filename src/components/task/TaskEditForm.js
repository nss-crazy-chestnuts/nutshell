import React, { Component } from "react"
import TaskManager from "../../modules/TaskManager"

export default class TaskEditForm extends Component {
    // Set initial state
    state = {
        userId: "",
        taskName: "",
        completionDate: "",
        completionStatus: false,
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTask = evt => {
        evt.preventDefault()

            const editedTask = {
                taskName: this.state.taskName,
                completionDate: this.state.completionDate,
                completionStatus: this.state.completionStatus,
                userId: parseInt(this.state.userId)
            };

            this.props.updateTask(editedTask, parseInt(this.props.match.params.taskId))
                .then(() => this.props.history.push("/tasks"))
    }

    componentDidMount() {
        console.log(this.props.match.params.taskId)
        TaskManager.get(parseInt(this.props.match.params.taskId))
            .then(task => {
                console.log(task)
                this.setState({
                    userId: task.userId,
                    taskName: task.taskName,
                    completionDate: task.completionDate,
                    completionStatus: task.completionStatus
                });
            });
    }


    render() {
        return (
            <React.Fragment>
                <div className="container">
                <form className="taskForm">
                    <div className="form-group">
                        <label htmlFor="taskName">Task Name:</label>
                        <input
                            type="text"
                            required
                            className="taskName form-control"
                            onChange={this.handleFieldChange}
                            id="taskName"
                            value={this.state.taskName}
                        />
                    </div>
                    {/* Task date form field */}
                    <div className="form-group">
                        <label htmlFor="completionDate">Completion Date:</label>
                        <input
                            type="date"
                            required
                            className="dateForm form-control"
                            onChange={this.handleFieldChange}
                            id="completionDate"
                            value={this.state.completionDate}
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.updateExistingTask}
                        className="btn btn-primary"

                    >
                        Submit
            </button>
                </form>
            </div>
            </React.Fragment>
        );
    }
}