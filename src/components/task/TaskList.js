import React, { Component } from "react"
import TaskCard from "./TaskCard";
import TaskInputForm from "./TaskInputForm";


export default class TaskList extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Tasks</h1>
                {/* Build task input form */}
                <div className="create_task_form">
                    <TaskInputForm addNewTask={this.props.addNewTask} activeUser={this.props.activeUser} />
                </div>
                <section className="taskList_Container">
                    {

                    // Grab all tasks, filter by completion and grab incompleted,
                    // filter by userId and pass to card component
                        this.props.tasks.filter(task =>
                            task.completionStatus === false
                            && task.userId === this.props.activeUser.id)
                            .map(task =>
                                <TaskCard key={task.id} task={task} {...this.props} />
                            )
                    }
                </section>
            </React.Fragment>
        )
    }
}