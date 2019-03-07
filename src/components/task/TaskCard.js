import React, { Component } from "react"
export default class TaskCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            completionStatus: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    updateExistingTask = () => {
        // evt.preventDefault()

        const editedTask = {
            completionStatus: this.state.completionStatus
        };
        this.props.patchTask(editedTask, parseInt(this.props.task.id))
            .then(() => this.props.history.push("/tasks"))
    }
    handleInputChange() {
        this.setState({ completionStatus: !this.state.completionStatus }, () => this.updateExistingTask())
    }

    render() {
        return (
            //Build Task Cards
            <div className="container my-4">
                <div key={this.props.task.id} className="card card-body">
                    <h5 className="card-title">{`To do: ${this.props.task.taskName}`}</h5>
                    <div className="card-subtitle mb-3">{`Complete by: ${this.props.task.completionDate}`}</div>
                    <div>
                        <form>
                        <button type="button"
                            className="btn btn-primary"
                            onClick={() => {
                                this.props.history.push(`/tasks/${this.props.task.id}/edit`);
                            }}
                        >Edit</button>
                            <div class="form-check form-check-inline d-flex justify-content-end">
                                <input
                                    className="form-check-input "
                                    name="completionStatus"
                                    type="checkbox"
                                    id="completionStatus"
                                    value={this.state.completionStatus}
                                    checked={this.state.completionStatus}
                                    onChange={this.handleInputChange} />
                            <label className="form-check-label">
                                Complete
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}