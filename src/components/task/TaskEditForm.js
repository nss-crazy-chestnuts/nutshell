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

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.updateExistingTask(e)
        }
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

      handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }


    componentDidMount() {
        TaskManager.get(parseInt(this.props.match.params.taskId))
            .then(task => {
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
                                onKeyPress={this._handleKeyPress}
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
                                onKeyPress={this._handleKeyPress}
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