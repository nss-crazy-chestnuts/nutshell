import React, { Component } from "react"

export default class TaskInputForm extends Component {
  //build state object for PUT
  state = {
    userId: "",
    taskName: "",
    completionDate: "",
    completionStatus: false,
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
  Local method for validation, creating task object, and
  invoking the function reference passed from parent component
  */
  constructNewTask = evt => {
    evt.preventDefault();
    console.log(this.props.activeUser.id)
    const task = {
      userId: this.props.activeUser.id,
      taskName: this.state.taskName,
      completionDate: this.state.completionDate,
      completionStatus: false
    };

    // Create the task and redirect user to task list
    this.props.addNewTask(task)
  };

  //Build task input fields.
  render() {
    return (
      <React.Fragment>
        {/* // Task name form field */}
        <form className="taskForm">
          <div className="form-group">
            <label htmlFor="taskName">Task Name:</label>
            <input
              type="text"
              required
              className="taskName"
              onChange={this.handleFieldChange}
              id="taskName"
              placeholder="Task Name"
            />
          </div>
          {/* Task date form field */}
          <div className="form-group">
            <label htmlFor="completionDate">Completion Date:</label>
            <input
              type="date"
              required
              className="dateForm taskForm"
              onChange={this.handleFieldChange}
              id="completionDate"
              placeholder="Date"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewTask}
            className="taskButton"
          >
            Submit
                      </button>
        </form>
      </React.Fragment>
    );
  }
}